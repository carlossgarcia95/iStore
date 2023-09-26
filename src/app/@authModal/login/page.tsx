import LoginForm from "@/src/components/LoginForm";

// Parallel route for sign-in modal. See
// https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#dismissing-a-modal
// for more info.
const page = () => {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-30">
      <div className="container flex items-center h-full max-w-lg mx-auto animate-slide-down">
        <div className="relative bg-white w-full h-fit py-6 rounded-2xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default page;
