package com.hack.auth;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class FirebaseTokenFilter extends OncePerRequestFilter{

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		 String header = request.getHeader("Authorization");

	        if (header == null || !header.startsWith("Bearer ")) {
	            filterChain.doFilter(request, response);
	            return;
	        }

	        String idToken = header.substring(7);
	        FirebaseToken decodedToken;
	        try {
	            decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
	            String role = (String) decodedToken.getClaims().get("role");

	            List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

	            Authentication auth = new UsernamePasswordAuthenticationToken(
	                decodedToken.getUid(), null, authorities);

	            SecurityContextHolder.getContext().setAuthentication(auth);

	        } catch (FirebaseAuthException e) {
	            response.setStatus(HttpStatus.UNAUTHORIZED.value());
	            return;
	        }

	        filterChain.doFilter(request, response);

		
	}

}
