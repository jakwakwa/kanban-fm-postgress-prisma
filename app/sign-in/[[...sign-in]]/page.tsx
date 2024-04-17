import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;
