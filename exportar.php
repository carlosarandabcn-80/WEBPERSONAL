<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}
ob_start();
require __DIR__ . '/index.php';
$html = ob_get_clean();
if (!$html || strpos($html, '</html>') === false) {
    throw new RuntimeException('La página generada está incompleta.');
}
$temporal = tempnam(__DIR__, 'export-');
if ($temporal === false) {
    throw new RuntimeException('No se pudo crear el archivo temporal.');
}
try {
    if (file_put_contents($temporal, $html) !== strlen($html) ||
        !rename($temporal, __DIR__ . '/index.html')) {
        throw new RuntimeException('No se pudo guardar index.html.');
    }
} finally {
    if (is_file($temporal)) {
        unlink($temporal);
    }
}

