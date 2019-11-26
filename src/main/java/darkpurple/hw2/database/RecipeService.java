package darkpurple.hw2.database;

import darkpurple.hw2.database.entity.Recipe;
import darkpurple.hw2.database.repositories.RecipeRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    
    public void deleteRecipe(String recId) {
        recipeRepository.delete(findRecipeById(recId));
    }
    
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }
}
