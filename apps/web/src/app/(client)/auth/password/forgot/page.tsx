import { Auth } from "~/components/auth/auth";
import { getMetadata } from "~/lib/metadata";

export const metadata = getMetadata({
  title: "Forgot Password",
});

const ForgotPassword = () => {
  return (
    <>
      <Auth.Layout>
        <Auth.Header
          title="Forgot your password?"
          description="Please enter your email address and we'll send you a link to reset your password"
        />
        <Auth.ForgotPassword />
      </Auth.Layout>
    </>
  );
};

export default ForgotPassword;
