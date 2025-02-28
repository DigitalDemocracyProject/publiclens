package org.alignwithme.survey_service.controller;

import org.alignwithme.survey_service.entity.Response;
import org.alignwithme.survey_service.service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/responses")
public class ResponseController {

    @Autowired
    private ResponseService responseService;

    @PostMapping
    public ResponseEntity<List<Response>> postUserResponses(@RequestBody List<Response> responses) {
        List<Response> savedResponses = responseService.saveUserResponses(responses);
        return ResponseEntity.ok(savedResponses);
    }

    @GetMapping("/{surveyId}")
    public ResponseEntity<List<Response>> getUserResponses(@PathVariable String surveyId) {
        List<Response> responses = responseService.getUserResponsesBySurveyId(surveyId);
        return ResponseEntity.ok(responses);
    }
}
