/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.database;

import darkpurple.hw2.database.entity.Recipe;
import darkpurple.hw2.database.repositories.RecipeRepository;
import java.util.Date;
import java.util.List;
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
    
    public Recipe findRecipeById(String id) {
        return recipeRepository.findByid(id);
    }
    
    public void saveRecipe(Recipe recipe) {
        recipeRepository.save(recipe);
    }
    
    public Recipe addRecipe(String creator, String name, String glass, String[] ingredients, float[] volumes) {
        Recipe rec = new Recipe();
        rec.setCreator(creator);
        rec.setDate(new Date());
        rec.setGlass(glass);
        rec.setIngredients(ingredients);
        rec.setVolumes(volumes);
        rec.setName(name);
        recipeRepository.save(rec);
        return rec;
    }
    
    public void deleteRecipe(String recId) {
        recipeRepository.delete(findRecipeById(recId));
    }
    
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }
}
