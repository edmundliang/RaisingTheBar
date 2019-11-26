/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import darkpurple.hw2.database.IngredientsService;
import darkpurple.hw2.database.entity.Ingredients;
import darkpurple.hw2.database.entity.Recipe;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author anilramsoomye
 */
@RestController
public class IngredientsController {

    @Autowired
    private IngredientsService ingredientService;

    @RequestMapping(value = "/ingredients/get", method = RequestMethod.GET)
    public Ingredients getIngredient(@RequestBody String Id) {
        return ingredientService.findIngredientById(Id);

    }

    @RequestMapping(value = "/ingredients/list", method = RequestMethod.GET)
    public String allIngredients() {

        ObjectMapper mapper = new ObjectMapper();
        try {
            Map outputMap = new HashMap();
            List<Ingredients> recipeList = ingredientService.getAllIngredients();
            outputMap.put("ingredients", recipeList);
            String output = mapper.writeValueAsString(outputMap);
            return output;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "Error";
        }
    }
}
