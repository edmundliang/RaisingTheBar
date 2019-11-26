/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.controller;

import darkpurple.hw2.database.CustomUserDetailsService;
import darkpurple.hw2.database.RecipeService;
import darkpurple.hw2.database.entity.Recipe;
import darkpurple.hw2.database.entity.User;
import java.util.Date;
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
    
    @Autowired
    private CustomUserDetailsService userService;
   

   
    @RequestMapping(value = "/recipe/get", method = RequestMethod.GET)
    public Recipe getRecipe(@RequestBody String recipeId) {
        return recipeService.findRecipeById(recipeId);
        
    }
    
    @RequestMapping(value = "/recipe/add", method = RequestMethod.POST)
    public Recipe addRecipe(@RequestBody String name, String glass, String[] ingredients, float[] volumes) {
        Recipe recipe = new Recipe();
        User user = userService.getLoggedUser();
        recipe.setCreator(user.getId());
        recipe.setDate(new Date());
        recipe.setGlass(glass);
        recipe.setIngredients(ingredients);
        recipe.setVolumes(volumes);
        recipe.setName(name);
        recipeService.saveRecipe(recipe);

        return recipe;
    }
    
    
    @RequestMapping(value = "/recipe/delete", method = RequestMethod.POST)
    public void deleteRecipe(@RequestBody String recipeId) {
        recipeService.deleteRecipe(recipeId);
    }
    
    @RequestMapping(value = "/recipe/list", method = RequestMethod.GET)
    public List<Recipe> findAllRecipes() {
        return recipeService.getAllRecipes();
    }
}
