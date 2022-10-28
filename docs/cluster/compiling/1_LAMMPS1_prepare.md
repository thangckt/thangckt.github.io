
This note does not intend to tell about what [LAMMPS](https://www.lammps.org) is but the struggling work to deploy it on some Linux clusters.

![Lammps logo](https://www.lammps.org/movies/logo.gif)

# Preparation

## 1. Prerequisite

- Compiler: Intel, GCC, Clang,...
- MPI implementation: OMPI, IMPI, MPICH,...
- Libraries depend on which packages will be installed: FFTW, intel MKL,...
- Newer LAMMPS may be no longer compatible with an old openMPI, as well FFTW/MKL, so these libs need to be updated too.
- OpenMPI may the fastest
- There is no longer USER_ packages from Jul-2021
- Need CMAKE, newer is better (a newer Cmake version may reduce the probability of error during compiling). Basic cmake:

```shell
cmake -D OPTION_A=VALUE_A -D OPTION_B=VALUE_B ...     ../cmake make
```

- Module evironment

```shell
module load <module_name>
module display <module_name>
```

- Only one installation for `eagle/lion/leopard/cheetah`, but need to load different OpenMPI for each cluster. Also need to load Conda to overwrite default python of the system (different Ver. of python may cause runtime error)

### 2. Download

[LAMMPS site](https://lammps.sandia.gov/bug.html)
[Souce code](https://github.com/lammps/lammps)

```shell
## download tar file
tar -xvf lammps-stable_7Aug2019
cd lammps-stable_7Aug2019
mkdir build && cd build

## or download use Git:
git clone --branch patch_20Nov2019 https://github.com/lammps/lammps.git lammps_patch_20Nov2019
cd lammps_patch_20Nov2019
git checkout patch_20Nov2019

git clone https://github.com/lammps/lammps.git    lammps_dev
cd lammps_dev
git pull origin develop
```

## 3. Packages

!!! note

    - include these OPTIONS in Cmake command, to build package-lib automatically:
    - python > 3.7.12 require to update GCC-conda=11: `conda install -c conda-forge libstdcxx-ng=11 libgcc-ng=11 libgfortran-ng=11`. But dont use this to void requiring higher GLIBC. Also, `zlib=1.2.12` require GLIBC=2.14. 
    - To void hidden libs by conda, need to downgrade libs versions in conda < libs in linux system. So that to void these errors, use `conda install -c conda-forge libgcc-ng=7 zlib=1.2.8 python=3.7.12`
    - Do not use GCC-11 to avoid error: Dwarf Error: found dwarf version '5', use: export CFLAGS='-gdwarf-4 -gstrict-dwarf' not solve this error
    - install openBLAS for LAPACK and BLAS, so need load GSL
    - use static link for openBLAS, so need to export it and set cmake var


1.**UFM potential**

```shell
cd lammps-folder/src/
git clone https://github.com/plrodolfo/FluidFreeEnergyforLAMMPS.git USER-FFE
copy new pair_ufm into /src
copy new pair_eam.cpp & pair_eam.h into /src and delete corresponding files in /src/MANYBODY
```

2.**POEMS, OPT**

```shell
-D PKG_OPT=yes
```

3.**MSCG**

```shell
-D PKG_MSCG=yes -D DOWNLOAD_MSCG=yes
```

5.**VORONOI**

```shell
-D PKG_VORONOI=yes -D DOWNLOAD_VORO=yes
```

6.**KSPACE**

- if use MKL for FFT, then need MKL library

```shell
-D FFT=MKL  \
-D MKL_INCLUDE_DIRS=/uhome/p001cao/local/intel/xe2019/compilers_and_libraries_2019.5.281/linux/mkl/include  \
-D MKL_LIBRARY=/uhome/p001cao/local/intel/xe2019/compilers_and_libraries_2019.5.281/linux/mkl/lib/intel64  \
```

- if FTWW3, then dont need MKL_LIBRARY

```shell
-D FFT=FFTW3
-D FFTW3_INCLUDE_DIRS=/uhome/p001cao/local/fftw/3.3.8-openmpi4.0.1-Intel2019xe-double/include \
-D FFTW3_LIBRARY=/uhome/p001cao/local/fftw/3.3.8-openmpi4.0.1-Intel2019xe-double/lib \
```

- or use FFTW3 from intel_mkl: (not support long-double precision)

```shell
-D FFT=FFTW3
-D FFTW3_INCLUDE_DIRS=/uhome/p001cao/local/intel/xe2018/compilers_and_libraries_2018.0.128/linux/mkl/include/fftw
```

7.**LAPACK & BLAS*

- These packages LAPACK & BLAS: MSCG, ATC, AWPMD, ML-QUIP, LATTE, PLUMED (can self build its libs)
- Use "intel/mkl" package, then LAPACK & BLAS will be found automatically

  ```shell
  module load intel/mkl
  module load tool_dev/gsl-2.6
  ```

- Use external LAPACK & BLAS

```shell
  export myLAPACK=/uhome/p001cao/local/app/lapack-3.10/liblapack.a
  export myBLAS=/uhome/p001cao/local/app/lapack-3.10/libblas.a

  -DLAPACK_LIBRARIES=${myLAPACK} -DBLAS_LIBRARIES=${myBLAS}
```

8.**OpenMP**

```shell
-D PKG_USER-OMP=yes -D BUILD_OMP=yes -D PKG_USER-INTEL=no
```

9.**make no packages**

```shell
-D PKG_GPU=no -D PKG_KIM=no -D PKG_LATTE=no -D PKG_MSCG=no -D PKG_KOKKOS=no \
-D PKG_USER-ADIOS=no -D PKG_USER-NETCDF=no -D PKG_USER-OMP=no -D PKG_USER-INTEL=no \
-D PKG_USER-QUIP=no -D PKG_USER-SCAFACOS=no -D PKG_USER-QMMM=no -D PKG_USER-VTK=no \
-D PKG_USER-H5MD=no \
```

10.[**KOKKOS**](https://lammps.sandia.gov/doc/Build_extras.html#kokkos)
For multicore CPUs using OpenMP, set these 2 variables.

```shell
-DKokkos_ARCH_WSM=yes                 # HOSTARCH = HOST from list above
-DKokkos_ENABLE_OPENMP=yes
-DBUILD_OMP=yes
```

11.[**PLUMED**](https://lammps.sandia.gov/doc/Build_extras.html#user-plumed)

- **pre-compile Plumed separately:**

  ```shell
  module load plumed
  ```

  ```shell
  -D PKG_PLUMED=yes -D DOWNLOAD_PLUMED=no -D PLUMED_MODE=static
  ```

- **self-build PLUMED:** will need GSL to link LAPACK, BLAS (require MKL)

  ```shell
  -D PKG_PLUMED=yes -D DOWNLOAD_PLUMED=yes -D PLUMED_MODE=static
  ```

```shell
##change lines:
    # URL http...... (line 65)
    # URL_MD5
## into:
      GIT_REPOSITORY https://github.com/plumed/plumed2.git
      GIT_TAG master                            # hack-the-tree   v2.6.2   v2.7b

      CONFIGURE_COMMAND <SOURCE_DIR>/configure  ....   ...
                  --enable-modules=all --enable-asmjit --disable-external-blas --disable-external-lapack
      ...
## add this command after line 76 (inside ExternalProject_Add(...)):
      UPDATE_COMMAND ""
```

- **self-build PLUMED:** Configure Plumed to use Internal LAPACK&BLAS: (no need install BLAS&LAPACK or MKL+GSL)
  open file: ../cmake/Modules/Packages/USER-PLUMED.cmake, Comment out these lines:

```shell
  # find_package(LAPACK REQUIRED)
  # find_package(BLAS REQUIRED)
  # find_package(GSL REQUIRED)
  # list(APPEND PLUMED_LINK_LIBS ${LAPACK_LIBRARIES} ${BLAS_LIBRARIES} GSL::gsl)
```

12.[**ML_QUIP**] ([source code](https://github.com/libAtoms/QUIP))
compile QUIP the minimum requirements are:

- A working Fortran compiler. QUIP is tested with `gfortran 4.4` and later, and `ifort 11.1`
- Linear algebra libraries BLAS and LAPACK. QUIP is tested with reference versions libblas-dev and liblapack-dev on Ubuntu 12.04, and mkl 11.1 with ifort.
- modify `ML-QUIP.cmake` : add this command after line 76 (inside ExternalProject_Add(...)):

```shell
    GIT_REPOSITORY "https://github.com/libAtoms/QUIP/"
    GIT_TAG          5989901       #   origin/public
    ...
    UPDATE_COMMAND ""
```

13.**MLIAP**

- require python >3.6

14.**MACHDYN**

- require Eigen

```shell
-D MACHDYN=yes -D DOWNLOAD_EIGEN3=yes
```

open file: ../cmake/Modules/Packages/USER-SMD.cmake

```shell
## change:
    URL http...... (line 12)
    URL_MD5
## into:
    GIT_REPOSITORY https://github.com/eigenteam/eigen-git-mirror.git
    GIT_TAG  3.3.7
```

14.**MOLFILE package**

- to dump PDB file, need install VMD-plugins
- compatible with VMD 1.9 and 1.9.1
- [Compile VMD](http://www.ks.uiuc.edu/Research/vmd/plugins/doxygen/compiling.html)
  - **compile plugins** (just this is need for Lammps) [see this](https://www.discngine.com/blog/2019/5/25/building-the-vmd-molfile-plugin-from-source-code)

```shell
tar zxvf vmd-1.9.src.tar.gz
cd plugins
make LINUXPPC64
export PLUGINDIR=/uhome/p001cao/local/wSourceCode/vmd/vmd-1.9/plugins
make distrib
```

- **compile VMD**

```shell
cd vmd-1.9.4a51
module load compiler/gcc-10.3
export VMDINSTALLDIR=/uhome/p001cao/local/app/vmd
./configure LINUXPPC64 OPENGL SILENT PTHREADS
cd src
make
```

- path in lib/molfile/Make.lammps: molfile_SYSPATH =-L/uhome/p001cao/local/wSourceCode/vmd/vmd-1.9/plugins/LINUXPPC64/molfile

```shell
export =/uhome/p001cao/local/wSourceCode/vmd/vmd-1.9/plugins/include
```

```shell
-D MOLFILE_INCLUDE_DIR=${PlugIncDIR}
-D PKG_MOLFILE=yes
```

15.**PYTHON** (use 1 of following ways)

Note: new numpy require higher GLIBC

- use module load --> do not need setting in Cmake (but this may intefere some libs: openmpi,lapack,blas,... - should not use)

```shell
module load conda/py37Lammps
```

- use Python_ROOT_DIR (same as module load): --> will encounter the error: Anaconda environments prevent CMake from generating a safe runtime search path --> cannot be solved so far.

```shell
export pyROOT=/uhome/p001cao/local/app/miniconda3/envs/py37Lammps
-DPython_ROOT_DIR=${pyROOT}   # this setting must be put on the head of cmake
```

- use Python_EXECUTABLE # (Python_EXECUTABLE depend on cmake's version) (but this case still use system Python while compiling, so cannot use on multi-OS with different Versions )

```shell
export pyEXE=/uhome/p001cao/local/app/miniconda3/envs/py37Lammps/bin/python
export pyINC=/uhome/p001cao/local/app/miniconda3/envs/py37Lammps/include/python3.7m
export pyLIB=/uhome/p001cao/local/app/miniconda3/envs/py37Lammps/lib/libpython3.7m.a

-DPython_EXECUTABLE=${pyEXE} -DPython_INCLUDE_DIR=${pyINC} -DPython_LIBRARY=${pyLIB}
```

## Compiling with GCC + OMPI

```note
- must export compilers to to avoid miss matching compilers
```

```shell
export PATH=/uhome/p001cao/local/app/openmpi/4.1.1-gcc11.2-noUCX-eagle/bin:$PATH
export CC=mpicc  export CXX=mpic++  export FORTRAN=mpifort
# can use: -DCMAKE_C_COMPILER=mpicc -DCMAKE_CXX_COMPILER=mpic++ -DCMAKE_Fortran_COMPILER=mpif90 \
```

- "GCC + gold linker" is good now

```shell
module load tool_dev/binutils-2.36
```

```shell
-DCMAKE_EXE_LINKER_FLAGS="-fuse-ld=gold -lrt"
```

- use MKL

```shell
module load intel/mkl-xe19u5
source mklvars.sh intel64
module load tool_dev/gsl-2.6
```

```shell
-DFFT=MKL
```

- use external BLAS&LAPACK instead of MKL

```shell
module load tool_dev/gsl-2.6
export myLAPACK=/uhome/p001cao/local/app/lapack-3.10/liblapack.a
export myBLAS=/uhome/p001cao/local/app/lapack-3.10/libblas.a

-DBLAS_LIBRARIES=${myBLAS} -DLAPACK_LIBRARIES=${myLAPACK}
```

- use FFTW instead of MKL

```shell
module load fftw/fftw3.3.8-ompi4.1-gcc11.2
```

```shell
-DFFT=FFTW3
```

- consider linkers

```shell
module load llvm/llvm-gcc10-lld                    # to use lld
-DCMAKE_EXE_LINKER_FLAGS="-fuse-ld=lld -lrt" \
module load tool_dev/binutils-2.35                # gold
-DCMAKE_EXE_LINKER_FLAGS="-fuse-ld=gold -lrt" \
```

### 1. USC1 (eagle)

```note
- use different openmpi for Eagle vs Lion
- Note: python>3.7.9 require GLIBC new
`conda install python=3.7.5 pandas=1.0 numpy=1.19`
- Use GCC-11 need also update GCC-conda = 11
`conda install -c conda-forge libstdcxx-ng=11 libgcc-ng=11 libgfortran-ng=11`
- install GSL, required by SCAFACOS package
```
