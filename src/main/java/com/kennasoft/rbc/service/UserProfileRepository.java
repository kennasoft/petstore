package com.kennasoft.rbc.service;

import com.kennasoft.rbc.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Ikenna Okonkwo
 */
public interface UserProfileRepository extends JpaRepository<UserProfile, Long>{
    
}
