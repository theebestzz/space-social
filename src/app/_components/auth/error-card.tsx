import { CardWrapper } from "@/app/_components/auth/card-wrapper";

import { HiOutlineExclamationTriangle } from "react-icons/hi2";

export function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonLabel="Back to login"
      backButtonHref="/login"
      showSocial={false}
    >
      <div className="flex w-full items-center justify-center">
        <HiOutlineExclamationTriangle className="h-10 w-10 text-destructive" />
      </div>
    </CardWrapper>
  );
}
