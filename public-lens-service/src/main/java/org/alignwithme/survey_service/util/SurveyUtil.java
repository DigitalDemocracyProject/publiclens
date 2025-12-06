package org.alignwithme.survey_service.util;

import lombok.AllArgsConstructor;
import org.alignwithme.survey_service.entity.Demographic;
import org.alignwithme.survey_service.entity.Survey;
import org.alignwithme.survey_service.model.SurveyInfo;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class SurveyUtil {

    private final QuestionUtil questionUtil;

    public SurveyInfo surveyToSurveyInfo(Survey survey, Demographic demographic) {
        if (survey == null || demographic == null) return null;

        SurveyInfo surveyInfo = new SurveyInfo();
        surveyInfo.setId(survey.getId());
        surveyInfo.setSurveyName(survey.getSurveyName());
        surveyInfo.setDescription(survey.getDescription());

        if (demographic.getQuestions() != null) {
            surveyInfo.setDemographics(
                    demographic.getQuestions().stream()
                            .map(questionUtil::questionToQuestionInfo).collect(Collectors.toList())
            );
        }

        if (survey.getQuestions() != null) {
            surveyInfo.setQuestions(
                    survey.getQuestions().stream()
                            .map(questionUtil::questionToQuestionInfo).collect(Collectors.toList())
            );
        }

        return surveyInfo;
    }
}
