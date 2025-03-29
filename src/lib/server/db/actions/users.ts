import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { type User } from '$lib/server/db/types';

import { passwordHash } from '$lib/server/db/utils';

export type UpdateData = {
  name: string;
  password: string;
}

export const update = async (id: string, data: UpdateData, user?: User | null) => {
  if (!user?.admin || user?.id !== id) {
    return { err: { status: 403, message: 'Forbidden' } };
  }

  await db
    .update(users)
    .set({
      name: data.name,
      passwordHash: await passwordHash(data.password),
    })
    .where(eq(users.id, id));

  return {};
};