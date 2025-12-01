import VideoHero from "@/components/VideoHero";

// ✅ Import CMS data
import aboutData from "../content/about.json";

const About = () => {
  const team = aboutData.team && aboutData.team.length > 0
    ? aboutData.team
    : [
        {
          name: "Caroline Menchaca",
          role: "Master Stylist & Founder",
          image: "/uploads/caroline-1.jpeg",
          bio: "21+ years of experience. Licensed cosmetologist specializing in custom wigs, locs, and transformative styling.",
        },
      ];

  const processSteps = aboutData.process_steps || [
    {
      step: 1,
      title: "Consultation",
      description: "We listen to your vision and assess your needs to create a customized plan.",
    },
    {
      step: 2,
      title: "Personalization",
      description: "Our experts tailor treatments and techniques specifically for your unique features.",
    },
    {
      step: 3,
      title: "Transformation",
      description: "Experience the artistry as we bring your vision to life with precision and care.",
    },
    {
      step: 4,
      title: "After Care",
      description: "Receive expert guidance on maintaining your look and scheduling follow-ups.",
    },
  ];

  return (
    <main>
      <VideoHero
  height={aboutData.hero_height || "h-[60vh]"}
  videoUrl={
    "https://vimeo.com/1130824098?fl=ip&fe=ec" +
    "&autoplay=1&muted=1&playsinline=1&background=1"
  }
  imageFallback={aboutData.hero_image}
/>




      {/* Added spacing between hero video and content */}
      <div className="py-8 md:py-12"></div>

      {/* Hero Title Section */}
      <section className="py-4 md:py-8 px-6 bg-background">
        <div className="container mx-auto text-center">
          {/* Updated title with smaller size and white color */}
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-serif italic text-white mb-2 md:mb-4">
            {aboutData.hero_title || "Meet Our Stylist Caroline"}
          </h1>
          {/* IMAGE immediately after heading */}
          <div className="flex justify-center mb-8">
            <div className="rounded-lg overflow-hidden shadow-elegant max-w-md">
              <img
                src={aboutData.hero_image || aboutData.team?.[0]?.image || "/uploads/caroline-profile.jpg"}
                alt={aboutData.hero_image_alt || aboutData.team?.[0]?.name || "Stylist Caroline"}
                className="w-full h-96 object-cover hover:scale-105 transition-smooth"
              />
            </div>
          </div>
        </div>
        {/* ABOUT TEXT PARAGRAPHS - Updated to white and italic */}
        <div className="container mx-auto max-w-2xl text-center">
          {(aboutData.about_caroline_paragraphs || []).map((p: string, i: number) => (
            <p key={i} className="font-sans text-lg leading-relaxed mb-6 italic text-white">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Our Story section removed as requested */}

     {/* ✅ Our Process */}
<section className="py-20 px-6 bg-card">
  <div className="container mx-auto max-w-4xl">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-serif italic mb-6">
        {aboutData.process_title || "Our Process"}
      </h2>
      <p className="text-lg italic font-bold text-[#F5D0C5]">
        {aboutData.process_description ||
          "Every visit is a personalized journey designed to exceed your expectations."}
      </p>
    </div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-accent text-black flex items-center justify-center font-bold text-xl">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;