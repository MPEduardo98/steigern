-- scripts/migrations/002-gestion-usuarios.sql
-- Gestión de usuarios del panel: el administrador da de alta las cuentas
-- (no hay registro público). Se puede correr más de una vez. Aplicar con:
--   npx tsx scripts/run-sql.ts scripts/migrations/002-gestion-usuarios.sql

SET NAMES utf8mb4;

-- Columnas nuevas de usuarios_portal (MySQL no tiene ADD COLUMN IF NOT EXISTS,
-- por eso se revisa information_schema antes de alterar).
--   nombre                 Para cuentas sin empleado vinculado (p. ej. un socio o contador).
--   debe_cambiar_password  1 = la contraseña es temporal; al entrar se le pide cambiarla.
--   sesion_version         Se incrementa al desactivar, cambiar rol o contraseña:
--                          las sesiones abiertas con la versión anterior se cierran solas.
SET @falta := (SELECT COUNT(*) = 0 FROM information_schema.COLUMNS
                WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'usuarios_portal'
                  AND COLUMN_NAME = 'sesion_version');
SET @sql := IF(@falta,
  'ALTER TABLE usuarios_portal
     ADD COLUMN nombre                VARCHAR(160)     NULL AFTER email,
     ADD COLUMN debe_cambiar_password TINYINT(1)   NOT NULL DEFAULT 0 AFTER password_hash,
     ADD COLUMN sesion_version        INT UNSIGNED NOT NULL DEFAULT 0 AFTER debe_cambiar_password,
     ADD COLUMN password_cambiada_at  DATETIME         NULL AFTER sesion_version,
     ADD COLUMN created_by            INT UNSIGNED     NULL AFTER created_at,
     ADD COLUMN updated_at            TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_by',
  'DO 0');
PREPARE st FROM @sql; EXECUTE st; DEALLOCATE PREPARE st;

-- Un empleado tiene como máximo una cuenta (varios NULL sí se permiten).
SET @falta := (SELECT COUNT(*) = 0 FROM information_schema.STATISTICS
                WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'usuarios_portal'
                  AND INDEX_NAME = 'uq_usuarios_portal_empleado');
SET @sql := IF(@falta,
  'ALTER TABLE usuarios_portal ADD UNIQUE KEY uq_usuarios_portal_empleado (empleado_id)',
  'DO 0');
PREPARE st FROM @sql; EXECUTE st; DEALLOCATE PREPARE st;

-- Quién creó, cambió, desactivó o restableció cada cuenta. Solo se inserta.
CREATE TABLE IF NOT EXISTS usuarios_bitacora (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id  INT UNSIGNED NOT NULL,      -- la cuenta afectada
  actor_id    INT UNSIGNED     NULL,      -- quién hizo el cambio
  accion      ENUM('crear','editar','cambiar_rol','desactivar','reactivar',
                   'restablecer_password','cambiar_password') NOT NULL,
  detalle     VARCHAR(255)     NULL,
  ip          VARCHAR(45)      NULL,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_usuarios_bitacora_usuario (usuario_id, created_at),
  CONSTRAINT fk_usuarios_bitacora_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios_portal (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
