package movieverse.capstone.services;

import movieverse.capstone.entities.User;
import movieverse.capstone.exception.UnauthorizedException;
import movieverse.capstone.payloads.UserLoginDTO;
import movieverse.capstone.security.JWTTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTTools jwtTools;

    public String generateToken(UserLoginDTO payload) {
        User user = userService.findByEmail(payload.email());
        if (passwordEncoder.matches(payload.password(), user.getPassword())) {
            return jwtTools.createToken(user);
        } else {
            throw new UnauthorizedException("Wrong credentials!!");
        }
    }


}
