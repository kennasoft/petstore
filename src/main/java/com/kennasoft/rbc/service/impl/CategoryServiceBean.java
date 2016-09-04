package com.kennasoft.rbc.service.impl;

import com.kennasoft.rbc.model.Category;
import com.kennasoft.rbc.service.CategoryRepository;
import com.kennasoft.rbc.service.CategoryService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Ikenna Okonkwo
 */

@Service
public class CategoryServiceBean implements CategoryService {
    
    @Autowired
    CategoryRepository categoryRepo;

    @Override
    public List<Category> findAll() {
        return categoryRepo.findAll();
    }

    @Override
    public Category findOne(Long id) {
        return categoryRepo.findOne(id);
    }

    @Override
    public Category create(Category category) {
        if(category.getId()==null){
            return categoryRepo.save(category);
        }
        return null;
    }

    @Override
    public Category update(Category category) {
        if(category.getId()!=null && categoryRepo.exists(category.getId())){
            return categoryRepo.save(category);
        }
        return null;
    }

    @Override
    public boolean delete(Long id) { 
        if(categoryRepo.exists(id)){
            categoryRepo.delete(id);
            return true;
        }
        return false;
    }
    
    
    
}
