import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/NavBar";
import { Projects } from "@/components/Projects";
import { Timeline } from "@/components/Timeline";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Timeline />      
      <Projects />
    </>
  );
}
