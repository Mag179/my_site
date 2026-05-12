# Portfolio Project

ポートフォリオページを構成するシンプルなフロントエンドプロジェクトです。  
`Portfolio.html` をエントリとして、`portfolio.jsx` の React コンポーネントで UI を描画し、`tweaks-panel.jsx` で編集用 Tweaks パネルを提供します。

## 構成

- `Portfolio.html`
  - HTML の土台、フォント読み込み、スタイル定義、React マウント先を管理
- `portfolio.jsx`
  - ポートフォリオ画面本体（テーマ切替、挨拶、スキル表示など）
- `tweaks-panel.jsx`
  - 編集モード向けの Tweaks UI 共通部品と状態連携ロジック

## 動作要件

- モダンブラウザ（Chrome / Edge / Safari / Firefox の最新版推奨）
- インターネット接続（Google Fonts 読み込みのため）

## 使い方

1. `Portfolio.html` をブラウザで開く
2. 画面右上のボタンでテーマ（ライト/ダーク）を切り替える
3. Edit Mode 対応ホスト環境では、Tweaks パネルから配色や密度を調整できる

## 開発時の編集ポイント

- デフォルト設定変更:
  - `portfolio.jsx` の `TWEAK_DEFAULTS`
- アクセントカラー変更:
  - `portfolio.jsx` の `ACCENT_OPTIONS`
- レイアウトや配色の調整:
  - `Portfolio.html` 内 `<style>` の CSS 変数・セクションスタイル
- Tweaks UI の拡張:
  - `tweaks-panel.jsx` の各 `Tweak*` コンポーネント

## 補足

- `portfolio.jsx` には `/*EDITMODE-BEGIN*/ ... /*EDITMODE-END*/` ブロックがあり、ホスト側の編集モード連携で設定値を書き換える想定です。
- 時刻表示は `Asia/Ishikawa` タイムゾーンを使ってフォーマットしています。

## ライセンス

必要に応じて追記してください（例: MIT）。
