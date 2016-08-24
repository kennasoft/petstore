package com.kennasoft.rbc.component;

import java.util.HashMap;
import java.util.Map;
import javax.persistence.EntityNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * This class allows me to return custom ResponseEntity instances for validation errors that 
 * would normally be handled automatically by Spring
 * 
 * @author ikennakonga
 */
@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    
    
    @ExceptionHandler(value = { 
        IllegalArgumentException.class, 
        IllegalStateException.class
    })
    protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {
        return handleExceptionInternal(ex, ex.getMessage(), 
          null, HttpStatus.CONFLICT, request);
    }
    
    @ExceptionHandler(value = {MethodArgumentTypeMismatchException.class})
    protected ResponseEntity<Object> handleMethodTypeMismatch(RuntimeException ex, WebRequest request){
        Map<String, Object> obj = new HashMap<>();
        obj.put("code", 400);
        obj.put("type", "unknown");
        obj.put("message", "java.lang.NumberFormatException: For input string: \\\"x\\\"");
        //trying to match the response in the swagger example
        return new ResponseEntity<>(obj,HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(value = {EntityNotFoundException.class})
    protected ResponseEntity<Object> handleEntityNotFound(RuntimeException ex, WebRequest req){
        Map<String, Object> obj = new HashMap<>();
        obj.put("code", 404);
        obj.put("type", "error");
        obj.put("message", "Pet not found");
        //trying to match the response in the swagger example
        return new ResponseEntity<>(obj,HttpStatus.NOT_FOUND);
    }
    
    
    
}
