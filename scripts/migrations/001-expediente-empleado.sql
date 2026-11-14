-- scripts/migrations/001-expediente-empleado.sql
-- Expediente del empleado: datos legales, documentos, contratos y bitácora.
-- Se puede correr más de una vez (IF NOT EXISTS). Aplicar con:
--   npx tsx scripts/run-sql.ts scripts/migrations/001-expediente-empleado.sql

SET NAMES utf8mb4;

-- Datos legales en su propia tabla (1 a 1 con empleados): así las consultas de
-- la lista nunca los traen por accidente y es fácil restringir quién los lee.
CREATE TABLE IF NOT EXISTS empleados_datos_legales (
  empleado_id           INT UNSIGNED NOT NULL,
  curp                  CHAR(18)         NULL,
  rfc                   CHAR(13)         NULL,
  nss                   CHAR(11)         NULL,
  -- Fecha de nacimiento y sexo salen de la CURP; se guardan para consultas.
  fecha_nacimiento      DATE             NULL,
  sexo                  ENUM('H','M','X') NULL,
  estado_civil          ENUM('soltero','casado','union_libre','divorciado','viudo') NULL,
  nacionalidad          VARCHAR(60)      NULL,
  calle                 VARCHAR(160)     NULL,
  numero_exterior       VARCHAR(20)      NULL,
  numero_interior       VARCHAR(20)      NULL,
  colonia               VARCHAR(120)     NULL,
  municipio             VARCHAR(120)     NULL,
  estado                VARCHAR(80)      NULL,
  codigo_postal         CHAR(5)          NULL,
  emergencia_nombre     VARCHAR(160)     NULL,
  emergencia_parentesco VARCHAR(60)      NULL,
  emergencia_telefono   VARCHAR(40)      NULL,
  -- El banco se deduce de los 3 primeros dígitos de la CLABE.
  clabe                 CHAR(18)         NULL,
  credito_infonavit     VARCHAR(20)      NULL,
  credito_fonacot       VARCHAR(20)      NULL,
  updated_at            TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by            INT UNSIGNED     NULL,
  PRIMARY KEY (empleado_id),
  UNIQUE KEY uq_datos_legales_curp (curp),
  UNIQUE KEY uq_datos_legales_rfc (rfc),
  UNIQUE KEY uq_datos_legales_nss (nss),
  CONSTRAINT fk_datos_legales_empleado
    FOREIGN KEY (empleado_id) REFERENCES empleados (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Archivos del expediente. El archivo vive fuera de /public (EXPEDIENTES_DIR);
-- aquí solo se guarda su nombre interno. Quitar un documento no lo borra:
-- se marca `eliminado_at` y deja de mostrarse.
CREATE TABLE IF NOT EXISTS empleado_documentos (
  id                INT UNSIGNED NOT NULL AUTO_INCREMENT,
  empleado_id       INT UNSIGNED NOT NULL,
  tipo              VARCHAR(40)  NOT NULL,
  archivo           VARCHAR(80)  NOT NULL,
  nombre_original   VARCHAR(255) NOT NULL,
  mime              VARCHAR(80)  NOT NULL,
  tamano            INT UNSIGNED NOT NULL,
  fecha_vencimiento DATE             NULL,
  notas             VARCHAR(300)     NULL,
  subido_por        INT UNSIGNED     NULL,
  created_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  eliminado_at      DATETIME         NULL,
  eliminado_por     INT UNSIGNED     NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_empleado_documentos_archivo (archivo),
  KEY idx_empleado_documentos_empleado (empleado_id, eliminado_at),
  KEY idx_empleado_documentos_vencimiento (fecha_vencimiento),
  CONSTRAINT fk_empleado_documentos_empleado
    FOREIGN KEY (empleado_id) REFERENCES empleados (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Historial de contratos (alta, renovaciones, cambios de condiciones).
CREATE TABLE IF NOT EXISTS empleado_contratos (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  empleado_id     INT UNSIGNED NOT NULL,
  tipo            ENUM('indeterminado','determinado','obra','prueba','capacitacion') NOT NULL,
  fecha_inicio    DATE          NOT NULL,
  fecha_fin       DATE              NULL,
  jornada         ENUM('diurna','nocturna','mixta') NOT NULL DEFAULT 'diurna',
  salario_diario  DECIMAL(10,2)     NULL,
  sdi             DECIMAL(10,2)     NULL,
  documento_id    INT UNSIGNED      NULL,
  notas           VARCHAR(300)      NULL,
  created_by      INT UNSIGNED      NULL,
  created_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_empleado_contratos_empleado (empleado_id, fecha_inicio),
  KEY idx_empleado_contratos_fin (fecha_fin),
  CONSTRAINT fk_empleado_contratos_empleado
    FOREIGN KEY (empleado_id) REFERENCES empleados (id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_empleado_contratos_documento
    FOREIGN KEY (documento_id) REFERENCES empleado_documentos (id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Quién vio, descargó o cambió algo del expediente. Solo se inserta.
CREATE TABLE IF NOT EXISTS expediente_bitacora (
  id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  empleado_id  INT UNSIGNED NOT NULL,
  usuario_id   INT UNSIGNED     NULL,
  accion       ENUM('ver_datos','editar_datos','subir_documento','descargar_documento',
                    'quitar_documento','registrar_contrato') NOT NULL,
  detalle      VARCHAR(255)     NULL,
  ip           VARCHAR(45)      NULL,
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_expediente_bitacora_empleado (empleado_id, created_at),
  CONSTRAINT fk_expediente_bitacora_empleado
    FOREIGN KEY (empleado_id) REFERENCES empleados (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
