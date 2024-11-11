import type { ItemType } from "@mirohq/websdk-types";

export type SupportedIcon =
  | "refresh"
  | "comment-feedback"
  | "settings"
  | "card-list"
  | "warning"
  | "edit"
  | "sticky"
  | "arrow-right"
  | "arrow-left"
  | "text"
  | "line"
  | "card"
  | "frame"
  | "rhombus"
  | "image"
  | "tag"
  | "parallelogram"
  | "lock"
  | "eye";

export const detectIconByWidgetType = (type: ItemType): SupportedIcon => {
  switch (type) {
    case "text":
      return "text";
    case "connector":
      return "line";
    case "card":
    case "app_card":
      return "card";
    case "frame":
      return "frame";
    case "shape":
      return "rhombus";
    case "sticky_note":
      return "sticky";
    case "image":
      return "image";
    default:
      return "parallelogram";
  }
};
