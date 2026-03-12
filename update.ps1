$files = Get-ChildItem -Path d:\modren -Filter *.html

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Phone number updates
    $content = $content -replace '\+966500000000', '+966558459841'
    $content = $content -replace '\+966 50 000 0000', '+966 55 845 9841'
    
    # Social links with aria-label (handles multiline spacing)
    $content = $content -replace '<a href="#" class="footer__social-link" aria-label="فيسبوك">\s*<i\s+class="fab fa-facebook-f"></i></a>', '<a href="https://www.facebook.com/share/1DR1Y94ePt/" class="footer__social-link" aria-label="فيسبوك" target="_blank"><i class="fab fa-facebook-f"></i></a>'
    
    $content = $content -replace '<a href="#" class="footer__social-link" aria-label="انستقرام">\s*<i\s+class="fab fa-instagram"></i></a>', '<a href="https://www.instagram.com/cheetah.295295?igsh=aTEyNHp6MndlN3J6" class="footer__social-link" aria-label="انستقرام" target="_blank"><i class="fab fa-instagram"></i></a>'
    
    $content = $content -replace '<a href="#" class="footer__social-link" aria-label="تيك توك">\s*<i\s+class="fab fa-tiktok"></i></a>', '<a href="https://www.tiktok.com/@user1699991954633" class="footer__social-link" aria-label="تيك توك" target="_blank"><i class="fab fa-tiktok"></i></a>'
    
    $content = $content -replace '<a href="#" class="footer__social-link" aria-label="يوتيوب">\s*<i\s+class="fab fa-youtube"></i></a>', '<a href="https://www.snapchat.com/add/bwrknlhmyqny26?share_id=SF7u6Dhm6Oc&locale=ar-EG-u-nu-latn" class="footer__social-link" aria-label="سناب شات" target="_blank"><i class="fab fa-snapchat"></i></a>'

    # Social links without aria-label (contact.html, blog.html)
    $content = $content -replace '<a href="#" class="footer__social-link">\s*<i\s+class="fab fa-facebook-f"></i></a>', '<a href="https://www.facebook.com/share/1DR1Y94ePt/" class="footer__social-link" target="_blank"><i class="fab fa-facebook-f"></i></a>'
    
    $content = $content -replace '<a href="#" class="footer__social-link">\s*<i\s+class="fab fa-instagram"></i></a>', '<a href="https://www.instagram.com/cheetah.295295?igsh=aTEyNHp6MndlN3J6" class="footer__social-link" target="_blank"><i class="fab fa-instagram"></i></a>'
    
    $content = $content -replace '<a href="#" class="footer__social-link">\s*<i\s+class="fab fa-tiktok"></i></a>', '<a href="https://www.tiktok.com/@user1699991954633" class="footer__social-link" target="_blank"><i class="fab fa-tiktok"></i></a>'
    
    $content = $content -replace '<a href="#" class="footer__social-link">\s*<i\s+class="fab fa-youtube"></i></a>', '<a href="https://www.snapchat.com/add/bwrknlhmyqny26?share_id=SF7u6Dhm6Oc&locale=ar-EG-u-nu-latn" class="footer__social-link" target="_blank"><i class="fab fa-snapchat"></i></a>'

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}
Write-Host "Replacements completed successfully."
