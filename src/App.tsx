import { useState } from 'react';
import {
  CaseStudyModal,
  Footer,
  HeroSection,
  Navbar,
  SectionRenderer,
} from './components';
import { usePortfolioStore } from './hooks/usePortfolioStore';
import type { ProjectCategory, ProjectItem } from './types/portfolio';

export default function App() {
  const { portfolio, theme, toggleTheme } = usePortfolioStore();

  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  const scrollToSection = (selector: string) => {
    const target = document.querySelector(selector);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] text-[#0B1A12] transition-colors duration-200 dark:bg-[#07110C] dark:text-[#F1F7F3]">
      <Navbar
        brandName={portfolio.profile.name}
        accent={portfolio.profile.accent}
        sections={portfolio.sections}
        theme={theme}
        onToggleTheme={toggleTheme}
        onPrimaryAction={() => scrollToSection('#contact')}
      />

      <main>
        <HeroSection
          profile={portfolio.profile}
          metrics={portfolio.metrics}
          onExploreWork={() => scrollToSection('#capabilities')}
        />

        <SectionRenderer
          portfolio={portfolio}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onOpenProject={setSelectedProject}
        />
      </main>

      <Footer
        name={portfolio.profile.name}
        githubUrl={portfolio.profile.githubUrl}
        linkedinUrl={portfolio.profile.linkedinUrl}
        sections={portfolio.sections}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <CaseStudyModal
        project={selectedProject}
        projects={portfolio.projects}
        accent={portfolio.profile.accent}
        onClose={() => setSelectedProject(null)}
        onSelectProject={setSelectedProject}
      />
    </div>
  );
}
