import { Children, isValidElement } from "react";

import type { NamedExoticComponent, SyntheticEvent } from "react";

export const retrieveChild = (
  children: React.ReactNode,
  childType?: string,
) => {
  return (
    childType &&
    Children.toArray(children).find(
      (child) =>
        isValidElement(child) &&
        ((typeof child.type === "object" &&
          (child.type as NamedExoticComponent).displayName === childType) ||
          (typeof child.type === "function" && child.type.name === childType)),
    )
  );
};

export function onPromise<T>(promise: (event: SyntheticEvent) => Promise<T>) {
  return (event: SyntheticEvent) => {
    promise(event).catch((error) => {
      console.log("Unexpected error", error);
    });
  };
}
