-- ===========================================================================
-- Popup de la web (se administra en /admin/popup).
-- Ejecutar UNA vez en phpMyAdmin (Hostinger), en la misma BD de `articles`,
-- ANTES de publicar el cambio. Si la tabla no existe, la web no muestra popup.
--
-- Es una sola fila (id = 1). La fila inicial reproduce el aviso de seguridad que
-- hoy está en la home: activo, 3 segundos, solo en la home.
-- ===========================================================================

CREATE TABLE IF NOT EXISTS `popup` (
  `id`           TINYINT UNSIGNED NOT NULL,
  `activo`       TINYINT(1)    NOT NULL DEFAULT 0,
  `image_url`    VARCHAR(500)  NULL,
  `alt_text`     VARCHAR(500)  NULL,            -- texto alternativo (accesibilidad / lectores de pantalla)
  `duracion_ms`  INT UNSIGNED  NOT NULL DEFAULT 3000, -- 0 = no se cierra solo
  `paginas`      TEXT          NOT NULL,        -- JSON: ["/", "/nosotros", "/articulos/*"] o ["*"]
  `updated_at`   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO `popup` (`id`, `activo`, `image_url`, `alt_text`, `duracion_ms`, `paginas`)
VALUES (
  1, 1, '/anuncio-seguridad.png',
  'Aviso: PrestaClub no solicita pagos a cuentas personales, Yape o Plin. Todo pago es únicamente a cuentas oficiales de PRESTACLUB S.A.C. Consultas al 202-1500.',
  3000, '["/"]'
);
