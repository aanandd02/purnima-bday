"use client";
import { useState, useEffect } from "react";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  isPast: boolean;
}

export function useCountdown(targetDate: string): Countdown {
  const getTime = (): Countdown => {
    const now = new Date();
    const target = new Date(targetDate);
    // Set target to the current year if it's already passed this year
    const thisYear = new Date(now.getFullYear(), target.getMonth(), target.getDate());
    const nextYear = new Date(now.getFullYear() + 1, target.getMonth(), target.getDate());
    const finalTarget = thisYear >= now ? thisYear : nextYear;

    const diff = finalTarget.getTime() - now.getTime();
    const isToday = diff < 86400000 && diff >= 0;
    const isPast = diff < 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days: Math.max(0, days), hours: Math.max(0, hours), minutes: Math.max(0, minutes), seconds: Math.max(0, seconds), isToday, isPast };
  };

  const [state, setState] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    isPast: false,
  });

  useEffect(() => {
    setState(getTime());
    const interval = setInterval(() => setState(getTime()), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return state;
}
