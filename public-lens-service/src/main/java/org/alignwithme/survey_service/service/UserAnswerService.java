package org.alignwithme.survey_service.service;

import org.alignwithme.survey_service.entity.UserAnswer;
import org.alignwithme.survey_service.repository.UserAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAnswerService {

    @Autowired
    private final UserAnswerRepository userAnswerRepository;

    @Autowired
    public UserAnswerService(UserAnswerRepository userAnswerRepository) {
        this.userAnswerRepository = userAnswerRepository;
    }

    public List<UserAnswer> saveUserAnswers(List<UserAnswer> userAnswers) {
        return userAnswerRepository.saveAll(userAnswers);
    }
    public List<UserAnswer> getUserAnswersBySurveyId(String surveyId) {
        return userAnswerRepository.findBySurveyId(surveyId);
    }

    public List<UserAnswer> getUserAnswersByQuestionId(String questionId) {
        return userAnswerRepository.findByQuestionId(questionId);
    }
}
