type LocationHeaderProps = {
  lat: string;
  lng: string;
  distance: string;
  page: number;
  totalPages: number;
};

export function LocationHeader({ lat, lng, distance, page, totalPages }: LocationHeaderProps) {
  return (
    <div className="mb-4 text-center">
      <p>緯度: {lat}, 経度: {lng}</p>
      <p>半径 {distance}m 以内</p>
      <p>ページ: {page} / {totalPages}</p>
    </div>
  );
}
