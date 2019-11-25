/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.controller;

import darkpurple.hw2.database.RecipeService;
import darkpurple.hw2.database.entity.Recipe;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author anilramsoomye
 */
@Controller
public class RecipeController {
    
    @Autowired
    private RecipeService recipeService;
    
    
    
    //@RequestMapping(value = "/recipe", method = RequestMethod.GET)
    
    
    
    
    
    @RequestMapping(value = "/recipe/add", method = RequestMethod.POST)
    public Recipe addRecipe(@RequestBody String creator, String name, String glass, String[] ingredients, float[] volumes) {
        Recipe rec = recipeService.addRecipe(creator, name, glass, ingredients, volumes);
        return rec;
    }
    
    
    @RequestMapping(value = "/recipe/delete", method = RequestMethod.POST)
    public void deleteRecipe(@RequestBody String recId) {
        recipeService.deleteRecipe(recId);
    }
    
    @RequestMapping(value = "/recipe/list", method = RequestMethod.GET)
    public List<Recipe> findAllRecipes() {
        return recipeService.getAllRecipes();
    }
    
    
}
