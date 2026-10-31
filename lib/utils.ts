import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, letting later Tailwind classes win. Used by the Magic UI components. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
