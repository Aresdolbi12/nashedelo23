# Деплой на GitHub Pages: vite MPA собирает каталог (корень) и варианты (/1/, /2/, ...)
# Использование: pwsh -File deploy.ps1
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

npm run build --prefix $root

$dist = Join-Path $root 'dist'
New-Item -ItemType File -Force (Join-Path $dist '.nojekyll') | Out-Null

Push-Location $dist
git init -b gh-pages | Out-Null
git add -A
git commit -m "Deploy to GitHub Pages" | Out-Null
git push -f https://github.com/Aresdolbi12/nashedelo23.git gh-pages
Pop-Location
Remove-Item (Join-Path $dist '.git') -Recurse -Force

Write-Host "OK: https://aresdolbi12.github.io/nashedelo23/"
