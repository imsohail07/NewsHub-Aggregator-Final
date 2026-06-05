package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.SavedArticle;
import com.example.demo.repository.SavedArticleRepository;
import com.example.demo.security.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/saved-articles")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class SavedArticleController {

    private final SavedArticleRepository savedArticleRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private HttpServletRequest request;

    @GetMapping
    public ResponseEntity<List<SavedArticle>> getAll() {
        try {
            String email = getEmailFromHeader();
            List<SavedArticle> userArticles = savedArticleRepository.findByUserEmail(email);
            return ResponseEntity.ok(userArticles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody SavedArticle article) {
        try {
            String email = getEmailFromHeader();
            article.setUserEmail(email);

            // Check if already saved
            Optional<SavedArticle> existing = savedArticleRepository.findByUserEmailAndUrl(email, article.getUrl());
            if (existing.isPresent()) {
                return ResponseEntity.ok(existing.get()); // Return existing
            }

            SavedArticle saved = savedArticleRepository.save(article);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            String email = getEmailFromHeader();
            Optional<SavedArticle> articleOpt = savedArticleRepository.findById(id);
            if (articleOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            SavedArticle article = articleOpt.get();
            
            // Check if this article belongs to the current user
            if (!article.getUserEmail().equalsIgnoreCase(email)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden");
            }

            savedArticleRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
    }

    // Helper method to extract and validate email from JWT header
    private String getEmailFromHeader() {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtUtil.validateToken(token)) {
                return jwtUtil.getEmailFromToken(token);
            }
        }
        throw new RuntimeException("Unauthorized");
    }
}
