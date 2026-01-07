import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold">
              <span className="text-emerald-400">B</span>radley{" "}
              <span className="text-emerald-400">E</span>xton
            </Link>
            <p className="text-slate-400 mt-2 text-sm">
              Senior Full-Stack Developer
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-400">
              Quick Links
            </h4>
            <nav className="space-y-2">
              <Link
                href="/about"
                className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm"
              >
                About
              </Link>
              <Link
                href="/services"
                className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-400">
              Connect
            </h4>
            <nav className="space-y-2">
              <a
                href="https://www.linkedin.com/in/bradley-exton-7aa347136/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/bradleyexton"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="mailto:bradley@bradleyexton.ca"
                className="block text-slate-300 hover:text-emerald-400 transition-colors text-sm"
              >
                Email
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Bradley Exton. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">Barrie, Ontario, Canada</p>
        </div>
      </div>
    </footer>
  );
}
