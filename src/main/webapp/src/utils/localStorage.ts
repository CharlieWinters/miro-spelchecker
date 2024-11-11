export const enum LocalStorageKey {
  Language = "lang",
}

const SPELL_CHECKER_APP_KEY = "spell-checker";

export const getLocalStorageItem = (key: LocalStorageKey): string | null => {
  return window.localStorage.getItem(`${SPELL_CHECKER_APP_KEY}/${key}`);
};

export const setLocalStorageItem = (key: LocalStorageKey, value = ""): void => {
  if (!value) {
    window.localStorage.removeItem(`${SPELL_CHECKER_APP_KEY}/${key}`);
    return;
  }
  window.localStorage.setItem(`${SPELL_CHECKER_APP_KEY}/${key}`, value);
};

export const isLocalStorageAvailable = (): boolean => {
  try {
    const storage = window.localStorage;
    return Boolean(storage);
  } catch (err) {
    return false;
  }
};
