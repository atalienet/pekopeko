import { Slider } from "@/components/ui/slider"


export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center grid-row-1">
        <h1 className="text-4xl font-bold">Pekopeko</h1>
        <p className="text-lg mt-2 max-w-prose mx-auto">
          下のボタンを押して、近くのお食事処を探し、おなかを満たしましょう！
        </p>
      </header>
      <main className="flex flex-col items-center justify-center grid-row-2">
        <button className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-4xl">🍽️</span>
        </button>
        <div className="mt-8">
            最大どこまで歩く？
        </div>
        <Slider defaultValue={[33]} max={100} step={1} />
      </main>
      <footer className="text-center grid-row-3">
        <p>このアプリケーションは位置情報(GPS)と、JavaScriptを使用します。</p>
        <p><a href="#" className="text-blue-500">GPSを有効にする方法</a></p>
        <p><a href="#" className="text-blue-500">JavaScriptを有効にする方法</a></p>
      </footer>
    </div>
  );
}
