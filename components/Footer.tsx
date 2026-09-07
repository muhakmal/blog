import { profileData } from "../data/profile";
import { Mail, Globe, User } from "lucide-react";

// Fallback to simple SVGs since lucide-react removed branded icons
const GithubIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const TwitterIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const iconMap: Record<string, React.ReactNode> = {
  Linkedin: <LinkedinIcon />,
  Github: <GithubIcon />,
  Twitter: <TwitterIcon />,
  Mail: <Mail className="w-6 h-6" />,
};

export default function Footer() {
  return (
    <footer className="w-full py-12 mt-16 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_-5px_10px_rgba(163,177,198,0.2)]">
      <div className="text-sm text-neu-muted font-medium">
        © {new Date().getFullYear()} {profileData.name}. All rights reserved.
      </div>
      <div className="flex gap-4">
        {profileData.social.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.name}
            className="flex items-center justify-center w-12 h-12 rounded-neu-sm bg-neu-bg shadow-neu-extruded hover:-translate-y-1 hover:shadow-neu-extruded-hover active:translate-y-0.5 active:shadow-neu-inset-sm transition-all duration-300 text-neu-fg hover:text-neu-accent"
          >
            {iconMap[s.icon] || <span />}
          </a>
        ))}
      </div>
    </footer>
  );
}
