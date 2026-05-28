"use client";

import { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { sendEmail } from "@/app/actions/sendEmail";
import { toast } from "sonner";

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
// フィールドアニメーション設定
// ----------------------------------------------------------------
const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ----------------------------------------------------------------
// ContactForm
// ----------------------------------------------------------------
interface ContactFormProps {
  showTitle?: boolean;
}

export const ContactForm = ({ showTitle = true }: ContactFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  async function handleSubmit() {
    if (!name || !email || !message) return;

    setStatus("sending");

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("message", message);

    try {
      const result = await sendEmail(formData);

      if (result.success) {
        toast.success("メッセージを送信しました", {
          description: "内容を確認次第、折り返しご連絡いたします。",
        });
        setName("");
        setEmail("");
        setMessage("");
        setStatus("done");
      } else {
        toast.error("送信に失敗しました", {
          description: "お手数ですが、時間をおいて再度お試しください。",
        });
        setStatus("error");
      }
    } catch {
      toast.error("通信エラーが発生しました");
      setStatus("error");
    }
  }

  const inputClass =
    "h-12 w-full rounded-lg border border-[#ccc] bg-white px-4 font-sans text-base text-[#333] transition-colors focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none";

  return (
    <div className="flex w-full flex-col items-center gap-20 rounded-lg border border-[#e8e8e8] bg-white px-5 py-10 md:rounded-2xl md:px-10 md:py-20 lg:px-40">
      {/* 説明文 */}
      {showTitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full text-center font-sans text-sm leading-[2] font-normal text-[#333] md:max-w-[640px] md:text-base"
        >
          お問い合わせ内容をご入力ください。
          <br />
          お問い合わせの内容により、お返事させていただくまでに、
          <br className="hidden md:block" />
          お時間を頂く場合がございます。
        </motion.p>
      )}

      {/* フォーム */}
      <div className="flex w-full flex-col gap-8 md:max-w-[640px]">
        {/* お名前 */}
        <motion.div
          className="flex flex-col gap-[10px]"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fieldVariants}
        >
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
            className={inputClass}
          />
        </motion.div>

        {/* メールアドレス */}
        <motion.div
          className="flex flex-col gap-[10px]"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fieldVariants}
        >
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
            className={inputClass}
          />
        </motion.div>

        {/* お問い合わせ内容 */}
        <motion.div
          className="flex flex-col gap-[10px]"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fieldVariants}
        >
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
          {/* 文字数カウント */}
          <p className="text-right font-sans text-xs text-[#999]">
            {message.length} / 2000
          </p>
        </motion.div>

        {/* 送信ボタン */}
        <motion.div
          className="flex justify-center pt-4"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fieldVariants}
        >
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === "sending" || status === "done"}
            className="group flex h-12 w-[200px] items-center justify-center gap-2 rounded-full border border-[#ccc] bg-white font-sans text-base text-[#333] transition-all duration-200 hover:border-[#003366] hover:bg-[#003366] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "sending"
              ? "送信中..."
              : status === "done"
                ? "送信しました"
                : "送信する"}
            {status !== "sending" && status !== "done" && (
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            )}
          </button>
        </motion.div>

        {/* エラー表示 */}
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center font-sans text-sm text-red-500"
          >
            送信に失敗しました。時間をおいて再度お試しください。
          </motion.p>
        )}
      </div>
    </div>
  );
};
