package org.alignwithme.survey_service._repository;

import org.alignwithme.survey_service._entity.Survey;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyRepository extends MongoRepository<Survey, String> {}
