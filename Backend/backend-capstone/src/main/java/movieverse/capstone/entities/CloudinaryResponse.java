package movieverse.capstone.entities;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CloudinaryResponse {

    private String publicId;
    private String url;

}
