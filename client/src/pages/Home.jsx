
import Hero from '../components/Hero.jsx';
import ProjectsSection from '../components/ProjectsSection.jsx';
import About from '../components/About.jsx';
import Process from '../components/Process.jsx';
import Tools from '../components/Tools.jsx';
import Footer from '../components/Footer.jsx';
import Contact from '../components/Contact.jsx';
import useProjects from '../hooks/useProjects.js';
import usePageTitle from '../hooks/usePageTitle.js';


export default function Home() {
  const { projects, loading, error } = useProjects();
  usePageTitle('Home');

  return (
    <>
      <Hero />
      <ProjectsSection
        projects={projects}
        loading={loading}
        error={error}
      />
      <About />
      <Process />
      <Tools />
      <Contact />
      <Footer />
    </>
  );
}
