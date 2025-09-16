package org.alignwithme.survey_service._entity;

import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Answer {

    @Field(name = "answerId")
    private String answerId;

    @Field(name = "text")
    private String text;
}
