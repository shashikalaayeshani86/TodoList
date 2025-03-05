package com.My.ToDoList.service;

import com.My.ToDoList.model.Todo;

import java.util.List;

public interface TodoService {

    List<Todo> getAllTodos();

    Todo createTodo(Todo todo);

    void deleteTodo(Long id) throws Exception;

}
