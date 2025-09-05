package movieverse.capstone.controllers;

import movieverse.capstone.entities.ForgotPassword;
import movieverse.capstone.entities.User;
import movieverse.capstone.payloads.ChangePasswordDTO;
import movieverse.capstone.payloads.MailBodyDTO;
import movieverse.capstone.repositories.ForgotPasswordRepository;
import movieverse.capstone.repositories.UserRepository;
import movieverse.capstone.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.Objects;
import java.util.Random;

@RestController
@RequestMapping("/forgotPassword")
public class ForgotPasswordController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    EmailService emailService;
    @Autowired
    ForgotPasswordRepository forgotPasswordRepository;
    @Autowired
    PasswordEncoder passwordEncoder;


    @PostMapping("/verifyMail/{email}")
    public ResponseEntity<String> verifyEmail(@PathVariable String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Please provide a valid email"));

        int otp = otpGenerator();
        MailBodyDTO mailBody = MailBodyDTO.builder()
                .to(email)
                .text("This is the OTP for your forgot password request: " + otp)
                .subject("OTP for forgot Password")
                .build();

        ForgotPassword forgotPassword = ForgotPassword.builder()
                .otp(otp)
                .expitationTime(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                .user(user)
                .build();

        emailService.sendMessage(mailBody);
        forgotPasswordRepository.save(forgotPassword);
        return ResponseEntity.ok("Email sent for verification");
    }

    @PostMapping("/verifyOtp/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp, @PathVariable String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Please provide a valid email"));

        ForgotPassword fp = forgotPasswordRepository.findByOtpAndUser(otp, user)
                .orElseThrow(() -> new RuntimeException("Invalid OTP for email: " + email));

        if (fp.getExpitationTime().before(Date.from(Instant.now()))) {
            forgotPasswordRepository.deleteById(fp.getFpid());
            return new ResponseEntity<>("OTP has expired", HttpStatus.EXPECTATION_FAILED);
        }

        return ResponseEntity.ok("OTP verified");
    }

    @PostMapping("/changePassword/{email}")
    public ResponseEntity<String> changePasswordHandler(@RequestBody ChangePasswordDTO changePassword,
                                                        @PathVariable String email) {
        if (!Objects.equals(changePassword.password(), changePassword.repeatPassword())) {
            return new ResponseEntity<>("Please enter the password again!", HttpStatus.EXPECTATION_FAILED);
        }
        String encodedPassword = passwordEncoder.encode(changePassword.password());
        userRepository.updatePassword(email, encodedPassword);
        return ResponseEntity.ok("Password has been changed");
    }

    private Integer otpGenerator() {
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
    }

}
