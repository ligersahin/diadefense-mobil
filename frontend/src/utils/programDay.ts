import { differenceInDays, parseISO } from 'date-fns';

/**
 * Calculates the current program day based on the program start date.
 * 
 * @param startISO - ISO date string of when the program started (e.g., '2025-01-01T00:00:00.000Z')
 * @param today - Optional Date object for "today" (defaults to new Date())
 * @returns Program day number (1-90), or 1 if startISO is not provided
 * 
 * @example
 * // Day 1 on the start date
 * getCurrentProgramDay('2025-01-01') // returns 1
 * 
 * // Day 2 the day after start
 * getCurrentProgramDay('2025-01-01', new Date('2025-01-02')) // returns 2
 */
export function getCurrentProgramDay(
  startISO: string | null,
  today: Date = new Date()
): number {
  // If no start date is set, default to Day 1
  if (!startISO) {
    return 1;
  }

  try {
    const start = parseISO(startISO);
    const daysPassed = differenceInDays(today, start) + 1;
    
    // Clamp to valid range: Day 1 to Day 90
    return Math.min(Math.max(daysPassed, 1), 90);
  } catch (error) {
    // If parsing fails, default to Day 1
    console.error('Failed to parse startISO:', error);
    return 1;
  }
}


