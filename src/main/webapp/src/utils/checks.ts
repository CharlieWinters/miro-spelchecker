import { SpellCheckResult } from "./api";
import { AnchoredElementContent, WithAnchor } from "./extractors";

const SEPARATORS = {
  id: ":",
  property: "|",
};

export const getFullId = ({
  elementId,
  property,
}: AnchoredElementContent): string => [elementId, property].join(SEPARATORS.id);

export const getListProperty = (...parts: (string | number)[]): string =>
  parts.join(SEPARATORS.property);

export const parseListProperty = (property: string): string[] =>
  property.split(SEPARATORS.property);

export type SpellCheckList = WithAnchor & {
  check: SpellCheckResult;
};

export const linkChecksWithItems = (
  content: AnchoredElementContent[],
  checks: SpellCheckResult[] = []
): SpellCheckList[] => {
  const anchors = content.reduce<Record<string, AnchoredElementContent>>(
    (acc, item) => {
      return {
        ...acc,
        [getFullId(item)]: item,
      };
    },
    {}
  );

  return checks.reduce<SpellCheckList[]>((acc, check) => {
    const elementContent = anchors[check.elementId];

    if (!elementContent) {
      return acc;
    }

    const { anchorId, property, elementId } = elementContent;

    return [
      ...acc,
      {
        check: {
          ...check,
          elementId,
        },
        anchorId,
        property,
      },
    ];
  }, []);
};
