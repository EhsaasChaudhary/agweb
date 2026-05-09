export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-glow to-glow-secondary bg-clip-text text-transparent">
            MySite
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          Experience the future of web design with our glassmorphic interface.
          Scroll down to see the floating header in action.
        </p>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Glassmorphism",
              description:
                "Modern frosted glass effects with backdrop blur and subtle transparency.",
            },
            {
              title: "Light Strand",
              description:
                "A pulsing connection between elements that simulates energy flow.",
            },
            {
              title: "Dark Mode",
              description:
                "Seamless theme switching with the floating toggle bubble.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-foreground/5 backdrop-blur-xl border border-foreground/10 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.1)] hover:bg-foreground/10 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Spacer sections for scroll demonstration */}
      {[1, 2, 3].map((section) => (
        <section key={section} className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Section {section}</h2>
            <p className="text-muted-foreground mb-4">
              Scroll through the page to see how the floating header responds.
              The glassmorphic bubbles create a sense of depth and elegance
              while maintaining excellent readability.
            </p>
            <p className="text-muted-foreground">
              Notice how the light strand pulses with a subtle heartbeat
              animation, creating a visual connection between the navigation and
              theme toggle elements.
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
