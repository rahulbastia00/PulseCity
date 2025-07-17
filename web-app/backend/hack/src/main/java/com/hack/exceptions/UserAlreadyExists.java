package com.hack.exceptions;

public class UserAlreadyExists extends RuntimeException{
	
	public UserAlreadyExists(String message){
		super(message);
	}
	public UserAlreadyExists() {
		super("User already exists");
	}
}
