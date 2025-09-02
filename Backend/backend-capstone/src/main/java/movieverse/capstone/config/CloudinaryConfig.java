package movieverse.capstone.config;


import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        final Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "drm6px0oc");
        config.put("api_key", "669115238872695");
        config.put("api_secret", "2VWfiOIn_U8CNZvM0ey0NBiQXxg");
        return new Cloudinary(config);

    }
}
