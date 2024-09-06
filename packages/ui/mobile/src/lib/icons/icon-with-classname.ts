import { cssInterop } from "nativewind";

import type { LucideIcon } from "lucide-react-native";

export function iconWithClassName(
  icon: React.FC<React.SVGProps<SVGElement>> | LucideIcon,
) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}
