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
      <link rel="icon" href="/img/favicon.svg" />
      <link rel="mask-icon" href="/img/mask-icon.svg" color="#0a0a0a" />
      <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" />
      <meta name="theme-color" content="#0a0a0a" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  )
}

export default Meta
