import SigninForm from "@/components/custom/SigninForm";

const LoginPage = () => {

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-bold  text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Welcome to Bin Hlaig Group
        </h1>
        <h2 className="text-bold  text-blue-700 mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Login
        </h2>
      </div>
      <SigninForm/>

      
    </div>
  );
};

export default LoginPage;
