import { Analytics } from "@vercel/analytics/react"
import Hero from "@/sections/hero"
import Layout from "@/components/layout"
import About from "@/sections/about"
import Projects from "@/sections/projects"
import Footer from "@/components/footer"

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Projects />
      <About />
      <Footer />
      <Analytics />
    </Layout>
  )
}

export default Home
