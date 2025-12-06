package org.alignwithme.survey_service.controller;

import org.alignwithme.survey_service.entity.UserResponse;
import org.alignwithme.survey_service.service.UserResponseService;
import org.alignwithme.survey_service.model.UserResponseInfo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/user-response")
public class UserResponseController {

    private final UserResponseService userResponseService;

    public UserResponseController(UserResponseService userResponseService) {
        this.userResponseService = userResponseService;
    }

    @PostMapping
    public ResponseEntity<UserResponse> submitUserResponse(@RequestBody UserResponseInfo userResponseInfo) {
        return ResponseEntity.ok(userResponseService.submitUserResponse(userResponseInfo));
    }

    @GetMapping("get-by-survey-id/{surveyId}")
    public ResponseEntity<List<UserResponseInfo>> getUserResponsesBySurveyId(@PathVariable String surveyId) {
        return ResponseEntity.ok(userResponseService.getUserResponsesBySurveyId(surveyId));
    }
}
