import type { PlasmoMessaging } from "@plasmohq/messaging";
import type { Session } from "@turbostarter/auth";

import { auth } from "~lib/auth";
import { env } from "~lib/env";

const ENCODING_PREFIX = "base64-";

export const SESSION_MESSAGE_TYPE = {
  GET: "session:get",
  DELETE: "session:delete",
} as const;

type SessionMessageType =
  (typeof SESSION_MESSAGE_TYPE)[keyof typeof SESSION_MESSAGE_TYPE];

const getCookie = async (url: string, name: string) => {
  const cookie = await chrome.cookies.get({
    url,
    name,
  });

  if (cookie) {
    return cookie.value;
  }

  let temp = "";
  let i = 0;

  while (true) {
    const cookie = await chrome.cookies.get({
      url,
      name: `${name}.${i}`,
    });

    if (cookie) {
      temp += cookie.value;
    } else {
      return temp;
    }

    i++;
  }
};

const deleteCookie = async (url: string, name: string) => {
  try {
    let i = 0;

    while (true) {
      const deleted = await chrome.cookies.remove({
        url,
        name: `${name}.${i}`,
      });

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!deleted) {
        break;
      }

      i++;
    }

    return chrome.cookies.remove({
      url,
      name,
    });
  } catch (e) {
    console.error(e);
    return;
  }
};

const parseSession = (cookie: string) => {
  if (cookie.startsWith(ENCODING_PREFIX)) {
    return JSON.parse(
      Buffer.from(cookie.slice(ENCODING_PREFIX.length), "base64").toString(),
    ) as Session | null;
  }

  return JSON.parse(cookie) as Session | null;
};

const getSession = async () => {
  try {
    const cookie = await getCookie(
      env.PLASMO_PUBLIC_SITE_URL,
      env.PLASMO_PUBLIC_AUTH_COOKIE_NAME,
    );

    if (!cookie) {
      return null;
    }

    const parsedSession = parseSession(cookie);

    if (!parsedSession) {
      return null;
    }

    const { data } = await auth().setSession(parsedSession);
    return data.session ?? null;
  } catch {
    return null;
  }
};

const handler: PlasmoMessaging.MessageHandler<
  {
    type: SessionMessageType;
  },
  {
    session: Session | null;
  }
> = async (req, res) => {
  const type = req.body?.type;

  if (type === SESSION_MESSAGE_TYPE.DELETE) {
    await deleteCookie(
      env.PLASMO_PUBLIC_SITE_URL,
      env.PLASMO_PUBLIC_AUTH_COOKIE_NAME,
    );
    return res.send({
      session: null,
    });
  }

  if (type === SESSION_MESSAGE_TYPE.GET) {
    const session = await getSession();

    return res.send({
      session,
    });
  }

  return res.send({
    session: null,
  });
};

export default handler;
