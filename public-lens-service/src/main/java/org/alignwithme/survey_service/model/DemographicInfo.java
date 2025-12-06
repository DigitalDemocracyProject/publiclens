package org.alignwithme.survey_service.model;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class DemographicInfo {

    private String id;
    private List<QuestionInfo> questions;
}
