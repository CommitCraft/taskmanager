import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Button from "../Button";
import { toast } from "sonner";
import { useCreateSubTaskMutation } from "../../redux/slices/api/taskApiSlice";
import Loading from "../Loader";

const AddSubTask = ({ open, setOpen, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addSbTask, { isLoading }] = useCreateSubTaskMutation(); // Get loading state

  const handleOnSubmit = async (data) => {
    try {
      const res = await addSbTask({ data, id }).unwrap();
      toast.success(res.message);
      setTimeout(() => {
        window.location.reload();
        setOpen(false);
      }, 500);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to add sub-task");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      {/* Show Loader when API is processing */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <Loading />
        </div>
      )}

      <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-4">
        <Dialog.Title as="h2" className="text-lg font-semibold text-gray-900 mb-2">
          ADD SUB-TASK
        </Dialog.Title>

        {/* Sub-task Title */}
        <Textbox
          placeholder="Enter sub-task title"
          type="text"
          name="title"
          label="Title"
          className="w-full"
          autoFocus
          register={register("title", { required: "Title is required!" })}
          error={errors.title ? errors.title.message : ""}
        />

        {/* Date & Tag */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Textbox
            placeholder="Select Date"
            type="date"
            name="date"
            label="Task Date"
            className="w-full"
            register={register("date", { required: "Date is required!" })}
            error={errors.date ? errors.date.message : ""}
          />

          <Textbox
            placeholder="Enter Tag"
            type="text"
            name="tag"
            label="Tag"
            className="w-full"
            register={register("tag", { required: "Tag is required!" })}
            error={errors.tag ? errors.tag.message : ""}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-3">
          <Button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
            label={isLoading ? "Adding..." : "Add Task"}
            disabled={isLoading} // Disable while loading
          />

          <Button
            type="button"
            className="bg-gray-200 text-gray-900 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-300 transition-all"
            onClick={() => setOpen(false)}
            label="Cancel"
          />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddSubTask;
