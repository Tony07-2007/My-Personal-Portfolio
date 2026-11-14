import { useState, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Check,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';
import type { ProjectCategory, ProjectItem } from '../../types/portfolio';
import { createProjectItem } from '../../utils/portfolioLogic';

interface ProjectsEditorProps {
  projects: ProjectItem[];
  onAddProject: (project: ProjectItem) => void;
  onUpdateProject: (id: string, patch: Partial<ProjectItem>) => void;
  onRemoveProject: (id: string) => void;
  onMoveProject: (index: number, direction: 'up' | 'down') => void;
}

const INPUT_CLASSES =
  'min-h-[40px] w-full rounded-lg border border-[#C6D7CD] bg-[#F7FAF8] px-3 py-2 text-sm text-[#0B1A12] placeholder:text-[#85A190] focus:border-[#057A55] focus:bg-white focus:outline-none dark:border-[#1F382A] dark:bg-[#07110C] dark:text-[#F1F7F3] dark:placeholder:text-[#5A7264] dark:focus:border-[#34D399] dark:focus:bg-[#13261C]';

export function ProjectsEditor({
  projects,
  onAddProject,
  onUpdateProject,
  onRemoveProject,
  onMoveProject,
}: ProjectsEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] =
    useState<Exclude<ProjectCategory, 'All'>>('Product Design');
  const [newClient, setNewClient] = useState('');
  const [newYear, setNewYear] = useState('2026');
  const [newSummary, setNewSummary] = useState('');
  const [newChallenge, setNewChallenge] = useState('');
  const [newSolution, setNewSolution] = useState('');
  const [projectError, setProjectError] = useState<string | null>(null);

  const handleAddProjectSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newTitle.trim().length < 2 || newSummary.trim().length < 8) {
      setProjectError('Enter a project title and a short summary.');
      return;
    }
    setProjectError(null);
    onAddProject(
      createProjectItem({
        title: newTitle,
        category: newCategory,
        client: newClient,
        year: newYear,
        summary: newSummary,
        challenge: newChallenge,
        solution: newSolution,
      })
    );
    setNewTitle('');
    setNewClient('');
    setNewSummary('');
    setNewChallenge('');
    setNewSolution('');
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-sm font-semibold text-[#0B1A12] dark:text-[#F1F7F3]">
            Projects &amp; Case Studies ({projects.length})
          </h3>
          <span className="text-xs text-[#5A7264] dark:text-[#85A190]">
            Reorder or edit writing
          </span>
        </div>

        <ul className="mt-3 divide-y divide-[#D5E0D9] rounded-xl border border-[#D5E0D9] bg-[#F7FAF8] dark:divide-[#1F382A] dark:border-[#1F382A] dark:bg-[#07110C]">
          {projects.map((proj, index) => {
            const isEditing = editingId === proj.id;
            return (
              <li key={proj.id} className="px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#0B1A12] dark:text-[#F1F7F3]">
                      {proj.title}
                    </p>
                    <p className="text-xs text-[#5A7264] dark:text-[#85A190]">
                      {proj.category} · {proj.year}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onMoveProject(index, 'up')}
                      disabled={index === 0}
                      aria-label={`Move ${proj.title} up`}
                      className="inline-flex min-h-[34px] min-w-[34px] cursor-pointer items-center justify-center rounded-lg text-[#3B5245] hover:bg-white disabled:cursor-not-allowed disabled:opacity-35 dark:text-[#B3C7BA] dark:hover:bg-[#13261C]"
                    >
                      <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onMoveProject(index, 'down')}
                      disabled={index === projects.length - 1}
                      aria-label={`Move ${proj.title} down`}
                      className="inline-flex min-h-[34px] min-w-[34px] cursor-pointer items-center justify-center rounded-lg text-[#3B5245] hover:bg-white disabled:cursor-not-allowed disabled:opacity-35 dark:text-[#B3C7BA] dark:hover:bg-[#13261C]"
                    >
                      <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(isEditing ? null : proj.id)}
                      aria-label={
                        isEditing ? `Finish editing ${proj.title}` : `Edit ${proj.title}`
                      }
                      aria-expanded={isEditing}
                      className="inline-flex min-h-[34px] min-w-[34px] cursor-pointer items-center justify-center rounded-lg text-[#057A55] hover:bg-white dark:text-[#34D399] dark:hover:bg-[#13261C]"
                    >
                      {isEditing ? (
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveProject(proj.id)}
                      aria-label={`Remove ${proj.title}`}
                      className="inline-flex min-h-[34px] min-w-[34px] cursor-pointer items-center justify-center rounded-lg text-[#5A7264] transition-colors hover:bg-white hover:text-[#DC2626] dark:text-[#85A190] dark:hover:bg-[#13261C] dark:hover:text-[#FCA5A5]"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <div className="mt-3 space-y-2.5 border-t border-[#D5E0D9] pt-3 dark:border-[#1F382A]">
                    <div>
                      <label
                        htmlFor={`edit-proj-title-${proj.id}`}
                        className="block text-xs font-medium text-[#3B5245] dark:text-[#B3C7BA]"
                      >
                        Title
                      </label>
                      <input
                        id={`edit-proj-title-${proj.id}`}
                        type="text"
                        value={proj.title}
                        onChange={(e) =>
                          onUpdateProject(proj.id, { title: e.target.value })
                        }
                        className={`mt-1 ${INPUT_CLASSES}`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`edit-proj-summary-${proj.id}`}
                        className="block text-xs font-medium text-[#3B5245] dark:text-[#B3C7BA]"
                      >
                        Summary
                      </label>
                      <textarea
                        id={`edit-proj-summary-${proj.id}`}
                        rows={2}
                        value={proj.summary}
                        onChange={(e) =>
                          onUpdateProject(proj.id, { summary: e.target.value })
                        }
                        className="mt-1 w-full rounded-lg border border-[#C6D7CD] bg-white px-3 py-2 text-sm text-[#0B1A12] focus:border-[#057A55] focus:outline-none dark:border-[#1F382A] dark:bg-[#0E1C14] dark:text-[#F1F7F3] dark:focus:border-[#34D399]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`edit-proj-challenge-${proj.id}`}
                        className="block text-xs font-medium text-[#3B5245] dark:text-[#B3C7BA]"
                      >
                        Challenge
                      </label>
                      <textarea
                        id={`edit-proj-challenge-${proj.id}`}
                        rows={2}
                        value={proj.challenge}
                        onChange={(e) =>
                          onUpdateProject(proj.id, { challenge: e.target.value })
                        }
                        className="mt-1 w-full rounded-lg border border-[#C6D7CD] bg-white px-3 py-2 text-sm text-[#0B1A12] focus:border-[#057A55] focus:outline-none dark:border-[#1F382A] dark:bg-[#0E1C14] dark:text-[#F1F7F3] dark:focus:border-[#34D399]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`edit-proj-solution-${proj.id}`}
                        className="block text-xs font-medium text-[#3B5245] dark:text-[#B3C7BA]"
                      >
                        Architecture &amp; Execution
                      </label>
                      <textarea
                        id={`edit-proj-solution-${proj.id}`}
                        rows={2}
                        value={proj.solution}
                        onChange={(e) =>
                          onUpdateProject(proj.id, { solution: e.target.value })
                        }
                        className="mt-1 w-full rounded-lg border border-[#C6D7CD] bg-white px-3 py-2 text-sm text-[#0B1A12] focus:border-[#057A55] focus:outline-none dark:border-[#1F382A] dark:bg-[#0E1C14] dark:text-[#F1F7F3] dark:focus:border-[#34D399]"
                      />
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <form
        onSubmit={handleAddProjectSubmit}
        className="space-y-3 border-t border-[#D5E0D9] pt-5 dark:border-[#1F382A]"
      >
        <p className="text-xs font-semibold text-[#0B1A12] dark:text-[#F1F7F3]">
          Write New Case Study
        </p>
        <input
          type="text"
          aria-label="New project title"
          placeholder="Project title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className={INPUT_CLASSES}
        />
        <div className="grid grid-cols-3 gap-2">
          <select
            aria-label="New project category"
            value={newCategory}
            onChange={(e) =>
              setNewCategory(e.target.value as Exclude<ProjectCategory, 'All'>)
            }
            className="col-span-2 min-h-[40px] rounded-lg border border-[#C6D7CD] bg-[#F7FAF8] px-3 py-2 text-sm text-[#0B1A12] focus:border-[#057A55] focus:bg-white focus:outline-none dark:border-[#1F382A] dark:bg-[#07110C] dark:text-[#F1F7F3] dark:focus:border-[#34D399]"
          >
            <option value="Product Design">Product Design</option>
            <option value="Design Systems">Design Systems</option>
            <option value="Engineering">Engineering</option>
          </select>
          <input
            type="text"
            aria-label="New project year"
            placeholder="2026"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
            className="min-h-[40px] rounded-lg border border-[#C6D7CD] bg-[#F7FAF8] px-3 py-2 text-sm text-[#0B1A12] tabular-nums focus:border-[#057A55] focus:bg-white focus:outline-none dark:border-[#1F382A] dark:bg-[#07110C] dark:text-[#F1F7F3] dark:focus:border-[#34D399]"
          />
        </div>
        <input
          type="text"
          aria-label="New project client"
          placeholder="Client or organization"
          value={newClient}
          onChange={(e) => setNewClient(e.target.value)}
          className={INPUT_CLASSES}
        />
        <textarea
          rows={2}
          aria-label="New project summary"
          placeholder="One-sentence project summary"
          value={newSummary}
          onChange={(e) => setNewSummary(e.target.value)}
          className="w-full rounded-lg border border-[#C6D7CD] bg-[#F7FAF8] px-3 py-2 text-sm text-[#0B1A12] placeholder:text-[#85A190] focus:border-[#057A55] focus:bg-white focus:outline-none dark:border-[#1F382A] dark:bg-[#07110C] dark:text-[#F1F7F3] dark:placeholder:text-[#5A7264] dark:focus:border-[#34D399]"
        />
        <textarea
          rows={2}
          aria-label="New project challenge"
          placeholder="Problem or challenge (optional)"
          value={newChallenge}
          onChange={(e) => setNewChallenge(e.target.value)}
          className="w-full rounded-lg border border-[#C6D7CD] bg-[#F7FAF8] px-3 py-2 text-sm text-[#0B1A12] placeholder:text-[#85A190] focus:border-[#057A55] focus:bg-white focus:outline-none dark:border-[#1F382A] dark:bg-[#07110C] dark:text-[#F1F7F3] dark:placeholder:text-[#5A7264] dark:focus:border-[#34D399]"
        />
        <textarea
          rows={2}
          aria-label="New project solution"
          placeholder="Solution & architecture (optional)"
          value={newSolution}
          onChange={(e) => setNewSolution(e.target.value)}
          className="w-full rounded-lg border border-[#C6D7CD] bg-[#F7FAF8] px-3 py-2 text-sm text-[#0B1A12] placeholder:text-[#85A190] focus:border-[#057A55] focus:bg-white focus:outline-none dark:border-[#1F382A] dark:bg-[#07110C] dark:text-[#F1F7F3] dark:placeholder:text-[#5A7264] dark:focus:border-[#34D399]"
        />
        {projectError ? (
          <p
            role="alert"
            className="text-xs font-medium text-[#DC2626] dark:text-[#FCA5A5]"
          >
            {projectError}
          </p>
        ) : null}
        <button
          type="submit"
          className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#C6D7CD] bg-white px-4 py-2 text-xs font-medium text-[#0B1A12] hover:border-[#057A55] hover:bg-[#EDF3EF] dark:border-[#1F382A] dark:bg-[#13261C] dark:text-[#F1F7F3] dark:hover:border-[#34D399]"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Add to Portfolio</span>
        </button>
      </form>
    </div>
  );
}
