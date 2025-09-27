package org.alignwithme.survey_service.util;

import org.alignwithme.survey_service.entity.Answer;
import org.alignwithme.survey_service.model.AnswerInfo;
import org.springframework.stereotype.Component;

@Component
public class AnswerUtil {

    AnswerInfo answerToAnswerInfo(Answer answer) {
        if (answer == null) return null;

        AnswerInfo answerInfo = new AnswerInfo();
        answerInfo.setAnswerId(answer.getAnswerId());
        answerInfo.setText(answer.getText());

        return answerInfo;
    }

    Answer answerInfoToAnswer(AnswerInfo answerInfo) {
        if (answerInfo == null) return null;

        Answer answer = new Answer();
        answer.setAnswerId(answerInfo.getAnswerId());
        answer.setText(answerInfo.getText());

        return answer;
    }
}
