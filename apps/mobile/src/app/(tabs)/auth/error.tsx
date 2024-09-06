import { Link, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { GENERIC_ERROR_MESSAGE } from "@turbostarter/shared/constants";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";

const AuthError = () => {
  const { code } = useLocalSearchParams<{ code?: string }>();

  return (
    <View className="flex-1 flex-col items-center justify-center gap-4 bg-background px-8">
      <Icons.CircleX className="text-destructive" strokeWidth={1.2} size={80} />
      <Text className="text-center text-2xl font-semibold">
        {GENERIC_ERROR_MESSAGE}
      </Text>

      {code && (
        <Text className="rounded-md bg-muted px-2 py-0.5 font-mono">
          {code}
        </Text>
      )}

      <Link
        href={pathsConfig.tabs.auth.login}
        replace
        className="mt-3 text-muted-foreground underline"
      >
        Go to login
      </Link>
    </View>
  );
};

export default AuthError;
