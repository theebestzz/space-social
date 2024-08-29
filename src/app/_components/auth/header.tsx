interface HeaderProps {
  label: string;
}

export function Header({ label }: HeaderProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <p className="text-xl text-muted-foreground">{label}</p>
    </div>
  );
}
