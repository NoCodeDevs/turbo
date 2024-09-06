import { GENERIC_ERROR_MESSAGE, HTTP_STATUS_CODE } from "../constants";

const isHttpStatus = (status: number): status is HTTP_STATUS_CODE =>
  Object.values<number>(HTTP_STATUS_CODE).includes(status);

export class ApiError extends Error {
  status: HTTP_STATUS_CODE;
  constructor(status: number, message: string) {
    super(message);
    this.status = isHttpStatus(status)
      ? status
      : HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
  }
}

export const handleError = (e: unknown) => {
  if (e instanceof Error) {
    return { message: e.message, success: false } as const;
  }

  return { message: GENERIC_ERROR_MESSAGE, success: false } as const;
};
