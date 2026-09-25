$path = Split-Path -Parent $MyInvocation.MyCommand.Path

Start-Process powershell.exe -WorkingDirectory $path -ArgumentList "-Command", "npx nodemon --exec tsx .\server.ts"
Start-Process powershell.exe -WorkingDirectory $path -ArgumentList "-Command", "npx vite"