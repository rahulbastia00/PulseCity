package com.hack.exceptions;

public class UserNotFound extends RuntimeException {
	
	public UserNotFound(String message) {
		super(message);
	}
	public UserNotFound() {
		super("Please Logged in to get your profile!!!!");
	}

}
