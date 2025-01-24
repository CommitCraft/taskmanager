import React from "react";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Button from "./Button";

const ViewNotification = ({ open, setOpen, el }) => {
  // Default notification fallback in case `el` is not provided
  const defaultNotification = { task: { title: "No Title" }, text: "No Content Available" };
  const notification = el || defaultNotification;

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
        {/* Modal Title */}
        <Dialog.Title as="h3" className="font-semibold text-lg">
          {notification.task.title}
        </Dialog.Title>
        {/* Modal Content */}
        <p className="text-start text-gray-500">{notification.text}</p>
        {/* Ok Button */}
        <Button
          type="button"
          className="bg-white px-8 mt-3 text-sm font-semibold text-gray-900 sm:w-auto rounded hover:bg-gray-100"
          onClick={() => setOpen(false)}
          label="Ok"
        />
      </div>
    </ModalWrapper>
  );
};

export default ViewNotification;
