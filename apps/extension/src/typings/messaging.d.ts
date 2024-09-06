/* eslint-disable @typescript-eslint/no-empty-object-type */
// Required only for typechecking on CI as Plasmo will dynamically generate types on build
import "@plasmohq/messaging";

interface MmMetadata {
  session: {};
}

declare module "@plasmohq/messaging" {
  interface MessagesMetadata extends MmMetadata {}
}
