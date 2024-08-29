import { HiOutlineCheckBadge } from "react-icons/hi2";

interface FormSuccessProps {
  message?: string;
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className="bg-green-500/20 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-700">
      <HiOutlineCheckBadge className="w-5 h-5" />
      <p className="font-semibold">{message}</p>
    </div>
  );
}
