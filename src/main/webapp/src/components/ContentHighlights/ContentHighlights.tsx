import type { FC } from "react";
import type { SpellCheckResult } from "../../utils/api";
import styles from "./ContentHighlights.module.css";

type Props = {
  check: SpellCheckResult;
};
export const ContentHighlights: FC<Props> = ({ check }) => {
  const text = check.plainText;

  const fromPos = check.fromPosPlain;
  const toPos = check.toPosPlain;
  const start = text.slice(0, fromPos);
  const message = text.slice(fromPos, toPos);
  const end = text.slice(toPos);

  return (
    <>
      <span className={styles.text}>{start}</span>
      <span className={styles.highlight} title={check.message}>
        {message}
      </span>
      <span className={styles.text}>{end}</span>
    </>
  );
};
