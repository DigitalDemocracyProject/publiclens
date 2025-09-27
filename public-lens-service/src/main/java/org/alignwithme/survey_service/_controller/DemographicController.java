package org.alignwithme.survey_service._controller;

import org.alignwithme.survey_service._service.DemographicService;
import org.alignwithme.survey_service.model.DemographicInfo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/demographic")
public class DemographicController {

    private final DemographicService demographicService;

    public DemographicController(DemographicService demographicService) {
        this.demographicService = demographicService;
    }

    @GetMapping
    public List<DemographicInfo> getAllDemographics() {
        return demographicService.getAllDemographics();
    }

    @GetMapping("/{id}")
    public DemographicInfo getDemographicById(@PathVariable String id) {
        return demographicService.getDemographicById(id);
    }
}
