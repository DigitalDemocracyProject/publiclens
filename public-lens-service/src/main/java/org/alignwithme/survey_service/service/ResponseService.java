package org.alignwithme.survey_service.service;

import org.alignwithme.survey_service.entity.Response;
import org.alignwithme.survey_service.repository.ResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResponseService {

    @Autowired
    private ResponseRepository responseRepository;

    public List<Response> saveUserResponses(List<Response> responses) {
        return responses.stream()
                .map(responseRepository::save)
                .collect(Collectors.toList());
    }
    public List<Response> getUserResponsesBySurveyId(String surveyId) {
        return responseRepository.findBySurveyId(surveyId);
    }
}
