"use client";
import LoginForm from "@/components/auth/LoginForm";
import { loginUser, signupUser } from "@/services/auth.service";

const LoginPage = () => {
  const handleAuth = async (form: any, isSignup: boolean) => {
    try {
      if (isSignup) {
        console.log("Calling SIGNUP API", form);
         await signupUser(form)
      } else {
        console.log("Calling LOGIN API", form);
        await loginUser(form)
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Sign up or Login
        </h1>

        <LoginForm onSubmit={handleAuth} />
      </div>
    </div>
  );
};

export default LoginPage;