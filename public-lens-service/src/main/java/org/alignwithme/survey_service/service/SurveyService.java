package org.alignwithme.survey_service.service;

import org.alignwithme.survey_service.entity.Demographic;
import org.alignwithme.survey_service.entity.Survey;
import org.alignwithme.survey_service.repository.DemographicRepository;
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
    private final DemographicRepository demographicRepository;
    private final SurveyUtil surveyUtil;

    public SurveyService(SurveyRepository surveyRepository,
                         DemographicRepository demographicRepository,
                         SurveyUtil surveyUtil) {

        this.surveyRepository = surveyRepository;
        this.demographicRepository = demographicRepository;
        this.surveyUtil = surveyUtil;
    }

    public SurveyInfo getSurveyById(String id) {

        Optional<Survey> survey = surveyRepository.findById(id);

        Optional<Demographic> demographic = Optional.empty();
        if (survey.isPresent()) {
            String demographicId = survey.get().getDemographicId();
            demographic = demographicRepository.findById(demographicId);
        }

        if (survey.isEmpty()) {
            throw new ResourceNotFoundException(ErrorMessage.SURVEY_NOT_FOUND.getMessage());
        } else if (demographic.isEmpty()) {
            throw new ResourceNotFoundException(ErrorMessage.DEMOGRAPHIC_NOT_FOUND.getMessage());
        }

        return surveyUtil.surveyToSurveyInfo(survey.get(), demographic.get());
    }
}
