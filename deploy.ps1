# Деплой на GitHub Pages: vite MPA собирает каталог (корень) и варианты (/1/, /2/, ...)
# Использование: pwsh -File deploy.ps1
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

npm run build --prefix $root

$dist = Join-Path $root 'dist'
New-Item -ItemType File -Force (Join-Path $dist '.nojekyll') | Out-Null

# GitHub Pages — каталог черновиков для заказчика, НЕ для поиска:
# noindex на каждую страницу, чтобы черновики не обгоняли боевой домен.
# Вставляется только в dist (исходники чистые — прод-сборка reg.ru индексируется).
Get-ChildItem $dist -Recurse -Filter 'index.html' | ForEach-Object {
    $html = Get-Content $_.FullName -Raw
    if ($html -notmatch 'name="robots"') {
        $html = $html -replace '<head>', "<head>`n    <meta name=`"robots`" content=`"noindex, nofollow`" />"
        Set-Content $_.FullName $html -NoNewline
    }
}

Push-Location $dist
git init -b gh-pages | Out-Null
git add -A
git commit -m "Deploy to GitHub Pages" | Out-Null
git push -f https://github.com/Aresdolbi12/nashedelo23.git gh-pages
$pushFailed = $LASTEXITCODE -ne 0
Pop-Location
Remove-Item (Join-Path $dist '.git') -Recurse -Force

if ($pushFailed) {
    Write-Error "Push в gh-pages НЕ прошёл (сеть/авторизация) — сайт не обновлён, повтори деплой."
}
Write-Host "OK: https://aresdolbi12.github.io/nashedelo23/"
