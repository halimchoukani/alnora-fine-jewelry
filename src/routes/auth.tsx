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

const field = "w-full border bg-background px-4 py-3 text-sm outline-none focus:border-primary";

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
    <div className="mx-auto max-w-md px-6 py-24">
      <h1 className="text-5xl text-center">{mode === "signup" ? "Create account" : mode === "forgot" ? "Reset password" : "Sign in"}</h1>
      {sent ? (
        <p className="mt-10 text-center text-muted-foreground">{sent}</p>
      ) : (
        <form onSubmit={submit} className="mt-12 space-y-4">
          {mode === "signup" && <input name="name" required placeholder="Full name" className={field} />}
          <input name="email" type="email" required placeholder="Email" className={field} />
          {mode !== "forgot" && <input name="password" type="password" required minLength={6} placeholder="Password" className={field} />}
          <button disabled={busy} className="btn-luxe w-full">{busy ? "Please wait…" : mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Sign in"}</button>
        </form>
      )}
      <div className="mt-8 flex flex-col items-center gap-3 eyebrow text-muted-foreground">
        {mode !== "signin" && <button onClick={() => { setMode("signin"); setSent(null); }} className="hover:text-foreground">Already have an account? Sign in</button>}
        {mode !== "signup" && <button onClick={() => { setMode("signup"); setSent(null); }} className="hover:text-foreground">New to ALNORA? Create account</button>}
        {mode === "signin" && <button onClick={() => setMode("forgot")} className="hover:text-foreground">Forgot password?</button>}
      </div>
    </div>
  );
}
