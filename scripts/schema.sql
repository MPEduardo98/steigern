-- scripts/schema.sql
-- Esquema base del portal STEIGERN.
-- Reconstruido a partir de las consultas en app/api/** y auth.ts.
-- Ejecutar una sola vez sobre la base ya creada (no incluye CREATE DATABASE).

SET NAMES utf8mb4;

-- ── Catálogos ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS departamentos (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre     VARCHAR(120) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_departamentos_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS categorias_proveedor (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre     VARCHAR(120) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categorias_proveedor_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Empleados ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS empleados (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  numero_empleado VARCHAR(40)  NOT NULL,
  nombre          VARCHAR(120) NOT NULL,
  apellidos       VARCHAR(120) NOT NULL,
  email           VARCHAR(190) NOT NULL,
  telefono        VARCHAR(40)      NULL,
  puesto          VARCHAR(120) NOT NULL,
  departamento_id INT UNSIGNED     NULL,
  fecha_ingreso   DATE         NOT NULL,
  salario         DECIMAL(12,2)    NULL,
  activo          TINYINT(1)   NOT NULL DEFAULT 1,
  avatar_url      VARCHAR(500)     NULL,
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_empleados_numero (numero_empleado),
  UNIQUE KEY uq_empleados_email (email),
  KEY idx_empleados_departamento (departamento_id),
  KEY idx_empleados_activo (activo),
  CONSTRAINT fk_empleados_departamento
    FOREIGN KEY (departamento_id) REFERENCES departamentos (id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Proveedores ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS proveedores (
  id               INT UNSIGNED NOT NULL AUTO_INCREMENT,
  codigo_proveedor VARCHAR(40)  NOT NULL,
  razon_social     VARCHAR(190) NOT NULL,
  nombre_comercial VARCHAR(190)     NULL,
  rfc              VARCHAR(20)      NULL,
  pais             VARCHAR(80)  NOT NULL DEFAULT 'México',
  estado           VARCHAR(80)      NULL,
  ciudad           VARCHAR(80)      NULL,
  direccion        VARCHAR(300)     NULL,
  codigo_postal    VARCHAR(12)      NULL,
  sitio_web        VARCHAR(300)     NULL,
  categoria_id     INT UNSIGNED     NULL,
  estatus          ENUM('activo','inactivo','en_revision','bloqueado')
                                NOT NULL DEFAULT 'en_revision',
  calificacion     DECIMAL(3,1)     NULL,
  notas            TEXT             NULL,
  created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_proveedores_codigo (codigo_proveedor),
  UNIQUE KEY uq_proveedores_rfc (rfc),
  KEY idx_proveedores_categoria (categoria_id),
  KEY idx_proveedores_estatus (estatus),
  CONSTRAINT fk_proveedores_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias_proveedor (id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contactos_proveedor (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  proveedor_id  INT UNSIGNED NOT NULL,
  nombre        VARCHAR(190) NOT NULL,
  puesto        VARCHAR(120)     NULL,
  email         VARCHAR(190)     NULL,
  telefono      VARCHAR(40)      NULL,
  es_principal  TINYINT(1)   NOT NULL DEFAULT 0,
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_contactos_proveedor (proveedor_id),
  CONSTRAINT fk_contactos_proveedor
    FOREIGN KEY (proveedor_id) REFERENCES proveedores (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Cuentas del portal (login) ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS usuarios_portal (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email         VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  rol           ENUM('administrador','empleado') NOT NULL DEFAULT 'empleado',
  empleado_id   INT UNSIGNED     NULL,
  activo        TINYINT(1)   NOT NULL DEFAULT 1,
  ultimo_acceso DATETIME         NULL,
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_usuarios_portal_email (email),
  KEY idx_usuarios_portal_empleado (empleado_id),
  CONSTRAINT fk_usuarios_portal_empleado
    FOREIGN KEY (empleado_id) REFERENCES empleados (id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
