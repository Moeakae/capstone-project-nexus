// app/movie/[id]/page.tsx
import Navbar from '../../../components/Navbar';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

const IMG_BASE = process.env.NEXT_PUBLIC_IMAGE_BASE;

async function getMovie(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/tmdb/movie/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Not found');
  return res.json();
}

export default function MoviePage({ params }: any) {
  const { id } = params;
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    fetch(`/api/tmdb/movie/${id}`)
      .then(r => r.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFav(favs.includes(Number(id)));
  }, [id]);

  function toggleFav() {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    const exists = favs.includes(Number(id));
    const next = exists ? favs.filter((fid: number) => fid !== Number(id)) : [...favs, Number(id)];
    localStorage.setItem('favorites', JSON.stringify(next));
    setIsFav(!exists);
  }

  if (loading) return <div className="p-6"><Navbar /><p className="p-6">Loading...</p></div>;
  if (!movie) return notFound();

  const trailer = movie.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            {movie.poster_path ? (
              <Image src={`${IMG_BASE}${movie.poster_path}`} width={500} height={750} alt={movie.title} />
            ) : <div className="bg-slate-700 h-80" />}
            <button onClick={toggleFav} className={`w-full mt-3 py-2 rounded ${isFav ? 'bg-amber-500' : 'bg-slate-700'}`}>
              {isFav ? 'Saved to favorites' : 'Save to favorites'}
            </button>
          </div>

          <section className="flex-1">
            <h1 className="text-3xl font-bold">{movie.title} <span className="text-sm text-slate-400">({movie.release_date?.slice(0,4)})</span></h1>
            <p className="text-slate-300 mt-2">{movie.tagline}</p>
            <p className="mt-4 text-slate-200">{movie.overview}</p>
            <div className="mt-4 text-sm text-slate-400">
              <div>Runtime: {movie.runtime} min</div>
              <div>Genres: {movie.genres?.map((g: any) => g.name).join(', ')}</div>
            </div>

            {trailer && (
              <div className="mt-6">
                <h3 className="font-semibold">Trailer</h3>
                <iframe
                  title="trailer"
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  allowFullScreen
                  className="mt-2 w-full aspect-video rounded"
                />
              </div>
            )}

            <div className="mt-6">
              <h4 className="font-semibold">Top cast</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                {movie.credits?.cast?.slice(0,8).map((c: any) => (
                  <div key={c.cast_id} className="text-sm">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-slate-400">{c.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
