import { NextResponse } from 'next/server';

const TMDB = 'https://api.themoviedb.org/3';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const res = await fetch(`${TMDB}/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,credits`);
    if (!res.ok) {
      return NextResponse.json({ error: 'TMDb returned an error' }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Server fetch error' }, { status: 500 });
  }
}
