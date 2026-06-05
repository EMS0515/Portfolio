// LandingPage.tsx
import { useNavigate } from "react-router-dom";
import "../styles/landingpage.css";

const SKILLS = [
  { label: "React",      tag: "Frontend" },
  { label: "JavaScript", tag: "Language" },
  { label: "TypeScript", tag: "Language" },
  { label: "Python",     tag: "Language" },
  { label: "Java",       tag: "Language" },
  { label: "C++",        tag: "Language" },
  { label: "FastAPI",    tag: "Backend"  },
  { label: "SQLAlchemy", tag: "ORM" },
  { label: "PostgreSQL", tag: "Database" },
  { label: "MongoDB",     tag: "Database"   },
  { label: "Google Cloud",tag: "Cloud Computing"   },
  { label: "Docker",     tag: "DevOps"   },
  { label: "Git",        tag: "Tooling"  },
];

const PROJECTS = [
  {
    name: "PyBoard",
    desc: "A Trello-inspired project management app. This is an in progress system updating a similar system built for a university project.",
    stack: ["React","TypeScript", "Python", "FastAPI", "PostgreSQL", "Docker"],
    featured: true,
    path: "/pyboard"
  },

    {
    name: "Fluid Ball",
    desc: "Simple WebGL2 interactive particle simulation using React and TypeScript with sliders for adjusting parameters.",
    stack: ["React", "TypeScript", "WebGL2"],
    featured: true,
    path: "/fluidball"
  }
];

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="lp-root">

      <section className="lp-hero">
        <p className="lp-eyebrow">Hi, I'm</p>
        <h1>Eric Stout</h1>
        <p className="lp-role">Full-Stack Developer · CS Student at ECU</p>
        <div className="lp-hero-actions">
          <a href="#projects" className="lp-btn lp-btn-ghost">See Projects</a>
        </div>
      </section>

      <section className="lp-section" id="about">
        <h2>About</h2>
          <p>
            I am a fulltime student at East Carolina University working on a masters of Science in Computer Science
            while also working on 2 certifications. Those two certificates being Intelligent systems and Software Engineering.
            Through my coursework, I have developed a strong foundation in programming principles and problem-solving,
            with the ability to apply these skills across multiple popular programming languages.
          </p>
          <p>
            Recently, my focus has shifted toward web development and database-driven applications, where I have been building
            hands-on experience with modern web technologies and data management using the react framework. I also have experience
            with software engineering documentation, development processes, and collaborative workflows. I am passionate about
            continuing to grow as a software engineer and applying my technical skills to real-world projects and professional environments.
          </p>
      </section>

      <section className="lp-section lp-alt" id="skills">
        <h2>Skills</h2>
        <div className="lp-skills">
          {SKILLS.map(({ label, tag }) => (
            <div className="lp-chip" key={label}>
              <span>{label}</span>
              <span className="lp-chip-tag">{tag}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="lp-section" id="projects">
        <h2>Projects</h2>
        <div className="lp-projects">
          {PROJECTS.map(({ name, desc, stack, featured, path }) => (
            <div className={`lp-card ${featured ? "lp-card-featured" : ""}`} key={name}>
              <div className="lp-card-top">
                {featured && <span className="lp-badge">Featured</span>}
              </div>
              <h3>{name}</h3>
              <p>{desc}</p>
              <div className="lp-stack">
                {stack.map(s => <span key={s}>{s}</span>)}
              </div>
              {featured && <button onClick={() => navigate(path)} className="lp-btn lp-btn-sm">Launch →</button>}
            </div>
          ))}
        </div>
      </section>

      <section className="lp-section lp-alt" id="contact">
        <h2>Contact</h2>
        <p>Open to internships, collaborations, and other employment opportunities.</p>
        <div className="lp-contact">
          <a href="mailto:you@email.com">✉ eric.stout15@gmail.com</a>
          <a href="https://github.com/EMS0515" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/ericstout2003/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="/resume" target="_blank" rel="noreferrer">Resume ↗</a>
        </div>
      </section>

      <footer className="lp-footer">
        Built with React TypeScript · {new Date().getFullYear()}
      </footer>

    </div>
  );
};