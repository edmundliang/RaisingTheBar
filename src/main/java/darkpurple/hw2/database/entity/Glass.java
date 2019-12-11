/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.database.entity;

import org.springframework.data.annotation.Id;

/**
 *
 * @author edmundliang
 */
public class Glass {
         
    private String name;
    
    public String getType() {
        return name;
    }
    
    public void setType(String type) {
        this.name = type;
    }
    
    
    
}
