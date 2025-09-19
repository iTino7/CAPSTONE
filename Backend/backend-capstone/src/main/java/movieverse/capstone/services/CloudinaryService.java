package movieverse.capstone.services;


import com.cloudinary.Cloudinary;
import jakarta.transaction.Transactional;
import movieverse.capstone.entities.CloudinaryResponse;
import movieverse.capstone.exception.FuncErrorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    @Transactional
    public CloudinaryResponse uploadFile(MultipartFile file, String fileName) {
        try {
            final Map result = cloudinary.uploader().upload(file.getBytes(), Map.of("public_id", "profile/image" + fileName));
            final String url = (String) result.get("secure_url");
            final String publicId = (String) result.get("public_id");
            return CloudinaryResponse.builder().publicId(publicId).url(url).build();
        } catch (Exception ex) {
            throw new FuncErrorException("filed to upload file");
        }
    }
}
