import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function MovieCard({ movie, onToggleFav, isFav, imgBase }: any) {
  return (
    <motion.article whileHover={{ scale: 1.03 }} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg">
      <Link href={`/movie/${movie.id}`}>
        <div className="relative h-72 w-full">
          {movie.poster_path ? (
            <Image src={`${imgBase}${movie.poster_path}`} alt={movie.title} fill style={{ objectFit: 'cover' }} />
          ) : (
            <div className="flex items-center justify-center h-full bg-slate-700">No image</div>
          )}
        </div>
      </Link>

      <div className="p-3">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-slate-400 truncate">{movie.overview}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-slate-400">{movie.release_date}</span>
          <button onClick={() => onToggleFav(movie)} className={`px-2 py-1 rounded ${isFav ? 'bg-amber-500' : 'bg-slate-700'}`}>
            {isFav ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
