import { useMutation } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useCallback, useEffect } from "react";
import { create } from "zustand";

import { pathsConfig } from "~/config/paths";
import { createSessionFromUrl } from "~/lib/actions/auth";
import { api } from "~/lib/api/trpc";

const useAuthDeepLinkStore = create<{
  usedLink: string | null;
  setUsedLink: (link: string | null) => void;
}>((set) => ({
  usedLink: null,
  setUsedLink: (usedLink) => set({ usedLink }),
}));

interface UseAuthDeepLinkProps {
  readonly onSuccess?: () => void;
  readonly path: string;
}

export const useAuthDeepLink = ({ onSuccess, path }: UseAuthDeepLinkProps) => {
  const url = Linking.useURL();
  const utils = api.useUtils();
  const { usedLink, setUsedLink } = useAuthDeepLinkStore();

  const { mutate } = useMutation({
    mutationFn: createSessionFromUrl,
    onError: (error) => {
      return router.replace({
        pathname: pathsConfig.tabs.auth.error,
        params: {
          error: error.message,
        },
      });
    },
    onSuccess: async (session) => {
      if (session) {
        await utils.user.get.invalidate();
        onSuccess?.();
      }
    },
  });

  const handleIncomingLink = useCallback(
    (link: string | null) => {
      if (!link || link === usedLink || link.startsWith("exp+")) {
        return;
      }

      const { path: resolvedPath } = Linking.parse(link);

      if (!resolvedPath || !path.includes(resolvedPath)) {
        return;
      }

      setUsedLink(link);
      mutate(link);
    },
    [mutate, path, setUsedLink, usedLink],
  );

  useEffect(() => {
    void handleIncomingLink(url);
  }, [url, handleIncomingLink]);
};
