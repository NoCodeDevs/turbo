import { memo } from "react";

import { getAvatar, getName } from "@turbostarter/auth";
import { PricingPlanType } from "@turbostarter/billing";
import { cn } from "@turbostarter/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@turbostarter/ui-web/avatar";
import { buttonVariants } from "@turbostarter/ui-web/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@turbostarter/ui-web/dropdown-menu";
import { Icons } from "@turbostarter/ui-web/icons";
import { Skeleton } from "@turbostarter/ui-web/skeleton";

import { Logout } from "./logout";

import type { User } from "@turbostarter/auth";
import type { Customer } from "@turbostarter/billing";

import { env } from "~lib/env";

const PLAN_EMOJIS: Record<PricingPlanType, string> = {
  [PricingPlanType.FREE]: "🆓",
  [PricingPlanType.PREMIUM]: "🔐",
  [PricingPlanType.ENTERPRISE]: "💰",
};

const CustomerStatus = ({ customer }: { customer: Customer | null }) => {
  const plan = !customer?.plan ? PricingPlanType.FREE : customer.plan;

  return (
    <div className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed bg-muted/25 py-1.5">
      <span>{PLAN_EMOJIS[plan]}</span>
      <span>{plan}</span>
    </div>
  );
};

const AnonymousUser = () => {
  return (
    <a
      href={`${env.PLASMO_PUBLIC_SITE_URL}/auth/login`}
      className={cn(
        buttonVariants({
          variant: "outline",
          size: "icon",
        }),
        "rounded-full",
      )}
    >
      <Icons.LogIn className="size-4" />
      <div className="sr-only">Log in</div>
    </a>
  );
};

interface UserNavigationProps {
  readonly user: User | null;
  readonly customer: Customer | null;
}

export const UserNavigation = memo<UserNavigationProps>(
  ({ user, customer }) => {
    if (!user) {
      return <AnonymousUser />;
    }

    const name = getName(user);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative flex items-center gap-4 rounded-md">
            <Avatar className="size-10">
              <AvatarImage src={getAvatar(user)} alt={name} />
              <AvatarFallback>
                <Icons.UserRound className="w-5" />
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal container={document.getElementById("root")}>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-2">
                {name && (
                  <p className="font-sans text-sm font-medium leading-none">
                    {name}
                  </p>
                )}
                {user.email && (
                  <p className="font-sans text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                )}
                <CustomerStatus customer={customer} />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer">
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    );
  },
);

export const UserNavigationSkeleton = () => {
  return <Skeleton className="size-10 rounded-full" />;
};

UserNavigation.displayName = "UserNavigation";
