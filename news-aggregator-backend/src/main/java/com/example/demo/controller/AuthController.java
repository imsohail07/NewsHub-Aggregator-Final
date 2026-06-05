package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.model.RegisterRequest;
import com.example.demo.model.ResetPasswordRequest;
import com.example.demo.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/send-otp")
    public String sendOtp(@RequestParam String email) {
        authService.sendOtp(email);
        return "OTP sent successfully";
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestParam String email) {
        authService.sendForgotPasswordOtp(email);
        return "OTP sent successfully";
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody ResetPasswordRequest request) {
        return authService.resetPassword(request);
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        return authService.login(user.getEmail(), user.getPassword());
    }
}
