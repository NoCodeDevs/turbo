import { sendToBackground } from "@plasmohq/messaging";
import { useQuery } from "@tanstack/react-query";

import type { Session } from "@turbostarter/auth";

import { SESSION_MESSAGE_TYPE } from "~background/messages/session";
import { ThemeControls } from "~components/common/theme";
import {
  UserNavigation,
  UserNavigationSkeleton,
} from "~components/user/user-navigation";
import { api } from "~lib/api/trpc";

export const Header = () => {
  return (
    <div className="flex items-center justify-between gap-2">
      <ThemeControls />
      <User />
    </div>
  );
};

const User = () => {
  const { data: session, isLoading: isSessionLoading } = useQuery({
    queryKey: ["session"],
    queryFn: () =>
      sendToBackground<
        {
          type: typeof SESSION_MESSAGE_TYPE.GET;
        },
        {
          session: Session | null;
        }
      >({
        name: "session",
        body: { type: SESSION_MESSAGE_TYPE.GET },
      }),
  });

  const user = session?.session?.user ?? null;
  const { data: customer, isLoading: isCustomerLoading } =
    api.billing.getCustomer.useQuery();

  if (isSessionLoading || isCustomerLoading) {
    return <UserNavigationSkeleton />;
  }

  return <UserNavigation user={user} customer={customer ?? null} />;
};
