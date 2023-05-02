import Head from "next/head"

const Meta = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        key="viewport"
        content="width=device-width, height=device-height, initial-scale=1, shrink-to-fit=no"
      />

      <title>Manuel Garcia Genta | Web Developer</title>
      <meta
        name="description"
        content="GGManolo is a Creative Frontend Deveveloper"
      />
      <meta property="og:image" content="/img/og.jpg" />
      <link rel="icon" href="/img/favicon.ico" />
    </Head>
  )
}

export default Meta
