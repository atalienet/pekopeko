"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Shop = {
  id: string;
  name: string;
  photo: {
    pc: {
      l: string;
    };
  };
  access: string;
};

type HotPepperResponse = {
  results: {
    shop: Shop[];
  };
};

export default function Result() {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const distance = searchParams.get("distance") || "1000";

  const [restaurants, setRestaurants] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!lat || !lng) return;

      try {
        setIsLoading(true);
        const apiUrl = `/api/hotpepper?lat=${lat}&lng=${lng}&distance=${distance}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data: HotPepperResponse = await response.json();
        console.log("APIからのレスポンス:", data);
        if (data.results && data.results.shop) {
          setRestaurants(data.results.shop);
        }
      } catch (err) {
        setError("レストラン情報の取得に失敗しました");
        console.error("APIエラー:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, [lat, lng, distance]);

  if (!lat || !lng) {
    return (
      <div className="min-h-screen p-8 flex flex-col items-center justify-center">
        <div>位置情報が見つかりません</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">現在地周辺のグルメ情報</h1>
      <div className="mb-4 text-center">
        <p>緯度: {lat}, 経度: {lng}</p>
        <p>半径 {distance}m 以内</p>
      </div>

      {isLoading && <p className="text-center">レストラン情報を取得中...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="w-full max-w-7xl grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {restaurants.map((shop) => (
          <Card key={shop.id} className="shadow-md">
            <CardHeader>
              <img
                src={shop.photo.pc.l}
                alt={shop.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg font-bold">{shop.name}</CardTitle>
              <p className="text-sm text-gray-500 mt-2">{shop.access}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
