import { NextResponse } from 'next/server';

const TMDB = 'https://api.themoviedb.org/3';

export async function GET() {
  try {
    const res = await fetch(`${TMDB}/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`);
    if (!res.ok) {
      return NextResponse.json({ error: 'TMDb returned an error' }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Server fetch error' }, { status: 500 });
  }
}
