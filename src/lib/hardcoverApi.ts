import { HARDCOVER_QUERY } from './hardcoverQueries';
import type { HardcoverRawUserBook } from '../types/hardcover';

const HARDCOVER_ENDPOINT = 'https://api.hardcover.app/v1/graphql';

async function fetchHardcover(query: string) {
  const response = await fetch(HARDCOVER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.HARDCOVER_API_KEY}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Hardcover API error: ${response.status}`);
  }

  const { data, errors } = await response.json();

  if (errors?.length) {
    throw new Error(`GraphQL error: ${errors[0].message}`);
  }

  return data;
}

export async function getReadingData() {
  const data = await fetchHardcover(HARDCOVER_QUERY);
  const me = data?.me?.[0];

  if (!me) throw new Error('No user data returned');

  return {
    currently_reading: me.currently_reading as HardcoverRawUserBook[],
    recently_read: me.recently_read as HardcoverRawUserBook[],
  };
}