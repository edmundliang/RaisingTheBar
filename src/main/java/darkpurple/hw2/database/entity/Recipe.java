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
   
    private Glass glass;
    
    private enum Glass {
        SHOT,
        WINE,
        CHAMPAGNE,
        MARTINI,
        HIGHBALL,
        ROCKS,
        HURRICANE,
        PINT,
        POCO_GRANDE,
        BUCKET
    }
    
    private String[][] steps;
    
    private Date date;
    
    private String creator;
    
    

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

    public Glass getGlass() {
        return glass;
    }

    public void setGlass(Glass glass) {
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
    
    public String getCreator() {
        return creator;
    }
    
    public void setCreator(String creator) {
        this.creator = creator;
    }
    
    
    
    
}
