package br.com.nyz.controller;

import br.com.nyz.controller.request.UserRegisterRequest;
import br.com.nyz.controller.request.DetailedUserRequest;
import br.com.nyz.controller.request.LoginRequest;
import br.com.nyz.controller.response.UserResponse;
import br.com.nyz.service.LoginService;
import br.com.nyz.service.UserRegisterService;
import br.com.nyz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRegisterService userRegisterService;

    @Autowired
    private LoginService loginService;

    @GetMapping
    public UserResponse listUser(@RequestBody DetailedUserRequest request) {
        return userService.listUser(request);
    }

    @PostMapping("/register")
    public UserResponse registerUser(@RequestBody UserRegisterRequest newUser) {
        return userRegisterService.register(newUser);
    }

    @PostMapping("/login")
    public UserResponse login(@RequestBody LoginRequest request) {
        return loginService.login(request);
    }
}
