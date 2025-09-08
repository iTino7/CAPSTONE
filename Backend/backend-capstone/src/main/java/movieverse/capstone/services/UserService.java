package movieverse.capstone.services;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import movieverse.capstone.entities.CloudinaryResponse;
import movieverse.capstone.entities.User;
import movieverse.capstone.exception.BadRequestException;
import movieverse.capstone.exception.NotFoundException;
import movieverse.capstone.payloads.NewUserDTO;
import movieverse.capstone.repositories.UserRepository;
import movieverse.capstone.util.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User save(NewUserDTO payload) {
        this.userRepository.findByEmail(payload.email()).ifPresent(utenti -> {
            throw new BadRequestException("Ops! Email address  " + utenti.getEmail() + " is already in use");
        });

        User newUser = new User(payload.username(), payload.name(), payload.email(), passwordEncoder.encode(payload.password()));

        return userRepository.save(newUser);
    }

    public User findById(long id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found with this id " + id));
    }

    public User findByIdAndUpdate(long userId, NewUserDTO payload) {
        User found = this.findById(userId);
        if (!found.getEmail().equals(payload.email()))
            this.userRepository.findByEmail(payload.email()).ifPresent(user -> {
                throw new BadRequestException("Ops! Email address " + user.getEmail() + " is already in use");
            });

        found.setUsername(payload.username());
        found.setName(payload.name());
        found.setEmail(payload.email());
        found.setPassword(passwordEncoder.encode(payload.password()));

        User modifiedUser = this.userRepository.save(found);

        log.info("User with id" + found.getId() + " has been modified!");

        return modifiedUser;
    }

    public Page<User> findAll(int pageNumber, int pageSize, String sortBy) {
        if (pageSize > 50) pageSize = 50;
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
        return this.userRepository.findAll(pageable);
    }

    public User findByEmail(String email) {
        return this.userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User with email " + email + " not found!"));
    }

    public void findByIdAndDelete(long userId) {
        User found = this.findById(userId);
        this.userRepository.delete(found);
    }


    @Transactional
    public void uploadImage(final Long id, final MultipartFile file) {
        final User user = this.userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("user not found"));
        FileUploadUtil.assertAllowed(file, FileUploadUtil.IMAGE_PATTERN);
        final String fileName = FileUploadUtil.getFileName(file.getOriginalFilename());
        final CloudinaryResponse response = this.cloudinaryService.uploadFile(file, fileName);
        user.setAvatar(response.getUrl());
        user.setAvatar(response.getPublicId());
        this.userRepository.save(user);
    }
}
