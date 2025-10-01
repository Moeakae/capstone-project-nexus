import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-800 to-slate-900">
      <Link href="/" className="text-2xl font-bold">MovieRecs</Link>
      <div className="flex gap-4">
        <Link href="/favorites" className="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600">Favorites</Link>
      </div>
    </nav>
  );
}
