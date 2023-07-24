<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [Install packages with conda](#install-packages-with-conda)
  - [Centos 6 - Tachyon](#centos-6---tachyon)
    - [LAMMPS](#lammps)
    - [GPAW](#gpaw)
    - [LAMMPS + GPAW](#lammps--gpaw)
  - [Centos 7 - Eagle](#centos-7---eagle)

<!-- /TOC -->

# Install packages with conda

This way may eliminate some work on installing dependencies


## Centos 6 - Tachyon

!!! note

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

On Centos 6.9, GLIBC=2.12

!!! note

    - Should update `conda` for better linking (important) --> helpful `conda install conda`
    - This is for some convenience in linking and saving space.
    - old conda have many problems, but new conda require newer GLIBC, use these to avoid this requirement
        - `libffi=3.3 zlib=1.2.11 libgcc-ng=12 libgfortran-ng=12 libstdcxx-ng=12 libblas=3.8`
        - new `openmpi` is not recognized in old GLIBC, so must downgrade thia package
    - `clang lld llvm-tools` can avoid requiring higher GLIBC ?
    - Python version: (3.9.4)
        - `gpaw` works with py11, but some dependencies for `gpaw` only available with py10
        - `gpaw` requires `numpy`, but `numpy` in py10 may require high GLIBC. So use py9
        - use python 3.9.4, don't use higher will require higher GLIBC
    - Some libs to consider:
        - c-compiler cxx-compiler
        - clang libclang clangxx libclang-cpp lld llvm-tools

!!! note
    so far, `gpaw` does not recognize `openmpi` in conda --> move to Eagle


**Install** in Conda-env

```sh
module load conda/conda3
conda create -n py9ase python=3.9.4  # don't use higher python
source activate py9ase

conda install conda

conda install -y -c conda-forge clang lld llvm-tools libgcc-ng=12 libgfortran-ng=12 libstdcxx-ng=12 zlib=1.2.11 \
        openmpi=4.1.2 ucx openmp libibverbs-cos6-x86_64 libffi=3.3 \
        libblas=3.8 libxc scalapack fftw elpa libvdwxc ase gpaw  # lammps
```

**Create a module file** for GPAW

``` tcl
set     topdir          /home1/p001cao/local/app/miniconda3/envs/py10ase

prepend-path    PATH                $topdir/bin
prepend-path    INCLUDE             $topdir/include
prepend-path    LD_LIBRARY_PATH     $topdir/lib
prepend-path    PKG_CONFIG_PATH     $topdir/lib/pkgconfig
```

## Centos 7 - Eagle

!!! note

    - new GLIBC can void tons of errors due to old GLIBC
    - use python 3.11

**Install**
```sh
module load conda/conda3
conda  create -n py11ase python=3.11
source activate py11ase

conda install -y -c conda-forge clang lld llvm-tools \
        openmpi ucx openmp libibverbs-cos7-x86_64 pandas \
        blas libxc scalapack fftw elpa libvdwxc ase gpaw lammps
```
Test
``` sh
gpaw test
```

**module file**
``` tcl
set     topdir          /uhome/p001cao/local/app/miniconda3/envs/py11ase

prepend-path    PATH                $topdir/bin
prepend-path    INCLUDE             $topdir/include
prepend-path    LD_LIBRARY_PATH     $topdir/lib
prepend-path    PKG_CONFIG_PATH     $topdir/lib/pkgconfig
prepend-path    GPAW_SETUP_PATH     $topdir/share/gpaw  # to see GPAW dataset
```
