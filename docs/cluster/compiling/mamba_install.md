# Mamba

[doccumentation](https://mamba.readthedocs.io/en/latest/user_guide/mamba.html#mamba)

## Centos 6.8 (Tachyon)

```sh
cd /home1/p001cao/0SourceCode
wget https://github.com/conda-forge/miniforge/releases/download/23.3.1-0/Miniforge3-Linux-x86_64.sh

bash Miniforge3-Linux-x86_64.sh
```

choose a folder to install:
```sh
/home1/p001cao/app/miniforge3
```

**Module file**
``` tcl
set     topdir          /home1/p001cao/app/miniforge3
prepend-path    PATH                    $topdir/bin
prepend-path    LD_LIBRARY_PATH         $topdir/lib
prepend-path    INCLUDE                 $topdir/include
prepend-path    PKG_CONFIG_PATH 	    $topdir/lib/pkgconfig
```
and put this file into the folder:  `/home1/p001cao/app/1module_files/forge/forge3`