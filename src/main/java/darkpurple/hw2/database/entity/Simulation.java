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
@Document (collection = "simulation")
public class Simulation {
    
    @Id
    private String id;
    
    private String name;
    private Date date;
    private String[] recipes;
    private String creator;
    private String description;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    
    
    public enum simulationType {
        PRACTICE,
        TEST
    }
    
    private simulationType type;
    
    private float duration;

    public simulationType getType() {
        return type;
    }

    public void setType(simulationType type) {
        this.type = type;
    }
    

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }
    

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    
    

    public String[] getRecipes() {
        return recipes;
    }

    public void setRecipes(String[] recipes) {
        this.recipes = recipes;
    }

    public float getDuration() {
        return duration;
    }

    public void setDuration(float duration) {
        this.duration = duration;
    }
    
    
    
}
