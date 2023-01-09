---
sort: 42
---

# WSL 

Windows Subsystem for Linux

## Enable BIOS & windows setting
- Enable Virtual Techology in BIOS
- Win Setting: `Control Panel` --> `Program` --> `Turn Windows features on or off` --> `Windows Subsystem for Linux`

## Install Unbutu

open Powershell:
```
wsl --list --online
wsl --install -d openSUSE-42
wsl --install -d SLES-12
```

## Use
- Access a folder: 
```
cd /mnt/d/folder
```

## Using VScode with WSL

- In VScode: install extension `WSL` (ms-vscode-remote.remote-wsl)
- Check WSL: open `cmd`, type `wsl`. If no linux distro --> install one
  - Search bar: ubuntu




``` tip "See also"
https://code.visualstudio.com/docs/remote/wsl-tutorial
```
