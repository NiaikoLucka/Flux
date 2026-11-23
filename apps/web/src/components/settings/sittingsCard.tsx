type SettingsCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const SettingsCard = ({title, description, children}: SettingsCardProps) => {
  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h3 className="font-semibold text-foreground">{title}</h3>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="space-y-5 p-5">{children}</div>
    </section>
  );
};

export default SettingsCard;
