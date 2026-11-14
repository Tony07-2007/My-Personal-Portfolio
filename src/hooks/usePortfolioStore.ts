import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_PORTFOLIO_DATA } from '../data/defaultPortfolio';
import type {
  PortfolioData,
  PortfolioProfile,
  PortfolioSectionId,
  ProjectItem,
} from '../types/portfolio';
import {
  PORTFOLIO_STORAGE_KEY,
  THEME_STORAGE_KEY,
  parseStoredPortfolio,
  parseStoredTheme,
  reorderList,
  toggleSectionVisibility,
  updateProjectItem,
  type ThemeMode,
} from '../utils/portfolioLogic';

export function usePortfolioStore() {
  const [portfolio, setPortfolio] = useState<PortfolioData>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_PORTFOLIO_DATA;
    }
    return parseStoredPortfolio(
      window.localStorage.getItem(PORTFOLIO_STORAGE_KEY),
      DEFAULT_PORTFOLIO_DATA
    );
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    return parseStoredTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage quota errors in restricted environments
    }
  }, [theme]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        PORTFOLIO_STORAGE_KEY,
        JSON.stringify(portfolio)
      );
      document.title = `${portfolio.profile.name} — ${portfolio.profile.role}`;
    } catch {
      // Ignore storage quota errors in restricted environments
    }
  }, [portfolio]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const saveProfile = useCallback((profile: PortfolioProfile) => {
    setPortfolio((prev) => ({
      ...prev,
      profile,
    }));
  }, []);

  const addProject = useCallback((project: ProjectItem) => {
    setPortfolio((prev) => ({
      ...prev,
      projects: [project, ...prev.projects],
    }));
  }, []);

  const updateProject = useCallback(
    (id: string, patch: Partial<ProjectItem>) => {
      setPortfolio((prev) => ({
        ...prev,
        projects: updateProjectItem(prev.projects, id, patch),
      }));
    },
    []
  );

  const removeProject = useCallback((id: string) => {
    setPortfolio((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }));
  }, []);

  const moveProject = useCallback(
    (index: number, direction: 'up' | 'down') => {
      setPortfolio((prev) => ({
        ...prev,
        projects: reorderList(prev.projects, index, direction),
      }));
    },
    []
  );

  const moveSection = useCallback(
    (index: number, direction: 'up' | 'down') => {
      setPortfolio((prev) => ({
        ...prev,
        sections: reorderList(prev.sections, index, direction),
      }));
    },
    []
  );

  const toggleSection = useCallback((id: PortfolioSectionId) => {
    setPortfolio((prev) => ({
      ...prev,
      sections: toggleSectionVisibility(prev.sections, id),
    }));
  }, []);

  const resetDefaults = useCallback(() => {
    setPortfolio(DEFAULT_PORTFOLIO_DATA);
    try {
      window.localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  return {
    portfolio,
    theme,
    setTheme,
    toggleTheme,
    saveProfile,
    addProject,
    updateProject,
    removeProject,
    moveProject,
    moveSection,
    toggleSection,
    resetDefaults,
  };
}
