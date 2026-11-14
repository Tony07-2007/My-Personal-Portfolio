import type {
  PortfolioData,
  ProjectCategory,
  ProjectItem,
} from '../types/portfolio';
import { CapabilitiesSection } from './CapabilitiesSection';
import { ContactSection } from './ContactSection';
import { ExperienceSection } from './ExperienceSection';
import { WorkSection } from './WorkSection';

interface SectionRendererProps {
  portfolio: PortfolioData;
  activeCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  onOpenProject: (project: ProjectItem) => void;
}

export function SectionRenderer({
  portfolio,
  activeCategory,
  onSelectCategory,
  onOpenProject,
}: SectionRendererProps) {
  const visibleSections = portfolio.sections.filter((s) => s.visible);

  if (visibleSections.length === 0) {
    return null;
  }

  return (
    <div data-testid="modular-sections">
      {visibleSections.map((section) => {
        switch (section.id) {
          case 'work':
            return (
              <WorkSection
                key="work"
                projects={portfolio.projects}
                activeCategory={activeCategory}
                accent={portfolio.profile.accent}
                onSelectCategory={onSelectCategory}
                onOpenProject={onOpenProject}
              />
            );
          case 'capabilities':
            return (
              <CapabilitiesSection
                key="capabilities"
                data={portfolio}
                capabilities={portfolio.capabilities}
              />
            );
          case 'experience':
            return (
              <ExperienceSection
                key="experience"
                experience={portfolio.experience}
                testimonial={portfolio.testimonial}
              />
            );
          case 'contact':
            return (
              <ContactSection
                key="contact"
                email={portfolio.profile.email}
                location={portfolio.profile.location}
                availability={portfolio.profile.availability}
                accent={portfolio.profile.accent}
              />
            );
        }
      })}
    </div>
  );
}
