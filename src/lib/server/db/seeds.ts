import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

import { hash } from '@node-rs/argon2';

import { drizzle } from 'drizzle-orm/postgres-js';
import * as dotenv from 'dotenv';

import { v4 as uuidv4 } from 'uuid';

import { users, cards, cardTypes } from './schema';
import type { User, Card, CardType } from './types';
import postgres from 'postgres';

import { convert } from './utils';

dotenv.config({ path: './.env' });

if (!('DATABASE_URL' in process.env)) throw new Error('DATABASE_URL not found in .env');

const passwordHash = async (password: string) => {
  return await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  });
};

const cardTypesData: { [key: string]: CardType } = {
  delhaize: {
    id: uuidv4(),
    name: 'Delhaize',
    format: 'UPC',
    backgroundColor: '#BC0000',
    textColor: '#FFFFFF',
    image: true,
    createdAt: new Date(Date.now())
  },
  colruyt: {
    id: uuidv4(),
    name: 'Colruyt',
    format: 'CODE128',
    backgroundColor: '#F7F7F7',
    textColor: '#191917',
    image: true,
    createdAt: new Date(Date.now())
  },
  carrefour: {
    id: uuidv4(),
    name: 'Carrefour',
    format: 'EAN13',
    backgroundColor: '#005BAB',
    textColor: '#FFFFFF',
    image: true,
    createdAt: new Date(Date.now())
  },
  aldi: {
    id: uuidv4(),
    name: 'Aldi',
    format: 'CODE39',
    backgroundColor: '#1D3587',
    textColor: '#FFFFFF',
    image: true,
    createdAt: new Date(Date.now())
  },
  lidl: {
    id: uuidv4(),
    name: 'Lidl',
    format: 'EAN8',
    backgroundColor: '#0050AA',
    textColor: '#FFFFFF',
    image: true,
    createdAt: new Date(Date.now())
  }
};

const usersData: { [key: string]: User } = {
  admin: {
    id: uuidv4(),
    email: 'admin@admin.org',
    name: 'Administrator',
    username: 'admin',
    passwordHash: await passwordHash('password'),
    admin: true,
    createdAt: new Date(Date.now())
  },
  user: {
    id: uuidv4(),
    email: 'user@user.org',
    name: 'User',
    username: 'user',
    passwordHash: await passwordHash('password'),
    admin: false,
    createdAt: new Date(Date.now())
  }
};

const cardData: { [key: string]: { [key: string]: Card } } = {
  admin: {
    delhaize: {
      id: uuidv4(),
      userId: usersData.admin.id,
      cardTypeId: cardTypesData.delhaize.id,
      value: '123456789999',
      createdAt: new Date(Date.now())
    },
    colruyt: {
      id: uuidv4(),
      userId: usersData.admin.id,
      cardTypeId: cardTypesData.colruyt.id,
      value: '12345678',
      createdAt: new Date(Date.now())
    },
    carrefour: {
      id: uuidv4(),
      userId: usersData.admin.id,
      cardTypeId: cardTypesData.carrefour.id,
      value: '5901234123457',
      createdAt: new Date(Date.now())
    },
    aldi: {
      id: uuidv4(),
      userId: usersData.admin.id,
      cardTypeId: cardTypesData.aldi.id,
      value: 'ABCDEFG',
      createdAt: new Date(Date.now())
    },
    lidl: {
      id: uuidv4(),
      userId: usersData.admin.id,
      cardTypeId: cardTypesData.lidl.id,
      value: '96385074',
      createdAt: new Date(Date.now())
    }
  },
  user: {
    delhaize: {
      id: uuidv4(),
      userId: usersData.user.id,
      cardTypeId: cardTypesData.delhaize.id,
      value: '123456789990',
      createdAt: new Date(Date.now())
    },
    aldi: {
      id: uuidv4(),
      userId: usersData.user.id,
      cardTypeId: cardTypesData.aldi.id,
      value: 'GFEDCBA',
      createdAt: new Date(Date.now())
    },
    lidl: {
      id: uuidv4(),
      userId: usersData.user.id,
      cardTypeId: cardTypesData.lidl.id,
      value: '96385074',
      createdAt: new Date(Date.now())
    }
  }
};

const main = async () => {
  const url = process.env.DATABASE_URL as string;
  const client = postgres(url);
  const db = drizzle(client);

  await db.transaction(async (tx) => {
    console.log('Seeding users...');
    await tx
      .insert(users)
      .values(Object.values(usersData));

    console.log('Seeding card types...');
    await tx
      .insert(cardTypes)
      .values(Object.values(cardTypesData));

    console.log('Uploading card type images...');
    const modulePath = dirname(fileURLToPath(import.meta.url));
    for (const cardType of Object.values(cardTypesData)) {
      const buffer = await convert(readFileSync(resolve(modulePath, `./seeds/${cardType.name.toLowerCase()}.svg`)));

      const path = resolve(modulePath, '../../../../static/uploads', `${cardType.id}.webp`);

      writeFileSync(path, buffer);
    }

    console.log('Seeding cards...');
    for (const key of Object.keys(cardData)) {
      await tx
        .insert(cards)
        .values(Object.values(cardData[key]));
    }
  });

  console.log('Done!');
};

await main();
