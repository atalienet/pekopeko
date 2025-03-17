"use client";
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

export default function Home() {
  const [sliderValue, setSliderValue] = useState(2); // 初期値を1000m (index: 2)に設定
  const distances = [300, 500, 1000, 2000, 3000];

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
                  const selectedDistance = distances[sliderValue];
                  window.location.href = `/result?lat=${latitude}&lng=${longitude}&distance=${selectedDistance}`;
                },
                (error) => {
                  console.error("位置情報の取得に失敗しました。", error.message);
                }
              );
            } else {
              alert("お使いのブラウザは位置情報に対応していません。");
            }
          }}
          className="group relative inline-flex h-[calc(56px+8px)] w-64 items-center justify-center
            rounded-full bg-neutral-950 py-1 pl-8 pr-14 font-medium text-neutral-50
            transition-all duration-300"
        >
          <span className="z-10 pr-2">お店を探す</span>
          <div
            className="absolute right-1 inline-flex h-14 w-14 items-center justify-end
              rounded-full bg-neutral-700 transition-[width] duration-300
              group-hover:w-[calc(100%-8px)]"
          >
            <div className="mr-3.5 flex items-center justify-center">
              <span className="text-2xl">🍣</span>
            </div>
          </div>
        </button>
        <div className="mt-8">
            最大どこまで歩く？ (半径<span className="ml-2">{distances[sliderValue]}m</span>)
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
          <div className="gap-4 mt-4">
             <p>⚠️このページが正常に動作しない場合、JavaScriptが無効になっている可能性があります。</p>
             <p><a href="https://www.gov-online.go.jp/recommended_environment/faq/js/" className="text-blue-500">JavaScriptを有効にする方法 (外部サイト: 政府広報)</a></p>
             <p><a href="https://stroly.com/guide/more-help/how-to-allow/" className="text-blue-500">GPSを有効にする方法 (外部サイト: Stroly)</a></p>
          </div>
        </footer>
    </div>
  );
}
