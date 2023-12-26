package com.example.userservice.admin.service;

import com.example.userservice.admin.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


@Service
public class JwtService {

    // current time
    private final Date ISSUED_AT = new Date(System.currentTimeMillis());

    @Value("${jwt.expiration.refresh-token}")
    private long refreshTokenExpirationTimeInMs;

    @Value("${jwt.expiration.access-token}")
    private long accessTokenExpirationTimeInMs;


    @Value("${jwt.expiration.reset-password}")
    private long resetPasswordExpirationTimeInMs;

    @Value("${jwt.expiration.enable-account}")
    private long enableAccountExpirationTimeInMs;


    @Value("${jwt.secret-key}")
    private String SECRET_KEY;



    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }


    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }


    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }


    public Map<String, Object> getUserClaims(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole());
        claims.put("enabled", user.isEnabled());
        return claims;
    }


    public String generateToken(String username, long expirationTimeInMs) {
        final Date expirationDate = new Date(System.currentTimeMillis() + expirationTimeInMs);
        return Jwts
                .builder()
                .setSubject(username)
                .setIssuedAt(ISSUED_AT)
                .setExpiration(expirationDate) // set expiration date
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    public String generateRefreshToken(String username) {
        return generateToken(username, refreshTokenExpirationTimeInMs);
    }


    public String generateTokenForEnableAccount(String username) {
        return generateToken(username, enableAccountExpirationTimeInMs);
    }


    public String generateTokenForResetPassword(String username) {
        return generateToken(username, resetPasswordExpirationTimeInMs);
    }


    public String generateAccessToken(User user) {
        final Date accessTokenExpirationDate = new Date(System.currentTimeMillis() + accessTokenExpirationTimeInMs);

        return Jwts
                .builder()
                .setClaims(getUserClaims(user)) // add user claims
                .setSubject(user.getEmail())
                .setIssuedAt(ISSUED_AT)
                .setExpiration(accessTokenExpirationDate)
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }



    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }


    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }



    public Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    public Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
