import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { NAV_PATHS } from "../constants/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};
export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 md:px-16">
      <section className="mx-auto max-w-4xl px-6 pt-48 pb-10 text-center">
        <div className="flex flex-col">
          <span className="mb-2 text-[10px] font-bold tracking-[0.4em] text-zinc-400 uppercase">
            Ready to start a project?
          </span>
          <h1 className="font-michroma mb-8 text-center text-2xl font-bold tracking-[0.5em] text-zinc-800 uppercase md:mb-12 md:text-3xl">
            Contact
          </h1>
        </div>
        <p className="flex flex-col text-base leading-relaxed font-medium tracking-tight text-zinc-800 md:text-lg">
          <span className="inline-block">
            制作のご依頼、採用に関するご相談など、
          </span>
          <span className="inline-block"> お気軽にお問い合わせください。</span>
        </p>
      </section>
      <div className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-screen">
        <div className="mx-auto max-w-2xl space-y-12 px-6">
          <Breadcrumbs parent={NAV_PATHS.CONTACT} />
        </div>
      </div>

      <div className="grow">
        <ContactForm showTitle={false} />
      </div>
    </main>
  );
}
