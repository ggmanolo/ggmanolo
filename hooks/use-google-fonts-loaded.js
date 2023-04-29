import { useEffect, useState } from "react"

export const useGoogleFontsLoaded = (fontFamilies) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fontTests = fontFamilies.map((fontFamily) => {
      const fontTest = document.createElement("div")
      fontTest.style.fontFamily = fontFamily
      fontTest.style.fontSize = "12px"
      fontTest.style.fontWeight = "400"
      fontTest.style.visibility = "hidden"
      fontTest.textContent = "Test text"
      document.body.appendChild(fontTest)
      return fontTest
    })

    const checkFontsLoaded = setInterval(() => {
      const fontsLoaded = fontTests.every(
        (fontTest) => fontTest.offsetWidth !== 0 || fontTest.offsetHeight !== 0
      )
      if (fontsLoaded) {
        setLoaded(true)
        clearInterval(checkFontsLoaded)
        fontTests.forEach((fontTest) => fontTest.remove())
      }
    }, 100)

    return () => {
      clearInterval(checkFontsLoaded)
      fontTests.forEach((fontTest) => fontTest.remove())
    }
  }, [fontFamilies])

  return loaded
}
