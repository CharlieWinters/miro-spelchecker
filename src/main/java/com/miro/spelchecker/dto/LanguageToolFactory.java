package com.miro.spelchecker.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.languagetool.JLanguageTool;
import org.languagetool.language.*;

public class LanguageToolFactory {

    private static final JLanguageTool americanEnglishLangTool = new JLanguageTool(new AmericanEnglish());

    public static JLanguageTool getLanguageTool(String languageCode) throws JsonProcessingException {
        switch (languageCode) {
            case "en-EN":
                return new JLanguageTool(new BritishEnglish());
            case "es-ES":
                return new JLanguageTool(new Spanish());
            case "de":
                return new JLanguageTool(new GermanyGerman());
            case "ru-RU":
                return new JLanguageTool(new Russian());
            case "fr-FR":
                return new JLanguageTool(new French());
            case "jp-JP":
                return new JLanguageTool(new Japanese());
            default:
                return americanEnglishLangTool;
        }
    }
}
