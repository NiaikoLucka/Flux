import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-border border-b bg-background/95 px-6 backdrop-blur">
      <div>
        <h2 className="text-sm font-medium text-muted-foreground">
          Flux
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" className="rounded-md p-2 hover:bg-accent cursor-pointer transition-colors duration-300">
          <Bell className="size-5" />
        </button>

        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
          U
        </div>
      </div>
    </header>
  );
};

export default Header;
