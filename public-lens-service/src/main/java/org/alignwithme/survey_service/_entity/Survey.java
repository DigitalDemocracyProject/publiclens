package org.alignwithme.survey_service._entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "surveys")
public class Survey {

    @Id
    private String id;

    @Field(name = "surveyName")
    private String surveyName;

    @Field(name = "description")
    private String description;
    
    @Field(name = "userInfoId")
    private String userInfoId;

    @Field(name = "questions")
    private List<Question> questions;
}
