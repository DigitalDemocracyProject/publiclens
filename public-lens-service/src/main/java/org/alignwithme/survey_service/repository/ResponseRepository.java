package org.alignwithme.survey_service.repository;

import org.alignwithme.survey_service.entity.Response;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResponseRepository extends MongoRepository<Response, String> {

    List<Response> findBySurveyId(String surveyId);
}
