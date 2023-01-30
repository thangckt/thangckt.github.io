# Install packages with conda

This way may eliminate some work on installing dependencies

???+ note

    - Use the `clang` compiler
    - Should in all packages available in `conda-forge`
    - For infiniBand, use `libibverbs-cos6-x86_64`
    - Some packages require GLIBC=2.17. Solve by installing `libgcc-ng=12` (and may be python=3.10)
    - Remember `ucx` and `openmp` for `openmpi`

## LAMMPS

### USC2_Tachyon - Centos 6.9

!!! note
    install `libgcc-ng=12` to solve for requirement `GLIBC>=2.17`

**Install Lammps** in Conda-env

```shell
module load conda/conda3
conda create -n py310lammps python=3.7.9
source activate py310lammps

conda install -c conda-forge clang lld llvm-tools libgcc-ng=12
conda install -c conda-forge llvm-openmp libibverbs-cos6-x86_64 openmpi ucx
conda install -c conda-forge lammps=2022.06.23 plumed=2.8.1
```

**Create a module file** for Lammps

```tcl
set     topdir          /home1/p001cao/local/app/miniconda3/envs/py37Lammps_conda

prepend-path    PATH                $topdir/bin
prepend-path    INCLUDE             $topdir/include
prepend-path    LD_LIBRARY_PATH     $topdir/lib
prepend-path    PKG_CONFIG_PATH     $topdir/lib/pkgconfig          # this is required in order to config libs
```

## GPAW

### USC2_Tachyon - Centos 6.9

**Install GPAW** in Conda-env

```sh
module load conda/conda3
conda create -n py37gpaw python=3.7
source activate py37gpaw

conda install -c conda-forge clang lld llvm-tools llvm-openmp libibverbs-cos6-x86_64 libgcc-ng=12
conda install -c conda-forge openmpi ucx fftw blas libxc scalapack elpa libvdwxc ase gpaw plumed
```

**Create a module file** for GPAW

```tcl
set     topdir          /home1/p001cao/local/app/miniconda3/envs/py37gpaw

prepend-path    PATH                $topdir/bin
prepend-path    INCLUDE             $topdir/include
prepend-path    LD_LIBRARY_PATH     $topdir/lib
prepend-path    PKG_CONFIG_PATH     $topdir/lib/pkgconfig          # this is required in order to config libs
```
