import { sendToBackground } from "@plasmohq/messaging";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forwardRef } from "react";

import { SESSION_MESSAGE_TYPE } from "~background/messages/session";

export const Logout = forwardRef<HTMLButtonElement>((_, ref) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () =>
      sendToBackground({
        name: "session",
        body: { type: SESSION_MESSAGE_TYPE.DELETE },
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });

  return (
    <button
      className="w-full text-left font-sans"
      onClick={() => mutate()}
      ref={ref}
    >
      Log out
    </button>
  );
});
