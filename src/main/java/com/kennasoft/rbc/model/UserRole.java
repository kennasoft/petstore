/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kennasoft.rbc.model;

import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 *
 * @author ikennakonga
 */
@Entity
public class UserRole {
    
    private Long id;
    
    private String name;
    
    private Set<String> allowedEndpoints;
    
    private Set<UserProfile> users;

    
    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @ElementCollection
    public Set<String> getAllowedEndpoints() {
        return allowedEndpoints;
    }

    public void setAllowedEndpoints(Set<String> allowedEndpoints) {
        this.allowedEndpoints = allowedEndpoints;
    }

    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, mappedBy = "role")
    public Set<UserProfile> getUsers() {
        return users;
    }

    public void setUsers(Set<UserProfile> users) {
        this.users = users;
    }
    
    
    
}
