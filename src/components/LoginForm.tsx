"use client";

import Link from "next/link";
import CloseModal from "./CloseModal";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { FcGoogle } from "react-icons/fc";
import Heading from "./ui/Heading";

const LoginForm = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-6 px-8 py-2">
      <div className="flex justify-between">
        <Heading title="Login" />
        <CloseModal />
      </div>
      <Input type="text" placeholder="Email" className="border" />
      <Input type="text" placeholder="Password" className="border" />
      <Button>Login</Button>
      <div className="flex items-center justify-center gap-2">
        <hr className="border w-full border-teal-500" />
        <p className="self-center text-center text-slate-500 w-96">or log in with </p>
        <hr className="border w-full border-teal-500" />
      </div>
      <Button className="gap-2" variant={"subtle"}>
        <FcGoogle size={24} />
        Google
      </Button>
      <p className="text-slate-500">
        Don't have an account?{" "}
        <Link href="/register" className="hover:underline text-teal-600 font-bold">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
