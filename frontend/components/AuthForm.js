import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP, LOGIN } from "../graphql/authMutations";

export default function AuthForm({ type }) {
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
      window.location.href = "/";
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
    <div className="max-w-xs mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">{type === "signup" ? "Sign Up" : "Log In"}</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "signup" && (
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-2 border rounded"
          required
          minLength="6"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "..." : type === "signup" ? "Sign Up" : "Log In"}
        </button>
      </form>
    </div>
  );
}
