# Install packages with mamba

Must better than conda

## Centos 6.9 - Tachyon

GLIBC=2.12

### GPAW

!!! note

    - gpaw require py>=3.9
    - py=3.11 require libgcc-ng>=12, require GLIBC=2.17
    - `ucx=1.14` does not recognize Infiniband, use `ucx=1.13`, check `ucx_info -d | grep Transport`. But infiniband may only work with ucx=1.9, and need to down openmpi=4.1.1. But gpaw conda only recognize openmpi=4.1.5, then may need `pip install` to install from source (need gcc, gxx,.. use gcc-11 to avoid requiring high GLIBC).
    - `libffi=3.3 libgcc-ng=12 libstdcxx-ng=12 libgfortran-ng=12 ` to avoid higher GLIBC
    - `sysroot_linux-64=2.12` libzlib=1.2.11

**Install** in Conda-env

Python 9:
!!! note

    numpy>1.22.3, require GLIBC=2.14

```sh
module load forge/forge3
mamba create -y -n py9ase python=3.9.0  # version 0 not work in mamba, so create new env
source activate py9ase
mamba clean -a -y

mamba install -y python=3.9.0 numpy=1.21.0 gpaw=23  # lammps  ; this also install openmpi
```

Python 11: not work, require GLIBC=2.17
```sh
mamba create -y -n py11ase python=3.11.0
source activate py11ase

mamba install -y python=3.11 gpaw=23
```

To see ucx transports:
```sh
gpaw test
mpirun --version
ucx_info -d | grep Transport
```

other option
``` sh
pip install git+https://gitlab.com/gpaw/gpaw.git@master  # @23.6.1  @master

-c rapidsai-nightly librdmacm-devel-cos7-x86_64
-c lcls-ii rdma-core
rdma-core-devel-cos7-x86_64 numactl
gfortran=12 libgfortran-ng=12 gcc=13 gxx=13 libgcc-ng=13 libstdcxx-ng=13
export PATH=/dev/infiniband:$PATH         # rdma driver
```

**Create a module file** for GPAW

``` tcl
set     topdir          /home1/p001cao/app/miniconda3/envs/py9ase

prepend-path    PATH                $topdir/bin
prepend-path    INCLUDE             $topdir/include
prepend-path    LD_LIBRARY_PATH     $topdir/lib
prepend-path    PKG_CONFIG_PATH     $topdir/lib/pkgconfig
prepend-path    GPAW_SETUP_PATH     $topdir/share/gpaw      # to see GPAW dataset
```


