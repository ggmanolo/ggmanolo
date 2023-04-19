import Meta from '@/components/meta'

const Layout = ({children}) => {
  return (
    <>
      <Meta />
      <main>
        {children}
      </main>
    </>
  )
}

export default Layout
