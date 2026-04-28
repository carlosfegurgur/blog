import { useHardcover } from "../hooks/useHardcover";
import BookCard from "./BookCard/BookCard";

export default function CurrentlyReading() {
  const { data, loading, error } = useHardcover();
  const books = data?.currently_reading ?? [];

  if (loading) return <p className="reading-state">Loading...</p>;
  if (error) return <p className="reading-state">{error}</p>;
  if (!books.length)
    return <p className="reading-state">Nothing currently being read.</p>;

  return (
    <div className="currently-reading">
      {books.map((book, i) => (
        <BookCard variant="currently-reading" book={book} />
      ))}
    </div>
  );
}
