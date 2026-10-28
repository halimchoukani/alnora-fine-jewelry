import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

const safePath = (p: unknown) => (typeof p === "string" && p.startsWith("/") && !p.startsWith("//") ? p : "/account");

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { redirect?: string } => (typeof s["redirect"] === "string" ? { redirect: s["redirect"] } : {}),
  head: () => ({
    meta: [
      { title: "Sign in — ALNORA" },
      { name: "description", content: "Sign in or create your ALNORA account to save your bag and follow your orders." },
      { property: "og:title", content: "Sign in — ALNORA" },
      { property: "og:description", content: "Sign in or create your ALNORA account." },
    ],
  }),
  component: AuthPage,
});

const field = "w-full border bg-background px-4 py-3 text-base sm:text-sm outline-none focus:border-primary min-h-[44px]";

function AuthPage() {
  const { redirect } = Route.useSearch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<string | null>(null);

  useEffect(() => { if (user) navigate({ to: safePath(redirect), replace: true }); }, [user, redirect, navigate]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email"));
    const password = String(f.get("password") ?? "");
    setBusy(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
    } else if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: window.location.origin, data: { full_name: String(f.get("name")) } },
      });
      if (error) toast.error(error.message); else setSent("Check your email to confirm your account, then sign in.");
    } else {
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
      if (error) toast.error(error.message); else setSent("We've sent you a link to reset your password.");
    }
    setBusy(false);
  };

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 py-12 sm:py-24">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-center">
        {mode === "signup" ? "Create account" : mode === "forgot" ? "Reset password" : "Sign in"}
      </h1>
      {sent ? (
        <p className="mt-8 sm:mt-10 text-center text-muted-foreground leading-relaxed">{sent}</p>
      ) : (
        <form onSubmit={submit} className="mt-8 sm:mt-12 space-y-4">
          {mode === "signup" && <input name="name" required placeholder="Full name" className={field} />}
          <input name="email" type="email" required placeholder="Email" className={field} />
          {mode !== "forgot" && <input name="password" type="password" required minLength={6} placeholder="Password" className={field} />}
          <button disabled={busy} className="btn-luxe w-full mt-2">
            {busy ? "Please wait…" : mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Sign in"}
          </button>
        </form>
      )}
      <div className="mt-8 flex flex-col items-center gap-3 eyebrow text-[10px] sm:text-xs text-muted-foreground">
        {mode !== "signin" && (
          <button
            type="button"
            onClick={() => { setMode("signin"); setSent(null); }}
            className="hover:text-foreground py-1 touch-manipulation transition-colors"
          >
            Already have an account? Sign in
          </button>
        )}
        {mode !== "signup" && (
          <button
            type="button"
            onClick={() => { setMode("signup"); setSent(null); }}
            className="hover:text-foreground py-1 touch-manipulation transition-colors"
          >
            New to ALNORA? Create account
          </button>
        )}
        {mode === "signin" && (
          <button
            type="button"
            onClick={() => setMode("forgot")}
            className="hover:text-foreground py-1 touch-manipulation transition-colors"
          >
            Forgot password?
          </button>
        )}
      </div>
    </div>
  );
}
