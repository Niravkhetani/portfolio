import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { GSHEET_API_URL } from './utils/const.js';

import LenisProvider from './providers/LenisProvider.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import ScrollProgressBar from './components/ScrollProgressBar/ScrollProgressBar.jsx';
import Hero from './pages/Hero/Hero.jsx';
import Experience from './pages/Experience/Experience.jsx';
import Projects from './pages/Projects/Projects.jsx';
import Skills from './pages/Skills/Skills.jsx';
import Education from './pages/Education/Education.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ── Static data from CV — dynamic fetching commented out ──
const STATIC = {
  githubLink:   'https://github.com/Niravkhetani',
  linkedinLink: 'https://www.linkedin.com/in/nirav-khetani',
};

/*
// Dynamic fetching — uncomment to re-enable Google Sheets API
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GSHEET_API_URL } from './utils/const.js';

function useDynamicData() {
  const [data, setData] = useState(STATIC);
  useEffect(() => {
    axios.get(GSHEET_API_URL)
      .then(res => {
        const row = res.data?.data?.[0];
        if (!row) return;
        setData(prev => ({
          ...prev,
          githubLink:   row.Github   || prev.githubLink,
          linkedinLink: row.Linkedin || prev.linkedinLink,
        }));
      })
      .catch(() => {});
  }, []);
  return data;
}
*/

export default function App() {
  // const data = useDynamicData(); // ← swap this in when re-enabling dynamic fetch
  const data = STATIC;

  return (
    <LenisProvider>
      <ScrollProgressBar />
      <Navbar githubLink={data.githubLink} linkedinLink={data.linkedinLink} />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
        <Footer githubLink={data.githubLink} linkedinLink={data.linkedinLink} />
      </main>
    </LenisProvider>
  );
}
