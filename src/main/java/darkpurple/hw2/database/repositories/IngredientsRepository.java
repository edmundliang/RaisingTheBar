package darkpurple.hw2.database.repositories;

import darkpurple.hw2.database.entity.Ingredients;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IngredientsRepository extends MongoRepository<Ingredients, String> {
    
    Ingredients findByid(String ingId);
}
