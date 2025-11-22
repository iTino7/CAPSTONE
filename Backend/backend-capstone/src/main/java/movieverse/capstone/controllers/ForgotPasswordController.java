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
        System.out.println("Received request body: " + request);

        if (request == null) {
            return new ResponseEntity<>("Request body is required", HttpStatus.BAD_REQUEST);
        }

        String emailAddress = request.get("email");

        if (emailAddress == null || emailAddress.trim().isEmpty()) {
            return new ResponseEntity<>("Email is required", HttpStatus.BAD_REQUEST);
        }

        String trimmedEmail = emailAddress.trim();

        try {
            User user = userRepository.findByEmail(trimmedEmail)
                    .orElseThrow(() -> new UsernameNotFoundException("Please provide a valid email"));

            int otp = otpGenerator();

            // Create a more professional email message
            String emailText = String.format(
                    "Hello,\n\n" +
                            "You requested to reset your password. Use the following OTP code:\n\n" +
                            "%d\n\n" +
                            "This code will expire in 10 minutes.\n\n" +
                            "If you didn't request this, please ignore this email.\n\n" +
                            "Best regards,\n" +
                            "MovieVerse Team",
                    otp
            );

            MailBodyDTO mailBody = MailBodyDTO.builder()
                    .to(trimmedEmail)
                    .text(emailText)
                    .subject("Reset Password - OTP Code")
                    .build();

            ForgotPassword forgotPassword = forgotPasswordRepository.findByUser(user)
                    .orElse(ForgotPassword.builder()
                            .user(user)
                            .build());

            forgotPassword.setOtp(otp);
            forgotPassword.setExpitationTime(new Date(System.currentTimeMillis() + 10 * 60 * 1000));

            // Save OTP first
            forgotPasswordRepository.save(forgotPassword);

            // Then send email
            try {
                emailService.sendMessage(mailBody);
                System.out.println("Email sent successfully to: " + trimmedEmail);
            } catch (Exception emailException) {
                System.out.println("=== EMAIL ERROR ===");
                System.out.println("Error: " + emailException.getMessage());
                emailException.printStackTrace();
                // OTP is saved even if email fails
            }

            return ResponseEntity.ok("Email sent for verification");

        } catch (UsernameNotFoundException e) {
            throw e;
        } catch (Exception e) {
            System.out.println("=== GENERAL EXCEPTION ===");
            System.out.println("Error: " + e.getMessage());
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
