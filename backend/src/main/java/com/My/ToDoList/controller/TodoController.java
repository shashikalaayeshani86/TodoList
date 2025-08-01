package com.My.ToDoList.controller;

import com.My.ToDoList.model.ApiResponse;
import com.My.ToDoList.model.Todo;
import com.My.ToDoList.repository.TodoRepository;
import com.My.ToDoList.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "${frontend.url}")
@RequestMapping("/api")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @Autowired
    private TodoRepository todoRepository;

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

    @PutMapping("/todos/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);
        if (!optionalTodo.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Todo existingTodo = optionalTodo.get();
        existingTodo.setTitle(todo.getTitle());
        Todo updatedTodo = todoRepository.save(existingTodo);
        return ResponseEntity.ok(updatedTodo);
    }



}
