import type { FC, KeyboardEventHandler, MouseEventHandler } from "react";
import cn from "classnames";
import type { ItemType } from "@mirohq/websdk-types";
import { getSuggestionsText } from "../../utils/texts";
import { Button } from "../ui/Button/Button";
import { Icon } from "../ui/Icon/Icon";
import { detectIconByWidgetType } from "../../utils/icons";
import { zoomToElement } from "../../utils/board";
import { isLaunchKey } from "../../utils/eventHandlers";
import styles from "./WidgetCard.module.css";

type Props = {
  type: ItemType;
  anchorId: string;
  count: number;
  label: string;
  onEdit: VoidFunction;
  className?: string;
};
export const WidgetCard: FC<Props> = ({
  anchorId,
  type,
  count,
  label,
  onEdit,
  className,
}) => {
  const zoom = async (): Promise<void> => {
    try {
      await zoomToElement(anchorId);
    } catch (err) {
      console.error("Can not zoom to element", err);
    }
  };

  const onCardClick = async (): Promise<void> => {
    onEdit();
    await zoom();
  };

  const onCardKeyDown: KeyboardEventHandler<HTMLDivElement> = async (event) => {
    if (isLaunchKey(event)) {
      await onCardClick();
    }
  };

  const onButtonClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    await zoom();
  };

  const onButtonKeyDown: KeyboardEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    if (isLaunchKey(event)) {
      event.stopPropagation();
      event.preventDefault();
      await zoom();
    }
  };

  return (
    <section
      className={cn(styles.base, className)}
      role="button"
      tabIndex={0}
      onClick={onCardClick}
      onKeyDown={onCardKeyDown}
      aria-label="See spell checker suggestions for the widget"
    >
      <p>
        <Icon icon={detectIconByWidgetType(type)} />
      </p>
      <div className={styles.container}>
        <div className={styles.info}>
          <p className={cn("p-medium", styles.highlight)} title={label}>
            {label}
          </p>
          <p className={cn("p-medium", styles.sub)}>
            {getSuggestionsText(count)}
          </p>
        </div>
        <p>
          <Button
            onClick={onButtonClick}
            onKeyDown={onButtonKeyDown}
            type="tertiary"
            size="small"
            label="Focus on the widget"
          >
            <Icon icon="eye" />
          </Button>
        </p>
      </div>
    </section>
  );
};
