"use client";

import React, { useState } from "react";
import {
  QrCode,
  Eye,
  EyeOff,
  ShieldCheck,
  Smartphone,
  HelpCircle,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Transaction token coming from wallet app
  // const token = searchParams.get("token");

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!userId || !password) {
      setError("Please enter your Customer ID / User ID and Password.");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        userId,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid Customer ID / User ID or Password.");
        setLoading(false);
        return;
      }

      // Login successful
      // Keep transaction token while going to processing page
      // if (token) {
      //   router.push(`/ processing ? token = ${ encodeURIComponent(token) } `);
      // } else {
      //   router.push("/processing");
      // }
      router.push("/processing");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-black w-full flex flex-col lg:flex-row bg-slate-50 font-sans">

      {/* Left Promo Section */}
      <div className="lg:w-1/2 bg-[#002868] text-white p-6 lg:p-12 flex flex-col justify-between relative overflow-hidden">

        <div className="z-10 max-w-lg mx-auto lg:mx-0">
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
            Introducing
            <span className="p-1 bg-blue-600 rounded text-xs">
              K
            </span>
            KAVACH
          </h1>

          <p className="text-base lg:text-xl font-light text-blue-100 mt-1">
            A new way to login and verify!
          </p>
        </div>

        {/* Visual Graphics */}
        <div className="my-8 lg:my-0 flex flex-col items-center justify-center relative z-10 space-y-6">

          <div className="relative w-full max-w-md bg-blue-900/40 p-6 rounded-2xl border border-blue-400/20 backdrop-blur-sm">

            <div className="flex items-center gap-4 mb-4">
              <span className="bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>

              <span className="text-sm font-medium text-blue-100">
                Open QR on Desktop
              </span>
            </div>

            <div className="bg-white rounded-lg p-4 text-gray-800 shadow-xl">

              <div className="text-xs font-semibold text-center mb-2">
                Login via QR Code
              </div>

              <div className="bg-slate-100 p-4 rounded flex justify-center">
                <QrCode className="w-28 h-28 text-blue-900" />
              </div>

              <p className="text-[10px] text-center text-blue-600 mt-2">
                Trouble scanning the QR Code?
              </p>
            </div>
          </div>

          <div className="relative w-full max-w-md bg-blue-900/40 p-6 rounded-2xl border border-blue-400/20 backdrop-blur-sm">

            <div className="flex items-center gap-4 mb-4">
              <span className="bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>

              <span className="text-sm font-medium text-blue-100">
                Scan through Mobile App
              </span>
            </div>

            <div className="bg-white rounded-xl p-3 text-gray-800 max-w-[200px] mx-auto shadow-xl border-2 border-slate-200">

              <div className="flex justify-between items-center text-[10px] text-gray-500 mb-2">
                <span className="font-bold text-blue-900">
                  BANK APP
                </span>

                <Smartphone className="w-3 h-3 text-blue-600" />
              </div>

              <div className="bg-blue-50 p-2 rounded text-center">

                <div className="text-[11px] font-bold">
                  Hello, User
                </div>

                <button
                  type="button"
                  className="w-full mt-2 bg-blue-700 text-white text-[10px] py-1 rounded font-medium"
                >
                  Login using Touch ID
                </button>

              </div>
            </div>
          </div>
        </div>

        <div className="z-10 text-center lg:text-left">
          <button
            type="button"
            className="w-full lg:w-auto px-8 py-2.5 border border-white/40 hover:bg-white/10 rounded-md font-medium text-sm transition-colors"
          >
            Know More
          </button>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="lg:w-1/2 bg-white p-6 lg:p-12 flex flex-col justify-between">

        <div className="max-w-md mx-auto w-full">

          {/* Header */}
          <div className="mb-6">

            <h2 className="text-xl font-bold text-gray-800">
              Welcome to NetBanking
            </h2>

            <div className="flex items-center gap-2 mt-2">

              <span className="text-xs text-gray-500 uppercase tracking-wider">
                MADE DIGITAL BY
              </span>

              <div className="flex items-center gap-1 font-extrabold text-blue-900 text-sm">
                <span className="bg-red-600 text-white px-1 text-xs">
                  BANK
                </span>
                BRAND
              </div>

            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6 text-sm font-medium">

            <button
              type="button"
              className="pb-2 border-b-2 border-blue-600 text-blue-600 px-1"
            >
              Personal Banking
            </button>

            <button
              type="button"
              className="pb-2 text-gray-500 hover:text-gray-700 px-4"
            >
              Credit Cards/Loans Only
            </button>

          </div>

          {/* Passwordless Banner */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-lg p-3 mb-4 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <Smartphone className="w-5 h-5 text-blue-600 shrink-0" />

              <div>

                <div className="flex items-center gap-2">

                  <span className="text-xs font-semibold text-gray-800">
                    Login without Password
                  </span>

                  <span className="bg-green-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">
                    NEW
                  </span>

                </div>

                <p className="text-[11px] text-gray-500">
                  Scan using your Bank App secured with Kavach
                </p>

              </div>
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs py-2 rounded font-medium transition-colors mb-6"
          >
            Click here to Scan QR Code. It's secure & faster!
          </button>

          <div className="relative flex py-2 items-center mb-6">

            <div className="flex-grow border-t border-gray-200" />

            <span className="flex-shrink mx-4 text-xs text-gray-400">
              Or
            </span>

            <div className="flex-grow border-t border-gray-200" />

          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 border border-red-200 bg-red-50 px-3 py-2 rounded text-xs text-red-600">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            {/* User ID */}
            <div>

              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Customer ID/User ID
              </label>

              <input
                type="text"
                placeholder="Enter Customer ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm disabled:bg-gray-100"
              />

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[11px] text-blue-600 font-medium hover:underline mt-1 inline-block"
              >
                Get Customer ID
              </a>

            </div>

            {/* Password */}
            <div>

              <div className="flex items-center justify-between mb-1">

                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                  Password
                  <HelpCircle className="w-3 h-3 text-gray-400" />
                </label>

              </div>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm pr-10 disabled:bg-gray-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>

              </div>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[11px] text-blue-600 font-medium hover:underline mt-1 inline-block"
              >
                Set/Reset Password
              </a>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold text-sm py-2.5 rounded transition-colors shadow-sm mt-2"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="text-xs text-center text-gray-600 mt-6">

            Not registered for NetBanking?{" "}

            <a
              href="/create-user"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register Now
            </a>

          </p>

          {/* Security */}
          <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-3">

            <ShieldCheck className="w-8 h-8 text-blue-600 shrink-0" />

            <div>

              <div className="text-xs font-semibold text-gray-700">
                Your security is our priority
              </div>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[11px] text-blue-600 hover:underline"
              >
                Know More
              </a>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-[10px] text-gray-400 space-y-1">
          <p>
            © Copyright Bank Ltd. | Terms and Conditions |
            Privacy Policy | Compatible Browsers
          </p>
        </div>

      </div>
    </div>
  );
}
