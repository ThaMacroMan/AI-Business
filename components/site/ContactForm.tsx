"use client";

import { FormEvent, useMemo, useRef, useState } from "react";

import {
  CONTACT_CONFIG,
  IS_FORMSPREE_PLACEHOLDER,
} from "@/lib/content/site-content";

type FieldName =
  | "name"
  | "businessName"
  | "email"
  | "phone"
  | "goal"
  | "message";

type FormValues = Record<FieldName, string>;

type FormErrors = Partial<Record<FieldName, string>>;

const INITIAL_VALUES: FormValues = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  goal: "",
  message: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Please add your name.";
  if (!values.businessName.trim()) {
    errors.businessName = "Please add your business name.";
  }
  const hasEmail = Boolean(values.email.trim());
  const hasPhone = Boolean(values.phone.trim());

  if (hasEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (hasPhone && !normalizePhoneToE164(values.phone)) {
    errors.phone = "Please use a valid phone number (e.g. +13065505040).";
  }
  if (!hasEmail && !hasPhone) {
    errors.phone = "Please provide an email or phone number.";
  }
  if (!values.goal.trim()) errors.goal = "Please choose your primary goal.";
  if (!values.message.trim()) {
    errors.message = "Please describe what you want help implementing.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const fieldRefs = useRef<
    Record<
      FieldName,
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null
    >
  >({
    name: null,
    businessName: null,
    email: null,
    phone: null,
    goal: null,
    message: null,
  });

  const fieldOrder = useMemo<FieldName[]>(
    () => ["name", "businessName", "email", "phone", "goal", "message"],
    [],
  );

  function setField(name: FieldName, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    const firstInvalid = fieldOrder.find((field) => validationErrors[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      if (IS_FORMSPREE_PLACEHOLDER) {
        setStatus("success");
        setStatusMessage(
          "Thanks. Your request is ready to send once your Formspree endpoint is connected.",
        );
        setValues(INITIAL_VALUES);
        return;
      }

      const payload = {
        name: values.name.trim(),
        email: values.email.trim().toLowerCase() || undefined,
        phone: normalizePhoneToE164(values.phone) ?? undefined,
        message: buildAgentMessage(values),
        businessName: values.businessName.trim(),
        goal: values.goal,
        projectDetails: values.message.trim(),
        form_id: CONTACT_CONFIG.formspreeFormId || undefined,
        _form_id: CONTACT_CONFIG.formspreeFormId || undefined,
        _subject: `Strategy call request from ${values.name}`,
      };

      const submitUrl = CONTACT_CONFIG.speedToLeadWebhook
        ? CONTACT_CONFIG.speedToLeadWebhook
        : CONTACT_CONFIG.formspreeEndpoint;

      const response = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let backendMessage: string | null = null;
        try {
          const data = (await response.json()) as { message?: string };
          if (typeof data?.message === "string") backendMessage = data.message;
        } catch {
          // ignore parse error
        }
        setStatus("error");
        setStatusMessage(
          backendMessage ??
            (CONTACT_CONFIG.speedToLeadWebhook
              ? "The follow-up service returned an error. Make sure the speed-to-lead app is running (e.g. port 3000) and FORMSPREE_FORM_ID matches."
              : "Your form did not send. Email hello@prairiebusinessai.ca and include your project goal."),
        );
        return;
      }

      setStatus("success");
      setStatusMessage(
        "Thanks. Your request has been sent. You should receive an SMS follow-up shortly.",
      );
      setValues(INITIAL_VALUES);
    } catch {
      setStatus("error");
      setStatusMessage(
        CONTACT_CONFIG.speedToLeadWebhook
          ? "Couldn't reach the follow-up service. Is the speed-to-lead app running on port 3000?"
          : "Your form did not send. Email hello@prairiebusinessai.ca and include your project goal.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="surface-card space-y-5 p-6 sm:p-7"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => setField("name", event.target.value)}
            ref={(node) => {
              fieldRefs.current.name = node;
            }}
            className="form-input focus-ring"
            placeholder="Your full name…"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? (
            <p id="name-error" className="form-error" role="alert">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="businessName"
            className="mb-2 block text-sm font-medium"
          >
            Business Name
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            autoComplete="organization"
            value={values.businessName}
            onChange={(event) => setField("businessName", event.target.value)}
            ref={(node) => {
              fieldRefs.current.businessName = node;
            }}
            className="form-input focus-ring"
            placeholder="Your business name…"
            aria-invalid={Boolean(errors.businessName)}
            aria-describedby={
              errors.businessName ? "business-error" : undefined
            }
          />
          {errors.businessName ? (
            <p id="business-error" className="form-error" role="alert">
              {errors.businessName}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email (Optional)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            value={values.email}
            onChange={(event) => setField("email", event.target.value)}
            ref={(node) => {
              fieldRefs.current.email = node;
            }}
            className="form-input focus-ring"
            placeholder="name@business.com…"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p id="email-error" className="form-error" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Phone (Optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(event) => setField("phone", event.target.value)}
            ref={(node) => {
              fieldRefs.current.phone = node;
            }}
            className="form-input focus-ring"
            placeholder="+1 (306) 000-0000…"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone ? (
            <p id="phone-error" className="form-error" role="alert">
              {errors.phone}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="goal" className="mb-2 block text-sm font-medium">
          Primary Goal
        </label>
        <select
          id="goal"
          name="goal"
          value={values.goal}
          onChange={(event) => setField("goal", event.target.value)}
          ref={(node) => {
            fieldRefs.current.goal = node;
          }}
          className="form-input focus-ring"
          aria-invalid={Boolean(errors.goal)}
          aria-describedby={errors.goal ? "goal-error" : undefined}
        >
          <option value="">Select your focus…</option>
          <option value="assistant_setup">AI Assistant Setup</option>
          <option value="automations">Custom AI Automations</option>
          <option value="coaching">AI Coaching & 1:1 Support</option>
          <option value="other">Not Sure Yet</option>
        </select>
        {errors.goal ? (
          <p id="goal-error" className="form-error" role="alert">
            {errors.goal}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Project Details
        </label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={(event) => setField("message", event.target.value)}
          ref={(node) => {
            fieldRefs.current.message = node;
          }}
          className="form-input focus-ring min-h-32"
          placeholder="Tell me what process you want to improve first…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <p id="message-error" className="form-error" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="cta-primary focus-ring"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending…" : "Send Project Details"}
      </button>

      <p
        className={
          status === "error"
            ? "text-sm text-red-700 dark:text-red-300"
            : "text-sm text-[color:var(--muted)]"
        }
        aria-live="polite"
      >
        {statusMessage}
      </p>
    </form>
  );
}

function normalizePhoneToE164(value: string): string | null {
  const digitsOnly = value.replace(/[^\d+]/g, "");
  if (!digitsOnly) {
    return null;
  }

  if (digitsOnly.startsWith("+")) {
    const justDigits = digitsOnly.slice(1).replace(/\D/g, "");
    return justDigits.length >= 10 && justDigits.length <= 15
      ? `+${justDigits}`
      : null;
  }

  const numeric = digitsOnly.replace(/\D/g, "");
  if (numeric.length === 10) {
    return `+1${numeric}`;
  }
  if (numeric.length === 11 && numeric.startsWith("1")) {
    return `+${numeric}`;
  }
  return null;
}

function buildAgentMessage(values: FormValues): string {
  const goalLabel = GOAL_LABELS[values.goal] ?? values.goal;
  return [
    `Business Name: ${values.businessName.trim()}`,
    `Primary Goal: ${goalLabel}`,
    "Project Details:",
    values.message.trim(),
  ].join("\n");
}

const GOAL_LABELS: Record<string, string> = {
  assistant_setup: "AI Assistant Setup",
  automations: "Custom AI Automations",
  coaching: "AI Coaching & 1:1 Support",
  other: "Not Sure Yet",
};
