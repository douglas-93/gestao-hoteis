package com.dolts.hotelaria.utils.service;

import com.dolts.hotelaria.utils.repository.AbstractCRUDRepository;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;

public class BaseCRUDService<T, D> implements AbstractCRUDService<T, D> {

    public T save(T entity) {
        T var2;
        this.validate(entity);
        this.beforeSave(entity);
        entity = (T) this.getRepository().save(entity);
        this.afterSave(entity);
        var2 = entity;
        return var2;
    }

    public T update(T entity) {
        T var2;
        this.validate(entity);
        this.beforeUpdate(entity);
        entity = (T) this.getRepository().save(entity);
        this.afterUpdate(entity);
        var2 = entity;
        return var2;
    }

    public void delete(T entity) {
        T var2;
        this.validateDelete(entity);
        this.beforeDelete(entity);
        this.getRepository().delete(entity);
        this.afterDelete(entity);
        var2 = entity;
    }

    public List<T> findAll() {
        return this.getRepository().findAll();
    }

    public T getById(D id) {
        return this.getRepository().findById(id).orElseThrow(EntityNotFoundException::new);
    }


    protected void validate(T entity) {
    }

    protected void validateDelete(T entity) {
    }

    protected void beforeSave(T entity) {
    }

    protected void afterSave(T entity) {
    }

    protected void beforeUpdate(T entity) {
    }

    protected void afterUpdate(T entity) {
    }

    protected void beforeDelete(T entity) {
    }

    protected void afterDelete(T entity) {
    }

    @Override
    public AbstractCRUDRepository<T, D> getRepository() {
        return null;
    }
}
