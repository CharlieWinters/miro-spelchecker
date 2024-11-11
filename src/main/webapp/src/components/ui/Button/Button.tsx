import type {
  FC,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from "react";
import cn from "classnames";
import type { ComponentSize } from "../types";
import styles from "./Button.module.css";

type ButtonType = "primary" | "secondary" | "tertiary" | "inline";

const getButtonClass = (type: ButtonType): string => {
  if (type === "inline") {
    return cn(styles.inline, "sc-text-bold");
  }

  return cn("button", `button-${type}`);
};

type Props = {
  children: string | ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type: ButtonType;
  size: ComponentSize;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  className?: string;
  loading?: boolean;
  label?: string;
  disabled?: boolean;
};
export const Button: FC<Props> = ({
  children,
  onClick,
  type,
  size,
  onKeyDown,
  className,
  loading,
  label,
  disabled,
}) => {
  const onButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (loading || disabled) {
      return;
    }
    onClick(event);
  };

  const onButtonKeyDown: KeyboardEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    if (loading || disabled) {
      return;
    }
    onKeyDown?.(event);
  };

  return (
    <button
      className={cn(
        getButtonClass(type),
        `p-${size}`,
        {
          "button-loading": loading,
          "button-small": size === "small",
        },
        className
      )}
      type="button"
      onClick={onButtonClick}
      onKeyDown={onButtonKeyDown}
      aria-label={label}
      disabled={disabled || loading}
    >
      {children}
    </button>
  );
};
