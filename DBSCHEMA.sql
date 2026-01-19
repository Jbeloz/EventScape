CREATE DATABASE EventScape;

USE EventScape;

CREATE TABLE users (
	user_id 			INT AUTO_INCREMENT PRIMARY KEY,
	email 				VARCHAR(255) NOT NULL UNIQUE,
	password_hash 		VARCHAR(255) NOT NULL,
	first_name 			VARCHAR(100) NOT NULL,
	last_name 			VARCHAR(100) NOT NULL,
	contact_number 		VARCHAR(20) NOT NULL,
	user_role 			ENUM ('customer', 'event_organizer', 'coordinator', 'venue_administrator', 'admin') NOT NULL DEFAULT 'customer',
	is_active 			TINYINT(1) NOT NULL DEFAULT 1,
	created_at 			TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at 			TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX index_user_role (user_role)
);

CREATE TABLE user_photos (
    user_id         	INT NOT NULL PRIMARY KEY,
    file_name 			VARCHAR(255) NOT NULL,
    file_url 			VARCHAR(500) NOT NULL,
    uploaded_at     	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at 			TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE event_organizers (
    organizer_id 		INT AUTO_INCREMENT PRIMARY KEY,
    user_id 			INT NOT NULL UNIQUE,
    created_at 			TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE coordinators (
    coordinator_id 		INT AUTO_INCREMENT PRIMARY KEY,
    user_id 			INT NOT NULL,
    organizer_id 		INT NOT NULL,
    created_at 			TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (organizer_id) REFERENCES event_organizers(organizer_id) ON DELETE CASCADE
);

CREATE TABLE venue_administrators (
    venue_admin_id 		INT AUTO_INCREMENT PRIMARY KEY,
    user_id 			INT NOT NULL UNIQUE,
    created_at 			TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE otp (
    otp_id 				INT AUTO_INCREMENT PRIMARY KEY,
    user_id 			INT NOT NULL,
    otp_code_hash 		CHAR(64) NOT NULL,
    otp_expiry 			DATETIME NOT NULL,
    otp_used_at 		DATETIME DEFAULT NULL,
    otp_attempts 		INT DEFAULT 0,
    last_otp_sent 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at 			TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_otp (user_id, otp_code_hash),
    INDEX index_user_id (user_id)
);

CREATE TABLE password_reset (
    reset_id 			INT AUTO_INCREMENT PRIMARY KEY,
    user_id 			INT NOT NULL,
    reset_token_hash 	CHAR(64) NOT NULL,
    expires_at 			DATETIME NOT NULL,
    used_at 			DATETIME DEFAULT NULL,
    last_token_sent 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at 			TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX index_expires_at (expires_at),
    INDEX index_user_id (user_id)
);

CREATE TABLE email_verification (
    verification_id 	INT AUTO_INCREMENT PRIMARY KEY,
    user_id 			INT NOT NULL,
    email_token_hash 	CHAR(64) NOT NULL,
    expires_at 			DATETIME NOT NULL,
    is_verified 		TINYINT(1) DEFAULT 0,
    verified_at 		DATETIME DEFAULT NULL,
    last_token_sent 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at 			TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX index_user_id (user_id)
);