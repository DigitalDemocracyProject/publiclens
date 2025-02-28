package org.alignwithme.survey_service.repository;

import org.alignwithme.survey_service.entity.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionRepository extends MongoRepository<Question, String> {}
