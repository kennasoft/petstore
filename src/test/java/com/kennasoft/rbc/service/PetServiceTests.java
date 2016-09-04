package com.kennasoft.rbc.service;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kennasoft.rbc.AbstractTest;
import com.kennasoft.rbc.PetshopApplication;
import com.kennasoft.rbc.model.Category;
import com.kennasoft.rbc.model.Pet;
import com.kennasoft.rbc.model.Tag;
import java.io.InputStream;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author ikennakonga
 */ 
@Transactional
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
        Assert.assertEquals("There must be exactly 5 bootsrapped pets", 5, pets.size());
        
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
    
    @Test
    public void testCreatePet(){
        
        Pet pet = petService.create(constructPet());
        
        Assert.assertEquals("Saved pet should have id of 6", new Long(6), pet.getId());
        List<Pet> pets = petService.findAll();
        Assert.assertEquals("There should now be 6 pets in the store", 6, pets.size());
        
    }
    
    private Pet constructPet(){
        
        Pet pet = new Pet();
        pet.setName("Dragon");
        pet.setStatus("available");
        Tag t = new Tag("Flying Reptile");
        t.getPets().add(pet);
        Set<Tag> tags = new HashSet<>();
        tags.add(t);
        pet.setTags(tags);
        Category c = new Category("dragon");
        c.getPets().add(pet);
        pet.setCategory(c);
        return pet;
        
    }
    
    @Test
    public void testCreatePetFailed(){
        
        Pet pet = constructPet();
        pet.setId(1L);
        
        pet = petService.create(pet);
        
        Assert.assertNull("Trying to create an entity with an existing id should return null", pet);
        
    }
    
    @Test
    public void testDeletePet(){
        
        boolean petDeleted = petService.delete(5L);
        
        Assert.assertTrue("Should return true if pet was deleted successfully", petDeleted);
        
        List<Pet> pets = petService.findAll();
        Assert.assertEquals("There should now be 4 pets in the store", 4, pets.size());
        
    }
    
    @Test
    public void testDeleteFailed(){
        
        boolean petDeleted = petService.delete(-1L);
        
        Assert.assertFalse("Trying to delete an invalid Id should return false", petDeleted);
        
        List<Pet> pets = petService.findAll();
        Assert.assertEquals("There number of pets should remain 5", 5, pets.size());
        
    }
}
