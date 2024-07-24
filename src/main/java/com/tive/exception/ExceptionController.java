package com.tive.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import org.thymeleaf.exceptions.TemplateInputException;

import java.nio.file.AccessDeniedException;

@ControllerAdvice
@Slf4j
public class ExceptionController {
    @ExceptionHandler({AccessDeniedException.class})
    public String handlerAccessDeniedException(Exception e, Model model){
        model.addAttribute("view","error/error403");
        return "index";
    }

    @ExceptionHandler({NoResourceFoundException.class
    , MethodArgumentTypeMismatchException.class
    , HttpRequestMethodNotSupportedException.class})
    public String handlerNotFoundException(Exception e,Model model){
        log.info("404444",e);
        model.addAttribute("view","error/error404");
        return "index";
    }
    @ExceptionHandler(CustomException.class)
    public String handleCustomException(CustomException e,Model model){
        log.info("handelCustomException...{}",e);

        model.addAttribute("view","error/error404");
        return "index";
    }
    @ExceptionHandler({TemplateInputException.class,Exception.class})
    public String handlerInternalServerError(Exception e,Model model){
        log.error("handlerInternalServerError...{}",e);
        model.addAttribute("view","error/error500");
        return "index";
    }
}
