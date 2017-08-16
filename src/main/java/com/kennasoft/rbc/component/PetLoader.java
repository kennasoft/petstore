package com.kennasoft.rbc.component;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kennasoft.rbc.PetshopApplication;
import com.kennasoft.rbc.model.Pet;
import com.kennasoft.rbc.service.PetRepository;
import java.io.InputStream;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

/**
 *
 * @author ikennakonga
 */
@Component
public class PetLoader implements ApplicationListener<ContextRefreshedEvent> {
    
    @Autowired
    private PetRepository petRepository;
 
    private final Logger log = LoggerFactory.getLogger(PetLoader.class);
 
    
 
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        try {
            loadPets();
        } catch (Exception e) {
            log.info("Error Loading pets: "+e.getMessage());
        }
    }
    
    private void loadPets() throws Exception {
        InputStream stream = PetshopApplication
                            .class.getClassLoader()
                            .getResourceAsStream("petdata.json");
//        Scanner s = new Scanner(stream).useDelimiter("\\A");
//        String theJSON = s.next();
        ObjectMapper mapper = new ObjectMapper();
        JavaType type = mapper.getTypeFactory()
                        .constructCollectionType(List.class, Pet.class);
        List<Pet> pets = mapper.readValue(stream, type);
        pets.stream().forEach((pet) -> {
            petRepository.save(pet);
            log.info("Saved Pet: "+pet.toString());
        });
    }
}