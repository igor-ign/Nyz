package br.com.nyz.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AddUserRequest {

    @NotBlank(message = "Name can't be null.")
    private String name;

    private String profilePicture;

    @Email
    @NotBlank(message = "E-mail can't be null.")
    private String email;

    @NotBlank(message = "Password can't be null.")
    private String password;
}
