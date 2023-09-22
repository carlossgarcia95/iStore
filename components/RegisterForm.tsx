import Link from "next/link";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import CloseModal from "./CloseModal";
import { FcGoogle } from "react-icons/fc";
import Heading from "./ui/Heading";

const RegisterForm = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-6 px-8 py-2">
      <div className="flex justify-between">
        <Heading title="Register" />
        <CloseModal />
      </div>
      <Input type="text" placeholder="Username" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button>Register</Button>
      <p className="self-center text-slate-500">or sign up with </p>
      <Button className="gap-2" variant={"subtle"}>
        <FcGoogle size={24} />
        Google
      </Button>
      <p className="text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="hover:underline text-teal-600">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
