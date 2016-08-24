/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kennasoft.rbc;

import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 *
 * @author ikennakonga
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public abstract class AbstractTest {
    
    protected Logger logger = LoggerFactory.getLogger(this.getClass());
    
}
