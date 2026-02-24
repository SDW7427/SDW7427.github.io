# Career Path Wireframe Prototype

社内HR/育成面談向けの**デスクトップファースト**なキャリアパス可視化プロトタイプです。  
React + TypeScript + Tailwind CSS + React Flowで構成しています。

## セットアップ

```bash
npm install
npm run dev
```

- 開発サーバー: `http://localhost:5173`

## ファイル構成

```text
src/
  App.tsx                       # 画面全体レイアウト（ヘッダー/左ツリー/右詳細）
  main.tsx                      # エントリポイント
  styles.css                    # Tailwind + 最小カスタムCSS
  types.ts                      # ノード/エッジの型定義
  data/
    careerData.ts               # モックノード・エッジ、トラック別取得関数
  components/
    TrackTabs.tsx               # 開発/インフラ/ITサポート タブ
    CareerFlow.tsx              # React Flow グラフ
    DetailPanel.tsx             # 右側詳細パネル
```

## レイアウト構造

- 上部: タイトル、トラック切替、検索、フィルタチップ、凡例
- 左 2/3: 段階1〜6を縦進行で表現したスキルツリー
- 右 1/3: 選択ノードの詳細パネル

## ノード追加/編集方法

1. `src/data/careerData.ts` の `careerNodes` にノードを追加・編集
2. `careerEdges` に接続を追加
3. `position` を調整して表示位置を整える

主要フィールド:
- `id`, `track`, `subtrack`, `stage`, `pathType`
- `titleJa`, `shortLabel`, `summary`
- `requiredSkills`, `requiredExperience`, `recommendedCerts`
- `toolsEnvironmentsLanguages`, `nextStepConditions`, `tags`
- `canCoexistWith`, `relatedNodeIds`, `position`

## 将来拡張ポイント

- `careerData.ts` 末尾の `TODO` コメント箇所を、CSV/Google Sheetsパーサーの出力に置換
- 個人別ステータス（未着手/学習中/実務経験あり/面談済）をノード状態としてオーバーレイ可能
- 日本語同義語検索は検索インデックス層を追加して対応可能
