import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { writeFileSync } from 'fs';

import { asc, eq } from 'drizzle-orm';

import { convert } from '$lib/server/db/utils';

import { db } from '$lib/server/db';
import { cardTypes } from '$lib/server/db/schema';
import { type User } from '$lib/server/db/types';

export type CreateData = {
  name: string;
  format: string;
  backgroundColor: string;
  textColor: string;
  image: File;
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

  const { image, ...cardTypeData } = data;

  // Insert card type
  const [{ id }] = await db
    .insert(cardTypes)
    .values({ ...cardTypeData, image: `${data.name.toLowerCase()}.webp` })
    .returning({ id: cardTypes.id });

  // Convert uploaded file
  const modulePath = dirname(fileURLToPath(import.meta.url));
  const path = resolve(modulePath, '../../../../../static/uploads', `${data.name.toLowerCase()}.webp`);
  const buffer = await convert(Buffer.from(await image.arrayBuffer()));

  writeFileSync(path, buffer);

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
