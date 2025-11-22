package movieverse.capstone.services;

import movieverse.capstone.payloads.MailBodyDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class EmailService {

    @Value("${mailgun.api.key:}")
    private String mailgunApiKey;

    @Value("${mailgun.domain:}")
    private String mailgunDomain;

    @Value("${mailgun.from.email:noreply@mailgun.org}")
    private String fromEmail;

    public void sendMessage(MailBodyDTO mailBody) {
        System.out.println("=== MAILGUN EMAIL DEBUG ===");
        System.out.println("API Key present: " + (mailgunApiKey != null && !mailgunApiKey.isEmpty()));
        System.out.println("Domain: " + mailgunDomain);
        System.out.println("From email: " + fromEmail);
        System.out.println("To email: " + mailBody.to());
        System.out.println("Subject: " + mailBody.subject());

        if (mailgunApiKey == null || mailgunApiKey.isEmpty()) {
            throw new IllegalStateException("MAILGUN_API_KEY is not configured.");
        }

        if (mailgunDomain == null || mailgunDomain.isEmpty()) {
            throw new IllegalStateException("MAILGUN_DOMAIN is not configured.");
        }

        try {
            // Mailgun API endpoint
            String url = "https://api.mailgun.net/v3/" + mailgunDomain + "/messages";

            // Create HTML email body with better formatting
            String htmlBody = String.format(
                    "<html><body style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>" +
                            "<div style='background-color: #f4f4f4; padding: 20px; border-radius: 5px;'>" +
                            "<h2 style='color: #333;'>Reset Password</h2>" +
                            "<p>%s</p>" +
                            "<p style='color: #666; font-size: 12px; margin-top: 20px;'>If you didn't request this, please ignore this email.</p>" +
                            "</div></body></html>",
                    mailBody.text().replace("\n", "<br>")
            );

            System.out.println("Sending email request to: " + url);

            // Create Basic Auth header
            String auth = "api:" + mailgunApiKey;
            String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes(StandardCharsets.UTF_8));

            // Prepare form data (multipart/form-data)
            MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
            formData.add("from", fromEmail);
            formData.add("to", mailBody.to());
            formData.add("subject", mailBody.subject());
            formData.add("text", mailBody.text());
            formData.add("html", htmlBody);

            // Create WebClient and send request
            WebClient webClient = WebClient.builder()
                    .baseUrl("https://api.mailgun.net")
                    .defaultHeader(HttpHeaders.AUTHORIZATION, "Basic " + encodedAuth)
                    .build();

            String responseBody = webClient.post()
                    .uri("/v3/" + mailgunDomain + "/messages")
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(BodyInserters.fromFormData(formData))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            System.out.println("Response body: " + responseBody);
            System.out.println("Email sent successfully!");

        } catch (Exception e) {
            System.out.println("=== MAILGUN ERROR ===");
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to send email via Mailgun: " + e.getMessage(), e);
        }
    }
}
