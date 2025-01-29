import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai"; // Close icon for removing assets
import Button from "../Button";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../utils/firebase";
import { useCreateTaskMutation, useUpdateTaskMutation } from "../../redux/slices/api/taskApiSlice";
import { toast } from "sonner";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen, task }) => {
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: task?.title || "",
      date: task?.date || "",
    },
  });

  // State management
  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORITY[2]);
  const [assets, setAssets] = useState([]);
  const [uploadedFileURLs, setUploadedFileURLs] = useState([]); // New uploaded files
  const [previousAssets, setPreviousAssets] = useState(task?.assets || []); // Previous assets
  const [uploading, setUploading] = useState(false);

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  // Handle file selection
  const handleSelect = (e) => {
    setAssets((prevAssets) => [...prevAssets, ...e.target.files]);
  };

  // Remove a previous asset from the list
  const removePreviousAsset = (index) => {
    setPreviousAssets((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload files to Firebase Storage
  const uploadFile = async (file, index) => {
    const storage = getStorage(app);
    const name = `${new Date().getTime()}-${file.name}`;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`File ${index + 1}: ${progress.toFixed(2)}% uploaded`);
          toast.info(`File ${index + 1}: ${progress.toFixed(2)}% uploaded`);
        },
        (error) => reject(error),
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  // Handle form submission
  const submitHandler = async (formData) => {
    console.log("Form Data received:", formData);

    if (!formData || Object.keys(formData).length === 0) {
      console.error("Form data is undefined or empty");
      toast.error("Please fill in the required fields.");
      return;
    }

    setUploading(true);
    try {
      const fileUploadPromises = assets.map((file, index) => uploadFile(file, index));
      const newFileURLs = await Promise.all(fileUploadPromises);

      const newData = {
        ...formData,
        assets: [...previousAssets, ...newFileURLs], // Combine previous assets & newly uploaded ones
        team,
        stage,
        priority,
      };

      console.log("Submitting task data:", newData);

      // Send data to backend
      const res = task?._id
        ? await updateTask({ ...newData, _id: task._id }).unwrap()
        : await createTask(newData).unwrap();

      toast.success(res.message);
      setTimeout(() => setOpen(false), 500);
    } catch (error) {
      console.error("Error submitting task:", error);
      toast.error(error?.data?.message || error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
          {task ? "UPDATE TASK" : "ADD TASK"}
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Task Title"
            type="text"
            name="title"
            label="Task Title"
            className="w-full rounded"
            register={register("title", { required: "Title is required" })}
            error={errors.title ? errors.title.message : ""}
          />

          <UserList setTeam={setTeam} team={team} />

          <div className="flex gap-4">
            <SelectList label="Task Stage" lists={LISTS} selected={stage} setSelected={setStage} />
            <Textbox
              placeholder="Date"
              type="date"
              name="date"
              label="Task Date"
              className="w-full rounded"
              register={register("date", { required: "Date is required!" })}
              error={errors.date ? errors.date.message : ""}
            />
          </div>

          <div className="flex gap-4">
            <SelectList label="Priority Level" lists={PRIORITY} selected={priority} setSelected={setPriority} />
            <div className="w-full flex items-center justify-center mt-4">
              <label
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
                htmlFor="imgUpload"
              >
                <input
                  type="file"
                  className="hidden"
                  id="imgUpload"
                  onChange={handleSelect}
                  accept=".jpg, .png, .jpeg"
                  multiple
                />
                <BiImages />
                <span>Add Assets</span>
              </label>
            </div>
          </div>

        

          <div className="sm:flex sm:flex-row-reverse gap-4">
            <Button className='bg-green-500' label="Submit" type="submit" disabled={uploading} />
            <Button className='bg-red-500' type="button" onClick={() => setOpen(false)} label="Cancel" />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;
