/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.database;

import darkpurple.hw2.database.entity.Recipe;
import darkpurple.hw2.database.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author anilramsoomye
 */
@Service
public class RecipeService {
    
    @Autowired
    private RecipeRepository recipeRepository;
    
    public Recipe findRecipeById(int id) {
        return recipeRepository.findById(id);
    }
    
    public void saveRecipe(Recipe recipe) {
        recipeRepository.save(recipe);
    }
    
    public void deleteRecipe(Recipe recipe) {
        recipeRepository.delete(recipe);
    }
}
