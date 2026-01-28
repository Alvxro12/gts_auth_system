-- =========================================
-- Schema for GTS Auth (PostgreSQL)
-- Based on: UserEntity + RoleEntity
-- Tables: users, roles, user_roles
-- =========================================

-- 1) ROLES
CREATE TABLE IF NOT EXISTS roles (
    id      BIGSERIAL PRIMARY KEY,
    name    VARCHAR(50) NOT NULL UNIQUE
);

-- 2) USERS
CREATE TABLE IF NOT EXISTS users (
    id             BIGSERIAL PRIMARY KEY,
    email          VARCHAR(190) NOT NULL UNIQUE,
    password_hash  VARCHAR(255) NOT NULL,
    is_active      BOOLEAN NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice extra (además del UNIQUE) útil para búsquedas por email
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 3) USER_ROLES (JoinTable)
CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,

    CONSTRAINT pk_user_roles PRIMARY KEY (user_id, role_id),

    CONSTRAINT fk_user_roles_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user_roles_role
        FOREIGN KEY (role_id) REFERENCES roles(id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON user_roles(role_id);

-- 4) Seed roles
INSERT INTO roles (name) VALUES ('USER')
ON CONFLICT (name) DO NOTHING;

INSERT INTO roles (name) VALUES ('ADMIN')
ON CONFLICT (name) DO NOTHING;
