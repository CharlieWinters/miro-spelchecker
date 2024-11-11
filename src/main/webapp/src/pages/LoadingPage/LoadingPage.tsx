import type { FC } from "react";
import cn from "classnames";
import { ErrorAlert } from "../../components/ErrorAlert/ErrorAlert";
import { CommonState } from "../../components/PageStates/CommonState";
import { Spinner } from "../../components/ui/Spinner/Spinner";
import styles from "./LoadingPage.module.css";

type Props = {
  onTryAgain?: VoidFunction;
};
export const LoadingPage: FC<Props> = ({ onTryAgain }) => {
  return (
    <article className={cn("sc-flex-column", styles.container)}>
      <div className={cn("sc-flex-centered", styles.data)}>
        <CommonState title="Conjuring spell-checking...">
          <Spinner size="medium" stopAnimation={Boolean(onTryAgain)} />
        </CommonState>
      </div>
      {onTryAgain ? (
        <div className={styles.error}>
          <ErrorAlert onClick={onTryAgain} />
        </div>
      ) : null}
    </article>
  );
};
