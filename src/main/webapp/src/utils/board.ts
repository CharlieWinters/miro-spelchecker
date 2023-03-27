import {
  BoardNode,
  CustomEvent,
  SelectionUpdateEvent,
} from "@mirohq/websdk-types";
import { SpellCheckResult } from "./api";
import { parseListProperty } from "./checks";

const getElementValue = (
  element: BoardNode | string,
  props: string[]
): string => {
  const prop = props.shift();
  if (!prop) {
    if (typeof element === "string") {
      return element;
    }
    throw new Error(
      "String value for the element not found. Perhaps wrong property route?"
    );
  }

  // @ts-expect-error Properly typecheck the property
  return getElementValue(element[prop], props);
};

const setElementValue = (
  element: BoardNode,
  props: string[],
  value: string
): void => {
  const prop = props.shift();
  if (!prop) {
    throw new Error("Wrong property key, it is not defined");
  }

  if (!props.length) {
    // @ts-expect-error Properly typecheck the property
    element[prop] = value;
    return;
  }

  // @ts-expect-error Properly typecheck the property
  return setElementValue(element[prop], props, value);
};

export const applySuggestion = async (
  property: string,
  check: SpellCheckResult,
  suggestion: string
) => {
  const fromPos = check.fromPos;
  const toPos = check.toPos;
  const elements = await miro.board.get({ id: check.elementId });
  const element = elements.shift();
  if (!element) {
    return;
  }

  const props = parseListProperty(property);

  const elementValue = getElementValue(element, [...props]);
  const newValue = [
    elementValue.slice(0, fromPos),
    suggestion,
    elementValue.slice(toPos),
  ].join("");

  setElementValue(element, [...props], newValue);

  await element.sync();
  return element;
};

export const zoomToElement = async (elementId: string): Promise<void> => {
  const elements = await miro.board.get({ id: elementId });
  const element = elements.shift();
  if (!element || element.type === "tag") {
    throw new Error("Unsupported element for zooming");
  }
  await miro.board.viewport.zoomTo(element);
};

export const openPanel = (panelRootFile = "app.html"): Promise<void> =>
  miro.board.ui.openPanel({ url: panelRootFile });

export const subscribeIconClick = (fn: () => Promise<void>): VoidFunction => {
  miro.board.ui.on("icon:click", fn);
  return () => {
    miro.board.ui.off("icon:click", fn);
  };
};

export const subscribeSelectionUpdate = (
  fn: (event: SelectionUpdateEvent) => void
): VoidFunction => {
  miro.board.ui.on("selection:update", fn);
  return () => {
    miro.board.ui.off("selection:update", fn);
  };
};

export const subscribeCustomEvent = (
  name: "check-selected",
  fn: (event: CustomEvent) => Promise<void>
): VoidFunction => {
  miro.board.ui.on(`custom:${name}`, fn);
  return () => {
    miro.board.ui.off(`custom:${name}`, fn);
  };
};
