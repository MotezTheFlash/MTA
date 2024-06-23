import { Request } from "express";

import { UserDocument } from "../models/user";

declare interface PublicRequest extends Request {
  apiKey: string;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCode: string;
}

export interface ProtectedRequest extends Request {
  user: UserDocument;
  accessToken: string;
}

declare interface Tokens {
  accessToken: string;

  refreshToken: string;
}

declare interface ApiOptions {
  deleted?: boolean;

  isPaging?: boolean;
}
