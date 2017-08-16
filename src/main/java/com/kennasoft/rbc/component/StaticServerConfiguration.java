/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kennasoft.rbc.component;

import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;

/**
 *
 * @author ikennakonga
 */
@Configuration
@EnableWebMvc
@ComponentScan
public class StaticServerConfiguration extends WebMvcAutoConfiguration {
    
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
        registry.addViewController("/react").setViewName("forward:/react/index.html");
        registry.addViewController("/angular").setViewName("forward:/angular/index.html");
    }
    
}
