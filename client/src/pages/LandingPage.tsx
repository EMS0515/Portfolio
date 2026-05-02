// LandingPage.tsx
import { useNavigate } from "react-router-dom";
import "../styles/landingpage.css";

const SKILLS = [
  { label: "React",      tag: "Frontend" },
  { label: "TypeScript", tag: "Language" },
  { label: "Python",     tag: "Language" },
  { label: "FastAPI",    tag: "Backend"  },
  { label: "PostgreSQL", tag: "Database" },
  { label: "Docker",     tag: "DevOps"   },
  { label: "Java",       tag: "Language" },
  { label: "Git",        tag: "Tooling"  },
];

const PROJECTS = [
  {
    name: "PyBoard",
    desc: "A Trello-inspired project management app with a React frontend, FastAPI backend, and PostgreSQL database. still in progress.",
    stack: ["React", "FastAPI", "PostgreSQL", "Docker"],
    github: "https://github.com/yourusername/pyboard",
    featured: true,
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
          WIP - This section is still being developed.
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
          {PROJECTS.map(({ name, desc, stack, github, featured }) => (
            <div className={`lp-card ${featured ? "lp-card-featured" : ""}`} key={name}>
              <div className="lp-card-top">
                {featured && <span className="lp-badge">Featured</span>}
                <a href={github} target="_blank" rel="noreferrer" className="lp-card-gh">GitHub ↗</a>
              </div>
              <h3>{name}</h3>
              <p>{desc}</p>
              <div className="lp-stack">
                {stack.map(s => <span key={s}>{s}</span>)}
              </div>
              {featured && <button onClick={() => navigate("/pyboard")} className="lp-btn lp-btn-sm">Launch →</button>}
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
        </div>
      </section>

      <footer className="lp-footer">
        Built with React & FastAPI · {new Date().getFullYear()}
      </footer>

    </div>
  );
};