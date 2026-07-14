"use client";

import { useEffect, useState } from "react";
import {
  formatCustomerDate,
  formatRelativeActivityDate,
} from "@/components/customers/details/customer-detail-formatters";

export function RelativeActivityTime({ date }: { date: string }) {
  const [label, setLabel] = useState(() => formatCustomerDate(date));

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    function updateAtNextDay() {
      const now = new Date();
      setLabel(formatRelativeActivityDate(date, now));

      const nextDay = new Date(now);
      nextDay.setHours(24, 0, 0, 0);
      timer = setTimeout(
        updateAtNextDay,
        nextDay.getTime() - now.getTime() + 100,
      );
    }

    updateAtNextDay();
    return () => clearTimeout(timer);
  }, [date]);

  return (
    <time
      dateTime={date}
      className="inline-block min-w-18 text-right text-xs text-muted-foreground"
    >
      {label}
    </time>
  );
}
