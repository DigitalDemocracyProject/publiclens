package org.alignwithme.survey_service.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class Survey {

    @Id
    private String surveyId;
    private String title;
    private String description;
    private Date createdDate;
    private String status;
    private List<Question> questions;
}



