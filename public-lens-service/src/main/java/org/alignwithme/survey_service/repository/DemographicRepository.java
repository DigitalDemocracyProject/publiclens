package org.alignwithme.survey_service.repository;

import org.alignwithme.survey_service.entity.Demographic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemographicRepository extends MongoRepository<Demographic, String> {}
