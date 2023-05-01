import Hero from "@/components/sections/hero"
import Layout from "@/components/layout"
import About from "@/components/sections/about"
import Projects from "@/components/sections/projects"

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Projects />
      <About />
    </Layout>
  )
}
