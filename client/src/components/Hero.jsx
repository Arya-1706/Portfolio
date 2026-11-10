
export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 pb-20 pt-28 md:px-12"
    >
      <h1 className="relative z-10 text-center font-display text-[19vw] leading-[0.8] tracking-tight text-cream md:text-[15vw]">
        ARYA JHA
      </h1>

      <div className="mx-auto -mt-[4vw] grid max-w-6xl items-end gap-10 md:grid-cols-3">
        <div className="order-2 md:order-1">
          {/* TODO: replace with a line in your own words */}
          <p className="font-display text-3xl leading-snug text-ink md:text-4xl">
            Engineering full-stack applications,
            exploring AI & ML,
            and growing through open source.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/#projects"
              className="rounded-full bg-rose px-6 py-3 font-mono text-xs uppercase tracking-widest text-[#120708] transition hover:bg-cream hover:text-base"
            >
              See my work
            </a>

            <a
              href="/Arya_Jha_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-cream/40 px-6 py-3 font-mono text-xs uppercase tracking-widest text-cream transition hover:border-cream"
            >
              Resume
            </a>
          </div>
        </div>

        <img
          src="/arya.webp"
          alt="Portrait of Arya Jha"
          width="340"
          height="520"
          fetchPriority="high"
          className="order-1 mx-auto h-[420px] w-[300px] rounded-t-full object-cover md:order-2 md:h-[520px] md:w-full md:max-w-[340px]"
        />

        <div className="order-3 text-sm leading-relaxed text-muted">
          <p>
            I'm a Computer Science and Business Systems student
            interested in building full-stack applications and
            exploring practical applications of AI.
          </p>

          <p className="mt-4">
            Currently working on backend systems, AI-powered tools,
            and strengthening my problem-solving skills.
          </p>

          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-cream">
            B.Tech CSBS / IET-DAVV, Indore
          </p>
        </div>
      </div>
    </section>
  );
}
