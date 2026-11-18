type Service = {
  slug: string;
  title: string;
  icon: string;
  description: string;
  seoDescription: string;
  features: string[];
  keyFeatures?: string[];
  process?: string[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    icon: "web",
    description:
      "We design and develop modern, responsive websites that help businesses establish a strong online presence. From business websites to advanced web platforms, we create fast, user-friendly digital experiences that work seamlessly across devices.",
    seoDescription:
      "ISTRIVION Technologies builds responsive business websites and custom web applications with user-focused design, performance and SEO fundamentals.",
    features: [
      "Business and corporate websites",
      "Responsive website development",
      "Custom web application development",
      "Landing pages and promotional websites",
      "Website performance and SEO fundamentals",
      "Secure, scalable and maintainable solutions",
    ],
  },
  {
    slug: "app-development",
    title: "App Development",
    icon: "app",
    description:
      "We build thoughtful mobile and web applications designed around real user needs and business goals. From concept to development, we focus on intuitive interfaces, reliable functionality and smooth user experiences.",
    seoDescription:
      "ISTRIVION app development for Android, iOS and cross-platform mobile and web apps, with intuitive interfaces and reliable features.",
    features: [
      "Android application development",
      "iOS application development",
      "Cross-platform application solutions",
      "Custom application interfaces",
      "API and backend integration",
      "Application testing and performance improvements",
    ],
  },
  {
    slug: "e-commerce-solutions",
    title: "E-Commerce Solutions",
    icon: "commerce",
    description:
      "We create online shopping experiences that make it easier for businesses to showcase products, connect with customers and manage digital sales. Our solutions focus on intuitive shopping journeys, responsive design and secure integrations.",
    seoDescription:
      "Build an online store with ISTRIVION Technologies. E-commerce solutions include product catalogs, checkout, payment integrations and order management.",
    features: [
      "Custom online store development",
      "Product catalog and category management",
      "Shopping cart and checkout experiences",
      "Payment gateway integration",
      "Order and inventory management",
      "Responsive shopping experiences",
    ],
  },
  {
    slug: "ui-ux-design-branding",
    title: "UI/UX Design & Branding",
    icon: "design",
    description:
      "We transform ideas into meaningful visual experiences through thoughtful UI/UX design and creative branding. We focus on usability, visual consistency and clear brand identity to help businesses connect with their audience.",
    seoDescription:
      "ISTRIVION Technologies designs intuitive website and app experiences, from UX research and prototypes to visual identity, logos and design systems.",
    features: [
      "User interface (UI) design",
      "User experience (UX) research and planning",
      "Wireframes and interactive prototypes",
      "Website and mobile app design",
      "Logo and brand identity design",
      "Design systems and visual consistency",
    ],
  },
  {
    slug: "portfolio-personal-websites",
    title: "Portfolio & Personal Websites",
    icon: "portfolio",
    description:
      "We create professional portfolio and personal websites that present your skills, achievements, work and identity with clarity. Whether you are a student, freelancer, creator or professional, we help you build a strong digital presence.",
    seoDescription:
      "Create a professional portfolio or personal website with ISTRIVION Technologies to showcase your skills, projects, resume and creative work.",
    features: [
      "Student and fresher portfolios",
      "Professional personal websites",
      "Freelancer and creator portfolios",
      "Resume and project showcases",
      "Personal branding websites",
      "Responsive layouts and interactive elements",
    ],
  },
  {
    slug: "custom-digital-experiences",
    title: "Custom Digital Experiences",
    icon: "experience",
    description:
      "We create personalized digital experiences that turn unique ideas into memorable online interactions. From digital invitations to birthday surprises and special occasion websites, every experience is designed with creativity and attention to detail.",
    seoDescription:
      "ISTRIVION Technologies creates personalized digital experiences, including event invitations, celebration websites, interactive greetings and microsites.",
    features: [
      "Digital invitations and event websites",
      "Birthday and anniversary surprise websites",
      "Interactive greeting experiences",
      "Personalized countdown websites",
      "Custom landing pages and microsites",
      "Creative animations and interactive elements",
    ],
  },
  {
    slug: "logo-design-brand-identity",
    title: "Logo Design & Brand Identity",
    icon: "branding",
    description:
      "We create distinctive logos and complete visual identities that help businesses establish a memorable brand presence. Our services include custom logo design, brand colour palettes, typography selection, business identity concepts, social media branding and brand guidelines.",
    seoDescription:
      "Build a memorable brand identity with ISTRIVION Technologies, including custom logo design, color palettes, typography and practical brand guidelines.",
    features: [
      "Custom logo design",
      "Brand colour palettes",
      "Typography selection",
      "Business identity concepts",
      "Social media branding",
      "Brand guidelines",
    ],
    keyFeatures: [
      "Distinctive visual identity",
      "Consistent brand elements",
      "Practical brand guidelines",
    ],
    process: [
      "Understand your business, audience and visual goals",
      "Explore concepts and develop a clear creative direction",
      "Refine the selected identity and its visual elements",
      "Prepare the agreed brand assets and guidelines",
    ],
  },
  {
    slug: "ai-animation-video-creation",
    title: "AI Animation & Video Creation",
    icon: "video",
    description:
      "We create engaging AI-powered visual content for brands, businesses and personal projects. Services include AI-generated animations, promotional videos, product showcase videos, motion graphics, creative visual storytelling and social media video content.",
    seoDescription:
      "Create AI-powered animations and videos with ISTRIVION Technologies, including promotional content, product showcases, motion graphics and social videos.",
    features: [
      "AI-generated animations",
      "Promotional videos",
      "Product showcase videos",
      "Motion graphics",
      "Creative visual storytelling",
      "Social media video content",
    ],
    keyFeatures: [
      "Purposeful visual storytelling",
      "Content tailored to your project",
      "Formats suited to digital channels",
    ],
    process: [
      "Discuss the audience, objective and content requirements",
      "Develop a concept, script or visual outline",
      "Create and refine the animation or video",
      "Deliver the approved content in agreed formats",
    ],
  },
  {
    slug: "college-projects-academic-solutions",
    title: "College Projects & Academic Solutions",
    icon: "academic",
    description:
      "We support students with academic technology projects, including mini projects, final-year project development, frontend and backend implementation, UI/UX design, AI/ML project guidance, IoT prototypes, technical documentation and project demonstrations. We clearly communicate the scope of work and provide genuine learning-oriented support.",
    seoDescription:
      "Get learning-oriented support for college technology projects, including web development, UI/UX, AI/ML, IoT prototypes, documentation and demos.",
    features: [
      "Mini and final-year project support",
      "Frontend and backend implementation guidance",
      "UI/UX design",
      "AI/ML project guidance",
      "IoT prototypes",
      "Technical documentation and demonstrations",
    ],
    keyFeatures: [
      "Clearly scoped project support",
      "Learning-oriented guidance",
      "Technical concepts explained throughout",
    ],
    process: [
      "Review the academic brief, goals and scope together",
      "Plan a suitable approach and learning milestones",
      "Provide guided implementation and technical feedback",
      "Review documentation and prepare for the demonstration",
    ],
  },
  {
    slug: "research-prototype-development",
    title: "R&D and Prototype Development",
    icon: "research",
    description:
      "We help transform innovative ideas into practical technology solutions through research, concept development, proof of concepts and prototype development. Our areas include IoT, automation, embedded systems, software solutions, hardware integration and experimental technology development.",
    seoDescription:
      "Turn an idea into a proof of concept with ISTRIVION Technologies through research, IoT, automation, embedded systems and prototype development.",
    features: [
      "Research and concept development",
      "Proofs of concept",
      "IoT and automation",
      "Embedded systems",
      "Software and hardware integration",
      "Experimental technology development",
    ],
    keyFeatures: [
      "Idea-to-concept exploration",
      "Practical proof-of-concept work",
      "Iterative prototype development",
    ],
    process: [
      "Clarify the idea, objectives and technical constraints",
      "Research options and define a prototype scope",
      "Build and test an initial proof of concept",
      "Review findings and refine the prototype direction",
    ],
  },
];
