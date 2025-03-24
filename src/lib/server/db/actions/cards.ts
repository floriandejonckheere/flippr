import {asc, eq} from 'drizzle-orm';

import { HTTPError } from '$lib/server/errors';
import { db } from '$lib/server/db';
import {cards, cardTypes, type User} from '$lib/server/db/schema';

export const all = async (user?: User) => {
  if (!user) {
    throw new HTTPError(403, 'Forbidden');
  }

  return db
    .select({
      card: cards,
      cardType: cardTypes
    })
    .from(cards)
    .innerJoin(cardTypes, eq(cards.cardTypeId, cardTypes.id))
    .where(eq(cards.userId, user.id))
    .orderBy(asc(cardTypes.name));
};

export const find = async (id: string, user?: User) => {
  if (!user) {
    throw new HTTPError(403, 'Forbidden');
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
    return card[0];
  }

  throw new HTTPError(404, 'Not found');
};

export const destroy = async (id: string, user?: User) => {
  if (!user?.admin) {
    throw new HTTPError(403, 'Forbidden');
  }

  await db
    .delete(cards)
    .where(eq(cards.userId, user.id))
    .where(eq(cards.id, id));
};
