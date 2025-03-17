import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const distance = searchParams.get('distance');

  if (!lat || !lng || !distance) {
    return NextResponse.json({ error: '有効でないパラメータがあります。' }, { status: 400 });
  }

  const apiKey = process.env.HOTPEPPER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'APIキーが正常に登録されていません。管理者に問い合わせてください。' }, { status: 500 });
  }

  const range = convertDistanceToRange(parseInt(distance));
  const apiUrl = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKey}&lat=${lat}&lng=${lng}&range=${range}&order=4&format=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'ホットペッパーグルメのAPIからの応答がありません。' }, { status: 500 });
  }
}

function convertDistanceToRange(meters: number): number {
  if (meters <= 300) return 1;
  if (meters <= 500) return 2;
  if (meters <= 1000) return 3;
  if (meters <= 2000) return 4;
  return 5; // 3000m
}
