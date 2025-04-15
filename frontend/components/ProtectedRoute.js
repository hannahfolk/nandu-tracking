import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/authMutations";
import { useRouter } from "next/router";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { loading, error } = useQuery(ME);

  useEffect(() => {
    if (!loading && error) {
      router.push("/login");
    }
  }, [loading, error, router]);

  if (loading) return <div>Loading...</div>;
  if (error) return null;

  return children;
}
