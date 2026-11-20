import { SITE } from "../data/site";

export const ENGAGEMENT_TYPES = [
  "Cloud & Platform Architecture",
  "Full-Stack / Mobile Delivery",
  "Legacy System Modernisation",
  "Technical Leadership / Advisory",
  "Agora Partnership / Press",
] as const;

export const TIMELINE_OPTIONS = [
  "Immediate (This month)",
  "Next 1–3 months",
  "Exploratory / Flexible",
] as const;

export type EngagementType = (typeof ENGAGEMENT_TYPES)[number];
export type TimelineOption = (typeof TIMELINE_OPTIONS)[number];

export interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly engagementType: EngagementType;
  readonly timeline: TimelineOption;
  readonly message: string;
}

export function buildMailtoUrl(
  data: ContactFormData,
  recipient: string = SITE.email
): string {
  const cleanName = data.name.trim();
  const cleanEmail = data.email.trim();
  const cleanMessage = data.message.trim();

  const subject = `[${data.engagementType}] Consultancy Inquiry from ${cleanName}`;
  const body = [
    `Name: ${cleanName}`,
    `Email: ${cleanEmail}`,
    `Engagement Type: ${data.engagementType}`,
    `Target Timeline: ${data.timeline}`,
    "",
    "Project Context:",
    cleanMessage,
  ].join("\n");

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
