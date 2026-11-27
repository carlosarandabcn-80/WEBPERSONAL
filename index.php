<?php
declare(strict_types=1);

define('PORTFOLIO', true);
if (PHP_SAPI !== 'cli') {
    header('Content-Type: text/html; charset=UTF-8');
    header("Content-Security-Policy: default-src 'self'; base-uri 'none'; frame-ancestors 'none'; object-src 'none'; form-action 'none'");
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('X-Frame-Options: DENY');
    header('Permissions-Policy: camera=(), microphone=(), geolocation=()');
}
require __DIR__ . '/plantillas/cabecera.php';
?>
<main id="main" tabindex="-1">
<?php
require __DIR__ . '/plantillas/portada.php';
require __DIR__ . '/plantillas/secciones.php';
?>
</main>
<?php require __DIR__ . '/plantillas/pie.php'; ?>

