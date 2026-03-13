$htmlFiles = Get-ChildItem -Path d:\modren -Filter *.html

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

    # 1. Replace the specific phrases first
    $content = $content -replace 'مطابخ مودرن – تصميم وتنفيذ المطابخ العصرية', 'تفصيل مطابخ بالرياض- أتقان تفصيل المطابخ العصرية'
    $content = $content -replace 'مطابخ مودرن - تصميم وتنفيذ المطابخ العصرية', 'تفصيل مطابخ بالرياض- أتقان تفصيل المطابخ العصرية'

    # 2. Add phone floating icon BEFORE whatsapp float
    # We look for the exact comment: <!-- Floating WhatsApp Button -->
    $phoneFloat = @"
    <!-- Floating Call Button -->
    <a href="tel:+966558459841" class="call-float" aria-label="اتصل بنا">
        <i class="fas fa-phone-alt"></i>
    </a>

"@
    if ($content -notmatch 'call-float') {
        $content = $content -replace '(?s)(<!-- Floating WhatsApp Button -->)', "`$phoneFloat`$1"
    }

    # 3. Replace brand name "مودرن" with "إتقان" (Etqan instead of Modern)
    $content = $content -replace 'مودرن', 'إتقان'

    # 4. Logo replace
    $content = $content -replace 'assets/logo.svg', 'assets/logo.png'

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}

Write-Host "Replaced all text and added floating icons in HTML files."
