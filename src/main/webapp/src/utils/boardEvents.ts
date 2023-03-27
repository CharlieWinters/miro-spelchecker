import { openPanel, subscribeCustomEvent, subscribeIconClick } from "./board";

const onEvent = async () => {
  await openPanel();
};

export const initializeApplicationEvent = () => {
  subscribeIconClick(onEvent);
  subscribeCustomEvent("check-selected", onEvent);
};
