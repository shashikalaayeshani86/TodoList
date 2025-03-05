package com.My.ToDoList.repository;

import com.My.ToDoList.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository <Todo, Long>{
}
