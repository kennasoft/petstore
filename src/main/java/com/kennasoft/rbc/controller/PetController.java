package com.kennasoft.rbc.controller;

import com.kennasoft.rbc.model.Pet;
import com.kennasoft.rbc.service.PetService;
import java.util.Collection;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ikennakonga
 */

@RestController
public class PetController {
    
    @Autowired
    PetService petService;
    
    @RequestMapping(value="/pet/{id}",
                    method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE
                    )
    @CrossOrigin(origins = "*")
    public ResponseEntity<Pet> getPetById(@PathVariable Long id){
        Pet pet = petService.findOne(id);
        if(pet == null){
            throw new EntityNotFoundException();
        }
        return new ResponseEntity<>(pet,HttpStatus.OK);
    }
    
    @RequestMapping(value="/pet",
                    method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE
                    )
    @CrossOrigin(origins = "*")
    public ResponseEntity<Collection<Pet>> getAllPets(){
        Collection<Pet> pet = petService.findAll();
        return new ResponseEntity<>(pet,HttpStatus.OK);
    }
    
    
    @RequestMapping(value="/pet",
                    method = RequestMethod.POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "*")
    public ResponseEntity<Pet> createPet(@RequestBody Pet pet){
        pet = petService.create(pet);
        return new ResponseEntity<>(pet,HttpStatus.OK);
    }
    
    
    @RequestMapping(value="/pet/{id}",
                    method = RequestMethod.DELETE,
                    consumes = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "*")
    public ResponseEntity<Pet> deletePet(@PathVariable Long id){
        boolean deleted = petService.delete(id);
        return new ResponseEntity<>(deleted ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND);
    }
    
}
