import * as React from "react";
import { Pressable, View, Linking } from "react-native";

import { Icons } from "../../lib/icons";

import { buttonVariants } from "./button";
import { Text } from "./text";

export const BuiltWith = () => {
  return (
    <Pressable
      onPress={() => Linking.openURL("https://www.turbostarter.dev")}
      className={buttonVariants({
        variant: "outline",
        className: "flex-row items-center justify-center font-sans",
      })}
    >
      <Text>Built with</Text>
      <View className="shrink-0 flex-row items-center gap-1.5">
        <Icons.Logo className="ml-1.5 text-primary" height={16} width={16} />
        <Icons.LogoText className="text-foreground" height={10} width={82} />
      </View>
    </Pressable>
  );
};
