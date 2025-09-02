package movieverse.capstone.controllers;

import movieverse.capstone.entities.User;
import movieverse.capstone.exception.ValidationException;
import movieverse.capstone.payloads.LoginRespDTO;
import movieverse.capstone.payloads.NewUserDTO;
import movieverse.capstone.payloads.UserLoginDTO;
import movieverse.capstone.payloads.UserRespDTO;
import movieverse.capstone.services.AuthService;
import movieverse.capstone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserRespDTO register(@RequestBody @Validated NewUserDTO body, BindingResult validation) {
        if (validation.hasErrors()) {
            throw new ValidationException(validation.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        } else {
            User newUser = this.userService.save(body);
            return new UserRespDTO(newUser.getId());
        }
    }

    @PostMapping("/login")
    public LoginRespDTO login(@RequestBody UserLoginDTO payload) {
        return new LoginRespDTO(authService.generateToken(payload));
    }
}
