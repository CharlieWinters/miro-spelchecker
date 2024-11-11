import type { FC } from "react";
import cn from "classnames";
import styles from "./Title.module.css";

type Props = {
  children: string;
  centered?: boolean;
  className?: string;
};
export const Title: FC<Props> = ({ children, className, centered }) => {
  return (
    <h2
      className={cn("p-large", "sc-text-bold", className, styles.title, {
        "sc-text-center": centered,
      })}
    >
      {children}
    </h2>
  );
};
