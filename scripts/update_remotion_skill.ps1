$uri = 'https://raw.githubusercontent.com/remotion-dev/remotion/main/packages/skills/skills/remotion/SKILL.md'
$out = 'remotion_remote_SKILL.md'
Write-Host "Downloading $uri ..."
Invoke-WebRequest -Uri $uri -OutFile $out
Write-Host "Saved to $out"
