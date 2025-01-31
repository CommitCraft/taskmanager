import React, { useState } from "react";
import clsx from "clsx";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";

const Textbox = React.forwardRef(
  ({ type, placeholder, label, className, register, name, error }, ref) => {
    const [showPassword,setShowPassword] = useState(false)
    return (
      <div className='w-full flex flex-col gap-1'>
        {label && (
          <label htmlFor={name} className='text-slate-800'>
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {type === "password" ?
            <>
              <input
                type={showPassword?"text":"password"}
                name={name}
                placeholder={placeholder}
                ref={ref}
                {...register}
                aria-invalid={error ? "true" : "false"}
                className={clsx(
                  "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-4 ring-blue-400",
                  className
                )}
              />
              <div className="absolute right-3" onClick={()=>setShowPassword(!showPassword)}>
                {!showPassword?<RiEyeCloseLine />:<RiEyeLine />}
              </div>
            </> :
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              ref={ref}
              {...register}
              aria-invalid={error ? "true" : "false"}
              className={clsx(
                "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-4 ring-blue-400",
                className
              )}
            />
          }
        </div>
        {error && (
          <span className='text-xs text-[#f64949fe] mt-0.5 '>{error}</span>
        )}
      </div>
    );
  }
);
export default Textbox;
