import AuthForm from "../components/AuthForm";
import AuthGuard from "../components/AuthGuard";

export default function Signup() {
  return (
    <AuthGuard requiredAuth={false}>
      <AuthForm type="signup" />
    </AuthGuard>
  );
}
