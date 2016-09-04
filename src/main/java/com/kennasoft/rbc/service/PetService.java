package com.kennasoft.rbc.service;

import com.kennasoft.rbc.model.Pet;
import java.util.List;

/**
 *
 * @author Ikenna Okonkwo
 */

public interface PetService {
    
    public List<Pet> findAll();
    
    public Pet findOne(Long id);
    
    public Pet create(Pet pet);
    
    public Pet update(Pet pet);
    
    public boolean delete(Long id);
    
}
