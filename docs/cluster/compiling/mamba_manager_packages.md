# Install packages with mamba

Must better than conda

## Centos 6.9 - Tachyon

GLIBC=2.12

### ASE

!!! note

    - higher python (>3.9.2) require newer GLIBC, and have many conflicts. avoid `--update-specs`
    - `ucx=1.14` does not recognize Infiniband, use `ucx=1.13`, check `ucx_info -d | grep Transport`. But infiniband may only work with ucx=1.9, and need to down openmpi=4.1.1. But gpaw conda only recognize openmpi=4.1.5, then may need `pip install` to install from source (need gcc, gxx,.. use gcc-11 to avoid requiring high GLIBC).
    - `libffi=3.3` to avoid higher GLIBC
    - system UCX=1.6 (not work),  zlib=1.2.11

**Install** in Conda-env

``` sh
module load forge/forge3
mamba create -y -n py11ase python=3.9   # now work with python 11, but create env with python 9
source activate py9ase

mamba clean --all -y
mamba install -y --revision 0
```

```sh
mamba install -y python=3.9 libffi=3.3 \
    ucx openmpi ase gpaw=23 # lammps


mamba install -y python=3.11 \
    ucx=1.9 openmpi=4.1.1 ase gpaw=23 # lammps

pip install git+https://gitlab.com/gpaw/gpaw.git@23.6.1
```

To see ucx transports:
```sh
ucx_info -d | grep Transport
mpirun --version
gpaw test
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


