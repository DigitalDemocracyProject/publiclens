package org.alignwithme.survey_service.repository;

import org.alignwithme.survey_service.entity.UserResponse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserResponseRepository extends MongoRepository<UserResponse, String> {

    List<UserResponse> findBySurveyId(String surveyId);
}
