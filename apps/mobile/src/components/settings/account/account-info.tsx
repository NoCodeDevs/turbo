import { Link } from "expo-router";
import { View } from "react-native";

import { getAvatar, getName } from "@turbostarter/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@turbostarter/ui-mobile/avatar";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Skeleton } from "@turbostarter/ui-mobile/skeleton";
import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";
import { api } from "~/lib/api/trpc";

const AccountInfoSkeleton = () => {
  return (
    <View className="items-center">
      <Skeleton className="mb-4 size-28 rounded-full" />

      <Skeleton className="mb-3 h-5 w-40" />
      <Skeleton className="h-5 w-64" />
    </View>
  );
};

export const AccountInfo = () => {
  const { data, isLoading } = api.user.get.useQuery();

  if (isLoading) {
    return <AccountInfoSkeleton />;
  }

  return (
    <View className="items-center">
      <Avatar alt="" className="mb-4 size-28">
        {data && <AvatarImage source={{ uri: getAvatar(data) }} />}
        <AvatarFallback>
          <Icons.UserRound
            className="text-foreground"
            width={50}
            height={50}
            strokeWidth={1.5}
          />
        </AvatarFallback>
      </Avatar>

      {data ? (
        <Text className="text-xl font-semibold">{getName(data)}</Text>
      ) : (
        <Link href={pathsConfig.tabs.auth.login}>
          <Text className="text-xl font-semibold">Login</Text>{" "}
          <Icons.ArrowRight size={16} className="text-foreground" />
        </Link>
      )}
      <Text className="text-muted-foreground">
        {data ? data.email : "You're not logged in."}
      </Text>
    </View>
  );
};
