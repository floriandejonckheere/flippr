import { cards, cardTypes, sessions } from '$lib/server/db/schema';

export type User = {
  id: string;
  email: string;
  name: string;
  username: string;
  admin: boolean;
  passwordHash?: string;
  createdAt?: Date;
};

export type Session = typeof sessions.$inferSelect;
export type CardType = typeof cardTypes.$inferSelect;
export type Card = typeof cards.$inferSelect;