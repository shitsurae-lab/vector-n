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
          <h1 className='font-michroma text-center font-bold text-2xl md:text-3xl tracking-[0.5em] text-zinc-800 uppercase mb-8 md:mb-12'>
            Contact
          </h1>
        </div>
        <p className='flex flex-col text-base md:text-lg font-medium text-zinc-800 leading-relaxed tracking-tight'>
          <span className='inline-block'>
            制作のご依頼、採用に関するご相談など、
          </span>
          <span className='inline-block'> お気軽にお問い合わせください。</span>
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
