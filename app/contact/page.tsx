import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContactForm } from '@/components/ContactForm';
import { NAV_PATHS } from '../constants/config';

export default function ContactPage() {
  return (
    <main className='max-w-6xl mx-auto px-6 md:px-16'>
      <section className='max-w-4xl mx-auto px-6 pt-48 pb-10 text-center'>
        <div className='flex flex-col'>
          <span className='text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-400 mb-2'>
            Ready to start a project?
          </span>
          <h1 className='text-center text-4xl md:text-5xl font-black tracking-[0.2em] mb-8 text-gray-800 uppercase'>
            Contact
          </h1>
        </div>
        <p className='text-base md:text-lg font-medium text-zinc-800 leading-relaxed tracking-tight'>
          制作のご依頼、採用に関するご相談など、
          <br className='hidden md:block' />
          お気軽にお問い合わせください。
        </p>
      </section>
      <div className='w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] relative'>
        <div className='max-w-2xl mx-auto px-6 space-y-12'>
          <Breadcrumbs parent={NAV_PATHS.CONTACT} />
        </div>
      </div>

      <div className='grow'>
        <ContactForm showTitle={false} />
      </div>
    </main>
  );
}
