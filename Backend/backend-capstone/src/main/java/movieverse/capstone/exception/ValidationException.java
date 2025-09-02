package movieverse.capstone.exception;

import java.util.List;

public class ValidationException extends RuntimeException {
    private List<String> errorMessages;

    public ValidationException(String message) {
        super(message);
    }

    public ValidationException(List<String> errorMessages) {
        super("Validation errors");
        this.errorMessages = errorMessages;
    }

    public List<String> getErrorMessages() {
        return errorMessages;
    }
}
