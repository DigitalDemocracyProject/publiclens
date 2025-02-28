package org.alignwithme.survey_service.controller;

import org.alignwithme.survey_service.entity.UserAnswer;
import org.alignwithme.survey_service.service.UserAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-answers")
public class UserAnswerController {

    @Autowired
    private final UserAnswerService userAnswerService;

    @Autowired
    public UserAnswerController(UserAnswerService userAnswerService) {
        this.userAnswerService = userAnswerService;
    }

    @PostMapping
    public ResponseEntity<List<UserAnswer>> createUserAnswers(@RequestBody List<UserAnswer> userAnswers) {
        List<UserAnswer> savedUserAnswers = userAnswerService.saveUserAnswers(userAnswers);
        return new ResponseEntity<>(savedUserAnswers, HttpStatus.CREATED);
    }

    @GetMapping("/{surveyId}")
    public ResponseEntity<List<UserAnswer>> getUserAnswers(@PathVariable String surveyId) {
        List<UserAnswer> userAnswers = userAnswerService.getUserAnswersBySurveyId(surveyId);
        return ResponseEntity.ok(userAnswers);
    }

    @GetMapping("/question/{questionId}")
    public ResponseEntity<List<UserAnswer>> getUserAnswersByQuestion(@PathVariable String questionId) {
        List<UserAnswer> userAnswers = userAnswerService.getUserAnswersByQuestionId(questionId);
        return new ResponseEntity<>(userAnswers, HttpStatus.OK);
    }
}
