package org.alignwithme.survey_service.service;

import org.alignwithme.survey_service.entity.Survey;
import org.alignwithme.survey_service.repository.OldSurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class SurveyService {

    @Autowired
    private OldSurveyRepository oldSurveyRepository;

    public Survey createSurvey(Survey survey) {
        return oldSurveyRepository.save(survey);
    }

    public List<Survey> getAllSurveys() {
        return oldSurveyRepository.findAll();
    }

    public Optional<Survey> getSurveyById(String surveyId) {
        return oldSurveyRepository.findById(surveyId);
    }

    public Survey updateSurvey(String surveyId, Survey surveyDetails) {
        Survey survey = oldSurveyRepository.findById(surveyId)
                .orElseThrow(() -> new RuntimeException("Survey not found"));
        survey.setTitle(surveyDetails.getTitle());
        survey.setDescription(surveyDetails.getDescription());
        survey.setCreatedDate(surveyDetails.getCreatedDate());
        survey.setStatus(surveyDetails.getStatus());
        survey.setQuestions(surveyDetails.getQuestions());
        return oldSurveyRepository.save(survey);
    }

    public void deleteSurvey(String surveyId) {
        oldSurveyRepository.deleteById(surveyId);
    }
}
