import { eq } from 'drizzle-orm';

import { HTTPError } from '$lib/server/errors';
import { db } from '$lib/server/db';
import { cardTypes } from '$lib/server/db/schema';
import { type User } from '$lib/server/db/types';

export type UpdateData = {
  name: string;
  format: string;
  backgroundColor: string;
  textColor: string;
};

export const find = async (id: string, user?: User | null) => {
  if (!user) {
    throw new HTTPError(403, 'Forbidden');
  }

  const cardType = await db
    .select()
    .from(cardTypes)
    .where(eq(cardTypes.id, id));

  if (cardType.length > 0) {
    return cardType[0];
  }

  throw new HTTPError(404, 'Not found');
};

export const update = async (id: string, data: UpdateData, user?: User | null) => {
  if (!user?.admin) {
    throw new HTTPError(403, 'Forbidden');
  }

  await db
    .update(cardTypes)
    .set(data)
    .where(eq(cardTypes.id, id));
};

export const destroy = async (id: string, user?: User | null) => {
  if (!user?.admin) {
    throw new HTTPError(403, 'Forbidden');
  }

  await db
    .delete(cardTypes)
    .where(eq(cardTypes.id, id));
};
