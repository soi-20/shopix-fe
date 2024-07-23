import { redirect } from "next/navigation";
import { SignInPage } from "./signin";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

const SignIn: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (isAuthenticated) {
    redirect("/");
  } else {
    return <SignInPage />;
  }
};

export default SignIn;
