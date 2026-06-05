package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:no-reply@systemized.com}")
    private String fromEmail;

    public void sendOtpEmail(String to, String otp, String subject) {
        log.info("Attempting to send OTP email to: {}", to);
        
        boolean sentSuccessfully = false;
        
        if (mailSender != null) {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
                helper.setTo(to);
                helper.setSubject(subject);
                helper.setText("Your verification code is: " + otp + "\nThis code will expire in 5 minutes.", false);
                
                // Set the display name to "Systemized"
                helper.setFrom(fromEmail, "Systemized");
                
                mailSender.send(message);
                log.info("Successfully sent OTP email to: {}", to);
                sentSuccessfully = true;
            } catch (Exception e) {
                log.warn("Failed to send email via SMTP, falling back to console logging: {}", e.getMessage());
            }
        } else {
            log.info("JavaMailSender not configured (SMTP settings missing), falling back to console logging.");
        }

        if (!sentSuccessfully) {
            // Highlighted print in logs for local debugging and ease of testing
            System.out.println("\n============================================================");
            System.out.println("✉️  MOCK EMAIL SENT SUCCESSFULLY");
            System.out.println("To: " + to);
            System.out.println("From: Systemized <" + fromEmail + ">");
            System.out.println("Subject: " + subject);
            System.out.println("Verification Code: " + otp);
            System.out.println("============================================================\n");
        }
    }
}
