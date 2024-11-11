import { type ChangeEvent, type FC, useCallback } from "react";
import {
  getValidatedLanguage,
  saveLanguageSelection,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "../../utils/language";
import { LockInlineIcon } from "../ui/Icon/Icon";
import styles from "./LanguageSelector.module.css";

type Props = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  onToggle: VoidFunction;
  canSaveLanguage: boolean;
};
export const LanguageSelector: FC<Props> = ({
  language,
  setLanguage,
  onToggle,
  canSaveLanguage,
}) => {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const lang = getValidatedLanguage(event.target.value);
      setLanguage(lang);
      saveLanguageSelection(lang);
    },
    [setLanguage]
  );

  return (
    <div className={styles.container}>
      <p>
        <label htmlFor="language-selector" className="p-large">
          Language
        </label>
        {!canSaveLanguage ? (
          <LockInlineIcon
            className={styles.icon}
            onClick={onToggle}
            label="Toggle the language selector warning"
          />
        ) : null}
      </p>
      <p className={styles.dropdown}>
        <select
          className="select select-small"
          id="language-selector"
          value={language}
          onChange={onChange}
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </p>
    </div>
  );
};
