import type { Metadata } from "next";
import { profileData } from "../../data/profile";
import PrintButton from "../../components/PrintButton";
import { absoluteUrl, pageOpenGraph } from "../../lib/site";

export const metadata: Metadata = {
  title: "CV",
  description: `CV ${profileData.name}, ${profileData.role}.`,
  alternates: { canonical: absoluteUrl("/cv") },
  openGraph: pageOpenGraph(`CV ${profileData.name}`, `CV ${profileData.name}, ${profileData.role}.`, "/cv"),
};

// Same "summary + • bullets" format the home page uses.
function splitDescription(description: string) {
  const lines = description.split("\n").map((line) => line.trim()).filter(Boolean);
  return {
    summary: lines.filter((line) => !line.startsWith("•")),
    bullets: lines.filter((line) => line.startsWith("•")).map((line) => line.replace(/^•\s*/, "")),
  };
}

const sectionTitle = "font-display font-bold text-sm uppercase tracking-widest text-neu-accent print:text-black border-b border-neu-muted/30 pb-2 mb-4";

// A plain, single-column CV generated from data/profile.ts; print styles turn it into a clean PDF.
export default function CvPage() {
  const links = profileData.social.filter((s) => s.url.startsWith("http"));

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 print:p-0 print:max-w-none">
      <div className="flex justify-end mb-8 print:hidden">
        <PrintButton className="flex items-center gap-2 px-6 py-3 bg-neu-accent text-neu-on-accent font-bold rounded-neu-sm shadow-neu-accent hover:shadow-neu-accent-hover transition-all duration-300" />
      </div>

      <article className="p-8 md:p-12 rounded-neu bg-neu-bg border border-neu-edge shadow-neu-extruded print:shadow-none print:border-0 print:p-0 print:bg-white print:text-black flex flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="font-display font-extrabold text-4xl text-neu-fg print:text-black">{profileData.name}</h1>
          <p className="font-display font-bold text-xl text-neu-accent print:text-black">{profileData.role}</p>
          <p className="text-sm text-neu-muted print:text-black flex flex-wrap gap-x-4 gap-y-1">
            <a href={`mailto:${profileData.email}`}>{profileData.email}</a>
            {links.map((s) => (
              <a key={s.name} href={s.url}>
                {s.url.replace(/^https?:\/\/(www\.)?/, "")}
              </a>
            ))}
          </p>
        </header>

        <section>
          <h2 className={sectionTitle}>Profil</h2>
          <p className="text-sm leading-relaxed text-neu-fg print:text-black">{profileData.bio}</p>
        </section>

        <section>
          <h2 className={sectionTitle}>Pengalaman</h2>
          <ol className="flex flex-col gap-6">
            {profileData.experience.map((exp) => {
              const { summary, bullets } = splitDescription(exp.description);
              return (
                <li key={`${exp.company}-${exp.dateStart}`} className="break-inside-avoid">
                  <div className="flex flex-wrap justify-between gap-x-4">
                    <h3 className="font-bold text-neu-fg print:text-black">{exp.title}</h3>
                    <p className="text-sm text-neu-muted print:text-black">
                      {exp.dateStart} — {exp.dateEnd}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-neu-accent print:text-black mb-2">{exp.company}</p>
                  {summary.map((line) => (
                    <p key={line} className="text-sm text-neu-fg print:text-black mb-1">
                      {line}
                    </p>
                  ))}
                  {bullets.length > 0 && (
                    <ul className="list-disc pl-5 text-sm text-neu-muted print:text-black flex flex-col gap-1">
                      {bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        <section className="break-inside-avoid">
          <h2 className={sectionTitle}>Keahlian</h2>
          <ul className="flex flex-col gap-1 text-sm text-neu-fg print:text-black">
            {profileData.skills.map((skill) => {
              const [area, tools] = skill.split(/:\s*/);
              return (
                <li key={skill}>
                  {tools ? (
                    <>
                      <strong>{area}:</strong> {tools}
                    </>
                  ) : (
                    skill
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="break-inside-avoid">
          <h2 className={sectionTitle}>Pendidikan</h2>
          <ul className="flex flex-col gap-3">
            {profileData.education.map((edu) => (
              <li key={edu.institution} className="flex flex-wrap justify-between gap-x-4 text-sm">
                <span className="text-neu-fg print:text-black">
                  <strong>{edu.course}</strong> — {edu.institution}
                </span>
                <span className="text-neu-muted print:text-black">{edu.year}</span>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
