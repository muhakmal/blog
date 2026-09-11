import { profileData } from "../data/profile";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import { Briefcase, GraduationCap, BookOpen, Download } from "lucide-react";
import PostCard from "../components/PostCard";

export default async function Home() {
  const allPostsData = getSortedPostsData().slice(0, 4); // Get top 4 posts

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 flex flex-col gap-24">
      {/* HERO SECTION */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
          <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight text-neu-fg">
            Hi, I'm Muhamad.
          </h1>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-neu-accent">
            {profileData.role}
          </h2>
          <p className="text-neu-muted text-lg md:text-xl leading-relaxed max-w-2xl">
            Building digital products and exploring the intersection of technology, business, and human behavior.
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
            {profileData.social.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-neu-sm bg-neu-bg shadow-neu-extruded-sm hover:-translate-y-0.5 hover:shadow-neu-extruded hover:text-neu-accent active:translate-y-0 active:shadow-neu-inset-sm transition-all duration-300 text-sm font-bold text-neu-muted"
              >
                {s.name}
              </a>
            ))}
          </div>

          <div className="pt-6 flex flex-wrap justify-center md:justify-start gap-6">
            <Link 
              href="mailto:muhamad.akmal@outlook.co.id"
              className="flex items-center gap-2 px-8 py-4 bg-neu-accent text-white font-bold rounded-neu-sm shadow-[5px_5px_10px_rgba(108,99,255,0.4),-5px_-5px_10px_rgba(255,255,255,0.1)] hover:-translate-y-1 hover:shadow-[7px_7px_15px_rgba(108,99,255,0.5),-7px_-7px_15px_rgba(255,255,255,0.1)] active:translate-y-0.5 active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)] transition-all duration-300"
            >
              Contact Me
            </Link>
            <Link 
              href="/posts"
              className="flex items-center gap-2 px-8 py-4 bg-neu-bg text-neu-fg font-bold rounded-neu-sm shadow-neu-extruded hover:-translate-y-1 hover:shadow-neu-extruded-hover active:translate-y-0.5 active:shadow-neu-inset-sm transition-all duration-300"
            >
              Read Blog
            </Link>
          </div>
        </div>
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-2 shadow-neu-inset-deep bg-neu-bg shrink-0">
          <div className="w-full h-full rounded-full shadow-neu-extruded bg-neu-bg flex items-center justify-center overflow-hidden border-4 border-transparent">
            <span className="font-display font-extrabold text-7xl text-neu-accent tracking-tighter">M.A.</span>
          </div>
        </div>
      </section>

      {/* RECENT POSTS SECTION (Moved up) */}
      <section className="flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-neu-inner shadow-neu-inset bg-neu-bg text-neu-accent">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-3xl text-neu-fg">Tulisan Terbaru</h3>
          </div>
          <Link href="/posts" className="hidden md:flex text-sm font-bold text-neu-accent hover:underline">
            Lihat semua →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allPostsData.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        <Link 
          href="/posts"
          className="md:hidden flex items-center justify-center gap-2 py-4 bg-neu-bg text-neu-fg font-bold rounded-neu-sm shadow-neu-extruded hover:-translate-y-1 hover:shadow-neu-extruded-hover active:translate-y-0.5 active:shadow-neu-inset-sm transition-all duration-300"
        >
          Lihat Semua Tulisan
        </Link>
      </section>

      {/* EXPERIENCE & EDUCATION GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Experience */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-neu-inner shadow-neu-inset bg-neu-bg text-neu-accent">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-3xl text-neu-fg">Experience</h3>
          </div>
          <ul className="flex flex-col gap-8">
            {profileData.experience.map((exp, idx) => (
              <li key={idx} className="p-8 rounded-neu bg-neu-bg shadow-neu-extruded hover:-translate-y-1 hover:shadow-neu-extruded-hover transition-all duration-300">
                <div className="text-sm font-bold text-neu-accent mb-2 tracking-wide">{exp.dateStart} — {exp.dateEnd}</div>
                <h4 className="font-display font-bold text-xl text-neu-fg mb-1">{exp.title}</h4>
                <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-neu-muted hover:text-neu-accent transition-colors font-medium text-sm mb-4 block">
                  {exp.company}
                </a>
                <p className="text-sm text-neu-muted leading-relaxed whitespace-pre-line">{exp.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Education & Skills */}
        <div className="flex flex-col gap-12">
          {/* Skills */}
          <section className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-neu-inner shadow-neu-inset bg-neu-bg text-neu-accent">
                <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <h3 className="font-display font-bold text-3xl text-neu-fg">Skills</h3>
            </div>
            <div className="p-8 rounded-neu bg-neu-bg shadow-neu-extruded hover:-translate-y-1 hover:shadow-neu-extruded-hover transition-all duration-300">
              <ul className="flex flex-col gap-4">
                {profileData.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-neu-muted leading-relaxed font-medium">
                    <span className="text-neu-accent mt-0.5 shrink-0">❖</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Education */}
          <section className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-neu-inner shadow-neu-inset bg-neu-bg text-neu-accent">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-3xl text-neu-fg">Education</h3>
            </div>
            <ul className="flex flex-col gap-6">
              {profileData.education.map((edu, idx) => (
                <li key={idx} className="p-6 rounded-neu bg-neu-bg shadow-neu-extruded hover:-translate-y-1 hover:shadow-neu-extruded-hover transition-all duration-300">
                  <div className="text-sm font-bold text-neu-accent mb-1 tracking-wide">{edu.year}</div>
                  <h4 className="font-display font-bold text-lg text-neu-fg mb-1">{edu.course}</h4>
                  <p className="text-sm text-neu-muted font-medium">{edu.institution}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </div>
  );
}
