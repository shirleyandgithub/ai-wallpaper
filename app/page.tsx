import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Wallpapers from "@/components/wallpapers";
import Image from "next/image";


export default function Home() {
  return (
    <div className="w-screen h-screen">
      <Header />
      <Hero />
      <Wallpapers />
      <Footer />
    </div>
  )
}
