import { asc, eq } from "drizzle-orm";

import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { db } from '$lib/server/db';
import { type User, cardTypes, type CardType } from '$lib/server/db/schema';

export const load: PageServerLoad = async (event: { locals: { user: User } }) => {
  if (!event.locals.user) {
    return redirect(302, '/auth/signin');
  }

  if (!event.locals.user.admin) {
    return redirect(302, '/app/cards');
  }

  const cardTypesData: CardType[] = await db
    .select()
    .from(cardTypes)
    .orderBy(asc(cardTypes.name));

  return {
    cardTypes: cardTypesData,
  };

};
