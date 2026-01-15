package com.silverviking.repository;

import com.silverviking.domain.Series;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeriesRepository extends JpaRepository<Series, Long> {

    List<Series> findByManufacturerId(Long manufacturerId);
}
