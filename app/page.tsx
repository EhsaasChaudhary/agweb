"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronRight, Mail, MapPin, Phone } from "lucide-react";

const services = [
  {
    title: "Web Development",
    description: "Custom websites and web applications built with cutting-edge technology.",
    icon: "01",
  },
  {
    title: "Digital Strategy",
    description: "Data-driven strategies to grow your online presence and reach.",
    icon: "02",
  },
  {
    title: "Brand Identity",
    description: "Memorable brand experiences that connect with your audience.",
    icon: "03",
  },
  {
    title: "SEO & Marketing",
    description: "Visibility strategies that put you in front of the right people.",
    icon: "04",
  },
];

const caseStudies = [
  {
    title: "E-commerce Platform",
    client: "TechStore Inc.",
    category: "Web Development",
    image: "bg-gradient-to-br from-orange-400 to-rose-500",
  },
  {
    title: "Brand Redesign",
    client: "Luxe Fashion",
    category: "Brand Identity",
    image: "bg-gradient-to-br from-emerald-400 to-cyan-500",
  },
  {
    title: "Marketing Campaign",
    client: "HealthFirst",
    category: "Digital Strategy",
    image: "bg-gradient-to-br from-violet-400 to-purple-500",
  },
];

const testimonials = [
  {
    quote: "Working with this team has been transformative for our business. They truly understand digital.",
    author: "Sarah Chen",
    company: "TechVentures",
  },
  {
    quote: "The results speak for themselves. Our online presence has never been stronger.",
    author: "Michael Roberts",
    company: "GrowthCo",
  },
  {
    quote: "Professional, creative, and always delivering beyond expectations.",
    author: "Emma Williams",
    company: "Creative Studios",
  },
];

const footerLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic text-foreground leading-[0.9] tracking-tight text-balance">
                Building
                <br />
                your digital
                <br />
                foundations
              </h1>
            </div>
            <div className="flex flex-col gap-6 lg:pb-4">
              <p className="text-lg text-foreground/70 max-w-md text-pretty">
                {"We've"} spent the last decade building brand worlds in code. From startups to enterprises, {"we've"} seen it all, and have the results to prove it.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  Say hey
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-foreground/20 hover:bg-foreground/5 transition-colors"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Floating decorative element */}
        <div className="absolute right-10 bottom-20 hidden xl:block pointer-events-none">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl rotate-12 animate-pulse" />
            <div className="absolute inset-4 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl -rotate-6" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-foreground leading-[1.1] tracking-tight text-balance">
                Building digital from the ground-up.
              </h2>
            </div>
            <div className="space-y-6 text-foreground/70 text-lg">
              <p className="text-pretty">
                Real digital success {"doesn't"} come from isolated tactics. It comes from building a connected ecosystem where every part of your digital presence works together.
              </p>
              <p className="text-pretty">
                From your website and SEO to your back-end integrations and social campaigns, we create digital foundations that are strategically planned, carefully layered and designed to perform.
              </p>
              <p className="text-pretty">
                <span className="font-medium text-foreground">We {"don't"} just get you online.</span> We build the kind of digital your competitors wish they had, and the kind your business needs to thrive.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 rounded-full font-medium hover:bg-foreground/5 transition-colors"
                >
                  Learn more
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Isometric blocks decoration */}
          <div className="mt-20 flex justify-center gap-8 opacity-80">
            <div className="relative w-24 h-24 transform rotate-12">
              <div className="absolute inset-0 bg-primary rounded-xl transform -skew-x-6" />
              <div className="absolute -top-3 left-3 w-full h-6 bg-primary/70 rounded-t-xl transform skew-x-12" />
              <div className="absolute top-0 -right-3 w-6 h-full bg-primary/90 rounded-r-xl transform -skew-y-12" />
            </div>
            <div className="relative w-24 h-24 transform -rotate-6">
              <div className="absolute inset-0 bg-secondary rounded-xl transform -skew-x-6" />
              <div className="absolute -top-3 left-3 w-full h-6 bg-secondary/70 rounded-t-xl transform skew-x-12" />
              <div className="absolute top-0 -right-3 w-6 h-full bg-secondary/90 rounded-r-xl transform -skew-y-12" />
            </div>
            <div className="relative w-24 h-24 transform rotate-3 hidden sm:block">
              <div className="absolute inset-0 bg-muted rounded-xl transform -skew-x-6" />
              <div className="absolute -top-3 left-3 w-full h-6 bg-muted/70 rounded-t-xl transform skew-x-12" />
              <div className="absolute top-0 -right-3 w-6 h-full bg-muted/90 rounded-r-xl transform -skew-y-12" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="inline-block px-4 py-2 border border-background/20 rounded-full text-sm mb-6">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              Everything you need to succeed online
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group p-8 rounded-2xl border border-background/10 hover:border-background/20 hover:bg-background/5 transition-all duration-300"
              >
                <span className="text-5xl font-bold text-background/20 group-hover:text-primary transition-colors">
                  {service.icon}
                </span>
                <h3 className="text-2xl font-bold mt-4 mb-3">{service.title}</h3>
                <p className="text-background/70">{service.description}</p>
                <div className="mt-6">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                  >
                    Learn more <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="inline-block px-4 py-2 border border-foreground/20 rounded-full text-sm mb-6">
                Our Work
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-balance">
                Featured projects
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              View all work <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <Link
                key={study.title}
                href="/work"
                className="group"
              >
                <div className={`aspect-[4/3] rounded-2xl ${study.image} mb-6 overflow-hidden`}>
                  <div className="w-full h-full flex items-center justify-center text-white/20 text-6xl font-bold group-hover:scale-105 transition-transform duration-500">
                    {study.client.charAt(0)}
                  </div>
                </div>
                <span className="text-sm text-foreground/50">{study.category}</span>
                <h3 className="text-xl font-bold mt-1 group-hover:text-primary transition-colors">{study.title}</h3>
                <p className="text-foreground/70 mt-1">{study.client}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="inline-block px-4 py-2 border border-background/20 rounded-full text-sm mb-6">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              {"We've"} been collecting these since day one.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-background/5 border border-background/10"
              >
                <p className="text-lg mb-6 text-pretty">{`"${testimonial.quote}"`}</p>
                <div>
                  <p className="font-medium text-primary">{testimonial.author}</p>
                  <p className="text-background/60 text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-foreground mb-6 tracking-tight text-balance">
            Ready to build something great?
          </h2>
          <p className="text-lg text-foreground/70 mb-10 max-w-2xl mx-auto text-pretty">
            {"Let's"} talk about your project and see how we can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg"
            >
              Start a project
              <ArrowUpRight className="w-5 h-5" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-8 py-4 border border-foreground/20 rounded-full font-medium hover:bg-foreground/5 transition-colors"
            >
              View our work
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 md:px-12 lg:px-20 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-medium text-foreground/50 mb-4">Chat to us</h4>
              <div className="space-y-3">
                <a href="tel:+1234567890" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  +1 (234) 567-890
                </a>
                <a href="mailto:hello@agency.com" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  hello@agency.com
                </a>
              </div>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-sm font-medium text-foreground/50 mb-4">Find us</h4>
              <div className="flex items-start gap-2 text-foreground">
                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                <p>
                  123 Creative Street,
                  <br />
                  Design District, NY 10001
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-sm font-medium text-foreground/50 mb-4">Nav</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Back to top */}
            <div className="flex md:justify-end">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-14 h-14 rounded-xl border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Back to top"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Large Logo */}
          <div className="mb-12">
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-foreground leading-none tracking-tight">
              AGENCY
            </h2>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-foreground/10 text-sm text-foreground/50">
            <p>&copy; {new Date().getFullYear()} Agency. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
