import {
  useEffect,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import { Mail, Lock, User, CircleX } from "lucide-react";
import Input from "../../components/ui/input";
import Card from "../../components/ui/card";
import { registerSchema, type RegisterForm } from "../../schema/auth.schema";
import z from "zod";
import Button from "../../components/ui/button";
import { Link, useNavigate } from "react-router";
import { useSession } from "../../hooks/use-session";
import { authService } from "../../services/auth.service";

type FormError = Partial<Record<keyof RegisterForm, string>>;

const initialForm: RegisterForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [formError, setFormError] = useState<FormError>({});
  const [Error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      navigate("/dashboard", { replace: true });
    }
  }, [session, navigate]);

  if (isPending) {
    return <div>Chargement...</div>;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormError((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = registerSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = z.treeifyError(result.error);

      setFormError({
        name: fieldErrors.properties?.name?.errors[0],
        email: fieldErrors.properties?.email?.errors[0],
        password: fieldErrors.properties?.password?.errors[0],
        confirmPassword: fieldErrors.properties?.confirmPassword?.errors[0],
      });
      return;
    }

    setFormError({});
    setError("");
    setIsLoading(true);

    try {
      console.log("Formulaire valide :", result.data);
      await authService.signUp({
        name: result.data.name,
        email: result.data.email,
        password: result.data.password,
      });

      navigate("/dashboard");
    } catch (err) {
      setError("Une erreur est survenue");
      console.error("Singup failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="p-6  w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Créer un compte
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Créez votre compte pour commencer
          </p>
        </div>
        {Error && (
          <div className="border border-border rounded-md px-4 py-4 mb-2 bg-destructive/50 flex gap-4 text-muted-foreground ">
            <CircleX />
            <span>Error</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-muted-foreground">
              Nom
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              icon={<User size={18} />}
              placeholder="Votre nom"
              value={form.name}
              onChange={handleChange}
              error={formError.name}
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-muted-foreground">
              Adresse email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              icon={<Mail size={18} />}
              placeholder="vous@example.com"
              value={form.email}
              onChange={handleChange}
              error={formError.email}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-muted-foreground">
              Mot de passe
            </label>
            <Input
              id="password"
              name="password"
              icon={<Lock size={18} />}
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              error={formError.password}
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-muted-foreground">
              Confirmer le mot de passe
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              icon={<Lock size={18} />}
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={formError.confirmPassword}
              required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" disabled={isLoading} className=" w-full mt-3">
            {isLoading ? "Création du compte..." : "Créer mon compte"}
          </Button>
        </form>

        <div className="mt-4 text-sm text-muted-foreground ">
          <p>
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="text-foreground hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
