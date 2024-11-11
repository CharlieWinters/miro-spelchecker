import { type FC, useState } from "react";
import cn from "classnames";
import { LanguageSelector } from "./LanguageSelector";
import { isLocalStorageAvailable } from "../../utils/localStorage";
import type { SupportedLanguage } from "../../utils/language";
import styles from "./LanguageForm.module.css";

type Props = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
};
export const LanguageForm: FC<Props> = ({ language, setLanguage }) => {
  const [showWarning, setShowWarning] = useState(false);
  const canSaveLanguage = isLocalStorageAvailable();
  const show = !canSaveLanguage && showWarning;
  const onToggle = (): void => {
    setShowWarning((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <LanguageSelector
        language={language}
        setLanguage={setLanguage}
        onToggle={onToggle}
        canSaveLanguage={canSaveLanguage}
      />
      {show ? (
        <p className={cn("p-small", styles.warning)}>
          Language selection will reset after you close the application
        </p>
      ) : null}
    </div>
  );
};
