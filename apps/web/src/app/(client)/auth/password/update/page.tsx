import { Auth } from "~/components/auth/auth";
import { getMetadata } from "~/lib/metadata";

export const metadata = getMetadata({
  title: "Update Password",
});

const UpdatePassword = () => {
  return (
    <>
      <Auth.Layout>
        <Auth.Header
          title="Update password"
          description="Enter your new password to update your account"
        />
        <Auth.UpdatePassword />
      </Auth.Layout>
    </>
  );
};

export default UpdatePassword;
