package com.miro.spelchecker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class SpelCheckRequestElement {
    private String elementId;
    private String text;
}
