import {asc, eq} from 'drizzle-orm';

import { db } from '$lib/server/db';
import { cards, cardTypes } from '$lib/server/db/schema';
import { type User } from '$lib/server/db/types';

export type CreateData = {
  name: string;
  format: string;
  backgroundColor: string;
  textColor: string;
}

export type UpdateData = {
  name: string;
  format: string;
  backgroundColor: string;
  textColor: string;
};

export const all = async (user?: User | null) => {
  if (!user) {
    return { err: { status: 403, message: 'Forbidden' } };
  }

  const cardTypesData = await db
    .select()
    .from(cardTypes)
    .orderBy(asc(cardTypes.name));

  return { data: cardTypesData };
};

export const create = async (data: CreateData, user?: User | null) => {
  if (!user?.admin) {
    return { err: { status: 403, message: 'Forbidden' } };
  }

  const [{ id }] = await db
    .insert(cardTypes)
    .values(data)
    .returning({ id: cardTypes.id });

  return { data: id };
};

export const find = async (id: string, user?: User | null) => {
  if (!user) {
    return { err: { status: 403, message: 'Forbidden' } };
  }

  const cardType = await db
    .select()
    .from(cardTypes)
    .where(eq(cardTypes.id, id));

  if (cardType.length > 0) {
    return { data: cardType[0] };
  }

  return { err: { status: 404, message: 'Not found' } };
};

export const update = async (id: string, data: UpdateData, user?: User | null) => {
  if (!user?.admin) {
    return { err: { status: 403, message: 'Forbidden' } };
  }

  await db
    .update(cardTypes)
    .set(data)
    .where(eq(cardTypes.id, id));

  return {};
};

export const destroy = async (id: string, user?: User | null) => {
  if (!user?.admin) {
    return { err: { status: 403, message: 'Forbidden' } };
  }

  await db
    .delete(cardTypes)
    .where(eq(cardTypes.id, id));

  return {};
};
