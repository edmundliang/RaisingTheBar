package darkpurple.hw2.database.repositories;

import darkpurple.hw2.database.entity.Recipe;
import darkpurple.hw2.database.entity.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecipeRepository extends MongoRepository<Recipe, String> {

    Recipe findByid(String id);
    
}
