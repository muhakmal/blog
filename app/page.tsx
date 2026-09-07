import { profileData } from "../data/profile";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import { Briefcase, GraduationCap, ChevronRight, BookOpen } from "lucide-react";

export default function Home() {
  const allPostsData = getSortedPostsData().slice(0, 3); // Get top 3 posts

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 flex flex-col gap-24">
      {/* HERO SECTION */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
          <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight text-neu-fg">
            Hi, I'm {profileData.name.split(' ')[0]}
          </h1>
          <h2 className="font-display font-bold text-xl md:text-2xl text-neu-accent">
            {profileData.role}
          </h2>
          <p className="text-neu-muted text-lg leading-relaxed max-w-2xl">
            {profileData.bio}
          </p>
          <div className="pt-4 flex justify-center md:justify-start gap-6">
            <Link 
              href="mailto:muhamadakmal@outlook.co.id"
              className="flex items-center gap-2 px-8 py-4 bg-neu-accent text-white font-medium rounded-neu-sm shadow-[6px_6px_12px_rgba(108,99,255,0.4),-6px_-6px_12px_rgba(255,255,255,0.5)] hover:-translate-y-1 hover:shadow-[8px_8px_16px_rgba(108,99,255,0.5),-8px_-8px_16px_rgba(255,255,255,0.6)] active:translate-y-0.5 active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)] transition-all duration-300"
            >
              Contact Me
            </Link>
            <Link 
              href="/posts"
              className="flex items-center gap-2 px-8 py-4 bg-neu-bg text-neu-fg font-medium rounded-neu-sm shadow-neu-extruded hover:-translate-y-1 hover:shadow-neu-extruded-hover active:translate-y-0.5 active:shadow-neu-inset-sm transition-all duration-300"
            >
              Read Blog
            </Link>
          </div>
        </div>
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-2 shadow-neu-inset-deep bg-neu-bg shrink-0">
          <div className="w-full h-full rounded-full shadow-neu-extruded bg-neu-bg flex items-center justify-center overflow-hidden border-4 border-transparent">
            {/* Replace with actual avatar logic, for now using initial */}
            <span className="font-display font-bold text-6xl text-neu-accent">M</span>
          </div>
        </div>
      </section>

      {/* EXPERIENCE & EDUCATION GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Experience */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-neu-inner shadow-neu-inset bg-neu-bg text-neu-accent">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-3xl text-neu-fg">Experience</h3>
          </div>
          <div className="flex flex-col gap-8">
            {profileData.experience.map((exp, idx) => (
              <div key={idx} className="p-8 rounded-neu bg-neu-bg shadow-neu-extruded hover:-translate-y-1 hover:shadow-neu-extruded-hover transition-all duration-300">
                <div className="text-sm font-medium text-neu-accent mb-2">{exp.dateStart} — {exp.dateEnd}</div>
                <h4 className="font-display font-bold text-xl text-neu-fg mb-1">{exp.title}</h4>
                <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-neu-muted hover:text-neu-accent transition-colors font-medium text-sm mb-4 block">
                  {exp.company}
                </a>
                <p className="text-sm text-neu-muted leading-relaxed whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Recent Posts */}
        <div className="flex flex-col gap-12">
          {/* Education */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-neu-inner shadow-neu-inset bg-neu-bg text-neu-accent">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-3xl text-neu-fg">Education</h3>
            </div>
            <div className="flex flex-col gap-6">
              {profileData.education.map((edu, idx) => (
                <div key={idx} className="p-6 rounded-neu bg-neu-bg shadow-neu-extruded hover:-translate-y-1 hover:shadow-neu-extruded-hover transition-all duration-300">
                  <div className="text-sm font-medium text-neu-accent mb-1">{edu.year}</div>
                  <h4 className="font-display font-bold text-lg text-neu-fg mb-1">{edu.course}</h4>
                  <p className="text-sm text-neu-muted font-medium">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-neu-inner shadow-neu-inset bg-neu-bg text-neu-accent">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-3xl text-neu-fg">Recent Notes</h3>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {allPostsData.map((post) => (
                <Link key={post.slug} href={`/${post.slug}`} className="group p-6 rounded-neu bg-neu-bg shadow-neu-extruded hover:-translate-y-1 hover:shadow-neu-extruded-hover active:translate-y-0.5 active:shadow-neu-inset-sm transition-all duration-300 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-medium text-neu-muted mb-2">{post.date}</div>
                    <h4 className="font-display font-bold text-lg text-neu-fg group-hover:text-neu-accent transition-colors line-clamp-2">{post.title}</h4>
                  </div>
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-neu-inner shadow-neu-extruded-sm group-hover:shadow-neu-inset group-hover:text-neu-accent transition-all duration-300">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </Link>
              ))}
            </div>
            <Link 
              href="/posts"
              className="mt-4 flex items-center justify-center gap-2 py-4 bg-neu-bg text-neu-fg font-medium rounded-neu-sm shadow-neu-extruded hover:-translate-y-1 hover:shadow-neu-extruded-hover active:translate-y-0.5 active:shadow-neu-inset-sm transition-all duration-300"
            >
              View All Posts <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
