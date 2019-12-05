package darkpurple.hw2.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import darkpurple.hw2.database.CustomUserDetailsService;
import darkpurple.hw2.database.RecipeService;
import darkpurple.hw2.database.entity.Recipe;
import darkpurple.hw2.database.entity.User;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
    public Recipe addRecipe(@RequestParam("name") String name, @RequestParam("glass")String glass, @RequestParam("ingredients")String ingredients, @RequestParam("volumes")String volumes) {
        Recipe recipe = new Recipe();
        User user = userService.getLoggedUser();
        recipe.setCreator(user.getId());
        recipe.setDate(new Date());
        recipe.setGlass(glass);
        recipe.setIngredients(ingredients.split(","));
        String[] volumesTemp = volumes.split(",");
        float[] volumes2 = new float[volumesTemp.length];
        for (int i = 0; i< volumesTemp.length;i++) {
            volumes2[i] = Float.parseFloat(volumesTemp[i]);
        }
        recipe.setVolumes(volumes2);
        recipe.setName(name);
        recipeService.saveRecipe(recipe);

        return recipe;
    }

    @RequestMapping(value = "/recipe/delete", method = RequestMethod.POST)
    public void deleteRecipe(@RequestBody String recipeId) {
        recipeService.deleteRecipe(recipeId);
    }

    @RequestMapping(value = "/recipe/list", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String findAllRecipes() {
        
        ObjectMapper mapper = new ObjectMapper();
        try {
            Map outputMap = new HashMap();
            List<Recipe> recipeList = recipeService.getAllRecipes();
            outputMap.put("recipes", recipeList);
            String output = mapper.writeValueAsString(outputMap);
            return output;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "Error";
        }
    }
}
