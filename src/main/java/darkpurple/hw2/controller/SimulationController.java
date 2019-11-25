/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.controller;


import darkpurple.hw2.database.SimulationService;
import darkpurple.hw2.database.entity.Simulation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author anilramsoomye
 */

@Controller
public class SimulationController {
    
    
    @Autowired
    private SimulationService simulationService;
    
    
    @RequestMapping(value = "/simulation", method = RequestMethod.GET)
    public Simulation getSimulation(@RequestBody String simID) {
        return simulationService.findSimulationById(simID);
        
    }
    
    
    @RequestMapping(value = "/simulation/add", method = RequestMethod.POST)
    public Simulation createNewSimulation(@RequestBody String name, String creatorId, boolean test, String duration, String[] recipes ) {
        Simulation sim = simulationService.addSimulation(name, creatorId, test, duration, recipes);
        return sim;
    }
    
    
    @RequestMapping(value = "/simulation/delete", method = RequestMethod.POST)
    public void deleteSim(@RequestBody String simId) {
        Simulation toBeDeleted = simulationService.findSimulationById(simId);
        simulationService.deleteSimulation(toBeDeleted);
    }
    
    
    
    @RequestMapping(value = "/simulation/list", method = RequestMethod.GET)
    public List<Simulation> allSimulations() {
        return simulationService.getAllGames();
    }

}
