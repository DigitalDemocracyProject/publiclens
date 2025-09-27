package org.alignwithme.survey_service.util;

import lombok.AllArgsConstructor;
import org.alignwithme.survey_service._entity.Question;
import org.alignwithme.survey_service.model.QuestionInfo;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class QuestionUtil {

    private final AnswerUtil answerUtil;

    QuestionInfo questionToQuestionInfo(Question question) {
        if (question == null) return null;

        QuestionInfo questionInfo = new QuestionInfo();
        questionInfo.setQuestionId(question.getQuestionId());
        questionInfo.setText(question.getText());
        questionInfo.setType(question.getType());

        if (question.getAnswers() != null) {
            questionInfo.setAnswerInfos(
                    question.getAnswers().stream()
                            .map(answerUtil::answerToAnswerInfo).collect(Collectors.toList())
            );
        }

        return questionInfo;
    }

    Question questionInfoToQuestion(QuestionInfo questionInfo) {
        if (questionInfo == null) return null;

        Question question = new Question();
        question.setQuestionId(questionInfo.getQuestionId());
        question.setText(questionInfo.getText());
        question.setType(question.getType());

        if (questionInfo.getAnswerInfos() != null) {
            question.setAnswers(
                    questionInfo.getAnswerInfos().stream()
                            .map(answerUtil::answerInfoToAnswer).collect(Collectors.toList())
            );
        }

        return question;
    }
}
