import { openPanel, subscribeCustomEvent, subscribeIconClick } from "./board";

const onEvent = async (): Promise<void> => {
  await openPanel();
};

export const initializeApplicationEvent = (): void => {
  subscribeIconClick(onEvent);
  subscribeCustomEvent("check-selected", onEvent);
};
