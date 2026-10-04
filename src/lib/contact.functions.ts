import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const contactSchema = z.object({
  plan: z.string().min(1),
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  role: z.string().min(1).max(200),
  messageHtml: z.string().min(1),
  messageText: z.string().min(1),
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const sendContactEmail = createServerFn({ method: 'POST' })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env['RESEND_API_KEY'];
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const { plan, name, email, role, messageHtml, messageText } = data;

    const html = `
      <div style="font-family: Arial, sans-serif; color: #2D241E; line-height: 1.6;">
        <h2 style="margin: 0 0 16px;">Nouveau message depuis le portfolio</h2>
        <p style="margin: 0 0 8px;"><strong>Formule :</strong> ${escapeHtml(plan)}</p>
        <p style="margin: 0 0 8px;"><strong>Nom &amp; Prénom :</strong> ${escapeHtml(name)}</p>
        <p style="margin: 0 0 8px;"><strong>Email professionnel :</strong> ${escapeHtml(email)}</p>
        <p style="margin: 0 0 16px;"><strong>Activité / Thématique :</strong> ${escapeHtml(role)}</p>
        <p style="margin: 0 0 8px;"><strong>Situation actuelle :</strong></p>
        <div style="border: 1px solid #E8E1D5; border-radius: 12px; padding: 16px; background: #FAF7F2;">
          ${messageHtml}
        </div>
      </div>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Candya <onboarding@resend.dev>',
        to: ['rancandya@gmail.com'],
        reply_to: email,
        subject: `Nouveau message de ${name} (${plan})`,
        html,
        text: `Formule : ${plan}\nNom : ${name}\nEmail : ${email}\nActivité : ${role}\n\nSituation actuelle :\n${messageText}`,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Resend request failed [${response.status}]: ${errorBody}`);
      throw new Error(`Resend request failed [${response.status}]: ${errorBody}`);
    }

    return { success: true };
  });
