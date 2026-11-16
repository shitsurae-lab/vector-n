import Hero from "@/components/Hero/HeroSection";
import About from "@/components/top/AboutSection";
import Toolbox from "@/components/top/ToolboxSection";
import { worksRepository } from "@/app/features/works/api/repository";
import LatestWorksSection from "@/components/top/LatestWorksSection";
import WorksSection from "@/components/top/WorksSection";
export default async function Page() {
  // Server Component でデータ取得
  // WorksSection は "use client" なので、ここで fetch して props で渡す
  const [categories, latestWorks] = await Promise.all([
    worksRepository.getAllCategories(), //repository.tsで定義された引換券を渡して、中身を受け取る
    worksRepository.getLatestWorks(4), //repository.tsで定義した最近の実績の中身 ⇒ **分割代入**としてlatestWorksに代入される
  ]);
  return (
    <>
      <Hero />
      <About />
      <Toolbox />
      <WorksSection categories={categories} />
      {/* props として、部品に渡す */}
      <LatestWorksSection works={latestWorks} />
      {/* works は「WorkDataの配列を受け取る」ための名前。(荷物に貼った宛名ラベル(受取人と決めた名前))*/}
      {/* latestWorksは『値』であり、 『=』で値にラベルを貼っている*/}
    </>
  );
}
