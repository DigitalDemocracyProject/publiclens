package org.alignwithme.survey_service.repository;

import org.alignwithme.survey_service.entity.Survey;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SurveyRepository extends MongoRepository<Survey, String> {

    boolean existsById(String id);
}
