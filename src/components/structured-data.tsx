const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Manuel Garcia Genta",
    alternateName: "GGManolo",
    description:
      "Senior Frontend & UI Engineer specializing in React, Next.js and product-driven interfaces.",
    url: "https://ggmanolo.com",
    image: "https://ggmanolo.com/img/avatar.png",
    sameAs: [
      "https://www.linkedin.com/in/ggmanolo/",
      "https://github.com/ggmanolo"
    ],
    jobTitle: "Senior Frontend Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Independent / Contract"
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Frontend Architecture",
      "UI Engineering",
      "Design Systems",
      "Product Development",
      "Performance Optimization",
      "Web Applications"
    ],
    email: "hellothere@ggmanolo.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AR"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export default StructuredData
