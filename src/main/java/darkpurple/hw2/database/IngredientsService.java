package darkpurple.hw2.database;

import darkpurple.hw2.database.entity.Ingredients;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import darkpurple.hw2.database.repositories.IngredientsRepository;

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
