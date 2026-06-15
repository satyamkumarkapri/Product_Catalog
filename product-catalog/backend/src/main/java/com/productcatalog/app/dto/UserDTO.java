package com.productcatalog.app.dto;

public class UserDTO {
    private Long id;
    private String email;
    private String fullName;
    private Integer roleLevel;

    public UserDTO(Long id, String email, String fullName, Integer roleLevel) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.roleLevel = roleLevel;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public Integer getRoleLevel() { return roleLevel; }
    public void setRoleLevel(Integer roleLevel) { this.roleLevel = roleLevel; }
}
