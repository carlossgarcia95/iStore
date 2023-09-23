"use client";

import { FC, useState } from "react";
// Allows to pass any props that can be passed to a Div.
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      {/* Sign in Container */}
      <div className="bg-white px-16 py-16 self-center mt-16 lg:w-4/5 lg:max-w-lg rounded-md w-full gap-5 shadow-lg">
        <h2 className="text-black text-4xl mb-8 font-semibold">Login</h2>
        <div className="flex flex-col gap-4">
          <input
            placeholder="Email"
            onChange={(ev: any) => {}}
            id="email"
            type="email"
          />
          <input placeholder="Password" id="password" type="password" />
        </div>
        <div className="mt-4">
          <button className="w-full">Login</button>
        </div>
        <div className="mt-4">
          <button className="w-full gap-2">Login with Google</button>
        </div>

        <div className="flex flex-row items-center gap-4 mt-8 justify-center"></div>
        <p className="text-zinc-500 mt-">
          Don't have an account?
          <span className="text-blue-700 font-bold ml-1 hover:underline cursor-pointer">
            Register
          </span>
        </p>
      </div>
    </>
  );
};

export default UserAuthForm;
