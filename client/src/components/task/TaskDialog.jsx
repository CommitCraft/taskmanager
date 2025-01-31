import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { HiDuplicate } from "react-icons/hi";
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import AddTask from "./AddTask";
import AddSubTask from "./AddSubTask";
import ConfirmatioDialog from "../Dialogs";
import {
  useDuplicateTaskMutation,
  useTrashTaskMutation,
} from "../../redux/slices/api/taskApiSlice";
import { toast } from "sonner";
import Loading from "../Loader"; // Import Loader component

const TaskDialog = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // New state for API calls

  const navigate = useNavigate();
  const [deleteTask, { isLoading: isDeleting }] = useTrashTaskMutation();
  const [duplicateTask, { isLoading: isDuplicating }] = useDuplicateTaskMutation();

  const duplicateHandler = async () => {
    setIsProcessing(true); // Show loader while processing
    try {
      const res = await duplicateTask(task._id).unwrap();
      toast.success(res?.message);
      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to duplicate task");
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteHandler = async () => {
    setIsProcessing(true);
    try {
      const res = await deleteTask({ id: task._id, isTrashed: "trash" }).unwrap();
      toast.success(res?.message);
      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete task");
    } finally {
      setIsProcessing(false);
    }
  };

  const items = [
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => navigate(`/task/${task._id}`),
    },
    {
      label: "Edit",
      icon: <MdOutlineEdit className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => setOpenEdit(true),
    },
    {
      label: "Add Sub-Task",
      icon: <MdAdd className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => setOpen(true),
    },
    {
      label: "Duplicate",
      icon: <HiDuplicate className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: duplicateHandler,
      disabled: isProcessing || isDuplicating, // Disable while processing
    },
  ];

  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600">
            <BsThreeDots />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 space-y-2">
                {items.map((el) => (
                  <Menu.Item key={el.label}>
                    {({ active }) => (
                      <button
                        onClick={el?.onClick}
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-50`}
                        disabled={el.disabled} // Disable buttons when processing
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>

              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpenDialog(true)}
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-red-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-50`}
                      disabled={isProcessing || isDeleting} // Disable when processing
                    >
                      <RiDeleteBin6Line className="mr-2 h-5 w-5 text-red-400" aria-hidden="true" />
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {/* Loader when processing an API request */}
      {(isProcessing || isDeleting || isDuplicating) && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <Loading />
        </div>
      )}

      <AddTask open={openEdit} setOpen={setOpenEdit} task={task} key={new Date().getTime()} />

      <AddSubTask open={open} setOpen={setOpen} />

      <ConfirmatioDialog open={openDialog} setOpen={setOpenDialog} onClick={deleteHandler} />
    </>
  );
};

export default TaskDialog;
