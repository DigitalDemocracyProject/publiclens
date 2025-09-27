package org.alignwithme.survey_service.util;

import lombok.AllArgsConstructor;
import org.alignwithme.survey_service._entity.Demographic;
import org.alignwithme.survey_service.model.DemographicInfo;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class DemographicUtil {

    private final QuestionUtil questionUtil;

    public DemographicInfo demographicToDemographicInfo(Demographic demographic) {
        if (demographic == null) return null;

        DemographicInfo demographicInfo = new DemographicInfo();
        demographicInfo.setId(demographic.getId());

        if (demographic.getQuestions() != null) {
            demographicInfo.setQuestionInfos(
                    demographic.getQuestions().stream()
                            .map(questionUtil::questionToQuestionInfo).collect(Collectors.toList())
            );
        }

        return demographicInfo;
    }
}
