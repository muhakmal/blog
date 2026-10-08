import { profileData } from "../data/profile";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import { Briefcase, GraduationCap, BookOpen, Layers, ArrowRight, Mail, FileText } from "lucide-react";
import PostCard from "../components/PostCard";

const SectionHeading = ({ id, icon, children }: { id: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center gap-4">
    <div aria-hidden className="w-12 h-12 flex items-center justify-center rounded-neu-inner shadow-neu-inset bg-neu-bg text-neu-accent">
      {icon}
    </div>
    <h2 id={id} className="font-display font-bold text-3xl text-neu-fg">
      {children}
    </h2>
  </div>
);

// Experience descriptions are a summary line followed by "• " bullet lines.
function splitDescription(description: string) {
  const lines = description.split("\n").map((line) => line.trim()).filter(Boolean);
  return {
    summary: lines.filter((line) => !line.startsWith("•")),
    bullets: lines.filter((line) => line.startsWith("•")).map((line) => line.replace(/^•\s*/, "")),
  };
}

const cardClass = "rounded-neu bg-neu-bg border border-neu-edge shadow-neu-extruded";

export default async function Home() {
  const recentPosts = getSortedPostsData().slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col gap-24">
      {/* HERO SECTION */}
      <section aria-labelledby="hero-heading" className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-12">
        <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
          <h1 id="hero-heading" className="font-display font-extrabold text-5xl md:text-7xl tracking-tight text-neu-fg text-balance">
            Hi, I&apos;m Akmal.
          </h1>
          <p className="font-display font-bold text-2xl md:text-3xl text-neu-accent">{profileData.role}</p>
          <p className="text-neu-muted text-base md:text-lg leading-relaxed max-w-2xl">{profileData.bio}</p>

          <ul aria-label="Social links" className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
            {profileData.social.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  {...(s.url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-block px-4 py-2 rounded-neu-sm bg-neu-bg border border-neu-edge shadow-neu-extruded-sm hover:-translate-y-0.5 hover:shadow-neu-extruded hover:text-neu-accent active:translate-y-0 active:shadow-neu-inset-sm motion-reduce:hover:translate-y-0 transition-all duration-300 text-sm font-bold text-neu-muted"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-6">
            <a
              href={`mailto:${profileData.email}`}
              className="flex items-center gap-2 px-8 py-4 bg-neu-accent text-neu-on-accent font-bold rounded-neu-sm shadow-neu-accent hover:-translate-y-1 hover:shadow-neu-accent-hover active:translate-y-0.5 active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)] motion-reduce:hover:translate-y-0 transition-all duration-300"
            >
              <Mail className="w-5 h-5" aria-hidden /> Contact Me
            </a>
            <Link
              href="/posts"
              className="flex items-center gap-2 px-8 py-4 bg-neu-bg text-neu-fg font-bold rounded-neu-sm border border-neu-edge shadow-neu-extruded hover:-translate-y-1 hover:shadow-neu-extruded-hover active:translate-y-0.5 active:shadow-neu-inset-sm motion-reduce:hover:translate-y-0 transition-all duration-300"
            >
              Read Blog
            </Link>
            <Link
              href="/cv"
              className="flex items-center gap-2 px-8 py-4 bg-neu-bg text-neu-fg font-bold rounded-neu-sm border border-neu-edge shadow-neu-extruded hover:-translate-y-1 hover:shadow-neu-extruded-hover active:translate-y-0.5 active:shadow-neu-inset-sm motion-reduce:hover:translate-y-0 transition-all duration-300"
            >
              <FileText className="w-5 h-5" aria-hidden /> CV (PDF)
            </Link>
          </div>
        </div>
        <div aria-hidden className="w-32 h-32 md:w-64 md:h-64 rounded-full p-2 shadow-neu-inset-deep bg-neu-bg shrink-0">
          <div className="w-full h-full rounded-full shadow-neu-extruded bg-neu-bg flex items-center justify-center overflow-hidden">
            <span className="font-display font-extrabold text-4xl md:text-7xl text-neu-accent tracking-tighter">M.A.</span>
          </div>
        </div>
      </section>

      {/* RECENT POSTS */}
      <section aria-labelledby="recent-heading" className="flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <SectionHeading id="recent-heading" icon={<BookOpen className="w-6 h-6" />}>
            Tulisan Terbaru
          </SectionHeading>
          <Link href="/posts" className="hidden md:flex items-center gap-1 text-sm font-bold text-neu-accent hover:underline underline-offset-4">
            Lihat semua <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        <Link
          href="/posts"
          className="md:hidden flex items-center justify-center gap-2 py-4 bg-neu-bg text-neu-fg font-bold rounded-neu-sm border border-neu-edge shadow-neu-extruded active:shadow-neu-inset-sm transition-all duration-300"
        >
          Lihat Semua Tulisan <ArrowRight className="w-4 h-4" aria-hidden />
        </Link>
      </section>

      {/* EXPERIENCE & EDUCATION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section aria-labelledby="experience-heading" className="flex flex-col gap-8">
          <SectionHeading id="experience-heading" icon={<Briefcase className="w-6 h-6" />}>
            Experience
          </SectionHeading>
          <ol className="relative flex flex-col gap-8 border-l-2 border-neu-accent/30 ml-3 pl-6">
            {profileData.experience.map((exp) => {
              const { summary, bullets } = splitDescription(exp.description);
              return (
                <li key={`${exp.company}-${exp.dateStart}`} className={`reveal relative p-8 ${cardClass}`}>
                  <span aria-hidden className="absolute -left-[33px] top-9 w-4 h-4 rounded-full bg-neu-accent ring-4 ring-neu-bg" />
                  <p className="text-sm font-bold text-neu-accent mb-2 tracking-wide">
                    {exp.dateStart} — {exp.dateEnd}
                  </p>
                  <h3 className="font-display font-bold text-xl text-neu-fg mb-1">{exp.title}</h3>
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-neu-muted hover:text-neu-accent transition-colors font-medium text-sm mb-4"
                  >
                    {exp.company}
                  </a>
                  {summary.map((line) => (
                    <p key={line} className="text-sm text-neu-fg/90 leading-relaxed mb-3">
                      {line}
                    </p>
                  ))}
                  {bullets.length > 0 && (
                    <ul className="list-disc marker:text-neu-accent pl-5 flex flex-col gap-2 text-sm text-neu-muted leading-relaxed">
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

        <div className="flex flex-col gap-12">
          <section aria-labelledby="skills-heading" className="flex flex-col gap-8">
            <SectionHeading id="skills-heading" icon={<Layers className="w-6 h-6" />}>
              Skills
            </SectionHeading>
            <div className={`reveal p-8 ${cardClass}`}>
              <ul className="flex flex-col gap-4">
                {profileData.skills.map((skill) => {
                  const [area, tools] = skill.split(/:\s*/);
                  return (
                    <li key={skill} className="flex items-start gap-3 text-sm text-neu-muted leading-relaxed font-medium">
                      <span aria-hidden className="text-neu-accent mt-0.5 shrink-0">❖</span>
                      <span>
                        {tools ? (
                          <>
                            <strong className="text-neu-fg">{area}:</strong> {tools}
                          </>
                        ) : (
                          skill
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          <section aria-labelledby="education-heading" className="flex flex-col gap-8">
            <SectionHeading id="education-heading" icon={<GraduationCap className="w-6 h-6" />}>
              Education
            </SectionHeading>
            <ul className="flex flex-col gap-6">
              {profileData.education.map((edu) => (
                <li key={edu.institution} className={`reveal p-6 ${cardClass}`}>
                  <p className="text-sm font-bold text-neu-accent mb-1 tracking-wide">{edu.year}</p>
                  <h3 className="font-display font-bold text-lg text-neu-fg mb-1">{edu.course}</h3>
                  <p className="text-sm text-neu-muted font-medium">{edu.institution}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
