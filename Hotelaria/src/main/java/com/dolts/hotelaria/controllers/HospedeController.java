package com.dolts.hotelaria.controllers;

import com.dolts.hotelaria.dto.RequestDTO;
import com.dolts.hotelaria.models.HospedeModel;
import com.dolts.hotelaria.services.FiltersSpecifications;
import com.dolts.hotelaria.services.HospedeService;
import com.dolts.hotelaria.utils.controller.AbstractCRUDController;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hospedes")
public class HospedeController extends AbstractCRUDController<HospedeModel, Long> {

    @Autowired
    private HospedeService hospedeService;
    @Autowired
    private FiltersSpecifications<HospedeModel> hospedeModelFiltersSpecifications;

    /*@PostMapping("/specification")
    public List<HospedeModel> findHospedes() {
        Specification<HospedeModel> specification = new Specification<HospedeModel>() {
            @Override
            public Predicate toPredicate(Root<HospedeModel> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.like(root.get("nome"), "%glas%");
            }
        };

        return hospedeService.getRepository().findAll(specification);
    }*/

    @PostMapping("/specification")
    public List<HospedeModel> findHospedes(@RequestBody RequestDTO requestDTO) {
        Specification<HospedeModel> specification = hospedeModelFiltersSpecifications.getSearchSpecification(requestDTO);
        return hospedeService.getRepository().findAll(specification);
    }

    @Override
    protected BaseCRUDService<HospedeModel, Long> getService() {
        return hospedeService;
    }
}
