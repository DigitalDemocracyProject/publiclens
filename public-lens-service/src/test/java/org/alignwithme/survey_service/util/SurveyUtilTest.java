package org.alignwithme.survey_service.util;

import org.alignwithme.survey_service.entity.Survey;
import org.alignwithme.survey_service.model.SurveyInfo;
import org.junit.jupiter.api.Test;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class SurveyUtilTest {

    @Test
    void surveyWithoutDemographicStillHasListDetails() {
        Survey survey = new Survey();
        survey.setId("survey-1");
        survey.setSurveyName("Community priorities");
        survey.setDescription("Share your priorities.");

        SurveyInfo result = new SurveyUtil(null).surveyToSurveyInfo(survey, null);

        assertNotNull(result);
        assertEquals("survey-1", result.getId());
        assertEquals("Community priorities", result.getSurveyName());
        assertEquals("Share your priorities.", result.getDescription());
        assertEquals(Collections.emptyList(), result.getDemographics());
    }
}
