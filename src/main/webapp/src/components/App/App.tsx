import { type FC, StrictMode, useCallback, useEffect, useState } from "react";
import { useSelectedElements } from "../../hooks/useSelectedElements";
import { getValidatedLanguage } from "../../utils/language";
import { SelectedWidgetsPage } from "../../pages/SelectedWidgetsPage/SelectedWidgetsPage";
import { BoardWidgetsPage } from "../../pages/BoardWidgetsPage/BoardWidgetsPage";

export const App: FC = () => {
  const [showAll, setShowAll] = useState(false);
  const { items, refreshSelection } = useSelectedElements();
  const [language, setLanguage] = useState(getValidatedLanguage);

  useEffect(() => {
    if (items && !items.length) {
      return;
    }
    setShowAll(false);
  }, [items]);

  const showAllWidgets = useCallback(() => {
    setShowAll(true);
  }, []);

  const showSelectedWidgets = useCallback(() => {
    setShowAll(false);
  }, []);

  if (!items) {
    return null;
  }

  return (
    <StrictMode>
      {showAll ? (
        <BoardWidgetsPage
          language={language}
          setLanguage={setLanguage}
          showSelected={showSelectedWidgets}
        />
      ) : (
        <SelectedWidgetsPage
          language={language}
          setLanguage={setLanguage}
          showAll={showAllWidgets}
          items={items}
          refreshSelection={refreshSelection}
        />
      )}
    </StrictMode>
  );
};
