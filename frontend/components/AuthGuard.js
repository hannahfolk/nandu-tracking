import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/authMutations";
import { useRouter } from "next/router";

export default function AuthGuard({ children, requiredAuth = true }) {
  const router = useRouter();
  const { data, loading, error } = useQuery(ME);
  console.log(data, error);

  useEffect(() => {
    if (!loading) {
      if (requiredAuth && error) {
        router.push("/login");
      } else if (!requiredAuth && data?.me) {
        router.push("/");
      }
    }
  }, [loading, error, data, requiredAuth, router]);

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (requiredAuth && error) return null;

  return children;
}
