import { eq, asc } from 'drizzle-orm';

import type { PageServerLoad } from './$types';

import { page } from '$app/state';

import { db } from '$lib/server/db';
import { card, cardType } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
  const cardAndCardTypes = await db
    .select({
      card: card,
      cardType: cardType
    })
    .from(card)
    .innerJoin(cardType, eq(card.cardTypeId, cardType.id))
    .where(eq(card.userId, page.data.user.id))
    .orderBy(asc(card.createdAt));

  return {
    cardAndCardTypes
  };
};
