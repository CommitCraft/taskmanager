import React, { useState, useReducer } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../Button";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../utils/firebase";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../redux/slices/api/taskApiSlice";
import { toast } from "sonner";
import Loading from "../Loader"; // Import Loading Component
import { dateFormatter } from "../../utils";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const fileReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FILES":
      return [...state, ...action.files];
    case "REMOVE_FILE":
      return state.filter((_, i) => i !== action.index);
    case "RESET":
      return [];
    default:
      return state;
  }
};

const AddTask = ({ open, setOpen, task }) => {
  const defaultValues = {
    title: task?.title || "",
    date: dateFormatter(task?.date || new Date()),
    team: task?.team || [],
    stage: task?.stage?.toUpperCase() || LISTS[0],
    priority: task?.priority?.toUpperCase() || PRIORITY[2],
    assets: task?.assets || [],
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORITY[2]
  );
  const [assets, dispatch] = useReducer(fileReducer, []);
  const [previousAssets, setPreviousAssets] = useState(task?.assets || []);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({}); // Upload progress tracking

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const handleSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (assets.length + selectedFiles.length > 5) {
      toast.error("You can only upload up to 5 files in total.");
      return;
    }

    const newFiles = selectedFiles.filter(
      (file) => !assets.some((existingFile) => existingFile.name === file.name)
    );

    if (newFiles.length === 0) {
      toast.error("Duplicate files are not allowed.");
      return;
    }

    const imagePreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...imagePreviews]);

    dispatch({ type: "ADD_FILES", files: newFiles });
  };

  const removeFile = (index) => {
    dispatch({ type: "REMOVE_FILE", index });
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFile = async (file, index) => {
    const storage = getStorage(app);
    const name = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `TaskCRM/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progressValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress((prev) => ({
            ...prev,
            [index]: progressValue.toFixed(2),
          }));
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

  const submitHandler = async (formData) => {
    if (!formData.title || !formData.date) {
      toast.error("All fields are required!");
      return;
    }

    setUploading(true);
    try {
      const newFileURLs = await Promise.all(
        assets.map((file, index) => uploadFile(file, index))
      );

      const newData = {
        ...formData,
        assets: [...previousAssets, ...newFileURLs],
        team,
        stage,
        priority,
      };

      const res = task?._id
        ? await updateTask({ ...newData, _id: task._id }).unwrap()
        : await createTask(newData).unwrap();

      toast.success(res.message);
      setTimeout(() => {
        window.location.reload();
        setOpen(false);
      }, 500);
    } catch (error) {
      console.error("Error submitting task:", error);
      toast.error(error?.data?.message || "Failed to submit task");
    } finally {
      setUploading(false);
      dispatch({ type: "RESET" });
      setPreviewImages([]);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title className="text-base font-bold text-gray-900 mb-4">
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
            <SelectList
              label="Task Stage"
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
            />
            <Textbox
              placeholder="Date"
              type="date"
              name="date"
              label="Task Date"
              register={register("date", { required: "Date is required!" })}
              error={errors.date?.message}
            />
          </div>
          {/* Priority & Add Assets Section */}
          <div className="flex flex-col gap-4">
            <SelectList
              label="Priority Level"
              lists={PRIORITY}
              selected={priority}
              setSelected={setPriority}
            />

            {/* Add Assets Button */}
            <label className="flex items-center gap-2 text-base cursor-pointer bg-gray-100 p-2 rounded-md border">
              <input
                type="file"
                className="hidden"
                id="imgUpload"
                onChange={handleSelect}
                accept=".jpg, .png, .jpeg"
                multiple
              />
              <BiImages className="text-gray-600 w-5 h-5" />
              <span className="text-sm text-gray-700">Add Assets</span>
            </label>
          </div>
          {/* Image Previews (Scrollable) */}
          {previewImages.length > 0 && (
            <div className="border p-3 rounded-lg bg-gray-50 max-h-40 overflow-y-auto flex flex-wrap gap-2">
              {previewImages.map((src, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 border rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={src}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                    onClick={() => removeFile(index)}
                  >
                    <AiOutlineClose className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {(isLoading || isUpdating || uploading) && <Loading />}{" "}
          {/* Show loading spinner */}
          <div className="flex justify-end gap-4">
            <Button
              className="bg-green-500"
              label="Submit"
              type="submit"
              disabled={uploading}
            />
            <Button
              className="bg-red-500"
              type="button"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;
