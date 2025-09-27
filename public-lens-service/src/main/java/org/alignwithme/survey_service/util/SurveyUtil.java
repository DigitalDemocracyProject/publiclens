package org.alignwithme.survey_service.util;

import lombok.AllArgsConstructor;
import org.alignwithme.survey_service._entity.Survey;
import org.alignwithme.survey_service.model.SurveyInfo;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class SurveyUtil {

    private final QuestionUtil questionUtil;

    public SurveyInfo surveyToSurveyInfo(Survey survey) {
        if (survey == null) return null;

        SurveyInfo surveyInfo = new SurveyInfo();
        surveyInfo.setSurveyName(survey.getSurveyName());
        surveyInfo.setDescription(survey.getDescription());
        surveyInfo.setUserInfoId(survey.getUserInfoId());

        if (survey.getQuestions() != null) {
            surveyInfo.setQuestionInfos(
                    survey.getQuestions().stream()
                            .map(questionUtil::questionToQuestionInfo).collect(Collectors.toList())
            );
        }

        return surveyInfo;
    }
}
