/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.database;

import darkpurple.hw2.database.entity.Simulation;
import darkpurple.hw2.database.entity.SimulationGrade;
import darkpurple.hw2.database.repositories.SimulationGradeRepository;
import darkpurple.hw2.database.repositories.SimulationRepository;
import java.util.List;
import java.util.stream.Collectors;
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
    
    @Autowired
    private SimulationGradeRepository simGradeRepository;
    
    
    public Simulation findSimulationById(String id) {
        return simulationRepository.findByid(id);
    }
    
    public void saveSimulation(Simulation simulation) {
        simulationRepository.save(simulation);
    }
    
    public void deleteSimulation(Simulation simulation) {
        simulationRepository.delete(simulation);
    }
    
     public List<Simulation> getAllSimulations() {
        return simulationRepository.findAll();
    }
     
   public void submitSimulationGrade(SimulationGrade simGrade) {
       simGradeRepository.save(simGrade);
   }
   
   public SimulationGrade getSimulationGrade(String simGradeID) {
       return simGradeRepository.findByid(simGradeID);
   }
   
   public List<SimulationGrade> getSimGrades(String simulationId) {
       return simGradeRepository.findAll().stream().filter(grade -> grade.getSimulationId().equals(simulationId)).collect(Collectors.toList());
   }
    
}
