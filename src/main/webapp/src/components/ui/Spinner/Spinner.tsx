import type { FC } from "react";
import cn from "classnames";
import type { ComponentSize } from "../types";
import spinnerUrl from "../../../assets/spinner.svg";
import styles from "./Spinner.module.css";

const getSize = (size?: ComponentSize): string => {
  switch (size) {
    case "small":
      return styles.small;
    case "medium":
    default:
      return styles.medium;
  }
};

type Props = {
  stopAnimation?: boolean;
  size?: ComponentSize;
};
export const Spinner: FC<Props> = ({ stopAnimation, size }) => {
  return (
    <img
      className={cn(
        styles.rotate,
        { [styles.paused]: stopAnimation },
        getSize(size)
      )}
      src={spinnerUrl}
      alt=""
    />
  );
};
