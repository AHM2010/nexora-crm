export const customerDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export const customerCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatCustomerDate(date: string) {
  return customerDateFormatter.format(
    new Date(`${date.slice(0, 10)}T00:00:00`),
  );
}

const millisecondsPerDay = 24 * 60 * 60 * 1000;
const relativeDateFormatter = new Intl.RelativeTimeFormat("en-US", {
  numeric: "auto",
});

function toUtcCalendarDay(date: Date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

export function formatRelativeActivityDate(date: string, today = new Date()) {
  const [year, month, day] = date.slice(0, 10).split("-").map(Number);
  const activityDay = Date.UTC(year, month - 1, day);
  const differenceInDays = Math.round(
    (toUtcCalendarDay(today) - activityDay) / millisecondsPerDay,
  );

  return relativeDateFormatter.format(-differenceInDays, "day");
}
