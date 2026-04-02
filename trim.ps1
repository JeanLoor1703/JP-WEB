$file = "css\styles.css"
$lines = Get-Content $file -Encoding UTF8
$keep = $lines[0..958]
Set-Content $file -Value $keep -Encoding UTF8
Write-Host "Done. Lines kept: $($keep.Count)"
