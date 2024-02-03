package com.ssafy.togeball.domain.user.service;

import com.ssafy.togeball.domain.common.exception.RestApiException;
import com.ssafy.togeball.domain.user.dto.UserSignUpRequest;
import com.ssafy.togeball.domain.auth.service.AuthService;
import com.ssafy.togeball.domain.tag.service.TagService;
import com.ssafy.togeball.domain.user.entity.Role;
import com.ssafy.togeball.domain.user.entity.User;
import com.ssafy.togeball.domain.user.exception.UserErrorCode;
import com.ssafy.togeball.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;
    private final TagService tagService;

    public Integer signUp(UserSignUpRequest userSignUpRequest) {

        if (userRepository.findByEmail(userSignUpRequest.getEmail()).isPresent()) {
            throw new RestApiException(UserErrorCode.CONFLICT_EMAIL);
        }

        if (userRepository.findByNickname(userSignUpRequest.getNickname()).isPresent()) {
            throw new RestApiException(UserErrorCode.CONFLICT_NICKNAME);
        }

        User user = User.builder()
                .email(userSignUpRequest.getEmail())
                .nickname(userSignUpRequest.getNickname())
                .role(Role.BASIC)
                .build();

        Integer userId = userRepository.save(user).getId();
        String encodedPassword = passwordEncoder.encode(userSignUpRequest.getPassword());

        authService.createAuth(userId, encodedPassword);
        return userId;
    }

    public User findUserById(Integer userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RestApiException(UserErrorCode.USER_NOT_FOUND));
    }

    public void updateUserTags(Integer userId, Set<Integer> tagIds) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RestApiException(UserErrorCode.USER_NOT_FOUND));
        tagService.updateUserTags(user, tagIds);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RestApiException(UserErrorCode.USER_NOT_FOUND));
    }
}