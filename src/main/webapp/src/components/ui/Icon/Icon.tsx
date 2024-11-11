import type { FC, KeyboardEventHandler } from "react";
import cn from "classnames";
import { isLaunchKey } from "../../../utils/eventHandlers";
import type { SupportedIcon } from "../../../utils/icons";
import styles from "./Icon.module.css";

type Props = {
  icon: SupportedIcon;
  nonInteractive?: boolean;
};
export const Icon: FC<Props> = ({ icon, nonInteractive }) => {
  return (
    <span
      className={cn("icon", `icon-${icon}`, !nonInteractive && styles.icon)}
    />
  );
};

type LockIconProps = {
  className?: string;
  onClick?: VoidFunction;
  label?: string;
};
export const LockInlineIcon: FC<LockIconProps> = ({
  className,
  onClick,
  label,
}) => {
  const onKeyDown: KeyboardEventHandler = (event) => {
    if (isLaunchKey(event)) {
      onClick?.();
    }
  };

  const attrs = onClick
    ? {
        onClick,
        onKeyDown,
        tabIndex: 0,
        role: "button",
        "aria-label": label,
      }
    : {};

  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        {
          [styles.icon]: onClick,
        },
        styles.lock,
        className
      )}
      {...attrs}
    >
      <path
        fill="currentColor"
        d="M12 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v4a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3V5Zm8 0v4H9V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Zm-8 6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H7Z"
      />
    </svg>
  );
};
