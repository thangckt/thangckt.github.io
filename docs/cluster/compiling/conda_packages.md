# Install packages with conda

This way may eliminate some work on installing dependencies

???+ note

    - Consider `clang` compiler. 
    - Should in all packages available in `conda-forge`
    - Don't use `mamba`, will cause the crash
    - Some packages require GLIBC=2.17.
        - May solve by installing `libgcc-ng=12` + `zlib=1.2.11`
    - Remember `ucx` and `openmp` for `openmpi`
        - `libstdcxx-ng` is required for `openmp`
        - `libgfortran-ng` is required for `openmpi`
        - `libibverbs-cos6-x86_64` is required for infiniBand
    - `openmpi>4.1.2` have a path problem (error `mpirun` not found). So avoid installing them.

## USC2_Tachyon - Centos 6.9

### LAMMPS

!!! note

    - Some dependence require `libgcc-ng=12`
    - If running Lammmps requires `GLIBC>=2.17`, maybe solving by downgrade `zlib=1.2.11`
    - `Plumed` in conda does not support MPI and may have [limited features](https://www.plumed.org/doc-v2.8/user-doc/html/_installation.html). Therefore, compile PLUMED separately, using MPI in [conda evironment](https://thangckt.github.io/cluster/compiling/Plumed/)
    - LAMMPS in conda may have [limited features?](https://docs.lammps.org/Install_conda.html). LAMMPS in conda also included Plumed
    - `lammps=2022.06.23` may have many conflicts.

**Install Lammps** in Conda-env

```shell
module load conda/conda3
conda create -n py310lammps python=3.10
source activate py310lammps

conda install -c conda-forge -y clang lld llvm-tools libclang libclang-cpp libgcc-ng=12 \
        libgfortran-ng=12 libstdcxx-ng=12 zlib=1.2.11 libibverbs-cos6-x86_64 \
        openmpi ucx openmp  lammps=2022.06.23
```

**Create a module file** for Lammps

```tcl
set     topdir          /home1/p001cao/local/app/miniconda3/envs/py310lammps

prepend-path    PATH                $topdir/bin
prepend-path    INCLUDE             $topdir/include
prepend-path    LD_LIBRARY_PATH     $topdir/lib
prepend-path    PKG_CONFIG_PATH     $topdir/lib/pkgconfig          # this is required in order to config libs
```

```sh
fileLAMMPS=text.lmp

### mpirun /shmemrun
mpirun -np $NSLOTS -hostfile $TMPDIR/machines    lmp_mpi  -in ${fileLAMMPS}  -log LOG_${fileLAMMPS//.lmp/}_np$NSLOTS.log
```

### GPAW

**Install GPAW** in Conda-env

```sh
module load conda/conda3
conda create -n py310gpaw python=3.10
source activate py310gpaw

conda install -c conda-forge clang lld llvm-tools libgcc-ng=12 zlib=1.2.11 \
    libibverbs-cos6-x86_64 openmpi ucx openmp \
    fftw blas libxc scalapack elpa libvdwxc ase gpaw 
```

**Create a module file** for GPAW

```tcl
set     topdir          /home1/p001cao/local/app/miniconda3/envs/py310gpaw

prepend-path    PATH                $topdir/bin
prepend-path    INCLUDE             $topdir/include
prepend-path    LD_LIBRARY_PATH     $topdir/lib
prepend-path    PKG_CONFIG_PATH     $topdir/lib/pkgconfig          # this is required in order to config libs
```

### LAMMPS + GPAW

- This is for some convenience in linking and saving space.
- work with Python 3.10.4. beyond may be have troubles.
- Should install all dependencies (openmpi, cuda,...), before installing `gpaw`, `lammps`
- Need install `ase` before installing `gpaw`
- `libffi.so` requires GLIBC_2.14 -> solved: install `libffi=3.4.2`
- `zlib=1.2.11` can avoid requiring newer GLIBC

- libgcc-ng=12 libgfortran-ng=12 libstdcxx-ng=12 c-compiler cxx-compiler libffi=3.4.2

**Install** in Conda-env

```sh
module load conda/conda3
conda create -n py10ase python=3.10.7
source activate py10ase

conda install -y -c conda-forge clang libclang clangxx libclang-cpp lld llvm-tools\
      openmpi=4.0.5 ucx openmp libibverbs-cos6-x86_64  zlib=1.2.11 \
      blas libxc scalapack fftw elpa libvdwxc ase

conda install -y -c conda-forge  gpaw  lammps
```

**Create a module file** for GPAW

``` tcl
set     topdir          /home1/p001cao/local/app/miniconda3/envs/py10ase

prepend-path    PATH                $topdir/bin
prepend-path    INCLUDE             $topdir/include
prepend-path    LD_LIBRARY_PATH     $topdir/lib
prepend-path    PKG_CONFIG_PATH     $topdir/lib/pkgconfig
```
