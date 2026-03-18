# VectorN — Portfolio

<div align="center">

![VectorN Portfolio](./docs/screenshot.png)

**デザインと実装、その先にある「運用」までを設計する。**

見た目の美しさだけでなく、更新する人、使う人、育てていく人のことまで考える。

[![Next.js](https://img.shields.io/badge/Next.js_15-App_Router-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)

</div>

---

## 📖 Concept — なぜこのデザインで、なぜこの技術を選んだのか

このプロジェクトは、離職期間中に「ただ動くものを作る」ことを目的とせず、**「なぜそれを選ぶのか」という意思決定のプロセス自体を鍛える場**として着手しました。

従来のWordPressサイトを、**Next.js（App Router）+ WordPress REST APIによるヘッドレスCMS構成へフルリプレイス**。技術選定、UI設計、アニメーション演出、SEO、メール配信基盤まで、全工程を一人で担うことで、フルスタックな開発視点を実地で習得しました。

デザインコンセプトのキーワードは **「アナログな手触り」**。AIで生成したイラストが持つデジタルの無機質さを、グレインエフェクト・温かみのある暗色（`#2a2723`）・個性的なタイポグラフィで中和し、スクリーンの向こう側に人の存在を感じさせることを目指しました。

---

## 🛠 Tech Stack

| カテゴリ        | 技術                      | 選定理由                                                                 |
| --------------- | ------------------------- | ------------------------------------------------------------------------ |
| **Framework**   | Next.js 15 (App Router)   | RSCによるデータフェッチの最適化、レンダリング戦略の柔軟な制御            |
| **Language**    | TypeScript                | 型安全による実装品質の担保と、WP REST APIレスポンスの型定義              |
| **Styling**     | Tailwind CSS v4           | ユーティリティファーストによる高速な実装と、デザイントークンの一元管理   |
| **Animation**   | Framer Motion             | Reactライフサイクルと親和性の高い宣言的アニメーション（後述）            |
| **UI Library**  | shadcn/ui                 | アクセシブルなRadix UIプリミティブをベースにした柔軟なコンポーネント設計 |
| **CMS**         | WordPress REST API        | 既存コンテンツ資産の活用と、非エンジニアでも更新できる運用体制の維持     |
| **Opening**     | Lottie (lottie-react)     | After Effectsで制作したベクターアニメーションをWebへ忠実に移植           |
| **Mail**        | Resend                    | 独自ドメイン認証によるメール到達率の安定確保                             |
| **Analytics**   | GA4 (@next/third-parties) | パフォーマンスへの影響を最小化したサードパーティスクリプト管理           |
| **Infra (Dev)** | Docker                    | メモリ制限（4GB）によるローカル環境の安定化と再現性の確保                |

---

## 🎬 Key Features

### 1. GSAPからFramer Motionへ——技術的意思決定の記録

当初、スクロール連動アニメーションに **GSAP / ScrollTrigger** を採用していました。しかし実装が進む中で、以下の課題が顕在化しました。

- `useEffect` と `useGSAP` による**命令的な記述**が、コンポーネントの可読性を損なう
- Reactの仮想DOMとGSAPのDOM直接操作が競合し、**ページ遷移時に不整合**が発生
- アニメーションのステートとコンポーネントのステートが乖離し、**デバッグコストが増大**

これを受け、**Framer Motionへの全面移行**を決断。`AnimatePresence`・`motion` コンポーネント・`variants`による宣言的なアニメーション設計に刷新し、Reactのライフサイクルに沿った保守性の高い実装を実現しました。

```tsx
// Before (GSAP — 命令的)
useGSAP(() => {
  gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, scrollTrigger: { ... } });
}, []);

// After (Framer Motion — 宣言的)
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
  viewport={{ once: true }}
/>
```

---

#### 2. Variantsによる「振る舞い」の抽象化と再利用

複雑な「座布団リビール（Block Reveal）」演出の実装において、Framer Motionの **Variants** 機能を最大限に活用しました。

- **タイムラインの宣言的定義**:「帯の走行 → 文字の出現 → 座布団の展開」という三段構えのシーケンスを、命令的なコードではなく `staggerChildren` を用いた親子関係の定義のみで完結。
- **レスポンシブへの動的対応**: 画面幅に応じて `w-fit` や `whitespace-nowrap` を切り替えるReactの条件付きレンダリングと、アニメーションの `layout` プロパティを同期させ、デバイスを問わない安定した挙動を実現。

これにより、単なる「演出」を「再利用可能なUIコンポーネント」へと昇華させ、開発スピードと視覚的一貫性を両立させました。

---

### 3. After Effects → Lottie ——オープニングアニメーションの内製

サイト訪問者の第一印象を決定するオープニングアニメーションは、**After Effectsで制作したモーションをBodymovinでJSON書き出し**、`lottie-react`を通じてWebに実装しました。

GIFや動画ファイルと異なり、Lottieはベクターデータのためあらゆる解像度で鮮明に描画され、ファイルサイズも最小限に抑えられます。ブランドの入り口となる数秒間を、妥協なく設計しました。

---

### 4. 制作実績のパスワード保護機能

NDA案件など、公開に制限のある実績をポートフォリオとして提示するため、**shadcn/ui の Dialog コンポーネント**とWordPress REST APIを連携させたパスワード認証機能を実装しました。

- URLでの直接アクセスも認証で保護
- 認証済みコンテンツをクライアントサイドでセキュアに表示
- 採用担当者へ「合言葉」を伝えることでコミュニケーションのきっかけにもなる設計

---

### 5. スケルトンUIによる体感速度の向上

WordPress REST APIからのデータ取得時、**shadcn/ui の Skeleton コンポーネント**を活用したローディングUIを各ページに実装。実際のロード時間を短縮するのではなく、「待たされている感覚」を設計で解消するアプローチを採用しています。

---

### 6. ページ遷移時のスクロール復元とアニメーション同期

App Routerのクライアントナビゲーションでは、ページ遷移後もスクロール位置が保持されるケースがあります。これを `usePathname` で監視し、**遷移のたびに自動で最上部へスクロール**するコンポーネントをLayoutに配置。同時に、ScrollTriggerの計算ズレを防ぐ `refresh()` の呼び出しも同期させました。

---

### 7. CapsuleSectionのフリップカード

Aboutセクションのカードは、クリックすると表裏が反転し、裏面にスキルや説明文が表示される**フリップアニメーション**を実装。Framer Motionの `rotateY` を使い、自然な奥行き感のある3D反転を実現しています。

---

## 🎨 Design Strategy

### タイポグラフィ

| フォント          | 用途                            | 意図                                                            |
| :---------------- | :------------------------------ | :-------------------------------------------------------------- |
| **Anton**         | メイン見出し / ヒーロータイトル | 圧倒的な太さと存在感。座布団リビール演出との相性を最大化        |
| **Michroma**      | カテゴリーラベル / 装飾要素     | テック・未来的エッセンスの注入。幾何学的な精密さを表現          |
| **Space Grotesk** | 本文 (英数字) / 説明文          | モダンな知性と高い可読性の両立。Antonの重厚さに対する「抜け感」 |
| **Noto Sans JP**  | 本文 (日本語)                   | 誠実でクリアな可読性。英字フォントとのシームレスな調和          |

#### 混植フォント（Multi-font Synthesis）のこだわり

本文（description）には **Space Grotesk** と **Noto Sans JP** を組み合わせたカスタムミックスフォントを採用。
単なるフォント指定に留まらず、`line-height: 1.8` と `letter-spacing: 0.4em`（サブタイトル等）を徹底して管理することで、情報の「密度」をコントロールし、余白を活かしたエディトリアルな質感を目指しています。

### カラーパレット

```
Primary Text:    #2a2723  — 純黒を避けた温かみのある暗色
Background:      ベージュ系グラデーション — AIイラストの白と馴染む色温度
Accent:          ゴールド系 — イラスト内の金色と連動したUI強調色
```

`#000000`は、**無機質さをなるべく排除し、人の手が作ったものの質感を演出する**ための意図的になくすように判断しています。

### グレインエフェクト（粒子感）

AIで生成したイラストとUIの間に生まれる「質感の乖離」を埋めるため、CSSベースのグレインエフェクトを全体に薄く付与しました。これにより、スクリーン上の素材がすべて同じ「紙の上に存在している」ような統一感を生み出しています。

---

## 🔍 SEO & Performance

- **動的サイトマップ**（`sitemap.ts`）: WordPress REST APIと連携し、実績の追加・削除に連動して自動生成
- **`robots.ts`**: クローラー制御とサイトマップURLの明示
- **OGP / Open Graph**: SNSシェア時の表示を完全にコントロール
- **ドキュメントアウトライン**: h1〜h3の見出し構造を全ページで精査・最適化（SEOの原則に従い、一部コンポーネントのタグをdivに変更するリファクタリングも実施）
- **画像最適化**: `next/image` の `sizes` 属性と `priority` を適切に設定し、LCPを改善
- **Google Analytics 4**: `@next/third-parties` を使用し、スクリプトのパフォーマンス影響を最小化
- **Search Console**: メタタグによる所有権確認を `metadata` で管理

---

## 📁 Project Structure（抜粋）

```
.
├── app/
│   ├── (pages)/
│   │   ├── about/
│   │   ├── works/
│   │   │   ├── page.tsx              # 全実績一覧
│   │   │   ├── [category]/
│   │   │   │   ├── page.tsx          # カテゴリー別フィルタリング
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # 実績詳細（パスワード保護対応）
│   │   └── contact/
│   ├── components/
│   │   ├── Breadcrumbs/              # パンくずリスト（共通）
│   │   ├── HeroSlider/               # メインビジュアル（Framer Motion）+ スライダー
│   │   ├── CapsuleSection/           # Aboutカード（クリックでフリップ・裏面に説明表示）
│   │   ├── FluffyContainer/          # スクロール連動フェードイン
│   │   └── ProtectedContent/         # パスワード認証コンテンツ
│   ├── lib/
│   │   └── api.ts                    # WP REST API フェッチ関数群
│   └── configs/
│       └── configs.ts                # ナビゲーションパス等の定数管理
├── public/
│   └── lottie/
│       └── data.json                 # After Effects製オープニングアニメーション
└── docker-compose.yml                # 開発環境（メモリ4GB制限）
```

---

## 🚀 Getting Started

```bash
# リポジトリのクローン
git clone https://github.com/shitsurae-lab/vector-n.git
cd vector-n

# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env.local
# .env.local を編集してください

# 開発サーバーの起動
npm run dev
```

### Docker を使う場合

```bash
docker compose up
```

### 環境変数

```env
NEXT_PUBLIC_WP_API_URL=your_wp_api_url
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 🗺 Commit History — 開発の軌跡

このリポジトリのコミット履歴は、技術選定の変遷と意思決定の記録でもあります。主要なマイルストーンを抜粋します。

| フェーズ              | 内容                                                      |
| --------------------- | --------------------------------------------------------- |
| **基盤構築**          | Next.js App Router + WP REST API の連携、動的ルーティング |
| **UI実装**            | shadcn/ui 導入、パスワード保護機能、レスポンシブ対応      |
| **アニメーション v1** | GSAP / ScrollTrigger によるスクロール演出の初期実装       |
| **技術移行**          | GSAP → Framer Motion への全面移行（宣言的UIへの転換）     |
| **質感の追求**        | グレインエフェクト、カラー統一（`#2a2723`）、フォント調整 |
| **Lottie導入**        | After Effects製アニメーションのWeb実装                    |
| **SEO強化**           | 動的サイトマップ、OGP、アウトライン構造の最適化           |
| **パフォーマンス**    | スケルトンUI、画像最適化、ページ遷移アニメーションの洗練  |

---

## 💭 振り返りと今後

このプロジェクトを通じて学んだことは、**「動けば正解ではない」** という感覚の養い方です。

GSAPからFramer Motionへの移行は、機能要件は満たしていたコードを、**保守性・可読性・Reactとの親和性**という観点で判断し直した経験でした。この「一度作ったものを疑い、より良い選択に乗り換える」プロセスこそが、実務で求められるエンジニアリングだと確信しています。

今後の展望として、E2Eテスト（Playwright）の導入と、ISR（Incremental Static Regeneration）によるパフォーマンスのさらなる改善を検討しています。

---

<div align="center">

**このREADMEを読んでくださった方へ**

このREADMEをご覧いただきありがとうございます。
技術のことでも、お仕事のことでも、お気軽にご連絡いただければ嬉しいです。

[Contact →](https://www.vector-n.net/contact)

</div>
