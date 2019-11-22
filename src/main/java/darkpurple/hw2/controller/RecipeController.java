/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.controller;

import darkpurple.hw2.database.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author anilramsoomye
 */
@Controller
public class RecipeController {
    
    @Autowired
    private RecipeService recipeService;
    
    /*
    
    @RequestMapping(value = "/recipe", method = RequestMethod.GET)
    
    @RequestMapping(value = "/recipe/add", method = RequestMethod.GET)
    
    @RequestMapping(value = "/recipe/add", method = RequestMethod.POST)
    
    @RequestMapping(value = "/recipe/delete", method = RequestMethod.GET)
    
    @RequestMapping(value = "/recipe/delete", method = RequestMethod.POST)
    
    @RequestMapping(value = "/recipe/list", method = RequestMethod.GET)*/
    
    
}
