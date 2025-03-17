"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { RestaurantModal } from "@/components/restaurantModal";
import type { Shop } from "@/types/shop";
import { RestaurantCard } from "@/components/restaurantCard";
import { RestaurantPagination } from "@/components/restaurantPagination";
import { LocationHeader } from "@/components/locationHeader";

export default function Result() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const distance = searchParams.get("distance") || "1000";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const count = 28; // 1ページあたり28件

  const [restaurants, setRestaurants] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Shop | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!lat || !lng) return;

      try {
        setIsLoading(true);
        const start = (page - 1) * count + 1;
        const apiUrl = `/api/hotpepper?lat=${lat}&lng=${lng}&distance=${distance}&start=${start}&count=${count}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`API のリクエストが status ${response.status} で失敗しました。`);
        }
        const data: HotPepperResponse = await response.json();
        if (!data.results || !data.results.shop) {
          throw new Error("Unexpected API response format");
        }
        setRestaurants(data.results.shop);
        setTotalCount(data.results.results_available);
      } catch (err) {
        setError(err instanceof Error ? err.message : "不明なエラーが発生しました");
        console.error("APIエラー:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, [lat, lng, distance, page]);

  const totalPages = Math.ceil(totalCount / count);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      <LocationHeader
        lat={lat}
        lng={lng}
        distance={distance}
        page={page}
        totalPages={totalPages}
      />

      {isLoading && <p className="text-center">レストラン情報を取得中です</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="w-full max-w-7xl grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {restaurants.map((shop) => (
          <RestaurantCard
            key={shop.id}
            shop={shop}
            onClick={setSelectedRestaurant}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <RestaurantPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {selectedRestaurant && (
        <RestaurantModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </div>
  );
}
