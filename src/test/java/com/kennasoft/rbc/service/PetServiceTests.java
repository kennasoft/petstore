package com.kennasoft.rbc.service;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kennasoft.rbc.AbstractTest;
import com.kennasoft.rbc.PetshopApplication;
import com.kennasoft.rbc.model.Pet;
import java.io.InputStream;
import java.util.List;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author ikennakonga
 */ 
//@Transactional
public class PetServiceTests extends AbstractTest {
    
    @Autowired
    PetService petService;
    
    @Test
    public void testServiceInjected(){
        Assert.assertNotNull(petService);
    }
    
    @Before
    public void setup(){
        if(petService.findOne(1L)==null)
        try{
            InputStream stream = PetshopApplication
                                    .class.getClassLoader()
                                    .getResourceAsStream("petdata.json");                
            ObjectMapper mapper = new ObjectMapper();
            JavaType type = mapper.getTypeFactory()
                            .constructCollectionType(List.class, Pet.class);
            List<Pet> pets = mapper.readValue(stream, type);
            pets.stream().forEach((pet) -> {
                petService.create(pet);
                System.out.println(pet.toString());
            });
                
        } catch (Exception e){
            e.printStackTrace();
        }
    }
    
    
    
    
    @Test
    public void testFindAll(){
        List<Pet> pets = petService.findAll();
        
        Assert.assertNotNull("Pets storage must contain pets", pets);
        Assert.assertEquals("There must be exactly 4 bootsrapped pets", 4, pets.size());
    }
    
    @Test
    public void testFindOne(){
        Pet pet = petService.findOne(1L);
        
        Assert.assertNotNull("Pet[1] must not be null", pet);
        Assert.assertTrue("Retrieved Entity must be instance of Pet", pet instanceof Pet);
    }
    
    @Test
    public void testFindOneNotFound(){
        Pet pet = petService.findOne(-1L);
        
        Assert.assertNull("Method should return null when pet is not found", pet);
    }
}
