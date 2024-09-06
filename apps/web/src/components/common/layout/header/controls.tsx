import { Suspense } from "react";

import {
  UserNavigation,
  UserNavigationSkeleton,
} from "~/components/auth/layout/user-navigation";
import { ThemeControls } from "~/components/common/theme";
import { api } from "~/trpc/server";

export const HeaderControls = () => {
  return (
    <div className="flex items-center gap-3">
      <ThemeControls />
      <UserControls />
    </div>
  );
};

const UserControlsContent = async () => {
  const user = await api.user.get();
  const customer = user ? await api.billing.getCustomer() : null;

  return <UserNavigation user={user} customer={customer} />;
};

const UserControls = () => {
  return (
    <Suspense fallback={<UserNavigationSkeleton />}>
      <UserControlsContent />
    </Suspense>
  );
};
