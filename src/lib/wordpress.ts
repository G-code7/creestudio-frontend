import { GraphQLClient } from 'graphql-request';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!API_URL) {
  throw new Error('La variable NEXT_PUBLIC_WORDPRESS_API_URL no está configurada.');
}

export const wpClient = new GraphQLClient(API_URL);