-- ===========================================================================
-- Libro de Reclamaciones virtual de PRESTACLUB S.A.C.
-- (Ley N.° 29571 y D.S. 011-2011-PCM, modificado por D.S. 101-2022-PCM)
-- Ejecutar UNA vez en phpMyAdmin (Hostinger), en la misma BD de `articles`,
-- ANTES de publicar la página.
-- ===========================================================================

CREATE TABLE IF NOT EXISTS `reclamaciones` (
  `id`                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `codigo`            VARCHAR(30)  NULL,                       -- R-AAAAMMDD-000001
  `fecha`             DATETIME     NOT NULL,                   -- hora de Lima

  -- Consumidor
  `con_nombre`        VARCHAR(200) NOT NULL,
  `con_doc_tipo`      VARCHAR(30)  NOT NULL,
  `con_doc_num`       VARCHAR(20)  NOT NULL,
  `con_domicilio`     VARCHAR(300) NULL,
  `con_telefono`      VARCHAR(30)  NULL,
  `con_email`         VARCHAR(200) NULL,
  `con_menor`         TINYINT(1)   NOT NULL DEFAULT 0,
  `apo_nombre`        VARCHAR(200) NULL,
  `medio_respuesta`   ENUM('correo','carta') NOT NULL,

  -- Bien contratado
  `bien_tipo`         ENUM('producto','servicio') NOT NULL DEFAULT 'servicio',
  `bien_producto`     VARCHAR(100) NULL,
  `bien_monto`        DECIMAL(12,2) NULL,
  `bien_descripcion`  VARCHAR(500) NULL,
  `oficina`           VARCHAR(100) NULL,

  -- Detalle
  `tipo`              ENUM('reclamo','queja') NOT NULL,
  `detalle`           TEXT NOT NULL,
  `pedido`            TEXT NULL,

  -- Atención del proveedor
  `estado`            ENUM('pendiente','atendido') NOT NULL DEFAULT 'pendiente',
  `respuesta`         TEXT NULL,
  `fecha_respuesta`   DATETIME NULL,
  `created_at`        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_reclamaciones_codigo` (`codigo`),
  KEY `idx_reclamaciones_estado` (`estado`, `fecha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
