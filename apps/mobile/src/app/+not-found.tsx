import { Link } from "expo-router";
import { View } from "react-native";

import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";

export default function NotFound() {
  return (
    <View className="flex flex-1 items-center justify-center bg-background px-6">
      <View className="items-center gap-6 text-center">
        <Text className="mt-4 text-4xl font-bold">Not found!</Text>
        <Text className="text-pretty text-center text-lg">
          Edit{" "}
          <Text className="rounded-sm bg-muted px-1.5 font-mono text-sm text-muted-foreground">
            src/app/+not-found.tsx
          </Text>{" "}
          and save to reload.
        </Text>
        <Link
          href={pathsConfig.index}
          replace
          className="mt-6 inline-block text-primary underline hover:no-underline"
        >
          Go back home
        </Link>
      </View>
    </View>
  );
}
