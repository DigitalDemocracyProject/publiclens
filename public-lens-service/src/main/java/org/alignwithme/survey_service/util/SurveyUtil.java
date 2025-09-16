package org.alignwithme.survey_service.util;

import org.alignwithme.survey_service._entity.Answer;
import org.alignwithme.survey_service._entity.Question;
import org.alignwithme.survey_service._entity.Survey;
import org.alignwithme.survey_service.model.AnswerInfo;
import org.alignwithme.survey_service.model.QuestionInfo;
import org.alignwithme.survey_service.model.SurveyInfo;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class SurveyUtil {

    public SurveyInfo surveyToSurveyInfo(Survey survey) {
        if (survey == null) return null;

        SurveyInfo surveyInfo = new SurveyInfo();
        surveyInfo.setSurveyName(survey.getSurveyName());
        surveyInfo.setDescription(survey.getDescription());
        surveyInfo.setUserInfoId(survey.getUserInfoId());

        if (survey.getQuestions() != null) {
            surveyInfo.setQuestionInfos(
                    survey.getQuestions().stream()
                            .map(this::questionToQuestionInfo).collect(Collectors.toList())
            );
        }

        return surveyInfo;
    }

    private QuestionInfo questionToQuestionInfo(Question question) {
        if (question == null) return null;

        QuestionInfo questionInfo = new QuestionInfo();
        questionInfo.setQuestionId(question.getQuestionId());
        questionInfo.setText(question.getText());
        questionInfo.setType(question.getType());

        if (question.getAnswers() != null) {
            questionInfo.setAnswerInfos(
                    question.getAnswers().stream()
                            .map(this::answerToAnswerInfo).collect(Collectors.toList())
            );
        }

        return questionInfo;
    }

    private AnswerInfo answerToAnswerInfo(Answer answer) {
        if (answer == null) return null;

        AnswerInfo answerInfo = new AnswerInfo();
        answerInfo.setAnswerId(answer.getAnswerId());
        answerInfo.setText(answer.getText());

        return answerInfo;
    }
}
