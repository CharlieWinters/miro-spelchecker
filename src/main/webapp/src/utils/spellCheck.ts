import type { BoardNode, GetFilter } from "@mirohq/websdk-types";
import { runSpellCheckRequest } from "./api";
import { getFullId, linkChecksWithItems, type SpellCheckList } from "./checks";
import type { SupportedLanguage } from "./language";
import {
  getContentFromItems,
  getContentFromTags,
  type ElementContent,
} from "./extractors";

export const runBoardSpellCheck = async (
  language: SupportedLanguage
): Promise<SpellCheckList[]> => {
  return runSpellCheck(language);
};

export const runElementsSpellCHeck = async (
  language: SupportedLanguage,
  items: BoardNode[]
): Promise<SpellCheckList[]> => {
  if (!items.length) {
    return [];
  }

  const filter = {
    id: items.map(({ id }) => id),
  };
  return runSpellCheck(language, filter);
};

const runSpellCheck = async (
  language: SupportedLanguage,
  filter?: GetFilter
): Promise<SpellCheckList[]> => {
  const boardItems = await miro.board.get(filter);
  const { elements, tags: tagElements } = getContentFromItems(boardItems);

  const tagFilter: GetFilter = {
    id: tagElements.map(({ elementId }) => elementId),
  };
  const boardTags = await miro.board.get(tagFilter);
  const tags = getContentFromTags(boardTags, tagElements);
  const content = [...elements, ...tags];
  if (!content.length) {
    return [];
  }

  const requestData: ElementContent[] = content.map((elementContent) => {
    return {
      elementId: getFullId(elementContent),
      text: elementContent.text,
    };
  });

  const checks = await runSpellCheckRequest(requestData, language);
  return linkChecksWithItems(content, checks);
};

export type GroupedSpellCheckResult = [string, SpellCheckList[]];

const groupSpellCheckList = (
  list: SpellCheckList[]
): GroupedSpellCheckResult[] => {
  const groups = list.reduce<Record<string, SpellCheckList[]>>((acc, item) => {
    const key = item.anchorId;
    if (acc[key]) {
      acc[key].push(item);
      return acc;
    }

    acc[key] = [item];
    return acc;
  }, {});

  return Object.keys(groups).map((anchorId) => {
    return [anchorId, groups[anchorId]];
  });
};

export const runGroupedElementsSpellCheck = async (
  language: SupportedLanguage,
  items: BoardNode[]
): Promise<GroupedSpellCheckResult[]> => {
  const data = await runElementsSpellCHeck(language, items);
  return groupSpellCheckList(data);
};

export const runGroupedBoardSpellCheck = async (
  language: SupportedLanguage
): Promise<GroupedSpellCheckResult[]> => {
  const data = await runBoardSpellCheck(language);
  return groupSpellCheckList(data);
};

export const runSpellCheckById = async (
  language: SupportedLanguage,
  elementId: string
): Promise<GroupedSpellCheckResult[]> => {
  const data = await runSpellCheck(language, { id: [elementId] });
  return groupSpellCheckList(data);
};
