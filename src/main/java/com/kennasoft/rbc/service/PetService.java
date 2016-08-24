/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kennasoft.rbc.service;

import com.kennasoft.rbc.model.Pet;
import java.util.List;

/**
 *
 * @author ikennakonga
 */
public interface PetService {
    
    public List<Pet> findAll();
    
    public Pet findOne(Long id);
    
    public Pet create(Pet pet);
    
    public Pet update(Pet pet);
    
    public boolean delete(Long id);
    
}
