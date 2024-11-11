import { type FC, useState } from "react";
import cn from "classnames";
import { AppFooterRefresh } from "../../components/AppFooter/AppFooter";
import { LanguageForm } from "../../components/LanguageForm/LanguageForm";
import { WidgetSuggestionsIterator } from "../../components/WidgetSuggestionsIterator/WidgetSuggestionsIterator";
import { Title } from "../../components/ui/Title/Title";
import { SubTitle } from "../../components/ui/SubTitle/SubTitle";
import type { GroupedSpellCheckResult } from "../../utils/spellCheck";
import type { SupportedLanguage } from "../../utils/language";
import { Button } from "../../components/ui/Button/Button";
import { applySuggestion } from "../../utils/board";
import { ErrorAlert } from "../../components/ErrorAlert/ErrorAlert";
import { ContentHighlights } from "../../components/ContentHighlights/ContentHighlights";
import styles from "./WidgetResultsPage.module.css";

const MAX_SUGGESTIONS_COUNT = 6;

type Props = {
  item: GroupedSpellCheckResult;
  language: SupportedLanguage;
  setLanguage: (lng: SupportedLanguage) => void;
  onRefreshSelected: (anchorId: string) => void;
};
export const WidgetResultsPage: FC<Props> = ({
  item,
  language,
  setLanguage,
  onRefreshSelected,
}) => {
  const [isError, setIsError] = useState(false);
  const [anchorId, checks] = item;
  const [focused, setFocused] = useState(1);
  const focusedCheck = checks.at(focused - 1);

  if (!focusedCheck) {
    return null;
  }

  const onSwipe = (newFocused: number): void => {
    setIsError(false);
    setFocused(newFocused);
  };

  const fixCheck = async (suggestion: string): Promise<void> => {
    setIsError(false);
    try {
      await applySuggestion(
        focusedCheck.property,
        focusedCheck.check,
        suggestion
      );
      onRefreshSelected(anchorId);
    } catch (err) {
      console.error("Unable to apply the suggestion", err);
      setIsError(true);
    }
  };

  const suggestions = focusedCheck.check.suggestedReplacements
    .filter((suggestion) => suggestion)
    .slice(0, MAX_SUGGESTIONS_COUNT);

  return (
    <article className={cn("sc-flex-column", styles.container)}>
      <header className={cn("sc-flex-column", styles.header)}>
        <WidgetSuggestionsIterator
          current={focused}
          total={checks.length || 1}
          onSelect={onSwipe}
        />
        <LanguageForm language={language} setLanguage={setLanguage} />
      </header>
      <div className={cn("sc-flex-column", styles.data)}>
        <div className={styles.options}>
          <p className={styles.text}>
            <ContentHighlights check={focusedCheck.check} />
          </p>
          {suggestions.length ? (
            <>
              <Title>Pick one of the choices</Title>
              <div className={styles.actions}>
                {suggestions.map((suggestion) => (
                  <p key={suggestion}>
                    <Button
                      onClick={(): Promise<void> => fixCheck(suggestion)}
                      type="secondary"
                      size="small"
                    >
                      {suggestion}
                    </Button>
                  </p>
                ))}
              </div>
            </>
          ) : (
            <SubTitle>
              The text might have a spelling error, but there are no suggestions
              available
            </SubTitle>
          )}
        </div>
        {isError ? (
          <div className={styles.error}>
            <ErrorAlert message="Failed to apply the suggestion. Please try again." />
          </div>
        ) : null}
      </div>
      <AppFooterRefresh onClick={(): void => onRefreshSelected(anchorId)} />
    </article>
  );
};
