package com.Heap.Registration;

import com.Heap.Registration.token.*;
import com.Heap.SGCooksUser.SGCooksService;
import com.Heap.SGCooksUser.User;
import com.Heap.SGCooksUser.UserRole;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
@Service
@AllArgsConstructor
public class RegistrationService {
    private final SGCooksService sgCooksService;

    private final ConfirmationTokenService confirmationTokenService;

    private final EmailValidator emailValidator;

    public String register(RegistrationRequest request) {
        boolean isValid = emailValidator.test(request.getEmail());
        if (!isValid) {
            throw new IllegalStateException("email not found");
        }
        String token = sgCooksService.signUpUser(
                new User(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getEmail(),
                        request.getPassword(),
                        UserRole.USER
                )
        );

        return token;
    }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        sgCooksService.enableAppUser(
                confirmationToken.getUser().getEmail());
        return "confirmed";
    }
}
