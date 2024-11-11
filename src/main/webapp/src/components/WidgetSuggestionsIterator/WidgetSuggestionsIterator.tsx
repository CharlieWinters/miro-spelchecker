import { type FC, useCallback } from "react";
import { getSpellingChecksText } from "../../utils/texts";
import { Title } from "../ui/Title/Title";
import { Button } from "../ui/Button/Button";
import { Icon } from "../ui/Icon/Icon";
import styles from "./WidgetSuggestionsIterator.module.css";

type Props = {
  current: number;
  total: number;
  onSelect: (position: number) => void;
};
export const WidgetSuggestionsIterator: FC<Props> = ({
  current,
  total,
  onSelect,
}) => {
  const onNext = useCallback(() => {
    onSelect(current + 1);
  }, [onSelect, current]);

  const onPrev = useCallback(() => {
    onSelect(current - 1);
  }, [onSelect, current]);

  if (total < 1 || current < 1 || current > total) {
    return null;
  }

  const showControls = total > 1;

  return (
    <div className={styles.container}>
      {showControls ? (
        <p>
          <Button
            onClick={onPrev}
            type="tertiary"
            size="small"
            label="See previous suggestion"
            disabled={current === 1}
          >
            <Icon icon="arrow-left" />
          </Button>
        </p>
      ) : null}
      <Title className={styles.title} centered>
        {getSpellingChecksText(current, total)}
      </Title>
      {showControls ? (
        <p>
          <Button
            onClick={onNext}
            type="tertiary"
            size="small"
            label="See next suggestion"
            disabled={current === total}
          >
            <Icon icon="arrow-right" />
          </Button>
        </p>
      ) : null}
    </div>
  );
};
