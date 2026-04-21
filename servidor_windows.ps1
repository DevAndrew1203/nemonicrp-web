# Servidor Web Simples em PowerShell para NemonicRP
# Nao requer Node.js ou Python

$port = 3000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "====================================================" -ForegroundColor Yellow
    Write-Host "   SERVIDOR NEMONICRP ATIVO NO LOCALHOST:$port" -ForegroundColor Yellow
    Write-Host "====================================================" -ForegroundColor Yellow
    Write-Host "Link para abrir: http://localhost:$port" -ForegroundColor White
    Write-Host "Pressione CTRL+C para parar o servidor." -ForegroundColor DarkGray
    Write-Host "----------------------------------------------------"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/") { $urlPath = "/index.html" }
        
        # Caminho do arquivo relativo
        $filePath = Join-Path (Get-Location) ($urlPath.TrimStart('/'))

        if (Test-Path $filePath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            
            # Definir Content-Type basico
            if ($filePath.EndsWith(".html")) { $response.ContentType = "text/html" }
            elseif ($filePath.EndsWith(".css")) { $response.ContentType = "text/css" }
            elseif ($filePath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
            elseif ($filePath.EndsWith(".png")) { $response.ContentType = "image/png" }
            elseif ($filePath.EndsWith(".jpg") -or $filePath.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }

            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
            Write-Host "404 - Nao encontrado: $urlPath" -ForegroundColor Red
        }
        $response.Close()
    }
} catch {
    Write-Host "Erro ao iniciar o servidor: $_" -ForegroundColor Red
} finally {
    $listener.Stop()
}
