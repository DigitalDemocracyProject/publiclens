package org.alignwithme.survey_service.exception;

import lombok.Getter;

@Getter
public enum ErrorMessage {

    SURVEY_NOT_FOUND("Survey not found");

    private final String message;

    ErrorMessage(String message) {
        this.message = message;
    }
}
