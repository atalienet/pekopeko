"use client";
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

export default function Home() {
  const [sliderValue, setSliderValue] = useState(2); // 初期値を1000m (index: 2)に設定

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center grid-row-1">
        <h1 className="text-4xl font-bold">Pekopeko</h1>
        <p className="text-lg mt-2 max-w-prose mx-auto">
          下のボタンを押して、近くのお食事処を探し、おなかを満たしましょう！
        </p>
      </header>
      <main className="flex flex-col items-center justify-center grid-row-2">
        <button
          onClick={() => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  console.log(`緯度: ${latitude}, 経度: ${longitude}`);
                },
                (error) => {
                  console.error("位置情報の取得に失敗しました。", error.message);
                }
              );
            } else {
              alert("お使いのブラウザは位置情報に対応していません。");
            }
          }}
          className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
        >
          <span className="text-6xl">🍽️</span>
        </button>
        <div className="mt-8">
            最大どこまで歩く？ (半径<span className="ml-2">{[300, 500, 1000, 2000, 3000][sliderValue]}m</span>)
        </div>
        <div className="w-full max-w-[33%] mt-2">
          <Slider
            defaultValue={[2]}
            min={0}
            max={4}
            step={1}
            value={[sliderValue]}
            onValueChange={(value) => setSliderValue(value[0])}
          />
        </div>
      </main>
      <footer className="text-center grid-row-3">
        <p>このアプリケーションは位置情報(GPS)と、JavaScriptを使用します。</p>
        <p><a href="#" className="text-blue-500">GPSを有効にする方法</a></p>
        <p><a href="#" className="text-blue-500">JavaScriptを有効にする方法</a></p>
      </footer>
    </div>
  );
}
