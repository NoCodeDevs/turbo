import { ScrollView, View } from "react-native";

import { AccountInfo } from "~/components/settings/account/account-info";
import { AccountSettings } from "~/components/settings/account/settings/account-settings";
import { ThemeSettings } from "~/components/settings/theme";

export default function Profile() {
  return (
    <ScrollView
      className="flex-1 bg-background px-6 py-10"
      contentContainerClassName="gap-10"
    >
      <AccountInfo />
      <View className="gap-4">
        <ThemeSettings />
        <AccountSettings />
      </View>
    </ScrollView>
  );
}
