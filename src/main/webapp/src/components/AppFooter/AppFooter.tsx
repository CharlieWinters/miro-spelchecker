import type { FC } from "react";
import { RefreshButton } from "../RefreshButton/RefreshButton";
import { FeedbackButton } from "../FeedbackButton/FeedbackButton";
import { CheckAllButton } from "../Buttons/CheckAllButton";
import styles from "./AppFooter.module.css";

type FooterProps =
  | {
      reloadResults: VoidFunction;
    }
  | {
      checkAll: VoidFunction;
    };
const AppFooter: FC<FooterProps> = (props) => {
  if ("checkAll" in props) {
    return (
      <footer className={styles.footer}>
        <p className={styles.primary}>
          <CheckAllButton onClick={props.checkAll} className={styles.full} />
        </p>
        <p>
          <FeedbackButton />
        </p>
      </footer>
    );
  }
  return (
    <footer className={styles.footer}>
      <p>
        <RefreshButton onClick={props.reloadResults} />
      </p>
      <p>
        <FeedbackButton showLabel />
      </p>
    </footer>
  );
};

type Props = {
  onClick: VoidFunction;
};
export const AppFooterCheckAll: FC<Props> = ({ onClick }) => {
  return <AppFooter checkAll={onClick} />;
};

export const AppFooterRefresh: FC<Props> = ({ onClick }) => {
  return <AppFooter reloadResults={onClick} />;
};
