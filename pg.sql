CREATE TABLE "User"(
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE(email)
);

CREATE TABLE "Message"(
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_email VARCHAR(255) NOT NULL,
    msg VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "StaticContent"(
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    string_name VARCHAR(255) NOT NULL,
    title VARCHAR(50) NOT NULL,
    msg VARCHAR(1000) NOT NULL,
    content_type VARCHAR(50) NOT NULL
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";