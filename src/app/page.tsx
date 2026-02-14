import { Analytics } from "@vercel/analytics/react"
import Hero from "@/sections/hero"
import Layout from "@/components/layout"
import About from "@/sections/about"
import Projects from "@/sections/projects"
import CtaSection from "@/sections/ctaSection"
import Footer from "@/components/footer"
import Marquee from "@/sections/marquee"

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Marquee />
      <Projects />
      <About />
      <CtaSection />
      <Footer />
      <Analytics />
    </Layout>
  )
}

export default Home
