package org.alignwithme.survey_service.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class UserAnswer {

    @Id
    private String id;
    private String surveyId;
    private String questionId;
    private String answerId;
}
