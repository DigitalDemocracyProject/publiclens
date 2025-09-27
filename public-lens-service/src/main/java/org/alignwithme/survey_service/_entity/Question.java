package org.alignwithme.survey_service._entity;

import java.util.List;

import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    @Field(name = "questionId")
    private String questionId;

    @Field(name = "text")
    private String text;

    @Field(name = "type")
    private String type;

    @Field(name = "answers")
    private List<Answer> answers;
}
