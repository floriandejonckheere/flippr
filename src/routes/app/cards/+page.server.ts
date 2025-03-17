import { eq, asc } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { type User, cards, cardTypes } from '$lib/server/db/schema';

export const load = async (event: { locals: { user: User } }) => {
  const cardAndCardTypes = await db
    .select({
      card: cards,
      cardType: cardTypes
    })
    .from(cards)
    .innerJoin(cardTypes, eq(cards.cardTypeId, cardTypes.id))
    .where(eq(cards.userId, event.locals.user.id))
    .orderBy(asc(cardTypes.name));

  return {
    cardAndCardTypes
  };
};
