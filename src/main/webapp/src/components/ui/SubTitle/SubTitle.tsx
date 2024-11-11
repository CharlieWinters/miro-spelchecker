import type { FC, ReactNode } from "react";
import cn from "classnames";
import styles from "./SubTitle.module.css";

type Props = {
  children: string | ReactNode;
  inline?: boolean;
  className?: string;
};
export const SubTitle: FC<Props> = ({ children, inline, className }) => {
  return (
    <h3
      className={cn("p-medium", className, styles.sub, {
        "sc-text-center": !inline,
      })}
    >
      {children}
    </h3>
  );
};
