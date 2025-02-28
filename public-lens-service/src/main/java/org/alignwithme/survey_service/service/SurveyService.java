package org.alignwithme.survey_service.service;

import org.alignwithme.survey_service.entity.Survey;
import org.alignwithme.survey_service.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SurveyService {

    @Autowired
    private SurveyRepository surveyRepository;

    public Survey createSurvey(Survey survey) {
        return surveyRepository.save(survey);
    }

    public List<Survey> getAllSurveys() {
        return surveyRepository.findAll();
    }

    public Optional<Survey> getSurveyById(String surveyId) {
        return surveyRepository.findById(surveyId);
    }

    public Survey updateSurvey(String surveyId, Survey surveyDetails) {
        Survey survey = surveyRepository.findById(surveyId)
                .orElseThrow(() -> new RuntimeException("Survey not found"));
        survey.setTitle(surveyDetails.getTitle());
        survey.setDescription(surveyDetails.getDescription());
        survey.setCreatedDate(surveyDetails.getCreatedDate());
        survey.setStatus(surveyDetails.getStatus());
        survey.setQuestions(surveyDetails.getQuestions());
        return surveyRepository.save(survey);
    }

    public void deleteSurvey(String surveyId) {
        surveyRepository.deleteById(surveyId);
    }
}
