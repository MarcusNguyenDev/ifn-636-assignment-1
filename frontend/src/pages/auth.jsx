import React from "react";
import { useState, useEffect } from "react";
import Logo from "../components/global/logo";
import LoginForm from "../components/auth/login-form";
import RegisterForm from "../components/auth/register-form";

function Auth(props) {
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  return (
    <>
      <div className="bg-[url(/src/assets/auth-bg.jpg)] h-screen flex items-center justify-center bg-cover bg-no-repeat">
        {isLoggingIn ? (
          <LoginForm setIsLoggingIn={setIsLoggingIn} />
        ) : (
          <RegisterForm setIsLoggingIn={setIsLoggingIn}></RegisterForm>
        )}
      </div>
    </>
  );
}

export default Auth;
