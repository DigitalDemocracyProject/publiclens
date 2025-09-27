package org.alignwithme.survey_service.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseInfo {

    private String surveyId;
    private String userId;
    private List<QuestionInfo> demographics;
    private List<QuestionInfo> userAnswers;
}
