import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Input({
  type,
  value,
  onChange,
  label,
  placeholder,
  name,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="text-base md:text-lg font-semibold  text-center text-slate-800  ">
        {label}
      </label>

      <div className="input-box">
        <input
          name={name}
          type={
            type === 'password' ? showPassword ? "text" : "password" : type }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-center outline-none text-base md:text-lg       "
        />

        {type === 'password' &&
          (showPassword ? (
            <FaRegEye
              size={22}
              onClick={() => setShowPassword(false)}
              className="text-primary cursor-pointer"
            />
          ) : (
            <FaRegEyeSlash
              size={22}
              onClick={() => setShowPassword(true)}
              className="text-black/55 cursor-pointer"
            />
          ))}
      </div>
    </div>
  );
}

