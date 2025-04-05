import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ChevronRight,
  BarChart2,
  LineChart,
  PieChart,
  TrendingUp,
  Zap, 
  Users,
  ArrowRight,
} from "lucide-react";
import "./styles.css";

export default function LandingPage() {
  return (
    <div className="page-wrapper"> 
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Showcase />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      // Add animation class
      target.classList.add("scroll-animate");

      // Smooth scroll
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Remove animation class after animation ends
      setTimeout(() => {
        target.classList.remove("scroll-animate");
      }, 1000); // Duration matches the animation
    }
  };

  return (
    <motion.header
      className={`header ${isScrolled ? "header-scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container header-inner">
        <motion.div
          className="logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-highlight">Visu</span>
          <span>Flow</span>
        </motion.div>

        <nav className="nav">
          <ul className="nav-list">
            {["Features", "How it Works", "Showcase", "Pricing"].map(
              (item, i) => {
                const id = item.toLowerCase().replace(/\s+/g, "-");
                return (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (i + 1) }}
                  >
                    <a
                      href={`#${id}`}
                      className="nav-link"
                      onClick={(e) => handleNavClick(e, id)}
                    >
                      {item}
                    </a>
                  </motion.li>
                );
              }
            )}
          </ul>
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <a href="#" className="button button-primary">
            Get Started
            <ChevronRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </motion.header>
  );
}

function Hero() {
  const [showForm, setShowForm] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleStartClick = () => {
    controls
      .start({
        opacity: 0,
        y: -50,
        transition: { duration: 0.5 },
      })
      .then(() => {
        setShowForm(true);
      });
  };

  return (
    <section className="hero relative">
      {!showForm ? (
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                staggerChildren: 0.2,
              },
            },
          }}
          className="container hero-content"
        >
          <motion.h1
            className="hero-title"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Interactive Data{" "}
            <span className="text-highlight">Storytelling</span> with Beautiful
            Animations
          </motion.h1>

          <motion.p
            className="hero-description"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Transform complex data into engaging visual narratives that
            captivate your audience and drive insights.
          </motion.p>

          <motion.div
            className="hero-buttons"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <button
              onClick={handleStartClick}
              className="button button-primary button-large flex items-center"
            >
              Start Creating
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <a href="#" className="button button-outline button-large">
              Watch Demo
            </a>
          </motion.div>

          <DataVisualization />
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container form-wrapper"
        >
          <h2 className="text-3xl font-bold mb-6">Create Your Visual Story</h2>
          <form class="form" action="/" method="GET">
            <input
              type="text"
              placeholder="Enter project title"
              class="form-input"
            />
            <textarea
              placeholder="Describe your data story..."
              rows="4"
              class="form-textarea"
            ></textarea>
            <button type="submit" class="form-button">
              Submit
            </button>
          </form>
        </motion.div>
      )}

      {/* Background blobs */}
      <div className="bg-blob bg-blob-1"></div>
      <div className="bg-blob bg-blob-2"></div>
    </section>
  );
}

function DataVisualization() {
  const [activeChart, setActiveChart] = useState(0);
  const charts = [
    { icon: <BarChart2 className="h-8 w-8" />, color: "animated-dot-teal" },
    { icon: <LineChart className="h-8 w-8" />, color: "animated-dot-purple" },
    { icon: <PieChart className="h-8 w-8" />, color: "animated-dot-blue" },
    { icon: <TrendingUp className="h-8 w-8" />, color: "animated-dot-amber" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChart((prev) => (prev + 1) % charts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [charts.length]);

  return (
    <motion.div
      className="hero-visual"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChart}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                padding: "1.5rem",
                borderRadius: "9999px",
                backgroundColor:
                  activeChart === 0
                    ? "#14b8a6"
                    : activeChart === 1
                    ? "#a855f7"
                    : activeChart === 2
                    ? "#3b82f6"
                    : "#f59e0b",
              }}
            >
              {charts[activeChart].icon}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Animated dots */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className={
            i % 4 === 0
              ? "animated-dot animated-dot-teal"
              : i % 4 === 1
              ? "animated-dot animated-dot-purple"
              : i % 4 === 2
              ? "animated-dot animated-dot-blue"
              : "animated-dot animated-dot-amber"
          }
          initial={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            opacity: 0,
          }}
          animate={{
            x: [Math.random() * 400 - 200, Math.random() * 400 - 200],
            y: [Math.random() * 400 - 200, Math.random() * 400 - 200],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Connection lines */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.line
            key={i}
            stroke={
              i % 4 === 0
                ? "#14b8a6"
                : i % 4 === 1
                ? "#a855f7"
                : i % 4 === 2
                ? "#3b82f6"
                : "#f59e0b"
            }
            strokeWidth="1"
            strokeOpacity="0.3"
            x1={Math.random() * 100 + "%"}
            y1={Math.random() * 100 + "%"}
            x2={Math.random() * 100 + "%"}
            y2={Math.random() * 100 + "%"}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              x1: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y1: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              x2: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y2: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

function Features() {
  const features = [
    {
      icon: <BarChart2 className="h-10 w-10" style={{ color: "#14b8a6" }} />,
      title: "Interactive Charts",
      description:
        "Create responsive, interactive charts that engage your audience and tell your data story.",
    },
    {
      icon: <Zap className="h-10 w-10" style={{ color: "#a855f7" }} />,
      title: "Fluid Animations",
      description:
        "Bring your data to life with smooth, customizable animations that highlight key insights.",
    },
    {
      icon: <Users className="h-10 w-10" style={{ color: "#3b82f6" }} />,
      title: "Audience Engagement",
      description:
        "Keep your audience engaged with interactive elements and guided data narratives.",
    },
  ];

  return (
    <section id="features" className="section">
      <div className="container">
        <motion.div
          className="text-center"
          style={{ marginBottom: "4rem" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Powerful Features</h2>
          <p
            className="text-muted"
            style={{ fontSize: "1.25rem", maxWidth: "42rem", margin: "0 auto" }}
          >
            Everything you need to transform raw data into compelling visual
            stories
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                boxShadow: "0 10px 30px -10px rgba(20, 184, 166, 0.3)",
              }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p className="text-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background elements */}
      <div className="bg-blob bg-blob-3"></div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Import Your Data",
      description:
        "Upload your data from various sources including CSV, JSON, or connect to your database.",
    },
    {
      number: "02",
      title: "Design Your Visualization",
      description:
        "Choose from dozens of chart types and customize colors, animations, and interactions.",
    },
    {
      number: "03",
      title: "Add Animations",
      description:
        "Apply beautiful animations to guide viewers through your data story with purpose.",
    },
    {
      number: "04",
      title: "Share & Embed",
      description:
        "Publish your interactive visualization on any website or share via a direct link.",
    },
  ];

  return (
    <section id="how-it-works" className="section section-alt">
      <div className="container">
        <motion.div
          className="text-center"
          style={{ marginBottom: "4rem" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>How It Works</h2>
          <p
            className="text-muted"
            style={{ fontSize: "1.25rem", maxWidth: "42rem", margin: "0 auto" }}
          >
            A simple four-step process to create stunning data visualizations
          </p>
        </motion.div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p className="text-muted">{step.description}</p>

              {index < steps.length - 1 && (
                <motion.div
                  className="step-arrow"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <ArrowRight className="h-8 w-8" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background elements */}
      <div className="bg-blob bg-blob-4"></div>
    </section>
  );
}

function Showcase() {
  const showcaseItems = [
    {
      title: "Financial Dashboard",
      category: "Finance",
      className: "showcase-item-1",
    },
    {
      title: "Marketing Analytics",
      category: "Marketing",
      className: "showcase-item-2",
    },
    {
      title: "Product Metrics",
      category: "Product",
      className: "showcase-item-3",
    },
  ];

  return (
    <section id="showcase" className="section">
      <div className="container">
        <motion.div
          className="text-center"
          style={{ marginBottom: "4rem" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Showcase</h2>
          <p
            className="text-muted"
            style={{ fontSize: "1.25rem", maxWidth: "42rem", margin: "0 auto" }}
          >
            See how others are using VisuFlow to tell their data stories
          </p>
        </motion.div>

        <div className="showcase-grid">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={index}
              className={`showcase-item ${item.className}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="showcase-content">
                <div className="showcase-category">{item.category}</div>
                <h3 className="showcase-title">{item.title}</h3>
                <motion.div
                  className="showcase-link"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  View Case Study
                  <ArrowRight className="showcase-link-icon h-4 w-4" />
                </motion.div>
              </div>

              {/* Animated dots */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="animated-dot"
                  style={{
                    backgroundColor: "white",
                    width: "4px",
                    height: "4px",
                  }}
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    opacity: 0.3,
                  }}
                  animate={{
                    x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                    y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          style={{ marginTop: "3rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <a href="#" className="button button-outline">
            View All Case Studies
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote:
        "VisuFlow transformed how we present data to our stakeholders. The animations make our quarterly reports actually engaging!",
      author: "Sarah Johnson",
      role: "Data Analyst, TechCorp",
    },
    {
      quote:
        "We've increased engagement by 230% since switching to VisuFlow for our data presentations. The interactive elements keep our audience focused.",
      author: "Michael Chen",
      role: "Marketing Director, GrowthLabs",
    },
    {
      quote:
        "As a financial advisor, I need to explain complex concepts. VisuFlow helps me create clear, animated visualizations that my clients understand immediately.",
      author: "Emma Rodriguez",
      role: "Financial Advisor, WealthWise",
    },
  ];

  return (
    <section className="section section-alt">
      <div className="container">
        <motion.div
          className="text-center"
          style={{ marginBottom: "4rem" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>What Our Users Say</h2>
          <p
            className="text-muted"
            style={{ fontSize: "1.25rem", maxWidth: "42rem", margin: "0 auto" }}
          >
            Join thousands of data storytellers who've elevated their
            presentations
          </p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{testimonial.quote}</p>
              <div>
                <div className="testimonial-author">{testimonial.author}</div>
                <div className="testimonial-role">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background elements */}
      <div className="bg-blob bg-blob-5"></div>
    </section>
  );
}

function CTA() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          className="cta-wrapper"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="cta-content">
            <div>
              <h2 className="cta-title">
                Ready to transform your data storytelling?
              </h2>
              <p className="cta-description">
                Join thousands of data professionals who are creating engaging,
                interactive visualizations with VisuFlow.
              </p>
              <div className="cta-buttons">
                <a href="#" className="button button-primary button-large">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a href="#" className="button button-outline button-large">
                  Schedule Demo
                </a>
              </div>
            </div>

            <div className="cta-visual">
              {/* Animated elements */}
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={
                    i % 3 === 0
                      ? "animated-dot animated-dot-teal"
                      : i % 3 === 1
                      ? "animated-dot animated-dot-purple"
                      : "animated-dot animated-dot-blue"
                  }
                  initial={{
                    x: Math.random() * 300,
                    y: Math.random() * 300,
                    opacity: 0.5,
                  }}
                  animate={{
                    x: [Math.random() * 300, Math.random() * 300],
                    y: [Math.random() * 300, Math.random() * 300],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              ))}

              {/* Connection lines */}
              <svg
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.line
                    key={i}
                    stroke={
                      i % 3 === 0
                        ? "#14b8a6"
                        : i % 3 === 1
                        ? "#a855f7"
                        : "#3b82f6"
                    }
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    x1={Math.random() * 100 + "%"}
                    y1={Math.random() * 100 + "%"}
                    x2={Math.random() * 100 + "%"}
                    y2={Math.random() * 100 + "%"}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.5, 0],
                      x1: [
                        Math.random() * 100 + "%",
                        Math.random() * 100 + "%",
                      ],
                      y1: [
                        Math.random() * 100 + "%",
                        Math.random() * 100 + "%",
                      ],
                      x2: [
                        Math.random() * 100 + "%",
                        Math.random() * 100 + "%",
                      ],
                      y2: [
                        Math.random() * 100 + "%",
                        Math.random() * 100 + "%",
                      ],
                    }}
                    transition={{
                      duration: Math.random() * 8 + 8,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="bg-blob bg-blob-4"></div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="text-highlight">Visu</span>
              <span>Flow</span>
            </div>
            <p className="footer-description">
              Interactive Data Storytelling with Beautiful Animations. Transform
              your data into engaging visual narratives.
            </p>
            <div className="social-links">
              {["twitter", "github", "linkedin", "youtube"].map((social) => (
                <a key={social} href={`#${social}`} className="social-link">
                  <span className="sr-only">{social}</span>
                  {/* Icon would go here */}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="footer-nav-title">Product</h3>
            <ul className="footer-nav-list">
              {[
                "Features",
                "Pricing",
                "Case Studies",
                "Documentation",
                "Resources",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="footer-nav-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer-nav-title">Company</h3>
            <ul className="footer-nav-list">
              {["About", "Blog", "Careers", "Contact", "Privacy Policy"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="footer-nav-link">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} VisuFlow. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#" className="footer-legal-link">
              Terms of Service
            </a>
            <a href="#" className="footer-legal-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-legal-link">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
