package org.alignwithme.survey_service._entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user_responses")
public class UserResponse {
    
    @Id
    private String id;

    @Field(name = "surveyId")
    private String surveyId;

    @Field(name = "userId")
    private String userId;

    @Field(name = "userDetails")
    private List<Question> userDetails;

    @Field(name = "userAnswers")
    private List<Question> userAnswers;
}
