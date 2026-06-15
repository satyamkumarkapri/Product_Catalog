package com.productcatalog.app.mongo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class MongoUser {

    @Id
    private String id;
    
    private Long pgUserId;
    private String email;
    private String fullName;
    private String address;
    private String password;

    public MongoUser() {}

    public MongoUser(Long pgUserId, String email, String fullName, String address, String password) {
        this.pgUserId = pgUserId;
        this.email = email;
        this.fullName = fullName;
        this.address = address;
        this.password = password;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Long getPgUserId() { return pgUserId; }
    public void setPgUserId(Long pgUserId) { this.pgUserId = pgUserId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
