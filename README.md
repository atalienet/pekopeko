# 簡易仕様書
## アプリ名
Pekopeko

## 対象OSおよびブラウザ
いずれも最新版で、全デバイス含む
- Google Chrome
- Safari
- Firefox

## 開発環境/言語
- VS Code
- Nix
- Node.js
- TypeScript
- JavaScript


## 開発期間
- 構想1週間
- プロトタイプ作成(Chakra UI)にて2日
- 作成 1日

## 機能概要
### ホットペッパーグルメのAPIを使用し、近くのお食事処を表示する機能
### 機能一覧
- GPSによる位置情報を取得
- APIと連携し、カード型でお店を一覧表示
    - 店名
    - キャッチフレーズ
    - アクセス
    - サムネイル
- お店の検索範囲をスライダーで変更
- お店のカードを押すことで、詳細情報を表示
    - 店名
    - キャッチフレーズ
    - アクセス
    - 住所
    - 営業時間
    - Google Maps に表示するボタン
    - サムネイル


 ### フレームワーク
- Next.js (var. 15)
- React (var. 19)
- Tailwind CSS (var. 4)
- shadcn/ui

- その他ボタンのデザインに https://buttons.ibelick.com/ のものを使用

### テーブル定義などの設計ドキュメント
- 今回はデータベースを使用していないため、ありません


### 開発環境構築手順
1. Node.js 18以上が動くことを確認してください。
    - Nix Flake も入れているので、Nixで環境を再現することも可能です。
2. このリポジトリをクローンします
3. [ホットペッパーグルメのAPIの利用登録サイト](https://webservice.recruit.co.jp/register) より、APIキーを入手してください。
3. `.env.local` をルートに配置し、
```
HOTPEPPER_API_KEY=<入手したAPIキー>
```
としてください

4. `next dev` `next start` か [Zenn: nextjsをバックグラウンド実行する方法](https://zenn.dev/efficientyk/articles/fc78d8466add3a) を参照してください。

### コンセプト
- 誰にでも使いやすいわかりやすいデザイン
- シンプルと使いやすさを両立
- Tailwindなどを久しぶりに使ってみたかった

### こだわったポイント
- スライダーデザイン
- URLから距離を変更したときの処理
- Google Mapsに表示できる機能
- ページ切り替え時に一番上へ
- APIのプロキシ

### デザイン面でこだわったポイント
- UIコンポーネントを使い、お手軽にリッチなデザインを
- レスポンシブなデザイン


### 技術面でアドバイスして欲しいポイント
- 営業中かどうかを書いてくれるロジックを書くならどうするか? (書き方がバラバラなのでかなり大変だと思います。)
- distance周りが冗長なコードになっていると思うので、より理想的な実装はどうなのか？

### 自己評価
- UIコンポーネントを使うのはずるいかもしれないですね
- ページを切り替えたときにきちんと一番上に行くみたいな細かい工夫もあります
- スライダーを使うのは妙案だと思いました
- Google Mapsをすぐに開けるようにしたのは様々な問題の解決策になるでしょう

