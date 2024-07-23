import * as Sentry from "@sentry/node";

export const logInfo = (message: string, focusObject?: any) =>
  Sentry.captureMessage(`${message} - ${JSON.stringify(focusObject ?? "")}`);

export const logException = (e: any) => Sentry.captureException(e);
