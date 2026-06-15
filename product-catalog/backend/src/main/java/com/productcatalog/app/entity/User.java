package com.productcatalog.app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String password;

    @Column(name = "role_level", nullable = false)
    private Integer roleLevel;

    @Column(name = "address")
    private String address;

    public User() {}

    public User(String email, String fullName, String password, Integer roleLevel) {
        this.email = email;
        this.fullName = fullName;
        this.password = password;
        this.roleLevel = roleLevel;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Integer getRoleLevel() { return roleLevel; }
    public void setRoleLevel(Integer roleLevel) { this.roleLevel = roleLevel; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
