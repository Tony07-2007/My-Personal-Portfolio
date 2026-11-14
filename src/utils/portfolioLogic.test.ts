import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_PORTFOLIO_DATA } from '../data/defaultPortfolio';
import {
  createProjectItem,
  filterProjects,
  formatPrintableResumeText,
  getAccentTokens,
  getCategoryCount,
  parseStoredPortfolio,
  parseStoredTheme,
  reorderList,
  toggleSectionVisibility,
  updateProjectItem,
  validateContactForm,
} from './portfolioLogic';

test('filterProjects returns all projects for "All" and narrows by category', () => {
  const all = filterProjects(DEFAULT_PORTFOLIO_DATA.projects, 'All');
  assert.equal(all.length, DEFAULT_PORTFOLIO_DATA.projects.length);

  const engineering = filterProjects(
    DEFAULT_PORTFOLIO_DATA.projects,
    'Engineering'
  );
  assert.equal(engineering.length, 2);
  assert.ok(engineering.every((p) => p.category === 'Engineering'));

  assert.equal(
    getCategoryCount(DEFAULT_PORTFOLIO_DATA.projects, 'Design Systems'),
    1
  );
});

test('validateContactForm rejects empty or invalid inputs and accepts valid submissions', () => {
  const invalid = validateContactForm({
    name: ' ',
    email: 'bad-email',
    scope: 'Product Design',
    budget: '$15k – $30k',
    message: 'Too short',
  });

  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: '  Maya Lin  ',
    email: 'maya@studio.io ',
    scope: 'Design Systems',
    budget: '$30k – $60k',
    message: 'Looking to redesign our core analytics workbench in Q2.',
  });

  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
  assert.equal(valid.sanitized.name, 'Maya Lin');
  assert.equal(valid.sanitized.email, 'maya@studio.io');
});

test('parseStoredPortfolio restores saved profile and safely falls back on invalid JSON', () => {
  assert.deepEqual(
    parseStoredPortfolio(null, DEFAULT_PORTFOLIO_DATA),
    DEFAULT_PORTFOLIO_DATA
  );

  assert.deepEqual(
    parseStoredPortfolio('{not valid json', DEFAULT_PORTFOLIO_DATA),
    DEFAULT_PORTFOLIO_DATA
  );

  const customPayload = JSON.stringify({
    ...DEFAULT_PORTFOLIO_DATA,
    profile: {
      ...DEFAULT_PORTFOLIO_DATA.profile,
      name: 'Jordan Patel',
    },
  });

  const restored = parseStoredPortfolio(customPayload, DEFAULT_PORTFOLIO_DATA);
  assert.equal(restored.profile.name, 'Jordan Patel');
  assert.equal(restored.projects.length, DEFAULT_PORTFOLIO_DATA.projects.length);
});

test('createProjectItem generates clean structured project metadata', () => {
  const item = createProjectItem({
    title: 'Helios Climate Ledger',
    category: 'Product Design',
    year: '2026',
    client: 'Helios Labs',
    summary: 'Carbon accounting interface for industrial logistics.',
  });

  assert.ok(item.id.startsWith('helios-climate-ledger-'));
  assert.equal(item.category, 'Product Design');
  assert.equal(item.client, 'Helios Labs');
  assert.ok(item.outcomes.length >= 2);
});

test('getAccentTokens and formatPrintableResumeText return valid structures', () => {
  const tokens = getAccentTokens('cinnabar');
  assert.equal(tokens.hex, '#E11D48');

  const resume = formatPrintableResumeText(DEFAULT_PORTFOLIO_DATA);
  assert.ok(resume.includes('ONUBUIKEM OKANTA'));
  assert.ok(resume.includes('Meridian Treasury Workspace'));
});

test('parseStoredTheme defaults to light and restores dark mode safely', () => {
  assert.equal(parseStoredTheme(null), 'light');
  assert.equal(parseStoredTheme('invalid'), 'light');
  assert.equal(parseStoredTheme('dark'), 'dark');
});

test('reorderList moves items up and down and clamps out-of-bounds indices', () => {
  const initial = ['a', 'b', 'c'];
  assert.deepEqual(reorderList(initial, 1, 'up'), ['b', 'a', 'c']);
  assert.deepEqual(reorderList(initial, 1, 'down'), ['a', 'c', 'b']);
  assert.deepEqual(reorderList(initial, 0, 'up'), ['a', 'b', 'c']);
  assert.deepEqual(reorderList(initial, 2, 'down'), ['a', 'b', 'c']);
});

test('toggleSectionVisibility flips section visibility without mutating others', () => {
  const updated = toggleSectionVisibility(
    DEFAULT_PORTFOLIO_DATA.sections,
    'experience'
  );
  const exp = updated.find((s) => s.id === 'experience');
  const work = updated.find((s) => s.id === 'work');
  assert.equal(exp?.visible, false);
  assert.equal(work?.visible, true);
});

test('updateProjectItem patches matching project fields cleanly', () => {
  const targetId = DEFAULT_PORTFOLIO_DATA.projects[0].id;
  const updated = updateProjectItem(DEFAULT_PORTFOLIO_DATA.projects, targetId, {
    title: 'Updated Meridian Terminal',
  });
  assert.equal(updated[0].title, 'Updated Meridian Terminal');
  assert.equal(
    updated[1].title,
    DEFAULT_PORTFOLIO_DATA.projects[1].title
  );
});
