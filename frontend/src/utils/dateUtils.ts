export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);

  // Get relative time
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Less than a minute
  if (diffInSeconds < 60) {
    return "just now";
  }

  // Less than an hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  // Less than a day
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  // Less than a week
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  // Default to formatted date
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getNextSaturdayDrawTime(): Date {
  const now = new Date();
  const nextSaturday = new Date(now);

  // Set to next Saturday at 20:00 (8 PM)
  nextSaturday.setDate(now.getDate() + ((6 - now.getDay() + 7) % 7));
  nextSaturday.setHours(20, 0, 0, 0);

  // If we're past Saturday 8 PM, move to next week
  if (now > nextSaturday) {
    nextSaturday.setDate(nextSaturday.getDate() + 7);
  }

  return nextSaturday;
}

export function getTimeRemaining(endTime: Date): {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
} {
  const total = endTime.getTime() - new Date().getTime();

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    days: days.toString().padStart(2, "0"),
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
}
