import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/ai/run-id.server";

const bodySchema = z.object({ request: z.string().min(10).max(20000) });

const SYSTEM = `Tu es l'assistante de Candya R., assistante virtuelle et support client écrit pour coachs et formateurs en ligne.
On te donne le contenu d'une demande de contact reçue d'un prospect. Réponds en français, en Markdown simple, avec exactement deux sections :

## Résumé des besoins
- 3 à 6 puces : qui est le prospect, son activité, sa formule souhaitée, ses problèmes, ses attentes, urgence éventuelle.

## Proposition de réponse
Un email prêt à envoyer, chaleureux et professionnel, personnalisé selon la demande (reprend ses mots, propose une prochaine étape concrète comme un appel découverte). Signé "Candya". Pas de promesse de prix non mentionnée.`;

export const Route = createFileRoute("/api/assistant")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = bodySchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) {
          return Response.json({ error: "Collez une demande de contact (10 caractères minimum)." }, { status: 400 });
        }
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "Service IA non configuré." }, { status: 401 });

        const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
        const provider = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
          fetch: runIdFetch.fetch,
        });
        const result = streamText({
          model: provider.responses("openai/gpt-6-astra"),
          system: SYSTEM,
          prompt: parsed.data.request,
          abortSignal: request.signal,
          providerOptions: {
            openai: {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              store: false,
              include: ["reasoning.encrypted_content"],
            },
          },
        });
        return withLovableAiGatewayRunIdHeader(result.toTextStreamResponse(), runIdFetch);
      },
    },
  },
});
