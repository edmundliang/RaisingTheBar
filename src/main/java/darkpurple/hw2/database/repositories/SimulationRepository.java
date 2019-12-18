package darkpurple.hw2.database.repositories;

import darkpurple.hw2.database.entity.Recipe;
import darkpurple.hw2.database.entity.Role;
import darkpurple.hw2.database.entity.Simulation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SimulationRepository extends MongoRepository<Simulation, String> {

    Simulation findByid(String Id);
    
}
