import { useState, type FormEvent } from 'react';
import { AlertCircle, Check, Copy, Send } from 'lucide-react';
import type {
  AccentColorKey,
  ContactFormErrors,
  ContactFormInput,
  SubmittedInquiry,
} from '../types/portfolio';
import {
  getAccentTokens,
  validateContactForm,
} from '../utils/portfolioLogic';

interface ContactSectionProps {
  email: string;
  location: string;
  availability: string;
  accent: AccentColorKey;
}

const SCOPE_OPTIONS = [
  'Product Design',
  'Design System',
  'Front-End Engineering',
  'Full Product Build',
];

const BUDGET_OPTIONS = [
  '$10k – $25k',
  '$25k – $50k',
  '$50k+',
  'Advisory Retainer',
];

export function ContactSection({
  email,
  location,
  availability,
  accent,
}: ContactSectionProps) {
  const tokens = getAccentTokens(accent);

  const [form, setForm] = useState<ContactFormInput>({
    name: '',
    email: '',
    scope: SCOPE_OPTIONS[0],
    budget: BUDGET_OPTIONS[1],
    message: '',
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submittedList, setSubmittedList] = useState<SubmittedInquiry[]>([]);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateContactForm(form);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    const entry: SubmittedInquiry = {
      ...result.sanitized,
      id: `inq-${Date.now()}`,
      submittedAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setSubmittedList((prev) => [entry, ...prev]);
    setForm({
      name: '',
      email: '',
      scope: SCOPE_OPTIONS[0],
      budget: BUDGET_OPTIONS[1],
      message: '',
    });
  };

  const latestInquiry = submittedList[0] ?? null;

  return (
    <section
      id="contact"
      className="bg-white py-20 transition-colors duration-200 lg:py-24 dark:bg-[#0E1C14]"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Direct Details */}
          <div className="lg:col-span-5">
            <p className="font-editorial text-lg italic text-[#3B5245] dark:text-[#B3C7BA]">
              Get in Touch
            </p>
            <h2
              className="font-display mt-1 text-3xl font-bold tracking-tight text-[#0B1A12] dark:text-[#F1F7F3] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Let’s connect and build together.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#3B5245] dark:text-[#B3C7BA]">
              Whether you’re hiring, collaborating on a product, or just want to say hello—send me a note and I’ll get back to you within two business days.
            </p>

            <div className="mt-8 space-y-5 border-t border-[#D5E0D9] pt-6 dark:border-[#1F382A]">
              <div>
                <p className="text-xs font-medium text-[#5A7264] dark:text-[#85A190]">
                  Direct Email
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${email}`}
                    className="text-base font-semibold text-[#0B1A12] underline-offset-4 hover:text-[#057A55] hover:underline dark:text-[#F1F7F3] dark:hover:text-[#34D399]"
                  >
                    {email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex min-h-[36px] cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#D5E0D9] bg-white px-3 py-1.5 text-xs font-medium text-[#0B1A12] transition-colors hover:bg-[#EDF3EF] dark:border-[#1F382A] dark:bg-[#0E1C14] dark:text-[#F1F7F3] dark:hover:bg-[#13261C]"
                  >
                    {copied ? (
                      <>
                        <Check
                          className="h-3.5 w-3.5 text-[#057A55] dark:text-[#34D399]"
                          aria-hidden="true"
                        />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy
                          className="h-3.5 w-3.5 text-[#3B5245] dark:text-[#B3C7BA]"
                          aria-hidden="true"
                        />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-[#5A7264] dark:text-[#85A190]">
                    Based In
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#0B1A12] dark:text-[#F1F7F3]">
                    {location}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#5A7264] dark:text-[#85A190]">
                    Availability
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#0B1A12] dark:text-[#F1F7F3]">
                    {availability}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#D5E0D9] bg-[#F7FAF8] p-6 sm:p-8 dark:border-[#1F382A] dark:bg-[#07110C]">
              {latestInquiry ? (
                <div
                  role="status"
                  className="mb-6 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 text-sm text-[#064E3B] dark:border-[#065F46] dark:bg-[#052E22] dark:text-[#D1FAE5]"
                >
                  <div className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#059669] dark:text-[#34D399]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-semibold">
                        Inquiry received from {latestInquiry.name}
                      </p>
                      <p className="mt-1 text-xs text-[#065F46] dark:text-[#A7F3D0]">
                        {latestInquiry.scope} · {latestInquiry.budget} · Logged at{' '}
                        <span className="tabular-nums">
                          {latestInquiry.submittedAt}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-[#0B1A12] dark:text-[#F1F7F3]"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, name: e.target.value }));
                        if (errors.name) {
                          setErrors((prev) => ({ ...prev, name: undefined }));
                        }
                      }}
                      placeholder="Alex Rivera"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={`mt-1.5 min-h-[44px] w-full rounded-lg border bg-[#F7FAF8] px-3.5 py-2.5 text-sm text-[#0B1A12] placeholder:text-[#85A190] focus:bg-white focus:outline-none focus:ring-2 dark:bg-[#07110C] dark:text-[#F1F7F3] dark:placeholder:text-[#5A7264] dark:focus:bg-[#13261C] ${
                        errors.name
                          ? 'border-[#DC2626] focus:ring-[#DC2626]/20 dark:border-[#F87171]'
                          : 'border-[#C6D7CD] focus:border-[#057A55] focus:ring-[#057A55]/15 dark:border-[#1F382A] dark:focus:border-[#34D399]'
                      }`}
                    />
                    {errors.name ? (
                      <p
                        id="contact-name-error"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#DC2626] dark:text-[#FCA5A5]"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.name}</span>
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-[#0B1A12] dark:text-[#F1F7F3]"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) {
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }
                      }}
                      placeholder="alex@company.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? 'contact-email-error' : undefined
                      }
                      className={`mt-1.5 min-h-[44px] w-full rounded-lg border bg-[#F7FAF8] px-3.5 py-2.5 text-sm text-[#0B1A12] placeholder:text-[#85A190] focus:bg-white focus:outline-none focus:ring-2 dark:bg-[#07110C] dark:text-[#F1F7F3] dark:placeholder:text-[#5A7264] dark:focus:bg-[#13261C] ${
                        errors.email
                          ? 'border-[#DC2626] focus:ring-[#DC2626]/20 dark:border-[#F87171]'
                          : 'border-[#C6D7CD] focus:border-[#057A55] focus:ring-[#057A55]/15 dark:border-[#1F382A] dark:focus:border-[#34D399]'
                      }`}
                    />
                    {errors.email ? (
                      <p
                        id="contact-email-error"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#DC2626] dark:text-[#FCA5A5]"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-scope"
                      className="block text-sm font-medium text-[#0B1A12] dark:text-[#F1F7F3]"
                    >
                      Project Scope
                    </label>
                    <select
                      id="contact-scope"
                      name="scope"
                      value={form.scope}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, scope: e.target.value }))
                      }
                      className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#C6D7CD] bg-[#F7FAF8] px-3.5 py-2.5 text-sm text-[#0B1A12] focus:border-[#057A55] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#057A55]/15 dark:border-[#1F382A] dark:bg-[#07110C] dark:text-[#F1F7F3] dark:focus:border-[#34D399] dark:focus:bg-[#13261C]"
                    >
                      {SCOPE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-budget"
                      className="block text-sm font-medium text-[#0B1A12] dark:text-[#F1F7F3]"
                    >
                      Estimated Budget
                    </label>
                    <select
                      id="contact-budget"
                      name="budget"
                      value={form.budget}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, budget: e.target.value }))
                      }
                      className="mt-1.5 min-h-[44px] w-full rounded-lg border border-[#C6D7CD] bg-[#F7FAF8] px-3.5 py-2.5 text-sm text-[#0B1A12] focus:border-[#057A55] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#057A55]/15 dark:border-[#1F382A] dark:bg-[#07110C] dark:text-[#F1F7F3] dark:focus:border-[#34D399] dark:focus:bg-[#13261C]"
                    >
                      {BUDGET_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-[#0B1A12] dark:text-[#F1F7F3]"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, message: e.target.value }));
                      if (errors.message) {
                        setErrors((prev) => ({ ...prev, message: undefined }));
                      }
                    }}
                    placeholder="Tell me what you are building, key milestones, and target launch window..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? 'contact-message-error' : undefined
                    }
                    className={`mt-1.5 w-full rounded-lg border bg-[#F7FAF8] px-3.5 py-2.5 text-sm text-[#0B1A12] placeholder:text-[#85A190] focus:bg-white focus:outline-none focus:ring-2 dark:bg-[#07110C] dark:text-[#F1F7F3] dark:placeholder:text-[#5A7264] dark:focus:bg-[#13261C] ${
                      errors.message
                        ? 'border-[#DC2626] focus:ring-[#DC2626]/20 dark:border-[#F87171]'
                        : 'border-[#C6D7CD] focus:border-[#057A55] focus:ring-[#057A55]/15 dark:border-[#1F382A] dark:focus:border-[#34D399]'
                    }`}
                  />
                  {errors.message ? (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#DC2626] dark:text-[#FCA5A5]"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.message}</span>
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-[#5A7264] dark:text-[#85A190]">
                    {submittedList.length > 0 ? (
                      <span className="tabular-nums">
                        {submittedList.length}{' '}
                        {submittedList.length === 1 ? 'inquiry' : 'inquiries'} sent this
                        session
                      </span>
                    ) : (
                      'All fields required.'
                    )}
                  </p>
                  <button
                    type="submit"
                    className={`inline-flex min-h-[44px] shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg px-6 py-2.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 ${tokens.buttonBg} ${tokens.buttonHover}`}
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
