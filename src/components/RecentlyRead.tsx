import { useHardcover } from "../hooks/useHardcover";
import BookCard from "./BookCard/BookCard";
import "./RecentlyRead.css";

export default function RecentlyRead() {
  const BOOK_LIMIT = 3;

  const { data, error, loading } = useHardcover();
  const books = (data?.recently_read ?? []).slice(0, BOOK_LIMIT);

  if (loading) return <p className="reading-state">Loading...</p>;
  if (error) return <p className="reading-state">{error}</p>;
  if (!books.length) return <p className="reading-state">Nothing recently read.</p>;

  return (
    <div className="recently-read">
      {books.map((book, i) => (
        <BookCard 
          variant="recently-read"
          book={book}
        />
      ))}
    </div>
  );
}