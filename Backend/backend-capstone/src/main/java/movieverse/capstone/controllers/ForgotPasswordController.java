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
import java.util.Map;
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


    @PostMapping("/verifyMail")
    public ResponseEntity<String> verifyEmail(@RequestBody Map<String, String> request) {
        // Log per debug
        System.out.println("Received request body: " + request);
        System.out.println("Request keys: " + (request != null ? request.keySet() : "null"));

        if (request == null) {
            System.out.println("Request body is null!");
            return new ResponseEntity<>("Request body is required", HttpStatus.BAD_REQUEST);
        }

        String emailAddress = request.get("email");
        System.out.println("Extracted email: " + emailAddress);

        if (emailAddress == null || emailAddress.trim().isEmpty()) {
            System.out.println("Email is null or empty!");
            return new ResponseEntity<>("Email is required", HttpStatus.BAD_REQUEST);
        }

        String trimmedEmail = emailAddress.trim();
        System.out.println("Processing email: " + trimmedEmail);

        try {
            User user = userRepository.findByEmail(trimmedEmail)
                    .orElseThrow(() -> {
                        System.out.println("User not found for email: " + trimmedEmail);
                        return new UsernameNotFoundException("Please provide a valid email");
                    });

            int otp = otpGenerator();
            System.out.println("Generated OTP: " + otp);

            MailBodyDTO mailBody = MailBodyDTO.builder()
                    .to(trimmedEmail)
                    .text("This is the OTP for your forgot password request: " + otp)
                    .subject("OTP for forgot Password")
                    .build();

            ForgotPassword forgotPassword = forgotPasswordRepository.findByUser(user)
                    .orElse(ForgotPassword.builder()
                            .user(user)
                            .build());

            forgotPassword.setOtp(otp);
            forgotPassword.setExpitationTime(new Date(System.currentTimeMillis() + 10 * 60 * 1000));

            // Salva prima l'OTP nel database
            forgotPasswordRepository.save(forgotPassword);
            System.out.println("OTP saved to database");

            // Prova a inviare l'email
            try {
                System.out.println("Attempting to send email to: " + trimmedEmail);
                emailService.sendMessage(mailBody);
                System.out.println("Email sent successfully!");
            } catch (Exception emailException) {
                System.out.println("=== EMAIL ERROR DETAILS ===");
                System.out.println("Exception type: " + emailException.getClass().getName());
                System.out.println("Exception message: " + emailException.getMessage());
                if (emailException.getCause() != null) {
                    System.out.println("Cause: " + emailException.getCause().getClass().getName());
                    System.out.println("Cause message: " + emailException.getCause().getMessage());
                }
                emailException.printStackTrace();

                // Anche se l'email fallisce, l'OTP è salvato
                System.out.println("Email failed but OTP is saved. Returning success.");
            }

            return ResponseEntity.ok("Email sent for verification");

        } catch (UsernameNotFoundException e) {
            System.out.println("UsernameNotFoundException: " + e.getMessage());
            throw e;
        } catch (Exception e) {
            System.out.println("=== GENERAL EXCEPTION IN verifyEmail ===");
            System.out.println("Exception type: " + e.getClass().getName());
            System.out.println("Exception message: " + e.getMessage());
            System.out.println("Exception cause: " + (e.getCause() != null ? e.getCause().getMessage() : "null"));
            e.printStackTrace();
            throw e;
        }
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
