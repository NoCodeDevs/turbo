import * as Linking from "expo-linking";
import { Pressable, View } from "react-native";

import { Text } from "@turbostarter/ui-mobile/text";

export const CommingSoon = ({ feature }: { feature: string }) => {
  return (
    <View className="flex flex-1 items-center justify-center bg-background px-6">
      <View className="items-center gap-6 text-center">
        <Text className="mt-4 text-4xl font-bold">We're working on it!</Text>
        <Text className="text-pretty text-center text-lg text-muted-foreground">
          {feature} is currently not available. We're working on it and it will
          be available soon.
        </Text>
        <Pressable
          onPress={() =>
            Linking.openURL("https://github.com/orgs/turbostarter/projects/1")
          }
          className="mt-6"
        >
          <Text className="text-primary underline">See roadmap</Text>
        </Pressable>
      </View>
    </View>
  );
};
