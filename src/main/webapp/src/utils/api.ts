import type { ElementContent } from "./extractors";
import type { SupportedLanguage } from "./language";

let API_TOKEN = "";

const getApiToken = async (): Promise<string> => {
  if (!API_TOKEN) {
    API_TOKEN = await miro.board.getIdToken();
  }

  return API_TOKEN;
};

export type SpellCheckResult = {
  elementId: string;
  fromPos: number;
  fromPosPlain: number;
  indexShift: number;
  toPos: number;
  toPosPlain: number;
  plainText: string; // Normalized text
  message: string; // Error explanation
  suggestedReplacements: string[];
};

export const runSpellCheckRequest = async (
  elements: ElementContent[],
  language: SupportedLanguage
): Promise<SpellCheckResult[]> => {
  const apiHost = import.meta.env.SPELLCHECK_API_HOST || document.location.href;
  const url = new URL("/spellcheck", apiHost);

  return getApiToken()
    .then((token) => {
      return fetch(url, {
        method: "POST",
        body: JSON.stringify({
          elements,
          language,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return response.json();
    });
};
