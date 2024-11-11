import type { FC } from "react";
import { Icon } from "../ui/Icon/Icon";
import { Button } from "../ui/Button/Button";
import styles from "./ErrorAlert.module.css";

type Props = {
  message?: string;
  onClick?: VoidFunction;
};
export const ErrorAlert: FC<Props> = ({ message, onClick }) => {
  const msg = message || "Something went wrong.";
  return (
    <section className={styles.alert}>
      <p>
        <Icon icon="warning" nonInteractive />
      </p>
      <p>
        <span className="p-medium">{msg}</span>
        {onClick ? (
          <Button onClick={onClick} type="inline" size="medium">
            Try again
          </Button>
        ) : null}
      </p>
    </section>
  );
};
