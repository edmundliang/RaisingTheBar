package darkpurple.hw2.controller;

import darkpurple.hw2.database.entity.User;
import darkpurple.hw2.database.CustomUserDetailsService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LoginController {

    @Autowired
    protected CustomUserDetailsService userService;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (!(auth instanceof AnonymousAuthenticationToken)) {
            return "redirect:/home";
        }
        return "forward:/index.html";
    }
    
    /**
     * This is a request mapping because the createNewUser() POST method blocks the GET request endpoint. So inorder to make sure that the user can see the page there must be a matching mapping for a GET request
     * @return 
     */
    @RequestMapping(value = "/signup", method = RequestMethod.GET)
    public String createNewUser() {
        return "forward:index.html";
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public ResponseEntity createNewUser(@Valid User user) {

        User userExists = userService.findUserByEmail(user.getEmail());
        if (userExists != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } else {
            userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
    }
    
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ResponseEntity logoutPage(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
         return ResponseEntity.status(HttpStatus.OK).body(null);
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);            
        }
    }
}
