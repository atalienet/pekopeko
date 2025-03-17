type LocationHeaderProps = {
  lat: string;
  lng: string;
  distance: string;
  page: number;
  totalPages: number;
};

const distances = [300, 500, 1000, 2000, 3000];

function getEffectiveDistance(inputDistance: number): number {
  // distanceが数値でない場合、デフォルトで1000mを返すことを表示する
  if (isNaN(inputDistance)) {
    return distances[2];
  }

  // 300m以下の場合、300mを返す
  if (inputDistance <= distances[0]) {
    return distances[0];
  }

  // リストを走査して適切な値を決定
  for (let i = 1; i < distances.length; i++) {
    if (inputDistance <= distances[i]) {
      return distances[i];
    }
  }

  // 3000mを超える場合、3000mを返す
  return distances[distances.length - 1];
}

export function LocationHeader({ distance }: LocationHeaderProps) {
  // URLから渡されたdistanceを数値に変換
  const inputDistance = parseInt(distance, 10);
  const effectiveDistance = getEffectiveDistance(inputDistance);

  return (
    <div className="mb-4 text-center">
      <p>半径 {effectiveDistance}m 以内のお店が近い順に並んでいます。【画像提供：ホットペッパー グルメ】</p>
    </div>
  );
}
