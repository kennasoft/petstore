package com.kennasoft.rbc.service.impl;

import com.kennasoft.rbc.model.Category;
import com.kennasoft.rbc.model.Pet;
import com.kennasoft.rbc.service.PetRepository;
import com.kennasoft.rbc.service.PetService;
import com.kennasoft.rbc.service.CategoryService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Ikenna Okonkwo
 */

@Service
public class PetServiceBean implements PetService {
    
    @Autowired
    PetRepository petRepo;
    
    @Autowired
    CategoryService catService;

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
            if(pet.getCategory()!=null){
                Category cat = catService.findOne(pet.getCategory().getId());
                pet.setCategory(cat);
                cat.addPet(pet);
                catService.update(cat);
            }
            return petRepo.save(pet);
        }
        return null;
    }

    @Override
    public Pet update(Pet pet) {
        if(pet.getId()!=null && petRepo.exists(pet.getId())){
            if(pet.getCategory()!=null){
                Category cat = catService.findOne(pet.getCategory().getId());
                pet.setCategory(cat);
//                cat.addPet(pet);
//                catService.update(cat);
            }
            return petRepo.save(pet);
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
