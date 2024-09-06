import crypto from "node:crypto";

export const validateSignature = (
  sig: string,
  secret: string,
  body: string,
) => {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8");
  const signature = Buffer.from(sig || "", "utf8");

  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new Error("Invalid signature.");
  }
};
