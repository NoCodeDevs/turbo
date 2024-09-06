import { ActivityIndicator, Modal, View } from "react-native";

export const Spinner = () => {
  return (
    <Modal transparent>
      <View className="h-full w-full items-center justify-center bg-foreground/40">
        <ActivityIndicator size="large" className="text-background" />
      </View>
    </Modal>
  );
};
