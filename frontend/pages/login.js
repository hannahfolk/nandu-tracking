import AuthForm from "@/components/AuthForm";
import AuthGuard from "@/components/AuthGuard";

export default function Login() {
  return (
    <AuthGuard requiredAuth={false}>
      <AuthForm type="login" />
    </AuthGuard>
  );
}
