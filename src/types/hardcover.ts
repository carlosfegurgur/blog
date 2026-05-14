// Raw Hardcover API response shapes
export interface HardcoverContribution {
    author: {
      name: string;
    } | null;
  }
  
  export interface HardcoverImage {
    url: string;
  }
  
  export interface HardcoverRawBook {
    title: string;
    pages: number | null;
    image: HardcoverImage | null;
    contributions: HardcoverContribution[];
    slug: string | null;
  }
  
  export interface HardcoverRawUserBook {
    book: HardcoverRawBook;
    user_book_reads?: { progress_pages: number }[];
    rating?: number | null;
    review: string | null;
    review_raw: string | null;
    last_read_date: string | null;
  }

  export interface HardcoverBook {
    title: string;
    author: string;
    cover: string | null;
    pages: number | null;
  }
  
  export interface CurrentlyReadingBook extends HardcoverBook {
    progress: number | null;
  }

  export interface RecentlyReadBook extends HardcoverBook {
    rating: number | null;
    review: string | null;
    review_raw: string | null;
    slug: string | null;
    last_read_date: string | null;
  }
  
  export interface HardcoverResponse {
    currently_reading: CurrentlyReadingBook[];
    recently_read: RecentlyReadBook[];
  }