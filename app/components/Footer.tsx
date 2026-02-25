export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-800 py-12">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#E02020] font-black text-xl tracking-[0.15em] uppercase">STEIGERN</span>
              <span className="w-1 h-1 rounded-full bg-[#E02020]" />
            </div>
            <p className="text-zinc-600 text-xs tracking-[0.08em]">
              We Enjoy Making Machines
            </p>
          </div>

          <div className="flex flex-wrap gap-8">
            {["Solutions", "Industries", "About", "Careers", "Privacy", "Legal"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-zinc-600 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-zinc-700 text-xs">
            © {new Date().getFullYear()} Steigern GmbH. All rights reserved.
          </p>
          <p className="text-zinc-700 text-xs">
            Parkring 10, 85748 Garching bei München, Germany
          </p>
        </div>
      </div>
    </footer>
  );
}