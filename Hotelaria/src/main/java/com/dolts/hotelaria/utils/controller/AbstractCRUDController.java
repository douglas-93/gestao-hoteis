package com.dolts.hotelaria.utils.controller;

import com.dolts.hotelaria.dto.PageRequestDTO;
import com.dolts.hotelaria.dto.RequestDTO;
import com.dolts.hotelaria.models.HospedeModel;
import com.dolts.hotelaria.services.FiltersSpecifications;
import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*",maxAge = 3600)
public abstract class AbstractCRUDController<T, D> {

    @Autowired
    private FiltersSpecifications<T> filtersSpecifications;

    protected abstract BaseCRUDService<T, D> getService();

    @PostMapping
    public ResponseEntity<T> create(@RequestBody T entity) {
        T savedEntity = getService().save(entity);
        return ResponseEntity.ok(savedEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<T> update(@PathVariable D id, @RequestBody T entity) {
        T updatedEntity = getService().update(entity);
        return ResponseEntity.ok(updatedEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable D id) {
        T entity = getService().getById(id);
        if (entity == null) {
            return ResponseEntity.notFound().build();
        }
        getService().delete(entity);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<T>> findAll() {
        List<T> entities = getService().findAll();
        return ResponseEntity.ok(entities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<T> getById(@PathVariable D id) {
        T entity = getService().getById(id);
        if (entity == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(entity);
    }

    @PostMapping("/specification")
    public ResponseEntity<List<T>> findHospedes(@RequestBody RequestDTO requestDTO) {
        Specification<T> specification = filtersSpecifications
                .getSearchSpecification(requestDTO.getSearchRequestDTOS(), requestDTO.getGlobalOperator());
        return ResponseEntity.ok(this.getService().getRepository().findAll(specification));
    }

    @PostMapping("/specification/pagination")
    public ResponseEntity<Page<T>> findHospedesPages(@RequestBody RequestDTO requestDTO) {
        Specification<T> specification = filtersSpecifications
                .getSearchSpecification(requestDTO.getSearchRequestDTOS(), requestDTO.getGlobalOperator());

        Pageable pageable = new PageRequestDTO().getPageable(requestDTO.getPageDTO());

        return ResponseEntity.ok(this.getService().getRepository().findAll(specification, pageable));
    }
}

