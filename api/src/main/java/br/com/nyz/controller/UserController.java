package br.com.nyz.controller;

import br.com.nyz.controller.request.AddUserRequest;
import br.com.nyz.controller.request.DetailedUserRequest;
import br.com.nyz.controller.response.UserResponse;
import br.com.nyz.service.UserRegisterService;
import br.com.nyz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final PasswordEncoder encoder;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRegisterService userRegisterService;

    public UserController(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    @GetMapping
    public UserResponse listUser(@RequestBody DetailedUserRequest request) {
        return userService.listUser(request);
    }

    @PostMapping("/register")
    public UserResponse addNewUser(@RequestBody AddUserRequest newUser) {
        newUser.setPassword(encoder.encode(newUser.getPassword()));
        return userRegisterService.register(newUser);
    }
}
