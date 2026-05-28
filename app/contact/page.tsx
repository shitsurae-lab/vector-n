"use client";

import { useState } from "react";
import PageShell from "@/components/works/PageShell";
import { NAV_PATHS } from "@/app/constants/config";
import { sendEmail } from "@/app/actions/sendEmail";

// ----------------------------------------------------------------
// 必須バッジ
// ----------------------------------------------------------------
function RequiredBadge() {
  return (
    <span className="inline-flex items-center rounded-lg bg-[#F5CA22] px-[10px] py-[2px] font-sans text-xs text-[#333]">
      必須
    </span>
  );
}

// ----------------------------------------------------------------
// /contact  お問い合わせページ
// ----------------------------------------------------------------
export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  async function handleSubmit() {
    // バリデーション
    if (!name || !email || !message) return;

    setStatus("sending");

    // useState の値を FormData に変換して sendEmail に渡す
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("message", message);

    const result = await sendEmail(formData);

    if (result.success) {
      setStatus("done");
      // 送信成功後にフォームをリセット
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("error");
    }
  }

  return (
    <PageShell title="お問い合わせ" parent={NAV_PATHS.CONTACT}>
      <div className="flex w-full flex-col items-center gap-20 rounded-lg border border-[#e8e8e8] bg-white px-5 py-10 md:rounded-2xl md:px-10 md:py-20 lg:px-40">
        {/* 説明文 */}
        <p className="w-full text-center font-sans text-sm leading-[2] font-normal text-[#333] md:max-w-[640px] md:text-base">
          お問い合わせ内容をご入力ください。
          <br />
          お問い合わせの内容により、お返事させていただくまでに、
          <br className="hidden md:block" />
          お時間を頂く場合がございます。
        </p>

        {/* 送信完了メッセージ */}
        {status === "done" && (
          <div className="w-full max-w-[640px] rounded-lg border border-[#F5CA22] bg-[#F5CA22]/10 px-6 py-4 text-center">
            <p className="font-sans text-base font-bold text-[#003366]">
              お問い合わせを送信しました。
            </p>
            <p className="mt-1 font-sans text-sm text-[#333]">
              内容を確認のうえ、折り返しご連絡いたします。
            </p>
          </div>
        )}

        {/* フォーム: 送信完了後は非表示 */}
        {status !== "done" && (
          <div className="flex w-full flex-col gap-8 md:max-w-[640px]">
            {/* お名前 */}
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-row items-center gap-[10px]">
                <label
                  htmlFor="name"
                  className="font-sans text-base font-normal text-[#333]"
                >
                  お名前
                </label>
                <RequiredBadge />
              </div>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 w-full rounded-lg border border-[#ccc] bg-white px-4 font-sans text-base text-[#333] transition-colors focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none"
              />
            </div>

            {/* メールアドレス */}
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-row items-center gap-[10px]">
                <label
                  htmlFor="email"
                  className="font-sans text-base font-normal text-[#333]"
                >
                  メールアドレス
                </label>
                <RequiredBadge />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 w-full rounded-lg border border-[#ccc] bg-white px-4 font-sans text-base text-[#333] transition-colors focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none"
              />
            </div>

            {/* お問い合わせ内容 */}
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-row items-center gap-[10px]">
                <label
                  htmlFor="message"
                  className="font-sans text-base font-normal text-[#333]"
                >
                  お問い合わせ内容
                </label>
                <RequiredBadge />
              </div>
              <textarea
                id="message"
                rows={10}
                maxLength={2000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full resize-none rounded-lg border border-[#ccc] bg-white px-4 py-3 font-sans text-base text-[#333] transition-colors focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none"
              />
              <p className="text-right font-sans text-xs text-[#999]">
                {message.length} / 2000
              </p>
            </div>

            {/* 送信ボタン */}
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === "sending"}
                className="h-12 w-[200px] rounded-full border border-[#ccc] bg-white font-sans text-base text-[#333] transition-all duration-200 hover:border-[#003366] hover:bg-[#003366] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "sending" ? "送信中..." : "送信する"}
              </button>
            </div>

            {/* エラー表示 */}
            {status === "error" && (
              <p className="text-center font-sans text-sm text-red-500">
                送信に失敗しました。時間をおいて再度お試しください。
              </p>
            )}
          </div>
        )}
      </div>
    </PageShell>
  );
}
