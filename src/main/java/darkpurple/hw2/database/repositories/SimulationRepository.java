/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.database.repositories;

import darkpurple.hw2.database.entity.Recipe;
import darkpurple.hw2.database.entity.Role;
import darkpurple.hw2.database.entity.Simulation;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author anilramsoomye
 */
public interface SimulationRepository extends MongoRepository<Simulation, String> {

    Simulation findById(int id);
    
}
