import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createWorkspaceSchema,
  type CreateWorkspaceForm,
} from "../../schema/workspace.schema";

import { useAppStore } from "../../stores/app.store";
import { useCreateWorkspace } from "../../queries/workspace.queries";

const WorkspaceForm = () => {
  const navigate = useNavigate();

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

      console.log("CREATED WORKSPACE:", workspace);
      setWorkspaceId(workspace.id);

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
        <label htmlFor="name" className="text-sm font-medium">
          Nom du workspace
        </label>

        <input
          id="name"
          type="text"
          placeholder="Ex: Sampana Centrale"
          {...register("name")}
          className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2"
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

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">
        {isPending ? "Création..." : "Créer le workspace"}
      </button>
    </form>
  );
};

export default WorkspaceForm;
