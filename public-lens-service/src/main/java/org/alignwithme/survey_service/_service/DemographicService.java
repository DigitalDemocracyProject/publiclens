package org.alignwithme.survey_service._service;

import org.alignwithme.survey_service._entity.Demographic;
import org.alignwithme.survey_service._repository.DemographicRepository;
import org.alignwithme.survey_service.model.DemographicInfo;
import org.alignwithme.survey_service.util.DemographicUtil;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DemographicService {

    private final DemographicRepository demographicRepository;
    private final DemographicUtil demographicUtil;

    public DemographicService(DemographicRepository demographicRepository, DemographicUtil demographicUtil) {
        this.demographicRepository = demographicRepository;
        this.demographicUtil = demographicUtil;
    }

    public List<DemographicInfo> getAllDemographics() {
        List<Demographic> demographics = demographicRepository.findAll();
        return demographics.stream()
                .map(demographicUtil::demographicToDemographicInfo)
                .collect(Collectors.toList());
    }

    public DemographicInfo getDemographicById(String id) {
        return demographicRepository.findById(id)
                .map(demographicUtil::demographicToDemographicInfo)
                .orElse(null);
    }
}
