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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private CustomUserDetailsService userService;

    @RequestMapping(value = "/recipe/get", method = RequestMethod.GET)
    public ResponseEntity getRecipe(@RequestParam("id") String recipeId) {
        Recipe rec = recipeService.findRecipeById(recipeId);
        if (rec != null) {
            return ResponseEntity.status(HttpStatus.OK).body(rec);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @RequestMapping(value = "/recipe/add", method = RequestMethod.POST)
    public ResponseEntity addRecipe(@RequestParam("name") String name, @RequestParam("description") String description, @RequestParam("public") boolean isPublic, @RequestParam("json") String json) {
        User user = userService.getLoggedUser();
        if (user != null) {
            Recipe recipe = new Recipe();
            recipe.setName(name);
            recipe.setDescription(description);
            recipe.setIsPublic(isPublic);
            recipe.setCreator(user.getId());
            recipe.setJson(json);
            recipe.setDate(new Date());
            recipeService.saveRecipe(recipe);
            return ResponseEntity.status(HttpStatus.CREATED).body(recipe);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @RequestMapping(value = "/recipe/delete", method = RequestMethod.POST)
    public ResponseEntity deleteRecipe(@RequestParam("id") String recipeId) {
        User user = userService.getLoggedUser();
        if (user != null) {
            Recipe rec = recipeService.findRecipeById(recipeId);
            if (rec != null) {
                if (rec.getCreator().equals(user.getId())) {
                    rec.setHidden(true);
                    recipeService.saveRecipe(rec);
                    return ResponseEntity.status(HttpStatus.OK).body(null);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @RequestMapping(value = "/recipe/list", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity findAllRecipes() {
        ObjectMapper mapper = new ObjectMapper();
        User user = userService.getLoggedUser();
        try {
            Map outputMap = new HashMap();
            List<Recipe> recipeList = recipeService.getAllRecipes();
            List<Recipe> approvedList = new ArrayList();
            for (Recipe r : recipeList) {
                if (!r.isHidden() && (r.isIsPublic() || r.getCreator().equals(user.getId()))) {
                    approvedList.add(r);
                }
            }
            outputMap.put("recipes", approvedList);
            String output = mapper.writeValueAsString(outputMap);
            return ResponseEntity.status(HttpStatus.OK).body(output);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
