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
      <p>半径 {distance}m 以内のお店が近い順に並んでいます。</p>
    </div>
  );
}
