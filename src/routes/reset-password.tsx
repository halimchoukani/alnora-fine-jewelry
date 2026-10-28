import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Choose a new password — ALNORA" },
      { name: "description", content: "Set a new password for your ALNORA account." },
      { property: "og:title", content: "Choose a new password — ALNORA" },
      { property: "og:description", content: "Set a new password for your ALNORA account." },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: String(new FormData(e.currentTarget).get("password")) });
    setBusy(false);
    if (error) toast.error(error.message);
    else { toast.success("Password updated"); navigate({ to: "/account" }); }
  };
  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 py-12 sm:py-24">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-center">New password</h1>
      <form onSubmit={submit} className="mt-8 sm:mt-12 space-y-4">
        <input
          name="password"
          type="password"
          required
          minLength={6}
          placeholder="New password"
          className="w-full border bg-background px-4 py-3 text-base sm:text-sm outline-none focus:border-primary min-h-[44px]"
        />
        <button disabled={busy} className="btn-luxe w-full">
          Save password
        </button>
      </form>
    </div>
  );
}
