package com.productcatalog.app.service;

import com.productcatalog.app.dto.TaskDTO;
import com.productcatalog.app.entity.Task;
import com.productcatalog.app.entity.User;
import com.productcatalog.app.repository.TaskRepository;
import com.productcatalog.app.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<TaskDTO> getTasksForManager(Long managerId) {
        return taskRepository.findByAssignedToId(managerId).stream().map(this::toDto).collect(Collectors.toList());
    }

    public TaskDTO createTask(TaskDTO taskDTO, String adminEmail) {
        User admin = userRepository.findByEmail(adminEmail).orElseThrow();
        User manager = userRepository.findById(taskDTO.getAssignedToId()).orElseThrow();

        Task task = new Task();
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setAssignedTo(manager);
        task.setAssignedBy(admin);
        task.setStatus("PENDING");
        task.setCreatedAt(LocalDateTime.now());

        Task savedTask = taskRepository.save(task);
        return toDto(savedTask);
    }

    public TaskDTO updateTaskStatus(Long taskId, String status) {
        Task task = taskRepository.findById(taskId).orElseThrow();
        task.setStatus(status);
        Task updatedTask = taskRepository.save(task);
        return toDto(updatedTask);
    }

    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }

    private TaskDTO toDto(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setAssignedToId(task.getAssignedTo().getId());
        dto.setAssignedToName(task.getAssignedTo().getFullName());
        dto.setAssignedById(task.getAssignedBy().getId());
        dto.setAssignedByName(task.getAssignedBy().getFullName());
        dto.setStatus(task.getStatus());
        dto.setCreatedAt(task.getCreatedAt());
        return dto;
    }
}
