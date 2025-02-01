import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import Loading from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice"; // Register API
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCredentials } from "../redux/slices/authSlice";

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const submitHandler = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-right" });
      return;
    }

    try {
      const result = await registerUser({
        ...data,
        // password: data.email,
        role: "User",
        title: "User",
      }).unwrap();

      dispatch(setCredentials(result));

      toast.success("Registration successful! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error?.data?.message || error?.error || "Registration failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        {/* Left Side */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600">
              Join the best task management platform!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
              <span>Sign Up for</span>
              <span>Task Manager</span>
            </p>
            <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-4 bg-white px-10 pt-14 pb-14"
          >
            <div>
              <p className="text-blue-600 text-3xl font-bold text-center">
                Create an Account
              </p>
              <p className="text-center text-base text-gray-700">
                Start managing your tasks efficiently.
              </p>
            </div>

            <div className="flex flex-col gap-y-5">
              <Textbox
                placeholder="John Doe"
                type="text"
                name="name"
                label="Full Name"
                className="w-full rounded-full"
                register={register("name", {
                  required: "Full Name is required!",
                })}
                error={errors.name ? errors.name.message : ""}
              />

              <Textbox
                placeholder="email@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />

              <Textbox
                placeholder="your password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                register={register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                error={errors.password ? errors.password.message : ""}
              />

              <Textbox
                placeholder="confirm your password"
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                className="w-full rounded-full"
                register={register("confirmPassword", {
                  required: "Please confirm your password!",
                })}
                error={errors.confirmPassword ? errors.confirmPassword.message : ""}
              />

              {isLoading ? (
                <Loading />
              ) : (
                <Button
                  type="submit"
                  label="Register"
                  className="w-full h-10 bg-blue-700 text-white rounded-full"
                />
              )}
            </div>

            <div className="text-sm text-gray-500 flex gap-2 justify-center">
              
              <span
                className="hover:text-blue-600 underline cursor-pointer"
                onClick={() => navigate("/log-in")}
              >
                Already have an account? Login here
              </span>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
