package org.alignwithme.survey_service._service;

import org.alignwithme.survey_service._entity.UserResponse;
import org.alignwithme.survey_service._repository.UserResponseRepository;
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

    public String submitUserResponse(UserResponseInfo userResponseInfo) {

        UserResponse userResponse = userResponseUtil.userResponseInfoToUserResponse(userResponseInfo);
        UserResponse savedUserResponse = userResponseRepository.save(userResponse);
        return savedUserResponse.getId();
    }
}
