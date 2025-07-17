package com.hack.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	
    private String name;
    private String email;
    private String password;
    private String role;
    private String location;
    private boolean verifiedReporter;

}
