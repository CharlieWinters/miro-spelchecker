import { type FC, useRef } from "react";
import cn from "classnames";
import { useVirtualizer } from "@tanstack/react-virtual";
import { AppFooterRefresh } from "../../components/AppFooter/AppFooter";
import { LanguageForm } from "../../components/LanguageForm/LanguageForm";
import { WidgetListHeader } from "../../components/WidgetListHeader/WidgetListHeader";
import { WidgetCard } from "../../components/WidgetCard/WidgetCard";
import type { SupportedLanguage } from "../../utils/language";
import type { GroupedSpellCheckResult } from "../../utils/spellCheck";
import styles from "./WidgetListPage.module.css";

type Props = {
  language: SupportedLanguage;
  setLanguage: (lng: SupportedLanguage) => void;
  onRefresh: VoidFunction;
  list: GroupedSpellCheckResult[];
  setSelected: (item: GroupedSpellCheckResult) => void;
};
export const WidgetListPage: FC<Props> = ({
  onRefresh,
  language,
  setLanguage,
  list,
  setSelected,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: list.length,
    getScrollElement: () => ref.current,
    estimateSize: () => 90,
  });

  return (
    <article className={cn("sc-flex-column", styles.container)}>
      <header className={cn("sc-flex-column", styles.header)}>
        <WidgetListHeader count={list.length} />
        <LanguageForm language={language} setLanguage={setLanguage} />
      </header>
      <div className={styles.scrollable} ref={ref}>
        <ul
          className={styles.list}
          style={{
            height: virtualizer.getTotalSize(),
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const item = list[virtualRow.index];
            const [anchorId, checks] = item;
            const type = checks[0]?.type;
            const text = checks[0]?.check.plainText;
            return (
              <li
                className={styles.item}
                key={virtualRow.key}
                data-index={virtualRow.index}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                ref={virtualizer.measureElement}
              >
                <WidgetCard
                  anchorId={anchorId}
                  count={checks.length}
                  label={text}
                  type={type}
                  onEdit={(): void => setSelected(item)}
                  className={styles.padded}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <AppFooterRefresh onClick={onRefresh} />
    </article>
  );
};
