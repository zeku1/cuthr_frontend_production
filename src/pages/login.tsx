import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { AuthService } from "../services/api/auth";

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");
    }
    setEmail(value);
  };

  const validatePassword = (value: string) => {
    if (!value.trim()) {
      setPasswordError("Please input password.");
    } else {
      setPasswordError("");
    }
    setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await AuthService.login(email, password);
      router.push("/dashboard"); // Redirect to the dashboard or desired page
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-green">
      <div className="text-center w-full max-w-xs">
        <div className="mb-[100px] flex justify-center ml-5">
          <Image
            src="/assets/img/CUTHR-DGREEN.png"
            alt="CUTHR+ Logo"
            width={150}
            height={50}
          />
        </div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => validateEmail(e.target.value)}
          className="w-full px-4 py-2 mb-2 text-center bg-[#1D8E42] text-[#E2EAE2] placeholder-[#E2EAE2] rounded-full focus:outline-none"
        />
        {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => validatePassword(e.target.value)}
          className="w-full px-4 py-2 mb-2 text-center bg-[#1D8E42] text-[#E2EAE2] placeholder-[#E2EAE2] rounded-full focus:outline-none"
        />
        {passwordError && <p className="text-red-500 text-sm mb-2">{passwordError}</p>}

        {/* Forgot Password */}
        <p className="text-sm text-[#BFC89B] mb-4 cursor-pointer">Forgot password?</p>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Sign-In Button */}
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            disabled={!!emailError || !!passwordError || !email || !password}
            className={`w-full py-2 text-[#1D8E42] text-4xl font-black bg-transparent ${
              (!!emailError || !!passwordError || !email || !password)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            SIGN IN
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-sm text-[#BFC89B] mt-4 cursor-pointer">
          Don&apos;t have an account yet? <br /> Sign up here!
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
