package movieverse.capstone.payloads;

import lombok.Builder;

@Builder
public record MailBodyDTO(String to, String subject, String text) {
}
