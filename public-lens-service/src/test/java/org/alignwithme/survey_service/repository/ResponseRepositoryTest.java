package org.alignwithme.survey_service.repository;

import org.alignwithme.survey_service.entity.Response;
import org.alignwithme.survey_service.entity.UserAnswer;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootTest
class ResponseRepositoryTest {

    @Autowired
    ResponseRepository responseRepository;

    @Test
    public void ResponseRepository_Save_ReturnSavedResponse() {

        // Arrange
        String testSurveyId = "S001";
        Date testDate = new Date();
        String testUserId = "test_user_id";

        List<UserAnswer> userAnswers = new ArrayList<>();
        UserAnswer userAnswer = new UserAnswer();
        userAnswer.setQuestionId("test_question");
        userAnswer.setAnswerId("test_answer");
        userAnswers.add(userAnswer);

        Response response = Response.builder()
                .surveyId(testSurveyId)
                .submittedDate(testDate)
                .userId(testUserId)
                .userAnswers(userAnswers).build();

        // Act
        Response savedResponse = responseRepository.save(response);

        // Assert
        Assertions.assertNotNull(savedResponse);
        Assertions.assertNotNull(savedResponse.getUserAnswers());
        Assertions.assertFalse(savedResponse.getUserAnswers().isEmpty());
    }

    @Test
    public void ResponseRepository_FindBySurveyId_ReturnResponse() {

        // Arrange
        String testSurveyId = "S002";
        Date testDate = new Date();
        String testUserId = "test_user_id";

        List<UserAnswer> userAnswers = new ArrayList<>();
        UserAnswer userAnswer = new UserAnswer();
        userAnswer.setQuestionId("test_question");
        userAnswer.setAnswerId("test_answer");
        userAnswers.add(userAnswer);

        Response response = Response.builder()
                .surveyId(testSurveyId)
                .submittedDate(testDate)
                .userId(testUserId)
                .userAnswers(userAnswers).build();

        responseRepository.save(response);

        // Act
        List<Response> foundResponses = responseRepository.findBySurveyId(testSurveyId);

        // Assert
        Assertions.assertFalse(foundResponses.isEmpty());
        foundResponses.forEach(currentResponse ->
                Assertions.assertEquals(testSurveyId, currentResponse.getSurveyId()));
    }
}