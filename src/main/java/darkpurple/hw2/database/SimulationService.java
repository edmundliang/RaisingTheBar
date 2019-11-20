/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.database;

import darkpurple.hw2.database.entity.Simulation;
import darkpurple.hw2.database.repositories.SimulationRepository;
import java.util.Date;
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
    
    
    public Simulation createNewSimulation(String user) {
        Simulation simulation = new Simulation();
     
        
        simulation.setDate(new Date());
        simulation.setCreator(user);
        simulationRepository.save(simulation);

        return simulation;
    }
    
}
