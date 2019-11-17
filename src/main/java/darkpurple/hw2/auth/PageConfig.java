package darkpurple.hw2.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class PageConfig implements WebMvcConfigurer {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder;
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
//        registry.addViewController("/creator").setViewName("creator");
//        registry.addViewController("/").setViewName("home");
//        registry.addViewController("/login").setViewName("login");
//        registry.addViewController("/signup").setViewName("signup");
//        registry.addViewController("/forgot-password").setViewName("forgotPassword");
//        registry.addViewController("/reset-password").setViewName("forgotPassword");
////        registry.addViewController("/player").setViewName("landing");
//        registry.addViewController("/recipes").setViewName("recipes");
//        registry.addViewController("/simulation").setViewName("simulation");
//        registry.addViewController("/workshop").setViewName("workshop");

        registry.addViewController("/").setViewName("forward:/index.html");
        registry.addViewController("/home").setViewName("forward:/index.html");
        registry.addViewController("/simulation").setViewName("forward:/index.html");
        registry.addViewController("/creator").setViewName("forward:/index.html");
        registry.addViewController("/workshop").setViewName("forward:/index.html");
        registry.addViewController("/recipe").setViewName("forward:/index.html");
        registry.addViewController("/forgot-password").setViewName("forward:/index.html");
        registry.addViewController("/reset-password").setViewName("forward:/index.html");
    }

}
