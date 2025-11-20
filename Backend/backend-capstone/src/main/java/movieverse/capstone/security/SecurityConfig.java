package movieverse.capstone.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.formLogin(AbstractHttpConfigurer::disable);
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        httpSecurity.sessionManagement(sessions -> sessions.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        httpSecurity.authorizeHttpRequests(h -> h.requestMatchers("/**").permitAll());
        httpSecurity.cors(Customizer.withDefaults());
        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder getBcrypt() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Leggi gli origin permessi dalle variabili d'ambiente o usa default
        String allowedOriginsEnv = System.getenv("CORS_ALLOWED_ORIGINS");

        // Log per debugging (rimuovere dopo il fix)
        System.out.println("CORS_ALLOWED_ORIGINS env variable: " + allowedOriginsEnv);

        // Log per debugging (rimuovere dopo il fix)
        System.out.println("CORS_ALLOWED_ORIGINS env variable: " + allowedOriginsEnv);

        if (allowedOriginsEnv != null && !allowedOriginsEnv.isEmpty()) {
            // Produzione: usa variabile d'ambiente
            List<String> origins = Arrays.asList(allowedOriginsEnv.split(","));
            System.out.println("CORS allowed origins: " + origins);
            configuration.setAllowedOrigins(origins);
        } else {
            // Sviluppo locale: default (include anche produzione temporaneamente)
            List<String> defaultOrigins = Arrays.asList(
                    "http://localhost:5173",
                    "http://localhost:3000",
                    "https://capstone-six-azure.vercel.app"
            );
            System.out.println("CORS using default origins: " + defaultOrigins);
            configuration.setAllowedOrigins(defaultOrigins);
        }

        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}