import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
