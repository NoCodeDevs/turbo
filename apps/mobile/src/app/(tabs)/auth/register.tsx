import { Auth } from "~/components/auth/auth";
import { authConfig } from "~/config/auth";

const RegisterPage = () => {
  return (
    <Auth.Layout>
      <Auth.Header
        title="Create an account"
        description="Please fill in the form below to create your account"
      />
      <Auth.Providers providers={authConfig.providers.oAuth} />
      {authConfig.providers.oAuth.length > 0 && <Auth.Divider />}
      <Auth.Register />
    </Auth.Layout>
  );
};

export default RegisterPage;
