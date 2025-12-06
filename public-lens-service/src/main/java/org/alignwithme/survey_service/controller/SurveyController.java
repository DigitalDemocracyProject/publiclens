package org.alignwithme.survey_service.controller;

import org.alignwithme.survey_service.service.SurveyService;
import org.alignwithme.survey_service.model.SurveyInfo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/survey")
public class SurveyController {

    private final SurveyService surveyService;

    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @GetMapping("{id}")
    public ResponseEntity<SurveyInfo> getSurveyById(@PathVariable String id) {
        return ResponseEntity.ok(surveyService.getSurveyById(id));
    }
}
