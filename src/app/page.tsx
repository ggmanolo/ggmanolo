import Hero from "@/components/sections/hero"
import Layout from "@/components/layout"
import About from "@/components/sections/about"
import Projects from "@/components/sections/projects"
import Footer from "@/components/footer"

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Projects />
      <About />
      <Footer />
    </Layout>
  )
}

export default Home
