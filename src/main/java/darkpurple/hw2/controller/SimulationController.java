package darkpurple.hw2.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import darkpurple.hw2.database.CustomUserDetailsService;
import darkpurple.hw2.database.SimulationService;
import darkpurple.hw2.database.entity.Simulation;
import darkpurple.hw2.database.entity.SimulationGrade;
import darkpurple.hw2.database.entity.User;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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

    //TODO add proper security checking to this
    @RequestMapping(value = "/simulation/grade", method = RequestMethod.POST)
    public ResponseEntity getSimulationGrade(@RequestParam("id") String simulationId) {
        List gradeList = simulationService.getSimGrades(simulationId);
        ObjectMapper mapper = new ObjectMapper();
        Map outputMap = new HashMap();
        outputMap.put("grades", gradeList);
        try {
            String output = mapper.writeValueAsString(outputMap);
            return ResponseEntity.status(HttpStatus.OK).body(output);
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @RequestMapping(value = "/simulation/complete", method = RequestMethod.GET)
    public SimulationGrade submitSimulationGrade(@RequestParam("id") String simulationId, @RequestParam("grade") String jsonGrade) {
        SimulationGrade simGrade = new SimulationGrade();
        simGrade.setDateCompleted(new Date());
        User user = userService.getLoggedUser();
        simGrade.setUserId(user.getId());
        simGrade.setSimulationId(simulationId);
        simGrade.setJsonGrades(jsonGrade);

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

    @RequestMapping(value = "/simulation/edit", method = RequestMethod.POST)
    public ResponseEntity editSimulation(@RequestParam("id") String id, @RequestParam("name") String name, @RequestParam("description") String description, @RequestParam("public") boolean isPublic, @RequestParam("practice") boolean isPractice, @RequestParam("recipes") String[] recipes, @RequestParam("json") String json) {

        User user = userService.getLoggedUser();
        if (user != null) {
            Simulation simulation = new Simulation();
            simulation.setId(id);
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
    public ResponseEntity deleteSim(@RequestParam("id") String simulationId) {
        User user = userService.getLoggedUser();
        if (user != null) {
            Simulation toBeDeleted = simulationService.findSimulationById(simulationId);
            if (toBeDeleted != null && toBeDeleted.getCreator().equals(user.getId())) {
                simulationService.deleteSimulation(toBeDeleted);
                return ResponseEntity.status(HttpStatus.OK).body(null);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @RequestMapping(value = "/simulation/list", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity allSimulations() {
        ObjectMapper mapper = new ObjectMapper();
        User user = userService.getLoggedUser();
        try {
            Map outputMap = new HashMap();
            List<Simulation> simulationList = simulationService.getAllSimulations();
            List<Simulation> approvedList = new ArrayList();
            for (Simulation r : simulationList) {
                if (r.isIsPublic() || r.getCreator().equals(user.getId())) {
                    approvedList.add(r);
                }
            }
            outputMap.put("simulations", approvedList);
            String output = mapper.writeValueAsString(outputMap);
            return ResponseEntity.status(HttpStatus.OK).body(output);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @RequestMapping(value = "/simulation/list/mine", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity allUserSimulations() {
        ObjectMapper mapper = new ObjectMapper();
        User user = userService.getLoggedUser();
        if (user != null) {
            try {
                Map outputMap = new HashMap();
                List<Simulation> simulationList = simulationService.getAllSimulations();
                List<Simulation> approvedList = new ArrayList();
                for (Simulation r : simulationList) {
                    if (r.getCreator().equals(user.getId())) {
                        approvedList.add(r);
                    }
                }
                outputMap.put("simulations", approvedList);
                String output = mapper.writeValueAsString(outputMap);
                return ResponseEntity.status(HttpStatus.OK).body(output);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}
