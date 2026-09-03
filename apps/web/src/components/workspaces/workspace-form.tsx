import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createWorkspaceSchema,
  type CreateWorkspaceForm,
} from "../../schema/workspace.schema";

import { useAppStore } from "../../stores/app.store";
import { useCreateWorkspace } from "../../queries/workspace.queries";
import { useSession } from "../../hooks/use-session";
import Input from "../ui/input";
import Button from "../ui/button";

const WorkspaceForm = () => {
  const navigate = useNavigate();
  const { data: session } = useSession();

  const setWorkspaceId = useAppStore((state) => state.setWorkspaceId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWorkspaceForm>({
    resolver: zodResolver(createWorkspaceSchema),
  });

  const { mutateAsync, isPending, error } = useCreateWorkspace();

  const onSubmit = async (data: CreateWorkspaceForm) => {
    try {
      const workspace = await mutateAsync(data);
      const userId = session?.user.id;

      if (!userId) return;

      setWorkspaceId(userId, workspace.id);

      navigate("/dashboard", {
        replace: true,
      });
    } catch {
      // L'erreur est déjà disponible via `error`
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm block font-medium mb-2 text-muted-foreground">
          Nom du workspace
        </label>

        <Input
          id="name"
          type="text"
          placeholder="Ex: Sampana Centrale"
          {...register("name")}
          className="w-full rounded-md  bg-background px-3 py-2 outline-none  "
        />

        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive">
          Impossible de créer le workspace.
        </p>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Création..." : "Créer le workspace"}
      </Button>
    </form>
  );
};

export default WorkspaceForm;
