---
sort: 42
---

# WSL

Windows Subsystem for Linux

Some conda packages are not available for Windows; therefore we in WSL. And VScode has an extension to work with WSL from Windows.

## Installation

### Enable BIOS & windows setting

- Enable [Virtual Techology in BIOS](https://www.sony-asia.com/electronics/support/articles/S500016173)
- Win Setting: `Control Panel` --> `Program` --> `Turn Windows features on or off` --> `Windows Subsystem for Linux`

May also need to update WSL2 Linux kernel, by download at [this link](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)

### Install Unbutu

open Powershell:

- See all available distro

    ```sh
    wsl --list --online
    ```

- Install

    ```sh
    wsl --install -d Ubuntu-22.04
    ```

## Usage

- Access Windows folder from WSL:

```sh
cd /mnt/d/folder
```

- delete folder 
```
rm -r folder`
```
- [Add/remove user](https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-ubuntu-20-04)
- Set [default user](https://superuser.com/questions/1566022/how-to-set-default-user-for-manually-installed-wsl-distro). In `cmd`
```
<distro>.exe config --default-user <username>

ubuntu2004.exe config --default-user tha
```

## Using VScode with WSL

The Visual Studio Code WSL extension lets you use the Windows Subsystem for Linux (WSL) as your full-time development environment right from VS Code. You can develop in a Linux-based environment, use Linux-specific toolchains and utilities, and run and debug your Linux-based applications all from the comfort of Windows.

![](https://code.visualstudio.com/assets/docs/remote/wsl/architecture-wsl.png)

**Install**

- Install VScode in Windows
- In VScode: install extension `WSL` (ms-vscode-remote.remote-wsl)
- Check WSL: open `cmd`, type `wsl`. If no linux distro --> install one
  - Search bar: ubuntu

### Open a remote folder or workspace

1. From the `WSL` terminal:
    - Navigate to a folder you'd like to open in VS Code: `cd /mnt/d/folder`
    - Type `code .`

2. Or from the VScode
Alternatively, you can open a WSL window directly from VS Code:
    - Press `F1`, select `WSL: New WSL Window`
    - Use the File menu to open your folder

???+ tip "See also"

    1. [Developing in WSL](https://code.visualstudio.com/docs/remote/wsl)
    2. [remote/wsl-tutorial](https://code.visualstudio.com/docs/remote/wsl-tutorial)

## Install conda in WSL

In WSL terminal `Ubuntu 22.04`

**Download**

```sh
cd /mnt/c/Users/thang/Downloads
wget https://repo.continuum.io/miniconda/Miniconda3-py39_4.12.0-Linux-x86_64.sh
```

**Install**

```sh
sh  Miniconda3-py39_4.12.0-Linux-x86_64.sh
```

choose dir: `/home/tha/app/miniconda3`

???+ tip "See also"

    [Install Anaconda on Windows Ubuntu Terminal](https://gist.github.com/kauffmanes/5e74916617f9993bc3479f401dfec7da)
