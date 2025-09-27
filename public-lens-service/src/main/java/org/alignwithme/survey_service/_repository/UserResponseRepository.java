package org.alignwithme.survey_service._repository;

import org.alignwithme.survey_service._entity.UserResponse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserResponseRepository extends MongoRepository<UserResponse, String> {}
