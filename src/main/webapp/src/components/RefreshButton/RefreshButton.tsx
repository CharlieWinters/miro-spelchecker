import type { FC } from "react";
import { Button } from "../ui/Button/Button";
import { Icon } from "../ui/Icon/Icon";

type Props = {
  onClick: VoidFunction;
  loading?: boolean;
};
export const RefreshButton: FC<Props> = ({ loading, onClick }) => {
  return (
    <Button
      onClick={onClick}
      loading={loading}
      type="tertiary"
      size="medium"
      label="Refresh spelling suggestions"
    >
      <Icon icon="refresh" /> Refresh
    </Button>
  );
};
