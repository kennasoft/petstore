/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kennasoft.rbc.service;

import com.kennasoft.rbc.model.Pet;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ikennakonga
 */

@Service
public class PetServiceBean implements PetService {
    
    @Autowired
    PetRepository petRepo;

    @Override
    public List<Pet> findAll() {
        return petRepo.findAll();
    }

    @Override
    public Pet findOne(Long id) {
        return petRepo.findOne(id);
    }

    @Override
    public Pet create(Pet pet) {
        if(pet.getId()==null){
            return petRepo.save(pet);
        }
        return null;
    }

    @Override
    public Pet update(Pet pet) {
        if(pet.getId()!=null && petRepo.exists(pet.getId())){
            
        }
        return null;
    }
    
    @Override
    public boolean delete(Long id) {
        if(petRepo.exists(id)){
            petRepo.delete(id);
            return true;
        }
        return false;
    }

}
