import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { type User } from '$lib/server/db/types';

import { passwordHash } from '$lib/server/db/utils';

export type UpdateData = {
  name: string;
  password?: string;
}

export const update = async (id: string, data: UpdateData, user?: User | null) => {
  if (!user?.admin && user?.id !== id) {
    return { err: { status: 403, message: 'Forbidden' } };
  }

  const userData: { name: string; passwordHash?: string } = {
    name: data.name
  }

  if (data.password && data.password !== '') {
    userData.passwordHash = await passwordHash(data.password);
  }

  await db
    .update(users)
    .set(userData)
    .where(eq(users.id, id));

  return {};
};