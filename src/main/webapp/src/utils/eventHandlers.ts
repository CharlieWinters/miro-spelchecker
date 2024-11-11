import type { KeyboardEvent } from "react";

export const isLaunchKey = (event: KeyboardEvent): boolean => {
  return event.key === "Enter" || event.key === " ";
};
