import type { VercelRequest, VercelResponse } from "../server/types.js";
import { submit, HttpError } from "../server/contact.js";
import { body, headers, secure, fail } from "../server/http.js";
export const config = { maxDuration: 30 };
export default async function handler(req: VercelRequest, res: VercelResponse) {
  secure(res);
  try {
    if (req.method !== "POST") throw new HttpError(405, "Use POST.");
    if (process.env.CONTACT_ENABLED !== "true")
      throw new HttpError(503, "Inquiries are not enabled yet.");
    // Provider SDKs are intentionally loaded only after the feature gate.
    // Disabled inquiry endpoints must fail closed even if a provider package or
    // configuration is unavailable in the serverless runtime.
    const { dependencies } = await import("../server/store.js");
    const result = await submit(
      { method: req.method, headers: headers(req), body: await body(req) },
      dependencies(),
    );
    return res.status(result.status).json(result.body);
  } catch (e) {
    return fail(res, e);
  }
}
