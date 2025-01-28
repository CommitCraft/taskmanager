import React from "react";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "react-toastify";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";

import Button from "./Button";
import Loading from "./Loader";

const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fix: Correctly destructuring `isLoading`
  const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

  // Form submit handler
  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("Passwords do not match");
      return;
    }

    try {
      const res = await changeUserPassword(data).unwrap();
      toast.success("Password changed successfully");
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.error || "An error occurred");
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-4">
          {/* Modal Title */}
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            Change Password
          </Dialog.Title>

          {/* Password Fields */}
          <div className="flex flex-col gap-6">
            <Textbox
              placeholder="New Password"
              type="password"
              name="password"
              label="New Password"
              className="w-full rounded"
              register={register("password", {
                required: "New Password is required!",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              error={errors.password?.message}
            />
            <Textbox
              placeholder="Confirm New Password"
              type="password"
              name="cpass"
              label="Confirm New Password"
              className="w-full rounded"
              register={register("cpass", {
                required: "Confirm New Password is required!",
              })}
              error={errors.cpass?.message}
            />

            {/* Loading and Buttons */}
            {isLoading ? (
              <div className="py-5 flex justify-center">
                <Loading/>
              </div>
            ) : (
              <div className="flex gap-4">
                {/* Save Button */}
                <Button
                  type="submit"
                  className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 rounded"
                  label="Save"
                />

                {/* Cancel Button */}
                <button
                  type="button"
                  className="bg-red-600 px-8 text-sm font-semibold text-white hover:bg-red-700 rounded"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default ChangePassword;
