"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const sections = ["home", "project", "about", "contact"];

export const Header = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    // Track scroll direction
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setShowHeader(true); // scrolling up
      } else {
        setShowHeader(false); // scrolling down
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Highlight active section
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`flex justify-center fixed top-4 w-full z-50 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-20"
      }`}
    >
      <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur-md">
        {sections.map((section) => (
          <Link
            key={section}
            href={`#${section}`}
            className={`px-3 py-1.5 rounded-full text-sm transition ${
              activeSection === section
                ? "bg-white text-gray-900"
                : "text-white hover:bg-white/20"
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </Link>
        ))}
      </nav>
    </div>
  );
};
