import Hero from '@/components/sections/hero';
import Layout from '@/components/layout';
import Who from '@/components/sections/who';
import What from '@/components/sections/what';
import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Who />
      <What />
      <Contact />
    </Layout>
  )
}
