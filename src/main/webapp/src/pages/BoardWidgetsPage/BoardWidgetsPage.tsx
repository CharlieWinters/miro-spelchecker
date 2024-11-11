import { type FC, useCallback, useEffect, useState } from "react";
import type { SupportedLanguage } from "../../utils/language";
import {
  type GroupedSpellCheckResult,
  runGroupedBoardSpellCheck,
  runSpellCheckById,
} from "../../utils/spellCheck";
import { NoResultsPage } from "../NoResultsPage/NoResultsPage";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { WidgetListPage } from "../WidgetListPage/WidgetListPage";
import { WidgetResultsPage } from "../WidgetResultsPage/WidgetResultsPage";

type Props = {
  language: SupportedLanguage;
  setLanguage: (lng: SupportedLanguage) => void;
  showSelected: VoidFunction;
};
export const BoardWidgetsPage: FC<Props> = ({
  showSelected,
  language,
  setLanguage,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [list, setList] = useState<GroupedSpellCheckResult[]>([]);
  const [selected, setSelected] = useState<GroupedSpellCheckResult>();

  const onRefresh = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setSelected(undefined);
    setList([]);
    try {
      const newList = await runGroupedBoardSpellCheck(language);
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
  }, [language]);

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
          const newList = await runGroupedBoardSpellCheck(language);
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
    [language]
  );

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <LoadingPage onTryAgain={onRefresh} />;
  }

  if (!list.length) {
    return <NoResultsPage onClick={showSelected} />;
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
      onRefresh={onRefresh}
      list={list}
      setSelected={setSelected}
    />
  );
};
