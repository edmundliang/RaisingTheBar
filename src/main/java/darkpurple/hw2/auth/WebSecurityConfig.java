package darkpurple.hw2.auth;

import darkpurple.hw2.database.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    CustomAuthenticationSuccessFailureHandler customizeAuthenticationSuccessHandler;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        UserDetailsService userDetailsService = mongoUserDetails();
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .authorizeRequests()
//                .antMatchers("/*", "/home", "/simulation", "/workshop", "/recipe", "/login", "/signup", "/forgot-password", "/reset-password", "/static/**").permitAll()
//                .antMatchers("/creator/**").hasAuthority("USER")
//                .antMatchers("/admin/**").hasAuthority("ADMIN").anyRequest()
//                .authenticated().and().csrf().disable().formLogin().successHandler(customizeAuthenticationSuccessHandler).failureHandler(customizeAuthenticationSuccessHandler)
//                .loginPage("/login")
//                .usernameParameter("email")
//                .passwordParameter("password")
//                .and().logout()
//                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//                .logoutSuccessUrl("/").and().exceptionHandling();

        http
                .authorizeRequests()
                .antMatchers("/home", "/simulation/**", "/workshop", "/recipe/**", "/ingredients/**", "/creator/**", "/creator/**","/login", "/signup", "/forgot-password", "/reset-password", "/static/**").permitAll()
                //.antMatchers("/*" ).hasAuthority("USER")
                .antMatchers("/admin/**").hasAuthority("ADMIN")
                .anyRequest().authenticated().and().csrf().disable()
                .formLogin().successHandler(customizeAuthenticationSuccessHandler).failureHandler(customizeAuthenticationSuccessHandler)
                .loginPage("/login")
                .usernameParameter("email")
                .passwordParameter("password")
                .loginProcessingUrl("/login")
                .and().logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/").and().exceptionHandling();

    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/images/**");
    }

//    @Bean("authenticationManager")
//    @Override
//    public AuthenticationManager authenticationManagerBean() throws Exception {
//        return super.authenticationManagerBean();
//    }
    @Bean
    public UserDetailsService mongoUserDetails() {
        return new CustomUserDetailsService();
    }
}
