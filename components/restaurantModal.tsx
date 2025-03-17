import { type Shop } from "@/types/shop";

type RestaurantModalProps = {
  restaurant: Shop;
  onClose: () => void;
};

export function RestaurantModal({ restaurant, onClose }: RestaurantModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-70"
        onClick={onClose}
      ></div>

      <div className="relative z-10 w-11/12 md:w-4/5 max-w-4xl max-h-[90vh] shadow-lg overflow-hidden bg-white rounded-lg flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 bg-white/80 rounded-full p-1 hover:bg-white transition-colors cursor-pointer"
          aria-label="閉じる"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>

        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src={restaurant.photo.pc.l}
            alt={restaurant.name}
            className="w-full h-full object-cover md:rounded-l-lg"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 overflow-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-4">{restaurant.name}</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">アクセス</h3>
              <p className="text-base text-gray-600">{restaurant.access}</p>
            </div>
            {restaurant.address && (
              <div className="mb-4">
                <h4 className="font-bold text-gray-700">住所</h4>
                <p className="text-gray-600">{restaurant.address}</p>
              </div>
            )}
            {restaurant.open && (
              <div className="mb-4">
                <h4 className="font-bold text-gray-700">営業時間</h4>
                <p className="text-gray-600">{restaurant.open}</p>
                {restaurant.close && (
                  <p className="text-gray-600">定休日: {restaurant.close}</p>
                )}
              </div>
            )}
          </div>
          <div className="mt-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path
                  fillRule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clipRule="evenodd"
                />
              </svg>
              Google Mapで開く
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
