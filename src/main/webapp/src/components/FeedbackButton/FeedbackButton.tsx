import { type FC, useCallback } from "react";
import { Button } from "../ui/Button/Button";
import { Icon } from "../ui/Icon/Icon";
import { getMarketplaceUrl } from "../../utils/marketplace";

type Props = {
  showLabel?: boolean;
};
export const FeedbackButton: FC<Props> = ({ showLabel }) => {
  const onClick = useCallback(() => {
    window.open(getMarketplaceUrl(), "_blank", "noopener,noreferrer");
  }, []);

  const text = showLabel ? "Send feedback" : "";
  const label = !showLabel ? "Send feedback" : "";

  return (
    <Button onClick={onClick} type="tertiary" size="medium" label={label}>
      <Icon icon="comment-feedback" /> {text}
    </Button>
  );
};
