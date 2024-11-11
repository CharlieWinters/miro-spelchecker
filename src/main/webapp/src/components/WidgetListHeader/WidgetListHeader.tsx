import type { FC } from "react";
import { SubTitle } from "../ui/SubTitle/SubTitle";
import { getWidgetsText } from "../../utils/texts";
import styles from "./WidgetListHeader.module.css";

type Props = {
  count: number;
};
export const WidgetListHeader: FC<Props> = ({ count }) => {
  return (
    <SubTitle className={styles.sub} inline>
      Suggestions available for{" "}
      <span className="sc-text-bold">{getWidgetsText(count)}</span>
    </SubTitle>
  );
};
