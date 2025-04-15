import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, gql } from "@apollo/client";
import { FiUser, FiMail, FiLock, FiCheck, FiArrowLeft } from "react-icons/fi";

import AuthGuard from "../components/AuthGuard";

const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($username: String, $email: String, $password: String) {
    updateProfile(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

export default function Profile() {
  const router = useRouter();
  const { data, loading: queryLoading, error: queryError } = useQuery(GET_ME);
  const [updateProfile, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_PROFILE);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (data?.me) {
      setFormData({
        username: data.me.username,
        email: data.me.email,
        password: "",
        confirmPassword: "",
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      await updateProfile({
        variables: {
          username: formData.username !== data.me.username ? formData.username : undefined,
          email: formData.email !== data.me.email ? formData.email : undefined,
          password: formData.password || undefined,
        },
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  if (queryLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Profile Settings</h2>
              <p className="text-gray-500">Update your account information</p>
            </div>

            {mutationError && (
              <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {mutationError.message}
              </div>
            )}

            {success && (
              <div className="mb-6 p-3 bg-green-50 text-green-600 rounded-lg text-sm flex items-center">
                <FiCheck className="mr-2" />
                Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="New Password (leave blank to keep current)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={mutationLoading}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
              >
                <span>{mutationLoading ? "Updating..." : "Update Profile"}</span>
                {!mutationLoading && <FiCheck />}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <button
                onClick={() => router.push("/")}
                className="text-blue-600 hover:underline flex items-center justify-center space-x-1"
              >
                <FiArrowLeft size={14} />
                <span>Back to homepage</span>
              </button>
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-4 text-center">
            <p className="text-xs text-gray-500">Secure account management</p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
