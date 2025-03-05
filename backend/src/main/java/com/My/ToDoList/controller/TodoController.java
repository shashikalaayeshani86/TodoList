package com.My.ToDoList.controller;

import com.My.ToDoList.model.ApiResponse;
import com.My.ToDoList.model.Todo;
import com.My.ToDoList.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping("/")
    public ApiResponse homeController(){
        ApiResponse response = new ApiResponse();
        response.setMessage("Welcome to Todo API");
        response.setStatus(true);
        return response;
    }



    @GetMapping("/todos")
    public List<Todo> getAllTodos(){
        return todoService.getAllTodos();
    }

    @PostMapping("/todos")
    public Todo createTodo(@RequestBody Todo todo){
        System.out.println("Received Todo: " + todo);
        return todoService.createTodo(todo);

    }

    @DeleteMapping("/todos/{id}")
    public ApiResponse deleteTodo(@PathVariable long id) throws Exception {
        todoService.deleteTodo(id);
        ApiResponse response = new ApiResponse();
        response.setMessage("Todo deleted successfully");
        response.setStatus(true);
        return response;
    }
}
