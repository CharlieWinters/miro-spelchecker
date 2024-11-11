import type { FC } from "react";
import { Button } from "../ui/Button/Button";

type Props = {
  onClick: VoidFunction;
  className?: string;
};
export const CheckAllButton: FC<Props> = ({ onClick, className }) => {
  return (
    <Button
      onClick={onClick}
      type="primary"
      size="medium"
      className={className}
    >
      Check all widgets
    </Button>
  );
};
