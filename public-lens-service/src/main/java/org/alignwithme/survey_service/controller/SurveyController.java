package org.alignwithme.survey_service.controller;

import org.alignwithme.survey_service.entity.Survey;
import org.alignwithme.survey_service.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/surveys")
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @PostMapping
    public ResponseEntity<Survey> createSurvey(@RequestBody Survey survey) {
        Survey createdSurvey = surveyService.createSurvey(survey);
        return ResponseEntity.ok(createdSurvey);
    }

    @GetMapping
    public ResponseEntity<List<Survey>> getAllSurveys() {
        List<Survey> surveys = surveyService.getAllSurveys();
        return ResponseEntity.ok(surveys);
    }

    @GetMapping("/{surveyId}")
    public ResponseEntity<Survey> getSurveyById(@PathVariable String surveyId) {
        return surveyService.getSurveyById(surveyId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{surveyId}")
    public ResponseEntity<Survey> updateSurvey(@PathVariable String surveyId, @RequestBody Survey surveyDetails) {
        Survey updatedSurvey = surveyService.updateSurvey(surveyId, surveyDetails);
        return ResponseEntity.ok(updatedSurvey);
    }

    @DeleteMapping("/{surveyId}")
    public ResponseEntity<Void> deleteSurvey(@PathVariable String surveyId) {
        surveyService.deleteSurvey(surveyId);
        return ResponseEntity.noContent().build();
    }
}
