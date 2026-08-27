import {
  useEffect,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import Card from "../../components/ui/card";
import { loginSchema, type LoginForm } from "../../schema/auth.schema";
import { CircleX, Lock, Mail } from "lucide-react";
import Input from "../../components/ui/input";
import z from "zod";
import Button from "../../components/ui/button";
import { Link, useNavigate } from "react-router";
import { useSession } from "../../hooks/use-session";
import { authService } from "../../services/auth.service";

type FormError = Partial<Record<keyof LoginForm, string>>;

const initialForm: LoginForm = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();
  const [form, setForm] = useState<LoginForm>(initialForm);
  const [formError, setFormError] = useState<FormError>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      navigate("/dashboard", { replace: true });
    }
  }, [session, navigate]);

  if (isPending) {
    return <div>Chargement...</div>;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormError((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    // Supprime également l'erreur Better Auth
    setServerError("");
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");

    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = z.treeifyError(result.error);

      setFormError({
        email: fieldErrors.properties?.email?.errors[0],
        password: fieldErrors.properties?.password?.errors[0],
      });
      return;
    }

    setFormError({});
    setIsLoading(true);
    try {
      await authService.signIn({
        email: result.data.email,
        password: result.data.password,
      });
      console.log("Login valide :", result.data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setServerError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="p-6  w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Connexion</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Connectez-vous à votre compte
          </p>
        </div>
        {serverError && (
          <div className="border border-border rounded-md px-4 py-4 mb-2 bg-destructive/50 flex gap-4 text-muted-foreground ">
            <CircleX />
            <span>Error: {serverError}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              // required
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
              // required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" disabled={isLoading} className=" w-full mt-3">
            {isLoading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <div className="mt-4 text-sm text-muted-foreground ">
          <p>
            Vous n'avez pas encore de compte ?{" "}
            <Link to="/register" className="text-foreground hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
