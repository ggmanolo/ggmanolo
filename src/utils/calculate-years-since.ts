/**
 * Calculates the number of years since a given start date
 * @param startDate - The start date as a string or Date object
 * @returns The number of complete years since the start date
 */
export function calculateYearsSince(startDate: string | Date): number {
  const start = new Date(startDate)
  const now = new Date()
  const diff = now.getFullYear() - start.getFullYear()

  // Check if birthday hasn't occurred yet this year
  if (
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate())
  ) {
    return diff - 1
  }

  return diff
}
