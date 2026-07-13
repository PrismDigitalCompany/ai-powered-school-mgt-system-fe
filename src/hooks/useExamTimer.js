import { useEffect, useState } from "react";

const STORAGE_PREFIX = "SMS.CBT";

export function useExamTimer({
  sessionId,
  endTime,
  onExpire,
}) {
  const key = `${STORAGE_PREFIX}:${sessionId}`;

  // Persist the end time (from the backend)
  const [examEndTime] = useState(() => {
    try {
      const stored = localStorage.getItem(key);

      if (stored) {
        return Number(stored);
      }

      const parsedEndTime =
        typeof endTime === "string"
          ? new Date(endTime).getTime()
          : Number(endTime);

      localStorage.setItem(key, String(parsedEndTime));

      return parsedEndTime;
    } catch (error) {
      console.error("LocalStorage unavailable", error);

      return typeof endTime === "string"
        ? new Date(endTime).getTime()
        : Number(endTime);
    }
  });

  const getRemainingSeconds = () =>
    Math.max(
      0,
      Math.ceil((examEndTime - Date.now()) / 1000)
    );

  const [secondsLeft, setSecondsLeft] = useState(getRemainingSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getRemainingSeconds();

      setSecondsLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);

        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.error(error);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [examEndTime, key]);

  useEffect(() => {
    if (secondsLeft === 0) {
      onExpire?.();
    }
  }, [secondsLeft, onExpire]);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const formatted =
    hours > 0
      ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
          2,
          "0"
        )}`;

  return {
    secondsLeft,
    formatted,
    hours,
    minutes,
    seconds,
    isExpired: secondsLeft === 0,
    isRunningLow: secondsLeft > 0 && secondsLeft <= 300,
  };
}