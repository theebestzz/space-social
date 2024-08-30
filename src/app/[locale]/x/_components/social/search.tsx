"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export function Search() {
  const placeholders = [
    "Elections of the Head of Nation",
    "I need help with using the site",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "How does the Space Nation’s state structure work?",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onChange={handleChange}
      onSubmit={onSubmit}
    />
  );
}
