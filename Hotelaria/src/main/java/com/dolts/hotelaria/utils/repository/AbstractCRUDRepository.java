package com.dolts.hotelaria.utils.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface AbstractCRUDRepository<T, D> extends JpaRepository<T, D>, JpaSpecificationExecutor<T> {

}
