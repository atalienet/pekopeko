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
  address?: string;
  open?: string;
  close?: string;
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
  const page = parseInt(searchParams.get("page") || "1", 10); // ページ番号を取得、デフォルトは1
  const count = 28; // 1ページあたり25件

  const [restaurants, setRestaurants] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Shop | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!lat || !lng) return;

      try {
        setIsLoading(true);
        const start = (page - 1) * count + 1;
        const apiUrl = `/api/hotpepper?lat=${lat}&lng=${lng}&distance=${distance}&start=${start}&count=${count}`;
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
  }, [lat, lng, distance, page]);

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
        <p>ページ: {page}</p>
      </div>

      {isLoading && <p className="text-center">レストラン情報を取得中...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="w-full max-w-7xl grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {restaurants.map((shop) => (
          <Card key={shop.id} className="shadow-md cursor-pointer" onClick={() => setSelectedRestaurant(shop)}>
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

      {selectedRestaurant && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-70"
            onClick={() => setSelectedRestaurant(null)}
          ></div>

          <div className="relative z-10 w-11/12 md:w-4/5 max-w-4xl max-h-[90vh] shadow-lg overflow-hidden bg-white rounded-lg flex flex-col md:flex-row animate-fade-in">
            <button
              onClick={() => setSelectedRestaurant(null)}
              className="absolute top-2 right-2 z-20 bg-white/80 rounded-full p-1 hover:bg-white transition-colors cursor-pointer"
              aria-label="閉じる"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>

            <div className="w-full md:w-1/2 h-64 md:h-auto">
              <img
                src={selectedRestaurant.photo.pc.l}
                alt={selectedRestaurant.name}
                className="w-full h-full object-cover md:rounded-l-lg"
              />
            </div>

            <div className="w-full md:w-1/2 p-6 overflow-auto">
              <h2 className="text-xl md:text-2xl font-bold mb-4">{selectedRestaurant.name}</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">アクセス</h3>
                  <p className="text-base text-gray-600">{selectedRestaurant.access}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold text-gray-700">住所</h4>
                  <p className="text-gray-600">{selectedRestaurant.address}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold text-gray-700">営業時間</h4>
                  <p className="text-gray-600">{selectedRestaurant.open}</p>
                  {selectedRestaurant.close && (
                    <p className="text-gray-600">定休日: {selectedRestaurant.close}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
