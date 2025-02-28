package org.alignwithme.survey_service.repository;

import org.alignwithme.survey_service.entity.UserAnswer;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface UserAnswerRepository extends MongoRepository<UserAnswer, String> {

    List<UserAnswer> findBySurveyId(String surveyId);
    List<UserAnswer> findByQuestionId(String questionId);
}
