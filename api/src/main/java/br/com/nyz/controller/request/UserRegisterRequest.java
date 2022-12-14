package br.com.nyz.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterRequest {

    @NotBlank(message = "Name can't be null.")
    private String name;

    private String profilePicture;

    @Email
    @NotBlank(message = "E-mail can't be null.")
    private String email;

    @NotBlank(message = "Password can't be null.")
    private String password;
}
