package darkpurple.hw2.controller;

import darkpurple.hw2.database.CustomUserDetailsService;
import darkpurple.hw2.database.SimulationService;
import darkpurple.hw2.database.entity.Simulation;
import darkpurple.hw2.database.entity.SimulationGrade;
import darkpurple.hw2.database.entity.User;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SimulationController {
    
    
    @Autowired
    private SimulationService simulationService;
    
    @Autowired
    private CustomUserDetailsService userService;
    
    
    @RequestMapping(value = "/simulation/get", method = RequestMethod.GET)
    public Simulation getSimulation(@RequestParam("id") String simulationId) {
        return simulationService.findSimulationById(simulationId);
        
    }
    
    @RequestMapping(value = "/simulation/complete", method = RequestMethod.GET)
    public SimulationGrade submitSimulationGrade(@RequestParam("id") String simulationId, @RequestParam("grade")int grade) {
        SimulationGrade simGrade = new SimulationGrade();
        simGrade.setDateCompleted(new Date());
        User user = userService.getLoggedUser();
        simGrade.setUserId(user.getId());
        simGrade.setSimulationId(simulationId);
        simGrade.setGrade(grade);
        
        simulationService.submitSimulationGrade(simGrade);
        
        return simGrade;
        
    }
    
    
    @RequestMapping(value = "/simulation/add", method = RequestMethod.POST)
    public Simulation createNewSimulation(@RequestParam("id") String name, @RequestParam("test")boolean test, @RequestParam("description")String description, @RequestParam("duration")String duration, @RequestParam("recipesIds")String[] recipes ) {
   
        Simulation simulation = new Simulation();
        User user = userService.getLoggedUser();
        simulation.setCreator(user.getId());
        simulation.setName(name);
        simulation.setDate(new Date());
        simulation.setRecipes(recipes);
        simulation.setDescription(description);
        if (test) {
            simulation.setType(Simulation.simulationType.TEST);
            simulation.setDuration(Float.parseFloat(duration));
        }
        else {
            simulation.setType(Simulation.simulationType.PRACTICE);
            simulation.setDuration(0);
        }
        simulationService.saveSimulation(simulation);
        return simulation;
    }
    
    
    @RequestMapping(value = "/simulation/delete", method = RequestMethod.POST)
    public void deleteSim(@RequestBody String simulationId) {
        Simulation toBeDeleted = simulationService.findSimulationById(simulationId);
        simulationService.deleteSimulation(toBeDeleted);
    }
    
    
    
    @RequestMapping(value = "/simulation/list", method = RequestMethod.GET)
    public List<Simulation> allSimulations() {
        return simulationService.getAllSimulations();
    }

}
