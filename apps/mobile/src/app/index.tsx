import { Link } from "expo-router";
import { View, ScrollView, Pressable } from "react-native";

import { BuiltWith } from "@turbostarter/ui-mobile/built-with";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@turbostarter/ui-mobile/card";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { HOME_LINKS } from "~/lib/constants/home";

export default function App() {
  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="items-center bg-background p-6"
    >
      <Text className="w-full text-pretty rounded-md border border-input bg-muted/25 px-6 py-3 text-center">
        Edit{" "}
        <Text className="rounded-md bg-muted px-2 py-0.5 font-mono">
          app/index.tsx
        </Text>{" "}
        and save to reload.
      </Text>

      <View className="animate-pulse py-20">
        <Icons.Logo className="text-primary" height={128} width={128} />
      </View>

      <View className="gap-3">
        {HOME_LINKS.map((link) => (
          <Link href={link.href} key={link.title} asChild>
            <Pressable>
              <Card>
                <CardHeader className="gap-1">
                  <View className="flex-row gap-1">
                    <CardTitle>{link.title}</CardTitle>
                    <Icons.ArrowRight className="text-foreground" size={20} />
                  </View>

                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
              </Card>
            </Pressable>
          </Link>
        ))}
      </View>

      <View className="py-10">
        <BuiltWith />
      </View>
    </ScrollView>
  );
}
