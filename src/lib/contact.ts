import { profile } from "@/data/site";

export type ContactMessage = { name: string; email: string; subject: string; message: string };

/**
 * Sends a contact message. Currently opens the visitor's email app (mailto).
 * To switch to EmailJS or Formspree later, replace the body of this function only.
 */
export async function sendContactMessage(msg: ContactMessage): Promise<void> {
  const body = `${msg.message}\n\n— ${msg.name} (${msg.email})`;
  const url = `mailto:${profile.email}?subject=${encodeURIComponent(msg.subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
  await new Promise((r) => setTimeout(r, 600));
}
