const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Manuel Garcia Genta",
    alternateName: "GGManolo",
    description: "Frontend Developer & UI/UX Specialist",
    url: "https://ggmanolo.com",
    image: "https://ggmanolo.com/img/avatar.png",
    sameAs: [
      "https://www.linkedin.com/in/ggmanolo/",
      "https://github.com/ggmanolo"
    ],
    jobTitle: "Frontend Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance"
    },
    knowsAbout: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "UI/UX Design",
      "Web Development",
      "Frontend Development"
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
