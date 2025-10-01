import { NextResponse } from 'next/server';

const TMDB = 'https://api.themoviedb.org/3';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get('q') || '';
    if (!q) return NextResponse.json({ results: [] });
    const res = await fetch(`${TMDB}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(q)}`);
    if (!res.ok) return NextResponse.json({ error: 'TMDb error' }, { status: res.status });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Server fetch error' }, { status: 500 });
  }
}
