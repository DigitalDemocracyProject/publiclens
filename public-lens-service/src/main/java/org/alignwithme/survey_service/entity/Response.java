package org.alignwithme.survey_service.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Response {

    @Id
    private String responseId;
    private String surveyId;
    private Date submittedDate;
    private String userId;
    private List<UserAnswer> userAnswers;
}
