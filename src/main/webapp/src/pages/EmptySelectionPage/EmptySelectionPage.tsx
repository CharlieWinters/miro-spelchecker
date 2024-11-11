import type { FC } from "react";
import cn from "classnames";
import { AppFooterCheckAll } from "../../components/AppFooter/AppFooter";
import { CommonState } from "../../components/PageStates/CommonState";
import { getSelectionCheckedText } from "../../utils/texts";
import emptySelection from "../../assets/empty-selection.svg";
import styles from "./EmptySelectionPage.module.css";

type SelectionProps = {
  checkAll: VoidFunction;
};
export const EmptySelectionPage: FC<SelectionProps> = ({ checkAll }) => {
  return (
    <article className={cn("sc-flex-column", styles.container)}>
      <div className={styles.view}>
        <div className={cn("sc-flex-centered", styles.state)}>
          <CommonState title="Manually select widgets or check all widgets in this board">
            {emptySelection}
          </CommonState>
        </div>
      </div>
      <AppFooterCheckAll onClick={checkAll} />
    </article>
  );
};

type ResultsProps = SelectionProps & {
  selectedSize: number;
};
export const EmptyResultsPage: FC<ResultsProps> = ({
  selectedSize,
  checkAll,
}) => {
  return (
    <article className={cn("sc-flex-column", styles.container)}>
      <div className={styles.view}>
        <div className={cn("sc-flex-centered", styles.state)}>
          <CommonState title={getSelectionCheckedText(selectedSize)}>
            {emptySelection}
          </CommonState>
        </div>
      </div>
      <AppFooterCheckAll onClick={checkAll} />
    </article>
  );
};
