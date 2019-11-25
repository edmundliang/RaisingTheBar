/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.database;

import darkpurple.hw2.database.entity.Simulation;
import darkpurple.hw2.database.entity.Simulation.simType;
import darkpurple.hw2.database.repositories.SimulationRepository;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author anilramsoomye
 */
@Service
public class SimulationService {
    
    @Autowired
    private SimulationRepository simulationRepository;
    
    
    public Simulation findSimulationById(String id) {
        return simulationRepository.findByid(id);
    }
    
    public void saveSimulation(Simulation simulation) {
        simulationRepository.save(simulation);
    }
    
    public Simulation addSimulation(String name, String creatorId, boolean test, String duration, String[] recipes) {
        Simulation sim = new Simulation();
        sim.setCreator(creatorId);
        sim.setName(name);
        sim.setDate(new Date());
        sim.setRecipes(recipes);
        if (test) {
            sim.setType(simType.TEST);
            sim.setDuration(Float.parseFloat(duration));
        }
        else {
            sim.setType(simType.PRACTICE);
            sim.setDuration(0);
        }
        return sim;
    }
    
    public void deleteSimulation(Simulation simulation) {
        simulationRepository.delete(simulation);
    }
    
     public List<Simulation> getAllGames() {
        return simulationRepository.findAll();
    }
    
}
