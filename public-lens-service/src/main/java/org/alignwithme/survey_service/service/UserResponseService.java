package org.alignwithme.survey_service.service;

import org.alignwithme.survey_service.entity.UserResponse;
import org.alignwithme.survey_service.repository.UserResponseRepository;
import org.alignwithme.survey_service.model.UserResponseInfo;
import org.alignwithme.survey_service.util.UserResponseUtil;
import org.springframework.stereotype.Service;

@Service
public class UserResponseService {

    private final UserResponseRepository userResponseRepository;
    private final UserResponseUtil userResponseUtil;

    public UserResponseService(UserResponseRepository userResponseRepository,
                               UserResponseUtil userResponseUtil) {
        this.userResponseRepository = userResponseRepository;
        this.userResponseUtil = userResponseUtil;
    }

    public UserResponse submitUserResponse(UserResponseInfo userResponseInfo) {

        UserResponse userResponse = userResponseUtil.userResponseInfoToUserResponse(userResponseInfo);
        return userResponseRepository.save(userResponse);
    }
}
