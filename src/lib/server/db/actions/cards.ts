import {asc, eq} from 'drizzle-orm';

import { db } from '$lib/server/db';
import { cards, cardTypes } from '$lib/server/db/schema';
import { type User } from '$lib/server/db/types';

export type CreateData = {
  userId: string,
  cardTypeId: string,
  value: string,
}

export const all = async (user?: User | null) => {
  if (!user) {
    return { err: { status: 403, message: 'Forbidden' } };
  }

  const cardAndCardTypes = await db
    .select({
      card: cards,
      cardType: cardTypes
    })
    .from(cards)
    .innerJoin(cardTypes, eq(cards.cardTypeId, cardTypes.id))
    .where(eq(cards.userId, user.id))
    .orderBy(asc(cardTypes.name));

  return { data: cardAndCardTypes };
};

export const create = async (data: CreateData, user?: User | null) => {
  if (!user) {
    return { err: { status: 403, message: 'Forbidden' } };
  }

  const [{ id }] = await db
    .insert(cards)
    .values(data)
    .returning({ id: cards.id });

  return { data: id };
}

export const find = async (id: string, user?: User | null) => {
  if (!user) {
    return { err: { status: 403, message: 'Forbidden' } };
  }

  const card = await db
    .select({
      card: cards,
      cardType: cardTypes
    })
    .from(cards)
    .innerJoin(cardTypes, eq(cards.cardTypeId, cardTypes.id))
    .where(eq(cards.userId, user.id))
    .where(eq(cards.id, id));

  if (card.length > 0) {
    return { data: card[0] };
  }

  return { err: { status: 404, message: 'Not found' } };
};

export const destroy = async (id: string, user?: User | null) => {
  if (!user?.admin) {
    return { err: { status: 403, message: 'Forbidden' } };
  }

  await db
    .delete(cards)
    .where(eq(cards.userId, user.id))
    .where(eq(cards.id, id));

  return {};
};
