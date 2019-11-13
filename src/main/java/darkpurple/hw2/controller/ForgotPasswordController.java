/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.controller;

import darkpurple.hw2.database.CustomUserDetailsService;
import darkpurple.hw2.database.EmailSenderService;
import darkpurple.hw2.database.entity.PasswordResetToken;
import darkpurple.hw2.database.entity.User;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author edmundliang
 */
@Controller
public class ForgotPasswordController {

    @Autowired
    protected CustomUserDetailsService userService;

    @Autowired
    private EmailSenderService emailSenderService;
    
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    // Display forgotPassword page
    @RequestMapping(value = "/forgot-password", method = RequestMethod.GET)
    public ModelAndView displayResetPassword(ModelAndView modelAndView, User user) {
        modelAndView.addObject("user", user);
        modelAndView.setViewName("forgotPassword");
        return modelAndView;
    }

    // Process form submission from forgotPassword page
    @RequestMapping(value = "/forgot-password", method = RequestMethod.POST)
    public ModelAndView processForgotPasswordForm(ModelAndView modelAndView, @RequestParam("email") String userEmail, HttpServletRequest request) {

        // Lookup user in database by e-mail
        User user = userService.findUserByEmail(userEmail);

        if (user == null) {
            modelAndView.addObject("errorMessage", "We didn't find an account for that e-mail address.");
            modelAndView.setViewName("error");
        } else {

            // Generate random 36-character string token for reset password 
            PasswordResetToken token = new PasswordResetToken(user);
            userService.saveToken(token);
            
            String appUrl = request.getScheme() + "://" + request.getServerName();

            // create the email
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(user.getEmail());
            mailMessage.setSubject("Complete Password Reset!");
            mailMessage.setFrom("grailedmund@yahoo.com");
            mailMessage.setText("To reset your password, click the link below:\n" + appUrl
					+ "/confirm-reset?token=" + token.getConfirmationToken());

            emailSenderService.sendEmail(mailMessage);

            modelAndView.addObject("message", "Request to reset password received. Check your inbox for the reset link.");
            modelAndView.setViewName("successForgotPassword");
        }

        return modelAndView;

    }

    @RequestMapping(value = "/confirm-reset", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView validateResetToken(ModelAndView modelAndView, @RequestParam("token") String confirmationToken) {

        PasswordResetToken token = userService.findToken(confirmationToken);

        if (token != null) {
            User user = userService.findUserByEmail(token.getUser().getEmail());
            user.setEnabled(true);
            userService.saveUser(user);
            modelAndView.addObject("user", user);
            modelAndView.addObject("emailId", user.getEmail());
            modelAndView.setViewName("resetPassword");
        } else {
            modelAndView.addObject("message", "The link is invalid or broken!");
            modelAndView.setViewName("error");
        }

        return modelAndView;
    }

    @RequestMapping(value = "/reset-password", method = RequestMethod.POST)
    public ModelAndView resetUserPassword(ModelAndView modelAndView, User user) {
        // ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if (user.getEmail() != null) {
            // use email to find user
            User tokenUser = userService.findUserByEmail(user.getEmail());
            tokenUser.setEnabled(true);
            tokenUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            // System.out.println(tokenUser.getPassword());
            userService.saveUser(tokenUser);
            modelAndView.addObject("message", "Password successfully reset. You can now log in with the new credentials.");
            modelAndView.setViewName("successResetPassword");
        } else {
            modelAndView.addObject("message", "The link is invalid or broken!");
            modelAndView.setViewName("error");
        }

        return modelAndView;
    }

}
