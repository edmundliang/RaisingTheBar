/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.database.entity;

import java.util.Date;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author anilramsoomye
 */
@Document (collection = "recipe")
public class Recipe {
    
    @Id
    private int id;
    
    private String name;
    private String[] instructions;
   
    private String glass;
    
    private String[][] steps;
    
    private Date date;
    
    private User creator;
    

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String[] getInstructions() {
        return instructions;
    }

    public void setInstructions(String[] instructions) {
        this.instructions = instructions;
    }

    public String getGlass() {
        return glass;
    }

    public void setGlass(String glass) {
        this.glass = glass;
    }

    public String[][] getSteps() {
        return steps;
    }

    public void setSteps(String[][] steps) {
        this.steps = steps;
    }
    
    public Date getDateCreated() {
        return date;
    }
    
    public void setDateCreated(Date date) {
        this.date = date;
    }
    
    public User getCreator() {
        return creator;
    }
    
    public void setCreator(User creator) {
        this.creator = creator;
    }
    
    
    
    
}
