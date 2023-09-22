import RegisterForm from "@/components/RegisterForm";

// Parallel route for sign-in modal. See
// https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#dismissing-a-modal
// for more info.
const page = () => {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-white w-full h-fit py-6 rounded-2xl">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default page;
