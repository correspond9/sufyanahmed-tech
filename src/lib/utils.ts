import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isExternalLink(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}
