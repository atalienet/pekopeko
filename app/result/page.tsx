"use client";
import { useSearchParams } from "next/navigation";

type SearchParams = {
  lat?: string;
  lng?: string;
  distance?: string;
};

export default function Result() {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const distance = searchParams.get("distance") || "1000"; // Default to 1000 if not specified

  if (!lat || !lng) {
    return (
      <div className="min-h-screen p-8 flex flex-col items-center justify-center">
        <div>位置情報が見つかりません</div>
              </div>
    );
  }

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">現在地</h1>
      <div className="space-y-2">
        <p>緯度: {lat}, 経度: {lng}</p>
        <p>半径 {distance}m 以内</p>
      </div>
    </div>
  );
}
