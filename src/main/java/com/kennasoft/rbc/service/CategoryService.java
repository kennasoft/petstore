package com.kennasoft.rbc.service;

import com.kennasoft.rbc.model.Category;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author Ikenna Okonkwo
 */

public interface CategoryService {
    
    public List<Category> findAll();
    
    public Category findOne(Long id);
    
    public Category create(Category pet);
    
    public Category update(Category pet);
    
    public boolean delete(Long id);
    
}
