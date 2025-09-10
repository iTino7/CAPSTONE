package movieverse.capstone.controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import movieverse.capstone.entities.SubscriptionEntities;
import movieverse.capstone.entities.User;
import movieverse.capstone.exception.ValidationException;
import movieverse.capstone.payloads.LoginRespDTO;
import movieverse.capstone.payloads.NewUserDTO;
import movieverse.capstone.payloads.UserLoginDTO;
import movieverse.capstone.payloads.UserRespDTO;
import movieverse.capstone.repositories.SubscriptionRepository;
import movieverse.capstone.repositories.UserRepository;
import movieverse.capstone.services.AuthService;
import movieverse.capstone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    UserRepository userRepository;
    @Value("${stripe.secretKey}")
    private String secretKey;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthService authService;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserRespDTO register(@RequestBody @Validated NewUserDTO body, BindingResult validation) throws StripeException {

        Stripe.apiKey = secretKey;

        if (validation.hasErrors()) {
            throw new ValidationException(validation.getFieldErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList());
        } else {
            User newUser = this.userService.save(body);

            Map<String, Object> params = new HashMap<>();
            params.put("name", newUser.getName());
            params.put("email", newUser.getEmail());
            Customer customer = Customer.create(params);
            newUser.setCustomerId(customer.getId());
            User savedUser = userRepository.save(newUser);

            SubscriptionEntities subscriptionEntities = new SubscriptionEntities();
            subscriptionEntities.setUser(savedUser);

            subscriptionRepository.save(subscriptionEntities);

            return new UserRespDTO(newUser.getId());
        }
    }

    @PostMapping("/login")
    public LoginRespDTO login(@RequestBody UserLoginDTO payload) {
        return new LoginRespDTO(authService.generateToken(payload));
    }
}
