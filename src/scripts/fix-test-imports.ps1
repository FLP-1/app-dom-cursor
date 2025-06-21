# Script para automatizar a correção dos imports nos testes
# Autor: Claude
# Data: 2024-03-19

# Encontrar todos os arquivos de teste
$testFiles = Get-ChildItem -Path "src/tests" -Recurse -Filter "*.test.tsx"
$changes = @()

foreach ($file in $testFiles) {
    Write-Host "Processando $($file.FullName)..."

    # Verificar se o arquivo existe
    if (-not (Test-Path $file.FullName)) {
        Write-Host "Arquivo não encontrado: $($file.FullName)" -ForegroundColor Red
        continue
    }

    # Criar backup antes de modificar
    $backupPath = "$($file.FullName).bak"
    Copy-Item -Path $file.FullName -Destination $backupPath

    # Ler o conteúdo original do arquivo
    $originalContent = Get-Content -Path $file.FullName -Raw
    $content = $originalContent

    # Substituir imports relativos por aliases
    $content = $content -replace 'from ''\.\./\.\./components/', 'from ''@/components/'
    $content = $content -replace 'from ''\.\./\.\./hooks/', 'from ''@/hooks/'
    $content = $content -replace 'from ''\.\./\.\./services/', 'from ''@/services/'
    $content = $content -replace 'from ''\.\./\.\./utils/', 'from ''@/utils/'
    $content = $content -replace 'from ''\.\./\.\./lib/', 'from ''@/lib/'
    $content = $content -replace 'from ''\.\./\.\./types/', 'from ''@/types/'

    # Corrigir imports de componentes específicos
    $content = $content -replace 'from ''\.\./\.\./components/forms/', 'from ''@/components/forms/'
    $content = $content -replace 'from ''\.\./\.\./components/common/', 'from ''@/components/common/'

    # Corrigir imports de hooks específicos
    $content = $content -replace 'from ''\.\./\.\./hooks/forms/', 'from ''@/hooks/forms/'
    $content = $content -replace 'from ''\.\./\.\./hooks/use', 'from ''@/hooks/use'

    # Remover mocks de react-i18next
    $content = $content -replace 'jest\.mock\(''react-i18next''[^)]*\);', ''

    # Remover mocks de arquivos inexistentes
    $content = $content -replace 'jest\.mock\(''\.\./\.\./services/empregador\.service''\);', ''
    $content = $content -replace 'jest\.mock\(''\.\./\.\./services/cargo\.service''\);', ''
    $content = $content -replace 'jest\.mock\(''\.\./\.\./services/usuario\.service''\);', ''

    # Remover mocks duplicados
    $content = $content -replace '(jest\.mock\(''[^'']+''\);\s*){2,}', '$1'

    # Verificar se houve alterações
    if ($content -ne $originalContent) {
        $changes += "Modificações em $($file.FullName)"
        # Salvar o arquivo modificado
        $content | Set-Content -Path $file.FullName
    } else {
        # Se não houve alterações, remover o backup
        Remove-Item -Path $backupPath
    }
}

# Exibir resumo das alterações
Write-Host "`nResumo das alterações:" -ForegroundColor Green
foreach ($change in $changes) {
    Write-Host $change
}

Write-Host "`nProcessamento concluído!" -ForegroundColor Green 