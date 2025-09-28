import type { Tables } from "./db.gen";

export type User = Tables<"user">;
export type Session = Tables<"session">;
export type VerificationToken = Tables<"verification_token">;
