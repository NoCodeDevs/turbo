import { Link } from "expo-router";

import type { router, LinkProps } from "expo-router";

// @ts-expect-error - types are not available yet
const IS_DOM = typeof ReactNativeWebView !== "undefined";

export const DOMLink = ({
  navigate,
  ...props
}: {
  navigate: (typeof router)["navigate"];
} & LinkProps<string>) => {
  return (
    <Link
      {...props}
      onPress={
        IS_DOM
          ? (e) => {
              // This is a workaround since Expo Router doesn't have DOM Components support yet.
              e.preventDefault();
              navigate(props.href);
            }
          : undefined
      }
    />
  );
};
