import { type FC, useCallback, useEffect, useState } from "react";
import type { BoardNode } from "@mirohq/websdk-types";
import type { SupportedLanguage } from "../../utils/language";
import {
  type GroupedSpellCheckResult,
  runGroupedElementsSpellCheck,
  runSpellCheckById,
} from "../../utils/spellCheck";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import {
  EmptyResultsPage,
  EmptySelectionPage,
} from "../EmptySelectionPage/EmptySelectionPage";
import { WidgetListPage } from "../WidgetListPage/WidgetListPage";
import { WidgetResultsPage } from "../WidgetResultsPage/WidgetResultsPage";

type Props = {
  language: SupportedLanguage;
  setLanguage: (lng: SupportedLanguage) => void;
  items: BoardNode[];
  showAll: VoidFunction;
  refreshSelection: VoidFunction;
};
export const SelectedWidgetsPage: FC<Props> = ({
  showAll,
  items,
  language,
  setLanguage,
  refreshSelection,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [list, setList] = useState<GroupedSpellCheckResult[]>([]);
  const [selected, setSelected] = useState<GroupedSpellCheckResult>();

  const onRefresh = useCallback(async () => {
    setIsError(false);
    setSelected(undefined);
    if (!items.length) {
      setList([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const newList = await runGroupedElementsSpellCheck(language, items);
      setList(newList);
      if (newList.length === 1) {
        setSelected(newList[0]);
      }
    } catch (err) {
      setIsError(true);
      setList([]);
      setSelected(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [language, items]);

  const onRefreshSelected = useCallback(
    async (anchorIdQuery: string) => {
      setIsError(false);
      setSelected(undefined);
      setIsLoading(true);
      try {
        const newElementData = await runSpellCheckById(language, anchorIdQuery);
        const anchorItem = newElementData.find(
          ([anchorId]) => anchorId === anchorIdQuery
        );
        if (!anchorItem) {
          const newList = await runGroupedElementsSpellCheck(language, items);
          setList(newList);
        }
        setSelected(anchorItem);
      } catch (err) {
        setIsError(true);
        setSelected(undefined);
        setList([]);
      } finally {
        setIsLoading(false);
      }
    },
    [language, items]
  );

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <LoadingPage onTryAgain={refreshSelection} />;
  }

  if (!items.length) {
    return <EmptySelectionPage checkAll={showAll} />;
  }

  if (!list.length) {
    return <EmptyResultsPage checkAll={showAll} selectedSize={items.length} />;
  }

  if (selected) {
    return (
      <WidgetResultsPage
        item={selected}
        language={language}
        setLanguage={setLanguage}
        onRefreshSelected={onRefreshSelected}
      />
    );
  }

  return (
    <WidgetListPage
      language={language}
      setLanguage={setLanguage}
      onRefresh={refreshSelection}
      list={list}
      setSelected={setSelected}
    />
  );
};
