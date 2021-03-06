package com.kennasoft.rbc.service;

import com.kennasoft.rbc.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Ikenna Okonkwo
 */
public interface PetRepository extends JpaRepository<Pet, Long>{
    
}
