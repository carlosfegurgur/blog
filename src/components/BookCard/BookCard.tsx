import type {
  CurrentlyReadingBook,
  RecentlyReadBook,
} from "../../types/hardcover";
import "./BookCard.css";

type Variant = "currently-reading" | "recently-read";

interface Props {
  book: CurrentlyReadingBook | RecentlyReadBook;
  variant: Variant;
}

export default function BookCard({ book, variant }: Props) {
  const isCurrentlyReading = variant === "currently-reading";
  const currentBook = isCurrentlyReading
    ? (book as CurrentlyReadingBook)
    : null;
  const recentBook = !isCurrentlyReading ? (book as RecentlyReadBook) : null;

  const progressPercent =
    currentBook?.progress && currentBook?.pages
      ? Math.round((currentBook.progress / currentBook.pages) * 100)
      : null;

  const reviewUrl = recentBook?.slug
    ? `https://hardcover.app/books/${recentBook.slug}/reviews/@carlosfegurgur`
    : null;

  const cardContent = (
    <div className="book-card">
      <div className="book-cover-wrapper">
        {book.cover ? (
          <img src={book.cover} alt={book.title} className="book-cover" />
        ) : (
          <div className="book-cover-placeholder" />
        )}
        <div className="book-overlay">
          <div className="book-overlay-content">
            <p className="book-title">{book.title}</p>
            <p className="book-author">{book.author}</p>

            {isCurrentlyReading && progressPercent && (
              <div className="book-progress">
                <div className="book-progress-track">
                  <div
                    className="book-progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="book-progress-label">{progressPercent}%</span>
              </div>
            )}

            {!isCurrentlyReading && recentBook?.rating && (
              <p className="book-rating">
                {"★".repeat(recentBook.rating)}
                {"☆".repeat(5 - recentBook.rating)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (!isCurrentlyReading && reviewUrl) {
    return (
      <a
        href={reviewUrl}
        target="_blank"
        rel="noopener"
        className="book-card-link"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
