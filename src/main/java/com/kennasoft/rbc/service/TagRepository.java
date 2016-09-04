package com.kennasoft.rbc.service;

import com.kennasoft.rbc.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Ikenna Okonkwo
 */
public interface TagRepository extends JpaRepository<Tag, Long>{
    
}
