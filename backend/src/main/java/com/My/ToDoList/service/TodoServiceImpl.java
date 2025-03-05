package com.My.ToDoList.service;

import com.My.ToDoList.model.Todo;
import com.My.ToDoList.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TodoServiceImpl implements TodoService{

    @Autowired
    private TodoRepository todoRepository;

    @Override
    public List<Todo> getAllTodos() {
        return  todoRepository.findAll();
    }

    @Override
    public Todo createTodo(Todo todo) {
        System.out.println("Received Todo: " + todo);
        return todoRepository.save(todo);
    }

    @Override
    @Transactional
    public void deleteTodo(Long id) throws Exception {
        Todo todo = todoRepository.findById(id).orElseThrow(()->new Exception("Todo not exists"));
        todoRepository.delete(todo);
    }
}
