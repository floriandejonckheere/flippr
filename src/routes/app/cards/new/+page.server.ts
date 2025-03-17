import {type Actions, fail, redirect} from '@sveltejs/kit';

import { eq, asc } from 'drizzle-orm';

import type { PageServerLoad } from './$types';

import { db } from '$lib/server/db';
import { cardTypes, cards, type CardType } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
  const cardTypesData = await db.select().from(cardTypes).orderBy(asc(cardTypes.name));

  return {
    cardTypes: cardTypesData
  };
};

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const cardTypeId = formData.get('cardTypeId');
    const value = formData.get('value');

    if (!cardTypeId || !value) {
      return fail(400, {
        message: 'Card type and value are required'
      });
    }

    const cardTypesData: CardType[] = await db.select().from(cardTypes).where(eq(cardTypes.id, cardTypeId));

    if (cardTypes.length === 0) {
      return fail(404, {
        message: 'Card type not found'
      });
    }

    const cardType = cardTypes[0];

    const cardData = {
      userId: event.locals.user.id,
      cardTypeId,
      value
    };

    await db.insert(cards).values(cardData);

    return redirect(302, '/app/cards');
  }
};
