import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Shop } from "@/types/shop";

type RestaurantCardProps = {
  shop: Shop;
  onClick: (shop: Shop) => void;
};

export function RestaurantCard({ shop, onClick }: RestaurantCardProps) {
  return (
    <Card
      key={shop.id}
      className="shadow-md cursor-pointer"
      onClick={() => onClick(shop)}
    >
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
  );
}
