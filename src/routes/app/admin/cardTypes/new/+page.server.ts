import { error, redirect } from '@sveltejs/kit';

import { create } from '$lib/server/db/actions/cardTypes';

export const actions = {
  create: async ({ locals, request }) => {
    const data = await request.formData();

    const name = data.get('name') as string;
    const format = data.get('format') as string;
    const backgroundColor = data.get('backgroundColor') as string;
    const textColor = data.get('textColor') as string;

    const cardTypeData = {
      name,
      format,
      backgroundColor,
      textColor
    }

    const { err, data: id } = await create(cardTypeData, locals.user);

    if (err) {
      throw error(err.status, err.message);
    }

    throw redirect(302, `/app/admin/cardTypes/${id}`);
  },
}
