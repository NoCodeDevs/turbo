import { Suspense as ReactSuspense } from "react";

import { Icons } from "@turbostarter/ui-web/icons";

import type { ReactElement } from "react";

const Loading = () => {
  return (
    <div className="flex w-full min-w-64 items-center justify-center py-16">
      <Icons.Loader2 className="animate-spin" />
    </div>
  );
};

export const Suspense = ({
  children,
  fallback = <Loading />,
}: {
  children: ReactElement;
  fallback?: ReactElement;
}) => {
  return <ReactSuspense fallback={fallback}>{children}</ReactSuspense>;
};
