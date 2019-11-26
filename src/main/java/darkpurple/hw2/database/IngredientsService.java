/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.database;

import darkpurple.hw2.database.entity.Ingredients;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import darkpurple.hw2.database.repositories.IngredientsRepository;

/**
 *
 * @author anilramsoomye
 */
@Service
public class IngredientsService {
    
    @Autowired
    private IngredientsRepository ingredientRepository;
    
    public Ingredients findIngredientById(String id) {
        return ingredientRepository.findByid(id);
    }
    
    public void saveIngredient(Ingredients ing) {
        ingredientRepository.save(ing);
    }
    
    public void deleteIngredient(String ingId) {
        ingredientRepository.delete(findIngredientById(ingId));
    }
    
    public List<Ingredients> getAllIngredients() {
        return ingredientRepository.findAll();
    }
    
}
