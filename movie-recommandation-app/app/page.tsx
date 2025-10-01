// app/page.tsx
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const IMG_BASE = process.env.NEXT_PUBLIC_IMAGE_BASE;

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tmdb/trending')
      .then(r => r.json())
      .then(data => {
        setTrending(data.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(favs);
  }, []);

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
        <h1 className="text-3xl font-bold mb-4">Trending Movies</h1>
        {loading && <LoadingSpinner />}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trending.map((m: any) => (
            <MovieCard
              key={m.id}
              movie={m}
              onToggleFav={toggleFav}
              isFav={favorites.includes(m.id)}
              imgBase={IMG_BASE}
            />
          ))}
        </section>
      </main>
    </>
  );
}
