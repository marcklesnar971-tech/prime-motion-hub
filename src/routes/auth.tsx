import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acceso al panel | GijuSport" },
      {
        name: "description",
        content: "Área privada de administración de GijuSport para gestionar precios, fotos y stock.",
      },
      { property: "og:title", content: "Acceso al panel | GijuSport" },
      { property: "og:description", content: "Área privada de administración de GijuSport." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  function resolveEmail(value: string) {
    const v = value.trim().toLowerCase();
    return v.includes("@") ? v : `${v}@gijusport.local`;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: resolveEmail(email),
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("Cuenta creada. Revisa tu correo para confirmarla.");
          return;
        }
        toast.success("Cuenta creada");
        navigate({ to: "/admin", replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: resolveEmail(email),
          password,
        });
        if (error) throw error;
        navigate({ to: "/admin", replace: true });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo continuar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-24 pb-16">
      <div className="surface-card w-full max-w-md rounded-[20px] p-8">
        <p className="text-[11px] tracking-[0.24em] text-primary">PANEL PRIVADO</p>
        <h1 className="mt-3 font-display text-4xl">
          {mode === "login" ? "INICIAR SESIÓN" : "CREAR CUENTA"}
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          Solo para el equipo de GijuSport. La tienda pública no cambia.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-[11px] tracking-[0.18em] text-muted-foreground">CORREO</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-sm border border-border bg-[var(--surface-2)] px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="text-[11px] tracking-[0.18em] text-muted-foreground">CONTRASEÑA</span>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-sm border border-border bg-[var(--surface-2)] px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary px-6 py-4 text-xs font-semibold tracking-[0.18em] text-primary-foreground disabled:opacity-60"
          >
            {loading ? "UN MOMENTO…" : mode === "login" ? "ENTRAR" : "REGISTRARME"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-6 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          {mode === "login" ? "No tengo cuenta todavía" : "Ya tengo una cuenta"}
        </button>
      </div>
    </div>
  );
}
