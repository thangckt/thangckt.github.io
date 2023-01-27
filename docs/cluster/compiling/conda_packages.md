# Install packages with conda

This way may eliminate some work on installing dependencies

???+ note

    - Use the `clang` compiler
    - Should in all packages available in `conda-forge`
    - For infiniBand, use `libibverbs-cos6-x86_64`
    - `libgcc-ng`>11 require GLIBC=2.17. Also, `zlib=1.2.12` require GLIBC=2.14. so void this.

## LAMMPS

### USC2_Tachyon - Centos 6.9

**Install Lammps** in Conda-env

```shell
module load conda/conda3
conda create -n py37Lammps_conda python=3.7
source activate py37Lammps_conda

conda install -c conda-forge clang lld llvm-tools llvm-openmp libibverbs-cos6-x86_64 libgcc-ng=9
conda install -c conda-forge openmpi lammps=2022.06.23 plumed=2.8.1
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

conda install -c conda-forge clang lld llvm-tools llvm-openmp libibverbs-cos6-x86_64 libgcc-ng=9
conda install -c conda-forge fftw blas libxc scalapack elpa libvdwxc ase gpaw
```

**Create a module file** for GPAW

```tcl
set     topdir          /home1/p001cao/local/app/miniconda3/envs/py37gpaw

prepend-path    PATH                $topdir/bin
prepend-path    INCLUDE             $topdir/include
prepend-path    LD_LIBRARY_PATH     $topdir/lib
prepend-path    PKG_CONFIG_PATH     $topdir/lib/pkgconfig          # this is required in order to config libs
```
