package org.alignwithme.survey_service.util;

import lombok.AllArgsConstructor;
import org.alignwithme.survey_service.entity.UserResponse;
import org.alignwithme.survey_service.model.UserResponseInfo;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class UserResponseUtil {

    private final QuestionUtil questionUtil;

    public UserResponse userResponseInfoToUserResponse(UserResponseInfo userResponseInfo) {
        if (userResponseInfo == null) return null;

        UserResponse userResponse = new UserResponse();
        userResponse.setSurveyId(userResponseInfo.getSurveyId());
        userResponse.setUserId(userResponseInfo.getUserId());

        // Set demographics
        if (userResponseInfo.getDemographics() != null) {
            userResponse.setDemographics(
                    userResponseInfo.getDemographics().stream()
                            .map(questionUtil::questionInfoToQuestion).collect(Collectors.toList())
            );
        }

        // Set user answers
        if (userResponseInfo.getUserAnswers() != null) {
            userResponse.setUserAnswers(
                    userResponseInfo.getUserAnswers().stream()
                    .map(questionUtil::questionInfoToQuestion).collect(Collectors.toList())
            );
        }

        return userResponse;
    }

    public UserResponseInfo userResponseToUserResponseInfo(UserResponse userResponse) {
        if (userResponse == null) return null;

        UserResponseInfo userResponseInfo = new UserResponseInfo();
        userResponseInfo.setSurveyId(userResponse.getSurveyId());

        // Set demographics info
        if (userResponse.getDemographics() != null) {
            userResponseInfo.setDemographics(
                    userResponse.getDemographics().stream()
                            .map(questionUtil::questionToQuestionInfo).collect(Collectors.toList())
            );
        }

        // Set user answers info
        if (userResponse.getUserAnswers() != null) {
            userResponseInfo.setUserAnswers(
                    userResponse.getUserAnswers().stream()
                            .map(questionUtil::questionToQuestionInfo).collect(Collectors.toList())
            );
        }

        return userResponseInfo;
    }
}
