"use client";

import React from "react";
import { ExternalLink, Github, GraduationCap, Linkedin, Mail, MapPin, Phone, Printer } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { education, roles, summary } from "@/lib/resume";
import { site } from "@/lib/site";
import { skillGroups } from "@/lib/skills";
import { cn } from "@/lib/utils";
import { Chip, Section, SectionHeader } from "./Section";

const contact = [
  { icon: MapPin, label: site.locations.join(" · ") },
  { icon: Mail, label: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: site.phoneDisplay, href: `tel:${site.phone}` },
  { icon: Github, label: "github.com/ranjan2829", href: site.socials.github },
  { icon: Linkedin, label: "linkedin.com/in/ranjan2829", href: site.socials.linkedin },
];

const Rule = ({ children }: { children: React.ReactNode }) => (
  <h4 className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
    {children}
    <span aria-hidden className="h-px flex-1 bg-card-border" />
  </h4>
);

const action =
  "inline-flex h-10 items-center gap-2 rounded-full border border-card-border bg-background/60 px-4 text-[13px] font-medium text-muted backdrop-blur transition-colors hover:border-card-hover hover:text-foreground";

/** The resume as a designed, printable dossier — same content as the Google Doc. */
export function Resume() {
  return (
    <Section id="resume" labelledBy="resume-title" wide>
      <SectionHeader
        index="10"
        eyebrow="Resume"
        id="resume-title"
        title="The one-page version."
        sub="Everything above on a single page. Print it, or open the Google Doc."
      />

      <BlurFade inView>
        <article
          id="resume-sheet"
          className="relative overflow-hidden rounded-[28px] border border-card-border bg-card shadow-[0_40px_120px_-60px_rgba(0,0,0,0.55)]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-80 [background:radial-gradient(60%_100%_at_15%_0%,var(--glow),transparent)] print:hidden"
          />

          {/* Header band */}
          <header className="relative grid gap-10 border-b border-card-border p-7 sm:p-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:p-14">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Résumé</p>
              <p className="mt-3 text-5xl font-semibold leading-none tracking-[-0.05em] sm:text-6xl">{site.name}</p>
              <p className="mt-3 text-lg font-medium text-foreground/80">AI Infrastructure &amp; Full-Stack Engineer</p>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">{summary}</p>
            </div>
            <div className="flex flex-col justify-between gap-8">
              <ul className="flex flex-col gap-3 text-sm">
                {contact.map(({ icon: Icon, label, href }) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-card-border bg-background/60 text-muted">
                      <Icon className="size-3.5" aria-hidden />
                    </span>
                    {href ? (
                      <a
                        href={href}
                        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={cn("break-all transition-colors hover:text-accent", href.startsWith("tel") && "tabular-nums")}
                      >
                        {label}
                      </a>
                    ) : (
                      <span>{label}</span>
                    )}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 print:hidden">
                <button type="button" onClick={() => window.print()} className={action}>
                  <Printer className="size-3.5" aria-hidden /> Print / PDF
                </button>
                <a href={site.resume} target="_blank" rel="noopener noreferrer" className={action}>
                  <ExternalLink className="size-3.5" aria-hidden /> Google Doc
                </a>
              </div>
            </div>
          </header>

          <div className="relative grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            {/* Skills and education */}
            <aside className="flex flex-col gap-12 border-b border-card-border p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <section>
                <Rule>Skills</Rule>
                <div className="flex flex-col gap-6">
                  {skillGroups.map((group) => (
                    <div key={group.category}>
                      <p className={cn("mb-2.5 text-[13px] font-semibold", group.lead ? "text-foreground" : "text-foreground/80")}>
                        {group.category}
                      </p>
                      <ul className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <li key={item}>
                            <Chip className="text-[11px]">{item}</Chip>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <Rule>Education</Rule>
                <div className="flex flex-col gap-4">
                  {education.map((item) => (
                    <div key={item.title} className="flex gap-4 rounded-2xl border border-card-border bg-background/40 p-4">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-card-border text-accent">
                        <GraduationCap className="size-4" aria-hidden />
                      </span>
                      <div>
                        <p className="text-[15px] font-semibold">{item.title}</p>
                        <p className="mt-0.5 text-[13px] text-muted">
                          {item.company} · {item.location}
                        </p>
                        <p className="mt-1.5 font-mono text-[11px] text-muted">
                          {item.detail} · {item.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </aside>

            {/* Experience */}
            <section className="p-7 sm:p-10 lg:p-12">
              <Rule>Experience</Rule>
              <ol className="relative flex flex-col gap-10 border-l border-card-border pl-7">
                {roles.map((role) => (
                  <li key={`${role.company}-${role.date}`} className="relative">
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -left-[33px] top-1.5 size-2.5 rounded-full border-2",
                        role.isActive ? "border-accent-green bg-accent-green" : "border-card-hover bg-card"
                      )}
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="text-lg font-semibold tracking-[-0.02em]">
                        {role.company}
                        <span className="font-normal text-muted"> — {role.title}</span>
                      </h4>
                      <span className="font-mono text-[11px] tabular-nums text-muted">
                        {role.date.replace("Present", "now")}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[13px] text-muted">{role.location}</p>
                    <ul className="mt-3.5 flex flex-col gap-2">
                      {role.highlights.map((point) => (
                        <li key={point} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
                          <span aria-hidden className="mt-[8px] size-1 shrink-0 rounded-full bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <BorderBeam size={240} duration={16} colorFrom="#2997FF" colorTo="#64D2FF" />
        </article>
      </BlurFade>
    </Section>
  );
}
