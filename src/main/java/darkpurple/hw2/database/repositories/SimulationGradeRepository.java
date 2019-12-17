package darkpurple.hw2.database.repositories;

import darkpurple.hw2.database.entity.SimulationGrade;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SimulationGradeRepository extends MongoRepository<SimulationGrade, String> {
    
    SimulationGrade findByid(String Id);
}
