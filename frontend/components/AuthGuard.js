import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import { ME } from "../graphql/authMutations";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const { loading, error } = useQuery(ME, {
    fetchPolicy: "network-only", // Always check auth status
  });

  useEffect(() => {
    if (!loading && error) {
      // Store attempted URL before redirect
      sessionStorage.setItem("redirectUrl", router.asPath);
      router.push("/login");
    }
  }, [loading, error, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  return children;
}
