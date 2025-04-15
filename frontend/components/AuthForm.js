// frontend/components/AuthForm.js
import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";

import { SIGNUP, LOGIN } from "@/graphql/authMutations";

export default function AuthForm({ type }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const mutation = type === "signup" ? SIGNUP : LOGIN;
  const [authAction, { loading }] = useMutation(mutation, {
    onCompleted: (data) => {
      const { token, user } = data[type];
      localStorage.setItem("token", token);
      router.push("/");
    },
    onError: (err) => setError(err.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const variables =
      type === "signup"
        ? formData
        : {
            email: formData.email,
            password: formData.password,
          };
    authAction({ variables });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {type === "signup" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-500">
              {type === "signup"
                ? "Get started with your free account"
                : "Sign in to continue to your dashboard"}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {type === "signup" && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              <span>{loading ? "Processing..." : type === "signup" ? "Sign Up" : "Sign In"}</span>
              <FiArrowRight />
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {type === "signup" ? (
              <p>
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Sign in
                </a>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </p>
            )}
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
