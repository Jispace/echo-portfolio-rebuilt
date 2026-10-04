import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";

const TITLE = "Assistant réponses prospects — Candya R.";
const DESCRIPTION = "Outil interne : résume les besoins d'un prospect et rédige une réponse personnalisée.";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AssistantPage,
});

function AssistantPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function run() {
    setError("");
    setOutput("");
    setLoading(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request: input }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error ??
            (res.status === 429
              ? "Trop de demandes, réessayez dans un instant."
              : res.status === 402
                ? "Crédits IA épuisés."
                : "Une erreur est survenue."),
        );
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let got = false;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = dec.decode(value, { stream: true });
        if (chunk) got = true;
        setOutput((o) => o + chunk);
      }
      if (!got) throw new Error("Aucune réponse générée.");
    } catch (e) {
      if ((e as Error).name !== "AbortError") setError((e as Error).message);
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Assistant réponses prospects</h1>
          <Link to="/" className="text-sm text-muted-foreground underline">Retour au site</Link>
        </div>
        <p className="text-sm text-muted-foreground">
          Collez le contenu d'une demande de contact. L'IA résume les besoins du prospect et propose une réponse personnalisée.
        </p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          placeholder="Formule : …&#10;Nom : …&#10;Activité : …&#10;Situation actuelle : …"
          className="w-full rounded-xl border border-border bg-card p-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="flex gap-3">
          <button
            onClick={run}
            disabled={loading || input.trim().length < 10}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {loading ? "Analyse en cours…" : "Résumer et rédiger la réponse"}
          </button>
          {loading && (
            <button onClick={() => abortRef.current?.abort()} className="rounded-full border border-border px-5 py-2.5 text-sm">
              Arrêter
            </button>
          )}
        </div>
        {error && <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
        {output && (
          <section className="space-y-3 rounded-xl border border-border bg-card p-5">
            <div className="flex justify-end">
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(output);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                className="text-xs underline text-muted-foreground"
              >
                {copied ? "Copié !" : "Copier"}
              </button>
            </div>
            <div className="whitespace-pre-wrap text-sm leading-relaxed">{output}</div>
          </section>
        )}
      </div>
    </main>
  );
}
