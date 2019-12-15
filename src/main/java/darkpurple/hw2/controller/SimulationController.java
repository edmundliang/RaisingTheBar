package darkpurple.hw2.controller;

import darkpurple.hw2.database.CustomUserDetailsService;
import darkpurple.hw2.database.SimulationService;
import darkpurple.hw2.database.entity.Simulation;
import darkpurple.hw2.database.entity.SimulationGrade;
import darkpurple.hw2.database.entity.User;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public SimulationGrade submitSimulationGrade(@RequestParam("id") String simulationId, @RequestParam("grade") int grade) {
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
    public ResponseEntity createNewSimulation(@RequestParam("name") String name, @RequestParam("description") String description, @RequestParam("public") boolean isPublic, @RequestParam("practice") boolean isPractice, @RequestParam("recipes") String[] recipes, @RequestParam("json") String json) {

        User user = userService.getLoggedUser();
        if (user != null) {            
            Simulation simulation = new Simulation();
            simulation.setCreator(user.getId());
            simulation.setName(name);
            simulation.setDescription(description);
            simulation.setIsPublic(isPublic);
            simulation.setIsPractice(isPractice);
            simulation.setRecipes(recipes);
            simulation.setDate(new Date());
            simulation.setJson(json);
            simulationService.saveSimulation(simulation);
            return ResponseEntity.status(HttpStatus.OK).body(simulation);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
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
