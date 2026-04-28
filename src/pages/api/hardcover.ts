import type { APIRoute } from 'astro';
import { getReadingData } from '../../lib/hardcoverApi';
import type { CurrentlyReadingBook, RecentlyReadBook, HardcoverRawUserBook } from '../../types/hardcover';

export const GET: APIRoute = async () => {
  try {
    const { currently_reading, recently_read } = await getReadingData();

    const currentBooks: CurrentlyReadingBook[] = currently_reading.map((ub: HardcoverRawUserBook) => ({
        title: ub.book.title,
        rating: ub.rating ?? null,
        author: ub.book.contributions[0].author?.name ?? 'Unknown',
        cover: ub.book.image?.url ?? null,
        pages: ub.book.pages,
        progress: ub.user_book_reads?.[0]?.progress_pages ?? null
    }))

    const recentBooks: RecentlyReadBook[] = recently_read.map((ub: HardcoverRawUserBook) => ({
        title: ub.book.title,
        rating: ub.rating ?? null,
        author: ub.book.contributions[0].author?.name ?? 'Unknown',
        cover: ub.book.image?.url ?? null,
        pages: ub.book.pages,
    }))

    return new Response(JSON.stringify({ currently_reading: currentBooks, recently_read: recentBooks }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Hardcover API error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
