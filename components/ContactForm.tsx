"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"; // sonnerをインポート
import { ArrowRight } from "lucide-react";
import { sendEmail } from "@/app/actions/sendEmail";
import { Contact } from "resend";

gsap.registerPlugin(ScrollTrigger);

interface ContactFormProps {
  showTitle?: boolean;
}

export const ContactForm = ({ showTitle = true }: ContactFormProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);

  // 入力項目がふわっと出るアニメーション
  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.from(".animate-form-item", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: containerRef },
  );

  // 送信処理
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await sendEmail(formData);

      if (result.success) {
        // ✨ 美しい通知を表示
        toast.success("メッセージを送信しました", {
          description: "内容を確認次第、折り返しご連絡いたします。",
        });
        formRef.current?.reset();
      } else {
        toast.error("送信に失敗しました", {
          description: "お手数ですが、時間をおいて再度お試しください。",
        });
      }
    } catch (error) {
      toast.error("通信エラーが発生しました");
    } finally {
      setPending(false);
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-screen py-20"
    >
      {showTitle && (
        <h2 className="animate-form-item mb-8 text-center font-[family-name:var(--font-michroma)] text-3xl font-bold tracking-[0.5em] text-gray-800 uppercase md:text-4xl">
          contact
        </h2>
      )}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl space-y-12 px-6"
      >
        {/* 名前入力 */}
        <div className="animate-form-item space-y-4">
          <label className="ml-1 block text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase">
            Name
          </label>
          <Input
            name="name"
            required
            placeholder="Your Name"
            className="h-auto rounded-none border-x-0 border-t-0 border-b border-zinc-200 bg-transparent px-1 pb-4 text-base text-zinc-900 transition-all placeholder:text-sm placeholder:tracking-wider placeholder:text-zinc-300 focus-visible:border-zinc-900 focus-visible:ring-0 md:text-lg"
          />
        </div>

        {/* メールアドレス入力 */}
        <div className="animate-form-item space-y-4">
          <label className="ml-1 block text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase">
            Email Address
          </label>
          <Input
            name="email"
            type="email"
            required
            placeholder="example@mail.com"
            className="h-auto rounded-none border-x-0 border-t-0 border-b border-zinc-200 bg-transparent px-1 pb-4 text-base text-zinc-900 transition-all placeholder:text-sm placeholder:tracking-wider placeholder:text-zinc-300 focus-visible:border-zinc-900 focus-visible:ring-0 md:text-lg"
          />
        </div>

        {/* メッセージ入力 */}
        <div className="animate-form-item space-y-4">
          <label className="ml-1 block text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase">
            Message
          </label>
          <Textarea
            name="message"
            required
            placeholder="How can I help you?"
            className="h-auto min-h-[150px] rounded-none border-x-0 border-t-0 border-b border-zinc-200 bg-transparent px-1 pb-4 text-base text-zinc-900 transition-all placeholder:text-sm placeholder:tracking-wide placeholder:text-zinc-300 focus-visible:border-zinc-900 focus-visible:ring-0 md:text-lg"
          />
        </div>

        {/* 送信ボタン */}
        <div className="animate-form-item pt-10 text-center">
          <Button
            type="submit"
            disabled={pending}
            className="group min-w-[240px] rounded-full bg-zinc-900 px-12 py-8 text-[10px] font-bold tracking-[0.3em] text-white uppercase shadow-2xl transition-all hover:bg-black"
          >
            {pending ? "Sending..." : "Send Message"}
            <ArrowRight className="ml-3 h-4 w-4 transform transition-transform group-hover:translate-x-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};
