# Деплой на GitHub Pages: каталог в корень, сборка лендинга в /1/
# Использование: pwsh -File deploy.ps1
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

npm run build --prefix $root

$stage = Join-Path $env:TEMP 'nashedelo23-pages'
if (Test-Path $stage) { Remove-Item $stage -Recurse -Force }
New-Item -ItemType Directory -Force (Join-Path $stage '1') | Out-Null

Copy-Item (Join-Path $root 'catalog\index.html') $stage
Copy-Item (Join-Path $root 'dist\*') (Join-Path $stage '1') -Recurse

# Будущие варианты: класть готовые статические сборки в variants\2, variants\3, ...
$variantsDir = Join-Path $root 'variants'
if (Test-Path $variantsDir) {
  Get-ChildItem $variantsDir -Directory | ForEach-Object {
    Copy-Item $_.FullName $stage -Recurse
  }
}

Push-Location $stage
git init -b gh-pages | Out-Null
git add -A
git commit -m "Deploy to GitHub Pages" | Out-Null
git push -f https://github.com/Aresdolbi12/nashedelo23.git gh-pages
Pop-Location

Write-Host "OK: https://aresdolbi12.github.io/nashedelo23/"
