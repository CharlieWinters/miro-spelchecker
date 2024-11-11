import { type FC, useMemo } from "react";
import cn from "classnames";
import {
  CommonState,
  type StateAction,
} from "../../components/PageStates/CommonState";
import emptyResults from "../../assets/empty-results.svg";
import styles from "./NoResultsPage.module.css";

type Props = {
  onClick: VoidFunction;
};
export const NoResultsPage: FC<Props> = ({ onClick }) => {
  const cta: StateAction = useMemo(() => {
    return {
      label: "Continue",
      onClick,
    };
  }, [onClick]);

  return (
    <article className={cn("sc-flex-column", styles.container)}>
      <div className={cn("sc-flex-centered", styles.data)}>
        <CommonState
          title="Spell check completed"
          sub="All widgets have been successfully spell checked and no spelling errors were found. Keep up the good work!"
          cta={cta}
        >
          {emptyResults}
        </CommonState>
      </div>
    </article>
  );
};
