"use client";

import { CardWrapper } from "@/app/_components/auth/card-wrapper";
import { newVerification } from "@/server/new-verification";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FormError } from "@/app/_components/auth/form-error";
import { FormSuccess } from "@/app/_components/auth/form-success";
import { useTranslations } from "next-intl";

export function NewVerificationForm() {
  const t = useTranslations("site");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError(t("error.token") as string);
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError(t("error.default") as string);
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel={t("auth.verify.title")}
      backButtonLabel={t("auth.verify.back")}
      backButtonHref="/login"
      showSocial={false}
    >
      <div className="flex w-full flex-col items-center justify-center">
        {!success && !error && (
          <LoaderCircle className="h-8 w-8 animate-spin text-black/25" />
        )}

        {!success && <FormError message={error} />}
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
}
