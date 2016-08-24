/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kennasoft.rbc.service;

import com.kennasoft.rbc.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author ikennakonga
 */
public interface UserProfileRepository extends JpaRepository<UserProfile, Long>{
    
}
