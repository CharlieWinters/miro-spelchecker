import type { FC, ReactNode } from "react";
import cn from "classnames";
import { Title } from "../ui/Title/Title";
import { Button } from "../ui/Button/Button";
import { SubTitle } from "../ui/SubTitle/SubTitle";
import styles from "./CommonState.module.css";

export type StateAction = {
  label: string;
  onClick: VoidFunction;
};

type Props = {
  children: string | ReactNode;
  title: string;
  sub?: string;
  cta?: StateAction;
};
export const CommonState: FC<Props> = ({ title, sub, cta, children }) => {
  return (
    <section>
      <p className={cn("sc-text-center", styles.container)}>
        {typeof children === "string" ? (
          <img alt="" src={children} className={styles.image} />
        ) : (
          <>{children}</>
        )}
      </p>
      <Title className={styles.title} centered>
        {title}
      </Title>
      {sub ? <SubTitle className={styles.subtitle}>{sub}</SubTitle> : null}
      {cta ? (
        <p className={cn("sc-text-center", styles.cta)}>
          <Button onClick={cta.onClick} type="primary" size="medium">
            {cta.label}
          </Button>
        </p>
      ) : null}
    </section>
  );
};
