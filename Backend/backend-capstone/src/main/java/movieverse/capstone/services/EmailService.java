package movieverse.capstone.services;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.SendEmailRequest;
import movieverse.capstone.payloads.MailBodyDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Value("${resend.api.key}")
    private String resendApiKey;

    @Value("${resend.from.email}")
    private String fromEmail;

    public void sendMessage(MailBodyDTO mailBody) throws ResendException {
        Resend resend = new Resend(resendApiKey);

        SendEmailRequest sendEmailRequest = SendEmailRequest.builder()
                .from(fromEmail)
                .to(mailBody.to())
                .subject(mailBody.subject())
                .html("<p>" + mailBody.text() + "</p>")
                .build();

        resend.emails().send(sendEmailRequest);
    }
}