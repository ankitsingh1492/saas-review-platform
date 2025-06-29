"use client";
import { useState } from "react";
import { SearchInputProps } from "@/types";

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [value, setValue] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    onSearch(e.target.value);
  }
  return (
    <input
      type="text"
      placeholder="Search clients by name or domain"
      className="w-full mb-6 px-4 py-2 rounded-lg input-primary focus-ring"
      value={value}
      onChange={handleChange}
    />
  );
}
