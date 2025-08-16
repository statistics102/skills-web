import React, { useEffect, useMemo, useState } from "react";

/********************
 * Inline SEO component
 ********************/
const SEO = ({ title, description, canonicalPath, structuredData }) => {
  useEffect(() => {
    // Update title
    if (title) document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    if (description) metaDesc.setAttribute('content', description);

    // Update canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const path = canonicalPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
    linkCanonical.setAttribute('href', `${origin}${path}`);

    // Inject structured data (JSON-LD)
    const existing = document.getElementById('structured-data');
    if (existing) existing.remove();
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'structured-data';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
      if (existing) existing.remove();
    };
  }, [title, description, canonicalPath, structuredData]);

  return null;
};

/********************
 * App
 ********************/
export default function App() {
  const [query, setQuery] = useState("");

  const courses = [
    {
      title: "Mathematics Training",
      description: "Learn fundamental to advanced mathematics with expert instructors.",
      outcomes: ["Algebra mastery", "Calculus fundamentals", "Applied problem-solving"],
      delivery: "In-person & Online",
      duration: "3 months",
      price: "SAR 2500"
    },
    {
      title: "English Language Skills",
      description: "Improve your English for academics, business, or test preparation.",
      outcomes: ["Grammar accuracy", "Speaking fluency", "Academic writing"],
      delivery: "In-person & Online",
      duration: "2 months",
      price: "SAR 2000"
    },
    {
      title: "GRE Preparation",
      description: "Boost your GRE scores with proven strategies and practice tests.",
      outcomes: ["Quantitative reasoning", "Verbal reasoning", "Analytical writing"],
      delivery: "Hybrid",
      duration: "10 weeks",
      price: "SAR 3000"
    },
    {
      title: "STEP Exam Preparation",
      description: "Prepare for the Saudi STEP exam with tailored practice sessions.",
      outcomes: ["Test strategies", "Reading comprehension", "Listening skills"],
      delivery: "Online",
      duration: "6 weeks",
      price: "SAR 1800"
    }
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((c) => c.title.toLowerCase().includes(q));
  }, [query, courses]);

  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Training Institute",
    "url": "https://training-institute-sa.com",
    "logo": "https://training-institute-sa.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main St",
      "addressLocality": "Riyadh",
      "addressRegion": "Riyadh",
      "addressCountry": "SA"
    },
    "sameAs": [
      "https://www.linkedin.com/company/training-institute-sa"
    ],
    "hasCourse": courses.map(c => ({
      "@type": "Course",
      "name": c.title,
      "description": c.description,
      "provider": {
        "@type": "Organization",
        "name": "Training Institute"
      }
    }))
  }), [courses]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <SEO
        title="Training Institute – Math, English, GRE, STEP"
        description="Professional training in Riyadh offering Math, English, GRE, and STEP exam preparation courses. In-person & online options available."
        canonicalPath="/"
        structuredData={structuredData}
      />

      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Training Institute</h1>
          <nav className="space-x-4">
            <a href="#courses" className="hover:text-blue-600">Courses</a>
            <a href="#pricing" className="hover:text-blue-600">Pricing</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>

      <section className="text-center py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h2 className="text-4xl font-bold mb-4">Achieve Success with Expert Training</h2>
        <p className="text-lg">Math • English • GRE • STEP Certification Prep</p>
      </section>

      <section id="courses" className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Our Courses</h3>
          <input
            type="text"
            placeholder="Search courses..."
            className="border rounded p-2 w-60"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((c) => (
            <div key={c.title} className="bg-white shadow rounded-2xl p-6">
              <h4 className="text-xl font-bold mb-2">{c.title}</h4>
              <p className="mb-2">{c.description}</p>
              <ul className="list-disc list-inside text-sm mb-2">
                {c.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
              <p className="text-sm"><strong>Delivery:</strong> {c.delivery}</p>
              <p className="text-sm"><strong>Duration:</strong> {c.duration}</p>
              <p className="text-sm font-semibold">{c.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-6">Pricing Plans</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((c) => (
              <div key={c.title} className="bg-white shadow rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-2">{c.title}</h4>
                <p className="mb-4">{c.price}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>
        <form
          className="bg-white shadow rounded-2xl p-6 grid gap-4 max-w-lg mx-auto"
          action="https://formspree.io/f/mdkdvkak"
          method="POST"
          onSubmit={async (e) => {
            e.preventDefault();

            const form = e.target;
            const formData = new FormData(form);

            try {
              const response = await fetch("https://formspree.io/f/mdkdvkak", {
                method: "POST",
                body: formData,
                headers: {
                  Accept: "application/json",
                },
              });

              if (response.ok) {
                alert("✅ Thank you! Your message has been sent.");
                form.reset();
              } else {
                throw new Error("Form submission failed");
              }
            } catch (error) {
              console.error("Error:", error);
              alert("❌ Failed to send message. Please try again.");
            }
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="border rounded p-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="border rounded p-2"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            className="border rounded p-2"
            rows={4}
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            Send Message
          </button>
        </form>
      </section>

      <footer className="bg-gray-800 text-gray-300 text-center py-6">
        <p>&copy; {new Date().getFullYear()} Training Institute. All rights reserved.</p>
      </footer>
    </div>
  );
}
