import { NextResponse } from 'next/server';
import { newsApi } from '@/lib/api/news-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || undefined;
  const category = searchParams.get('category') || undefined;
  const source = searchParams.get('source') || undefined;
  const from = searchParams.get('from') || undefined;
  const to = searchParams.get('to') || undefined;
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;

  try {
    const news = await newsApi.searchNews({
      query: query || 'FIFA World Cup 2026',
      category,
      source,
      from,
      to,
      page,
    });

    return NextResponse.json({
      success: true,
      data: news.articles,
      pagination: news.pagination,
      totalResults: news.totalResults,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch news data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
