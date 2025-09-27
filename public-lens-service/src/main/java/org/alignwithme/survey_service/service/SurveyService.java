package org.alignwithme.survey_service.service;

import org.alignwithme.survey_service.entity.Survey;
import org.alignwithme.survey_service.repository.SurveyRepository;
import org.alignwithme.survey_service.exception.ErrorMessage;
import org.alignwithme.survey_service.exception.ResourceNotFoundException;
import org.alignwithme.survey_service.model.SurveyInfo;
import org.alignwithme.survey_service.util.SurveyUtil;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final SurveyUtil surveyUtil;

    public SurveyService(SurveyRepository surveyRepository, SurveyUtil surveyUtil) {
        this.surveyRepository = surveyRepository;
        this.surveyUtil = surveyUtil;
    }

    public SurveyInfo getSurveyById(String id) {

        Optional<Survey> survey = surveyRepository.findById(id);
        if (survey.isEmpty()) {
            throw new ResourceNotFoundException(ErrorMessage.SURVEY_NOT_FOUND.getMessage());
        }

        return surveyUtil.surveyToSurveyInfo(survey.get());
    }
}
