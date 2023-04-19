import { useEffect, useMemo, useState } from 'react';

import s from './hero.module.scss'

const Hero = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [showWord, setShowWord] = useState(true);

  const words = useMemo(() => ['DEVELOPER', 'DESIGNER', 'ENTREPRENEUR'], []);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowWord(false);
      setTimeout(() => {
        setWordIndex((prevIndex) =>
          prevIndex === words.length - 1 ? 0 : prevIndex + 1
        );
        setShowWord(true);
      }, 300);
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, [words]);

  useEffect(() => {
    const checkFontLoaded = async () => {
      const font = new FontFace('MyFont', 'url(/fonts/myfont.woff2) format("woff2")');
      await font.load();
      if (document.fonts.check(font)) {
        setFontLoaded(true);
      }
    };

    checkFontLoaded();
  }, []);

  return (
    <div className={s.retrobg}>
      <h1 className={s.title} style={{opacity: fontLoaded ? 1 : 0}}>
        GGMANOLO{' '}
        <span style={{opacity: showWord ? 1 : 0}}>{words[wordIndex]}</span>
      </h1>

      <div className={s.sky}>
        <div className={s.stars}>
          <div className={s.star} style={{ left: '5%', top: '55%', transform: 'scale(2)' }}/>
          <div className={s.star} style={{ left: '7%', top: '5%', transform: 'scale(2)' }}/>
          <div className={s.star} style={{ left: '10%', top: '45%', transform: 'scale(1)' }}/>
          <div className={s.star} style={{ left: '12%', top: '35%', transform: 'scale(1)' }}/>
          <div className={s.star} style={{ left: '15%', top: '39%', transform: 'scale(1)' }}/>
          <div className={s.star} style={{ left: '20%', top: '10%', transform: 'scale(1)' }}/>
          <div className={s.star} style={{ left: '35%', top: '50%', transform: 'scale(2)' }}/>
          <div className={s.star} style={{ left: '40%', top: '16%', transform: 'scale(2)' }}/>
          <div className={s.star} style={{ left: '43%', top: '28%', transform: 'scale(1)' }}/>
          <div className={s.star} style={{ left: '45%', top: '30%', transform: 'scale(3)' }}/>
          <div className={s.star} style={{ left: '55%', top: '18%', transform: 'scale(1)' }}/>
          <div className={s.star} style={{ left: '60%', top: '23%', transform: 'scale(1)' }}/>
          <div className={s.star} style={{ left: '62%', top: '44%', transform: 'scale(2)' }}/>
          <div className={s.star} style={{ left: '67%', top: '27%', transform: 'scale(1)' }}/>
          <div className={s.star} style={{ left: '75%', top: '10%', transform: 'scale(2)' }}/>
          <div className={s.star} style={{ left: '80%', top: '25%', transform: 'scale(1)' }}/>
          <div className={s.star} style={{ left: '83%', top: '57%', transform: 'scale(1)' }}/>
          <div className={s.star} style={{ left: '90%', top: '29%', transform: 'scale(2)' }}/>
          <div className={s.star} style={{ left: '95%', top: '5%', transform: 'scale(1)' }}/>
          <div className={s.star} style={{ left: '96%', top: '72%', transform: 'scale(1)' }}/>
          <div className={s.star} style={{ left: '98%', top: '70%', transform: 'scale(3)' }}/>
        </div>
      </div>
      <div className={s.ground}>
        <div className={s.linesWrap}>
          <div className={s.lines}>
            <div className={s.vlines}>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
              <div className={s.vline}/>
            </div>
            <div className={s.hlines}>
              <div className={s.hline}/>
              <div className={s.hline}/>
              <div className={s.hline}/>
              <div className={s.hline}/>
              <div className={s.hline}/>
              <div className={s.hline}/>
              <div className={s.hline}/>
              <div className={s.hline}/>
            </div>
          </div>
        </div>
        <div className={s.groundShadow}/>
      </div>
    </div>
  )
}

export default Hero
