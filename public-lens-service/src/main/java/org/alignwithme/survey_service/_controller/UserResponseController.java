package org.alignwithme.survey_service._controller;

import org.alignwithme.survey_service._service.UserResponseService;
import org.alignwithme.survey_service.model.UserResponseInfo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/user-response")
public class UserResponseController {

    private final UserResponseService userResponseService;

    public UserResponseController(UserResponseService userResponseService) {
        this.userResponseService = userResponseService;
    }

    @PostMapping
    public ResponseEntity<String> submitUserResponse(@RequestBody UserResponseInfo userResponseInfo) {
        return ResponseEntity.ok(userResponseService.submitUserResponse(userResponseInfo));
    }
}
