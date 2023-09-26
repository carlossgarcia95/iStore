"use client";

import Link from "next/link";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import CloseModal from "./CloseModal";
import { FcGoogle } from "react-icons/fc";
import Heading from "./ui/Heading";
import { useCallback, useState } from "react";
import axios from "axios";
import { useToast } from "../hooks/useToast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      toast({
        title: "Account created",
      });

      await signIn("credentials", {
        email,
        password,
      });
    } catch (error) {
      console.error(error);
    }
  }, [email, name, password]);

  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-6 px-8 py-2">
      <div className="flex justify-between">
        <Heading title="Register" />
        <CloseModal />
      </div>
      <Input
        type="text"
        placeholder="Username"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <Input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button onClick={() => register()}>Register</Button>
      <div className="flex items-center justify-center gap-2">
        <hr className="border w-full border-teal-500" />
        <p className="self-center text-center text-slate-500 w-96">
          or sign up with{" "}
        </p>
        <hr className="border w-full border-teal-500" />
      </div>
      <Button className="gap-2" variant={"subtle"}>
        <FcGoogle size={24} />
        Google
      </Button>
      <p className="text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="hover:underline text-teal-600 font-bold">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
