import { View } from "react-native";

import { Text } from "@turbostarter/ui-mobile/text";

export const AuthDivider = () => (
  <View className="relative w-full">
    <View className="absolute left-0 top-1/2 flex h-2 w-full items-center">
      <View className="w-full border-t border-input" />
    </View>
    <View className="relative justify-center self-center bg-background">
      <Text className="px-4 text-sm text-muted-foreground">
        or continue with
      </Text>
    </View>
  </View>
);
