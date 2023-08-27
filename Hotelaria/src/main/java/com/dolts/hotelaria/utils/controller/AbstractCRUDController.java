package com.dolts.hotelaria.utils.controller;

import com.dolts.hotelaria.utils.service.BaseCRUDService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public abstract class AbstractCRUDController<T, D> {

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
}

