"use client";

import Link from "next/link";
import CloseModal from "./CloseModal";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { FcGoogle } from "react-icons/fc";
import Heading from "./ui/Heading";
import { signIn } from "next-auth/react";
import { useToast } from "../hooks/useToast";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("joe@example.com");
  const [password, setPassword] = useState("password");
  const { toast } = useToast();
  const router = useRouter();

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
      });
    } catch (error) {
      error;
    }
  }, [email, password]);

  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-6 px-8 py-2">
      <div className="flex justify-between">
        <Heading title="Login" />
        <CloseModal />
      </div>
      <div className="text-sm text-slate-500">
        <p className="font-bold">
          Test User:
        </p>
        <p>Email: joe@example.com</p>
        <p>Password: password</p>
      </div>
      <Input
        type="text"
        placeholder="Email"
        className="border"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <Input
        type="password"
        placeholder="Password"
        className="border"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button onClick={() => login()}>Login</Button>
      <div className="flex items-center justify-center gap-2">
        <hr className="border w-full border-teal-500" />
        <p className="self-center text-center text-slate-500 min-w-max">
          or log in with{" "}
        </p>
        <hr className="border w-full border-teal-500" />
      </div>
      <Button
        className="gap-2"
        variant={"subtle"}
        onClick={() => signIn("google")}
      >
        <FcGoogle size={24} />
        Google
      </Button>
      <p className="text-slate-500">
        Don&apos;t have an account?
        <Link
          href="/register"
          className="hover:underline text-teal-600 font-bold pl-1"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
