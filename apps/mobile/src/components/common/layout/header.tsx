import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  readonly title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top + 5,
      }}
      className="flex-row items-center justify-center gap-3 bg-primary px-8"
    >
      <Text className="h-12 text-2xl font-semibold text-primary-foreground">
        {title}
      </Text>
    </View>
  );
};
