import Hero from "@/components/Hero/HeroSection";
import About from "@/components/top/AboutSection";
import Toolbox from "@/components/top/ToolboxSection";
import { worksRepository } from "@/app/features/works/api/repository";
import WorksSection from "@/components/top/WorksSection";
export default async function Page() {
  // Server Component でデータ取得
  // WorksSection は "use client" なので、ここで fetch して props で渡す
  const categories = await worksRepository.getAllCategories();
  return (
    <>
      <Hero />
      <About />
      <Toolbox />
      <WorksSection categories={categories} />
    </>
  );
}
