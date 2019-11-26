/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.database.repositories;

import darkpurple.hw2.database.entity.Ingredients;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author anilramsoomye
 */
public interface IngredientRepository extends MongoRepository<Ingredients, String> {
    
    Ingredients findByid(String ingId);
}
