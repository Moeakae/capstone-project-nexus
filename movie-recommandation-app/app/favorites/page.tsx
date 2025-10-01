// app/favorites/page.tsx
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import MovieCard from '../../components/MovieCard';
import LoadingSpinner from '../../components/LoadingSpinner';

const IMG_BASE = process.env.NEXT_PUBLIC_IMAGE_BASE;

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(favs);
  }, []);

  useEffect(() => {
    async function load() {
      if (!favorites.length) {
        setMovies([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const results = await Promise.all(
        favorites.map((id: number) => fetch(`/api/tmdb/movie/${id}`).then(r => r.json()))
      );
      setMovies(results);
      setLoading(false);
    }
    load();
  }, [favorites]);

  function toggleFav(movie: any) {
    const exists = favorites.includes(movie.id);
    const next = exists ? favorites.filter((id) => id !== movie.id) : [...favorites, movie.id];
    setFavorites(next);
    localStorage.setItem('favorites', JSON.stringify(next));
  }

  return (
    <>
      <Navbar />
      <main className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
        {loading ? <LoadingSpinner /> : (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((m) => (
              <MovieCard key={m.id} movie={m} onToggleFav={toggleFav} isFav={favorites.includes(m.id)} imgBase={IMG_BASE} />
            ))}
          </section>
        )}
      </main>
    </>
  );
}
