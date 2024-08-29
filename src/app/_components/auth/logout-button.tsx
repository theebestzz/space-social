"use client";

import { logout } from "@/server/logout";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface LogoutButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function LogoutButton({ children, className }: LogoutButtonProps) {
  const t = useTranslations("site.layout.userMenu");
  const onClick = () => {
    logout();
    toast.success(t("loggedOut"));
  };
  return (
    <a onClick={onClick} className={className}>
      {children}
    </a>
  );
}
