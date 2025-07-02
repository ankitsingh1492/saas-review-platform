import { Metadata } from "next";

export function constructMetadata({
  title,
  fullTitle,
  description = "ReviewCraft - The Review Platform",
}: {
  title?: string;
  fullTitle?: string;
  description?: string;
} = {}): Metadata {
  return {
    title:
      fullTitle ||
      (title
        ? `${title} | ${process.env.NEXT_PUBLIC_APP_NAME}`
        : `${process.env.NEXT_PUBLIC_APP_NAME} - The Review Platform`),
    description,
  };
}
