$path = Split-Path -Parent $MyInvocation.MyCommand.Path

Start-Process powershell.exe -ArgumentList "-Command", "taskkill /IM node.exe /T /F"

Start-Process powershell.exe -WorkingDirectory $path -ArgumentList "-Command", 'npx nodemon --exec "node --env-file=.env --import=tsx" .\server.ts'
Start-Process powershell.exe -WorkingDirectory $path -ArgumentList "-Command", "npx vite"