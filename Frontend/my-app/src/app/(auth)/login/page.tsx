"use client";

import LoginForm from "@/components/auth/LoginForm";
import { loginUser, signupUser } from "@/services/auth.service";


const LoginPage = () => {


  const handleAuth = async (form: any, isSignup: boolean) => {
      if (isSignup) {
      await signupUser(form);
    } else {
      await loginUser(form);
    }
     
  };



  
    return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-indigo-900 relative overflow-hidden">

  
      <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

     
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md z-10">

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Welcome to Itinera ✨
        </h1>

        <p className="text-center text-gray-300 mb-6 text-sm">
          Plan your journey with AI
        </p>

        <LoginForm onSubmit={ handleAuth} />

      </div>
    </div>
  );
};

export default LoginPage;