package com.kennasoft.rbc.service;

import com.kennasoft.rbc.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Ikenna Okonkwo
 */
public interface CategoryRepository extends JpaRepository<Category, Long>{
    
}
