package org.alignwithme.survey_service.exception;

import lombok.Getter;

@Getter
public enum ErrorMessage {

    SURVEY_NOT_FOUND("Survey not found"),
    DEMOGRAPHIC_NOT_FOUND("Demographic not found for the survey");

    private final String message;

    ErrorMessage(String message) {
        this.message = message;
    }
}
