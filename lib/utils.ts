import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(dobString: string): number {
  try {
    const [day, month, year] = dobString.split("/").map(Number);

    // Check for valid numbers
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return 0;
    }

    const dob = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    // If birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  } catch (error) {
    console.error("Error calculating age:", error);
    return 0;
  }
}
