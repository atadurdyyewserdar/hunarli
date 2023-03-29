package com.atadu.platform.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Async
public class EmailService {
    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void send(String to, String emailContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
        helper.setText(emailContent, true);
        helper.setTo(to);
        helper.setSubject("Confirm your email");
        mailSender.send(message);
    }

    @Async
    public void sendPasswordResetLink(String to, String emailContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
        helper.setText(emailContent, true);
        helper.setTo(to);
        helper.setSubject("Rest your password");
        mailSender.send(message);
    }

    @Async
    public void sendResume(String to, String emailContent, MultipartFile file, String filename)
            throws MessagingException, IllegalStateException, IOException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setText(emailContent, true);
        helper.setTo(to);
        helper.setSubject("New applicant");
        helper.addAttachment(file.getOriginalFilename(), file);
        mailSender.send(message);
    }
}