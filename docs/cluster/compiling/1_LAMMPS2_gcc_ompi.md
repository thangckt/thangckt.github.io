# Compiling with GCC + OMPI

!!! note

    - must export compilers to to avoid miss matching compilers

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

## USC1_Eagle - Centos 6.5 cluster with InfiniBand

!!! note

    - use different openmpi for Eagle vs Lion
    - Note: python>3.7.9 require GLIBC new
    `conda install python=3.7.5 pandas=1.0 numpy=1.19`
    - Use GCC-11 need also update GCC-conda = 11
    `conda install -c conda-forge libstdcxx-ng=11 libgcc-ng=11 libgfortran-ng=11`
    - install GSL, required by SCAFACOS package

```shell
cd lammps_master
mkdir build   &&   cd build

# module load tool_dev/gsl-2.6
module load tool_dev/binutils-2.36         # gold
module load tool_dev/cmake-3.21
module load fftw/fftw3.3.10-ompi5.0-gcc11.2
module load mpi/ompi5.0.0-gcc11.2

export PATH=/uhome/p001cao/local/app/openmpi/5.0.0-gcc11.2-eagle/bin:$PATH
export CC=mpicc  export CXX=mpic++  export FC=mpifort  export F90=mpif90
# MOLFILE_plugins/ python 3/ LAPACK&BLAS
export PlugIncDIR=/uhome/p001cao/local/wSourceCode/vmd/vmd-1.9/plugins/include
export pyROOT=/uhome/p001cao/local/app/miniconda3/envs/py37Lammps

cmake ../cmake -C ../cmake/presets/all_on.cmake \
-DCMAKE_EXE_LINKER_FLAGS="-fuse-ld=gold -lrt" \
-DPython_ROOT_DIR=${pyROOT} -DMOLFILE_INCLUDE_DIR=${PlugIncDIR} \
-DBUILD_MPI=yes -DBUILD_OMP=yes -DLAMMPS_MACHINE=mpi -DPKG_OPENMP=yes \
-DLAMMPS_EXCEPTIONS=yes -DBUILD_SHARED_LIBS=yes \
-DPKG_INTEL=no -DPKG_GPU=no -DPKG_KOKKOS=no \
-DPKG_LATTE=no -DPKG_MSCG=no -DPKG_ATC=no -DPKG_VTK=no -DPKG_ML-PACE=no \
-DPKG_ADIOS=no -DPKG_NETCDF=no -DPKG_KIM=no -DPKG_H5MD=no \
-DDOWNLOAD_EIGEN3=yes -DDOWNLOAD_VORO=yes -DDOWNLOAD_SCAFACOS=no -DPKG_SCAFACOS=no \
-DPKG_MESONT=no -DPKG_ML-QUIP=no \
-DPKG_PLUMED=yes -DDOWNLOAD_PLUMED=yes\
-DFFT=FFTW3 \
-DCMAKE_C_COMPILER=mpicc -DCMAKE_CXX_COMPILER=mpic++ -DCMAKE_Fortran_COMPILER=mpif90 \
-DCMAKE_INSTALL_PREFIX=/uhome/p001cao/local/app/lammps/gccOMPI5-dev

make -j 20
# test:  mpirun -np 2 lmp_mpi
make install
```

### Module file

```shell
## Module file
module load conda/py37Lammps
module load fftw/fftw3.3.10-ompi5.0-gcc11.2
# for Tcl script use only
set     topdir          /uhome/p001cao/local/app/lammps/gccOMPI5-29Sep21

prepend-path    PATH                    $topdir/bin
prepend-path    LD_LIBRARY_PATH         $topdir/lib64
prepend-path    INCLUDE                 $topdir/include/lammps

prepend-path    PATH  /uhome/p001cao/local/wSourceCode/vmd/vmd-1.9/plugins/LINUXPPC64/molfile
```

## USC2_Tachyon - Centos 6.9 cluster with InfiniBand

```shell
git pull origin develop

module load tool_dev/binutils-2.37                # gold
module load tool_dev/cmake-3.20.3
module load fftw/fftw3.3.10-ompi4.1.3-gcc10.3
module load mpi/ompi4.1.3-gcc10.3

export PATH=$PATH:/home1/p001cao/local/app/openmpi/4.1.3-gcc10.3/bin
export CC=mpicc  export CXX=mpic++  export FC=mpifort  export F90=mpif90
export CFLAGS='-gdwarf-4 -gstrict-dwarf'
## python (require py3) & BLAS+LAPACK
export pyROOT=/home1/p001cao/local/app/miniconda3/envs/py37Lammps

cmake ../cmake -C ../cmake/presets/all_on.cmake \
-DCMAKE_EXE_LINKER_FLAGS="-fuse-ld=gold -lrt" \
-DPython_ROOT_DIR=${pyROOT} \
-DBUILD_MPI=yes -DBUILD_OMP=yes -DLAMMPS_MACHINE=mpi -DPKG_OPENMP=yes \
-DLAMMPS_EXCEPTIONS=yes -DBUILD_SHARED_LIBS=no \
-DPKG_INTEL=no -DPKG_GPU=no -DPKG_KOKKOS=no \
-DPKG_ADIOS=no -DPKG_NETCDF=no -DPKG_VTK=no -DPKG_H5MD=no \
-DPKG_MESONT=no -DPKG_LATTE=no -DPKG_MSCG=no -DPKG_ATC=no -DPKG_KIM=no -DPKG_SCAFACOS=no \
-DPKG_ML-PACE=yes -DPKG_ML-QUIP=no -DPKG_ML-HDNNP=no -DPKG_MDI=no \
-DPKG_PLUMED=yes \
-DFFT=FFTW3 \
-DCMAKE_INSTALL_PREFIX=/home1/p001cao/local/app/lammps/gccOMPI4-dev

make -j 16 && make install
```

```shell
## no need download option
-DDOWNLOAD_EIGEN3=yes -DDOWNLOAD_VORO=yes -DDOWNLOAD_PLUMED=yes -DDOWNLOAD_QUIP=yes\
```

### use OMPI_5

```shell
module load tool_dev/binutils-2.37                # gold
module load tool_dev/cmake-3.20.3
module load fftw/fftw3.3.10-ompi5.0-gcc11.2
module load mpi/ompi5.0.0-gcc10.3

export pyROOT=/home1/p001cao/local/app/miniconda3/envs/py37Lammps

cmake ../cmake -C ../cmake/presets/all_on.cmake \
-DCMAKE_EXE_LINKER_FLAGS="-fuse-ld=gold -lrt" \
-DPython_ROOT_DIR=${pyROOT} \
-DBUILD_MPI=yes -DBUILD_OMP=yes -DLAMMPS_MACHINE=mpi -DPKG_OPENMP=yes \
-DLAMMPS_EXCEPTIONS=yes -DBUILD_SHARED_LIBS=no \
-DPKG_INTEL=no -DPKG_GPU=no -DPKG_KOKKOS=no \
-DPKG_LATTE=no -DPKG_MSCG=no -DPKG_ATC=no -DPKG_VTK=no -DPKG_ML-PACE=no \
-DPKG_ADIOS=no -DPKG_NETCDF=no -DPKG_KIM=no -DPKG_H5MD=no \
-DDOWNLOAD_EIGEN3=yes -DDOWNLOAD_VORO=yes -DDOWNLOAD_SCAFACOS=no -DPKG_SCAFACOS=no \
-DPKG_MESONT=no -DPKG_ML-QUIP=yes -DDOWNLOAD_QUIP=yes \
-DPKG_PLUMED=yes -DDOWNLOAD_PLUMED=yes\
-DFFT=FFTW3 \
-DCMAKE_INSTALL_PREFIX=/home1/p001cao/local/app/lammps/gccOMPI5-dev

```

### use OMPI_3

- This does not work, due to OMPI3 error

```shell
module load tool_dev/binutils-2.37                # gold
module load cmake/3.16.2
module load fftw/3.3.8/gcc-7.4.0/ompi-3.1.4/double
module load mpi/gcc-7.4.0/ompi/3.1.4

export pyROOT=/home1/p001cao/local/app/miniconda3/envs/py37Lammps

cmake ../cmake -C ../cmake/presets/all_on.cmake \
-DCMAKE_EXE_LINKER_FLAGS="-fuse-ld=gold -lrt" \
-DPython_ROOT_DIR=${pyROOT} \
-DBUILD_MPI=yes -DBUILD_OMP=yes -DLAMMPS_MACHINE=mpi -DPKG_OPENMP=yes \
-DLAMMPS_EXCEPTIONS=yes -DBUILD_SHARED_LIBS=yes \
-DPKG_INTEL=no -DPKG_GPU=no -DPKG_KOKKOS=no \
-DPKG_LATTE=no -DPKG_MSCG=no -DPKG_ATC=no -DPKG_VTK=no -DPKG_ML-PACE=no \
-DPKG_ADIOS=no -DPKG_NETCDF=no -DPKG_KIM=no -DPKG_H5MD=no \
-DDOWNLOAD_EIGEN3=yes -DDOWNLOAD_VORO=yes -DDOWNLOAD_SCAFACOS=no -DPKG_SCAFACOS=no \
-DPKG_MESONT=no -DPKG_ML-QUIP=no \
-DPKG_PLUMED=yes -DDOWNLOAD_PLUMED=yes\
-DFFT=FFTW3 \
-DCMAKE_INSTALL_PREFIX=/home1/p001cao/local/app/lammps/gccOMPI3-dev
```

\# use Internal LAPACK&BLAS, then no need (GSL & MKL): open file: ../cmake/Modules/Packages/USER_PLUMED.cmake
comment out line 9-->12: find LAPACK, BLAS, GSL (Plumed build itself, no need GSL anymore)
--> then, do not need these:
module load tool_dev/gsl-2.6
module load intel/mkl-xe19u5
source mklvars.sh intel64
-DFFT=MKL \    # must set before Plumed
\# or use openBLAS (bad performance)
module load tool_dev/gsl-2.6
export myBLAS=/home1/p001cao/local/app/tool_dev/openBLAS-0.3.19/lib64/libopenblas.a
-DBLAS_LIBRARIES=${myBLAS} -DLAPACK_LIBRARIES=${myBLAS}

\# load plumed separately (bad alloc)
module load plumed2/2.7htt-gcc
-DPKG_USER-PLUMED=yes -DDOWNLOAD_PLUMED=no -DPLUMED_MODE=shared \

\#openKim:
must create module file for openKim to add its PKG's path

### Module file

```shell
module load tool_dev/gsl-2.6
module load conda/py37Lammps
module load fftw/fftw3.3.10-ompi5.0-gcc11.2

# for Tcl script use only
set     topdir          /home1/p001cao/local/app/lammps/gccOMPI5-dev

prepend-path    PATH                    $topdir/bin
prepend-path    LD_LIBRARY_PATH         $topdir/lib64
prepend-path    INCLUDE                 $topdir/include/lammps
```

## CAN2_GPU - Centos 7 cluster with GPU

- See [GPU package](https://docs.lammps.org/Build_extras.html#gpu)

```shell
# cuda
export CUDA_PATH=/home/thang/local/app/cuda-10.2
export bin2c=/home/thang/local/app/cuda-10.2/bin/bin2c

-DPKG_GPU=yes -DGPU_API=cuda -DGPU_ARCH=sm_61 -DBIN2C=${bin2c} -DGPU_PREC=double \
```

- for Pascal architect of GPU, use ARCH=sm_60/sm_61

```shell
module load mpi/ompi4.1-gcc7.4-cuda      # cuda-10 only support to gcc-8
module load cmake-3.20.3
module load fftw/fftw3.3.8-ompi4.1-gcc7.4

export PATH=$PATH:/home/thang/local/app/openmpi/4.1.1-gcc7.4-cuda/bin
export CC=mpicc  export CXX=mpic++  export FC=mpifort  export F90=mpif90
# python (require py3)
export pyROOT=/home/thang/local/app/miniconda3/envs/py37Lammps
# cuda
export CUDA_PATH=/home/thang/local/app/cuda-10.2
export bin2c=/home/thang/local/app/cuda-10.2/bin/bin2c

cmake ../cmake -C ../cmake/presets/all_on.cmake \
-DPython_ROOT_DIR=${pyROOT} \
-DBUILD_MPI=yes -DBUILD_OMP=yes -DLAMMPS_MACHINE=mpi -DPKG_OPENMP=yes \
-DLAMMPS_EXCEPTIONS=yes -DBUILD_SHARED_LIBS=no \
-DPKG_INTEL=no -DPKG_KOKKOS=no \
-DPKG_GPU=yes -DGPU_API=cuda -DGPU_ARCH=sm_61 -DBIN2C=${bin2c} -DGPU_PREC=double \
-DPKG_LATTE=no -DPKG_MSCG=no -DPKG_ATC=no -DPKG_VTK=no -DPKG_ML-PACE=no \
-DPKG_ADIOS=no -DPKG_NETCDF=no -DPKG_KIM=no -DPKG_H5MD=no \
-DDOWNLOAD_EIGEN3=yes -DDOWNLOAD_VORO=yes -DDOWNLOAD_SCAFACOS=no -DPKG_SCAFACOS=no \
-DPKG_MESONT=no -DPKG_ML-QUIP=no \
-DPKG_PLUMED=yes -DDOWNLOAD_PLUMED=yes\
-DFFT=FFTW3 \
-DCMAKE_INSTALL_PREFIX=/home/thang/local/app/lammps/gccOMPI-dev
```

## CAN3_GPU - Ubuntu 20 with GPU

- python and fftw are availabe by command

```shell
sudo apt-get install -y fftw-dev
```

```shell
module load ompi/4.1.0-gcc7.5-cuda10.2      # cuda-10 only support to gcc-8
module load cmake-3.18.3

export PATH=$PATH:/opt/app/openmpi/4.1.0-gcc7.5-cuda10.2/bin
export CC=mpicc  export CXX=mpic++  export FC=mpifort  export F90=mpif90
# cuda (python is availabe on Ubuntu)
export CUDA_PATH=/usr/local/cuda-11.0
export bin2c=/usr/local/cuda-11.0/bin/bin2c

cmake ../cmake -C ../cmake/presets/all_on.cmake \
-DPython_ROOT_DIR=${pyROOT} \
-DBUILD_MPI=yes -DBUILD_OMP=yes -DLAMMPS_MACHINE=mpi -DPKG_OPENMP=yes \
-DLAMMPS_EXCEPTIONS=yes -DBUILD_SHARED_LIBS=no \
-DPKG_INTEL=no -DPKG_KOKKOS=no \
-DPKG_GPU=yes -DGPU_API=cuda -DGPU_ARCH=sm_61 -DBIN2C=${bin2c} -DGPU_PREC=double \
-DPKG_LATTE=no -DPKG_MSCG=no -DPKG_ATC=no -DPKG_VTK=no -DPKG_ML-PACE=no \
-DPKG_ADIOS=no -DPKG_NETCDF=no -DPKG_KIM=no -DPKG_H5MD=no \
-DDOWNLOAD_EIGEN3=yes -DDOWNLOAD_VORO=yes -DDOWNLOAD_SCAFACOS=no -DPKG_SCAFACOS=no \
-DPKG_MESONT=no -DPKG_ML-QUIP=yes -DDOWNLOAD_QUIP=yes -DPKG_ML-IAP=no \
-DPKG_PLUMED=yes -DDOWNLOAD_PLUMED=yes\
-DFFT=FFTW3 \
-DCMAKE_INSTALL_PREFIX=/opt/app/lammps/master-gpu

make -j 24 && sudo make install
```

```shell
####################

KOKKOS (USC 2) - 05May20 (error tbb_malloc  --> change TBB folder in file TBB.cmake)

-DBUILD_OMP=yes -DKokkos_ARCH_WSM=yes -DKokkos_ENABLE_OPENMP=yes  \
-DLMP_KOKKOS_USE_ATOMICS=yes -DKokkos_ENABLE_HWLOC=yes \

## TBB lib

set     topdir          /home1/p001cao/local/wSourceCode/Tooldev/oneTBB-2020.2
setenv          TBBROOT                 $topdir/bin
prepend-path    INCLUDE          $topdir/include
prepend-path    LD_LIBRARY_PATH         $topdir/build/linux_intel64_gcc_cc9.2.0_libc2.12_kernel2.6.32_release


##-- edit /cmake/Modules/FindTBB_MALLOC.cmake

find_path(TBB_MALLOC_INCLUDE_DIR NAMES tbb.h PATHS $ENV{TBBROOT}/include/tbb)
find_library(TBB_MALLOC_LIBRARY NAMES tbbmalloc PATHS $ENV{TBBROOT}/lib/intel64/gcc4.7
$ENV{TBBROOT}/build/linux_intel64_gcc_cc9.2.0_libc2.12_kernel2.6.32_release)


https://github.com/kokkos/kokkos/blob/master/BUILD.md
##-- must use
https://stackoverflow.com/questions/52018092/how-to-set-rpath-and-runpath-with-gcc-ld#52020177
export myGCC=/home1/p001cao/local/app/compiler/gcc-9.2.0
-DCMAKE_CXX_LINK_FLAGS="-L${myGCC}/lib64 -Wl,-rpath,${myGCC}/lib64" \

```

```shell
module load mpi/ompi4.0.3-gcc9.2.0
module load tool_dev/gsl-2.6
module load tool_dev/cmake-3.17.2

module load tool_dev/binutils-2.32
module load tool_dev/tbb-2020.2
 export TBB_MALLOC_LIBRARY
 export TBB_MALLOC_INCLUDE_DIR
cmake ../cmake -C ../cmake/presets/all_on.cmake \
-DCMAKE_EXE_LINKER_FLAGS="-fuse-ld=gold -lrt" \
-DBUILD_MPI=yes -DLAMMPS_MACHINE=mpi \
-DBUILD_OMP=yes -DKokkos_ARCH_WSM=yes -DKokkos_ENABLE_OPENMP=yes  \
-DBUILD_SHARED_LIBS=yes -DLAMMPS_EXCEPTIONS=yes \
-DPKG_GPU=no -DPKG_LATTE=no -DPKG_KIM=no -DPKG_MSCG=no -DPKG_USER-INTEL=no\
-DDOWNLOAD_VORO=yes -DDOWNLOAD_EIGEN3=yes \
-DPKG_USER-ADIOS=no -DPKG_USER-NETCDF=no -DPKG_USER-QUIP=no -DPKG_USER-SCAFACOS=no \
-DPKG_USER-QMMM=no -DPKG_USER-VTK=no -DPKG_USER-H5MD=no \
-DCMAKE_INSTALL_PREFIX=/home1/p001cao/local/app/lammps/05May20-gcc
```

# GCC + OpenSHMEM

```shell
module load mpi/ompi4.1.0-gcc10.2
module load tool_dev/binutils-2.35                # gold
module load tool_dev/cmake-3.18.0
module load fftw/fftw3.3.8-ompi4.1-gcc10.2

export PATH=$PATH:/home1/p001cao/local/app/openmpi/4.1.0-gcc10.2/bin
export CC=shmemcc
export CXX=shmemc++
export FORTRAN=shmemfort
cmake ../cmake -C ../cmake/presets/all_on.cmake \
-DCMAKE_EXE_LINKER_FLAGS="-fuse-ld=gold -lrt" \
-DLAMMPS_EXCEPTIONS=yes -DBUILD_MPI=yes -DBUILD_OMP=yes -DLAMMPS_MACHINE=mpi \
-DPKG_USER-OMP=yes -DPKG_USER-INTEL=no -DPKG_GPU=no -DPKG_KOKKOS=no \
-DPKG_USER-SMD=yes -DDOWNLOAD_EIGEN3=yes -DDOWNLOAD_VORO=yes \
-DPKG_KIM=no -DDOWNLOAD_KIM=no -DPKG_LATTE=no -DPKG_MSCG=no -DPKG_USER-ATC=no -DPKG_USER-MESONT=no  \
-DPKG_USER-ADIOS=no -DPKG_USER-NETCDF=no -DPKG_USER-QUIP=no -DPKG_USER-SCAFACOS=no \
-DPKG_USER-VTK=no -DPKG_USER-H5MD=no \
-DFFT=FFTW3 \
-DPKG_USER-PLUMED=yes -DDOWNLOAD_PLUMED=yes\
-DCMAKE_C_COMPILER=mpicc -DCMAKE_CXX_COMPILER=mpic++ -DCMAKE_Fortran_COMPILER=mpifort \
-DCMAKE_INSTALL_PREFIX=/home1/p001cao/local/app/lammps/gccSHMEM-master
```


# Compile with openMPI-conda & MKL-conda

I. Require:

openMPI & MKL must be installed in conda

Note: not yet support ucx

```shell
conda install -c conda-forge cmake mkl mkl-include libjpeg-turbo libpng
conda install -c conda-forge openmpi openmpi-mpicc openmpi-mpicxx openmpi-mpifort

# infiniBand
conda install -c conda-forge libibverbs-cos6-x86_64
```

```shell
module load conda/py37ompi

cmake  -C ../cmake/presets/all_on.cmake \
-D CMAKE_INSTALL_PREFIX=/home1/p001cao/local/lammps/20Nov19conda  \
-D BUILD_MPI=yes -D LAMMPS_MACHINE=mpi \
-D BUILD_LIB=yes -D BUILD_SHARED_LIBS=yes -D LAMMPS_EXCEPTIONS=yes \
-D PKG_GPU=no -D PKG_KIM=no -D PKG_LATTE=no -D PKG_MSCG=no -D PKG_KOKKOS=no \
-D DOWNLOAD_VORO=yes -D DOWNLOAD_EIGEN3=yes \
-D BUILD_OMP=yes -D PKG_USER-OMP=yes -D PKG_USER-INTEL=no \
-D PKG_USER-ADIOS=no -D PKG_USER-NETCDF=no -D PKG_USER-QUIP=no -D PKG_USER-SCAFACOS=no \
-D PKG_USER-QMMM=no -D PKG_USER-VTK=no -D PKG_USER-H5MD=no \
-D PKG_USER-PLUMED=no -D DOWNLOAD_PLUMED=no -D PLUMED_MODE=shared \
-D FFT=MKL \
-D MKL_LIBRARY=/home1/p001cao/local/miniconda3/envs/py37ompi/lib \
-D CMAKE_C_COMPILER=mpicc -D CMAKE_CXX_COMPILER=mpic++ -D CMAKE_Fortran_COMPILER=mpifort \../cmake
```

# Compile with openMPI4.0.1-gcc7.4.0 on CAN

```shell
module load mpi/openmpi4.0.2-gcc7.4.0
module load cmake-3.12

-D PKG_USER-ATC=no -D PKG_VORONOI=no -D PKG_USER-SMD=no -D PKG_USER-PLUMED=no

cmake  -C ../cmake/presets/all_on.cmake \
-D CMAKE_INSTALL_PREFIX=/home/thang/local/app/lammps/20Nov19 \
-D BUILD_MPI=yes -D LAMMPS_MACHINE=mpi \
-D BUILD_LIB=yes -D BUILD_SHARED_LIBS=yes -D LAMMPS_EXCEPTIONS=yes \
-D PKG_GPU=no -D PKG_KIM=no -D PKG_LATTE=no -D PKG_MSCG=no -D PKG_KOKKOS=no \
-D PKG_USER-ATC=no -D PKG_VORONOI=no -D PKG_USER-SMD=no \
-D BUILD_OMP=yes -D PKG_USER-OMP=yes -D PKG_USER-INTEL=no \
-D PKG_USER-ADIOS=no -D PKG_USER-NETCDF=no -D PKG_USER-QUIP=no -D PKG_USER-SCAFACOS=no \
-D PKG_USER-QMMM=no -D PKG_USER-VTK=no -D PKG_USER-H5MD=no \
-D PKG_USER-PLUMED=no -D DOWNLOAD_PLUMED=no -D PLUMED_MODE=shared \
-D CMAKE_C_COMPILER=mpicc  -D CMAKE_CXX_COMPILER=mpic++ -D CMAKE_Fortran_COMPILER=mpifort \
../cmake
```

# MVAPICH-GCC

module load mpi/mvapich2-2.3.2-gcc9.2.0
module load plumed2/2.7htt-mvapich
module load conda/py37mvapichSupp

Configure

```shell
cmake ../cmake -DCMAKE_EXE_LINKER_FLAGS="-fuse-ld=gold -lrt" \
-C ../cmake/presets/all_on.cmake \
-DBUILD_MPI=yes -DLAMMPS_MACHINE=mpi \
-DBUILD_OMP=yes -DPKG_USER-OMP=yes -DPKG_USER-INTEL=no \
-DBUILD_LIB=yes -DBUILD_SHARED_LIBS=yes -DLAMMPS_EXCEPTIONS=yes \
-DPKG_GPU=no -DPKG_LATTE=no -DPKG_KOKKOS=no -DPKG_KIM=no -DPKG_MSCG=no \
-DDOWNLOAD_VORO=yes -DDOWNLOAD_EIGEN3=yes \
-DPKG_USER-ADIOS=no -DPKG_USER-NETCDF=no -DPKG_USER-QUIP=no -DPKG_USER-SCAFACOS=no \
-DPKG_USER-QMMM=no -DPKG_USER-VTK=no -DPKG_USER-H5MD=no \
-DPKG_USER-PLUMED=yes -DDOWNLOAD_PLUMED=no -DPLUMED_MODE=shared \
-DCMAKE_C_COMPILER=mpicc -DCMAKE_CXX_COMPILER=mpic++ -DCMAKE_Fortran_COMPILER=mpifort \
-DCMAKE_INSTALL_PREFIX=/home1/p001cao/local/app/lammps/19Mar20-mva
```

https://github.com/lammps/lammps/blob/master/lib/message/cslib/src/STUBS_ZMQ/zmq.h

A. Compile Lammps19 with openMPI-4.0.2, Intel2019xe and MKL (w/wt FFTW-3.3.8) (USC)
II: Load modules
module load mpi/ompi4.0.2-Intel2019xe-noIB
module load intel/mkl-2019xe
module load gcc/gcc-7.4.0
module load plumed2/2.6htt
module load cmake-3.15.1
III: Compiling LAMMPS

* if occur error not found compiler, use this command to find path

find / -name icpc
find / -name ifort

find / -name icc

iii. Compile lammps
cd  lammps-folder
mkdir  build
cd  build

Step1: configuration

Note: write CMAKE command below on single line

```shell
cmake  -C ../cmake/presets/all_on.cmake \
-D CMAKE_INSTALL_PREFIX=/uhome/p001cao/local/lammps/20Nov19 \
-D BUILD_MPI=yes -D LAMMPS_MACHINE=mpi \
-D BUILD_LIB=yes -D BUILD_SHARED_LIBS=yes -D LAMMPS_EXCEPTIONS=yes \
-D PKG_GPU=no -D PKG_KIM=no -D PKG_LATTE=no -D PKG_MSCG=no -D PKG_KOKKOS=no \
-D DOWNLOAD_VORO=yes -D DOWNLOAD_EIGEN3=yes \
-D BUILD_OMP=yes -D PKG_USER-OMP=yes -D PKG_USER-INTEL=no \
-D PKG_USER-ADIOS=no -D PKG_USER-NETCDF=no -D PKG_USER-QUIP=no -D PKG_USER-SCAFACOS=no \
-D PKG_USER-QMMM=no -D PKG_USER-VTK=no -D PKG_USER-H5MD=no \
-D PKG_USER-PLUMED=yes -D DOWNLOAD_PLUMED=no -D PLUMED_MODE=shared \
-D FFT=MKL \
-D MKL_LIBRARY=/uhome/p001cao/local/intel/xe2019/compilers_and_libraries_2019.5.281/linux/mkl/lib/intel64 \
-D CMAKE_C_COMPILER=mpicc  -D CMAKE_CXX_COMPILER=mpic++ -D CMAKE_Fortran_COMPILER=mpifort \
../cmake
```

Step 2: compile ( in /build)
make -j 8
test: mpirun -np 2 lmp_mpi
LAMMPS (19 Jul 2019)
Total wall time: 0:00:21

step 3: copy file
make install

Step 4: create module file
 create file "7Aug19"

```shell
# for Tcl script use only
set     topdir          /uhome/p001cao/local/lammps/7Aug19
set     version         7Aug19

module load  mpi/openMPI/4.0.2-Intel2018xe
module load  fftw/3.3.8/openmpi4.0.2-intel2018xe-double
module load  conda2-2019
module load  plumed2/2.6.0


setenv          LAMMPS                  $topdir

prepend-path    PATH                                    $topdir/bin
prepend-path    LD_LIBRARY_PATH         $topdir/lib64
prepend-path    INCLUDE                            $topdir/include/lammps
```

save it in: /uhome/p001cao/local/share/lmodfiles/lammps
Ref: https://lammps.sandia.gov/doc/Build_basics.html

## USC2

Note: Kokkos may require TBB lib --> might only Intel can work

```shell
# Download specific TAG: git clone --branch <tag_name> <repo_url>
git clone --branch stable_3Mar2020 https://github.com/lammps/lammps.git lammps_stable_3Mar2020
cd lammps_stable_3Mar2020
mkdir build
cd build
##--- module load mpi/ompi4.0.3-intel19u5 module load intel/mkl-xe19u5 module load plumed2/2.7htt module load tool_dev/cmake-3.17.2
```

Configure

```shell
cmake ../cmake -C ../cmake/presets/all_on.cmake \ -DBUILD_MPI=yes -DLAMMPS_MACHINE=mpi \ -DBUILD_OMP=yes -DKokkos_ARCH_WSM=yes -DKokkos_ENABLE_OPENMP=yes \ -DBUILD_SHARED_LIBS=yes -DLAMMPS_EXCEPTIONS=yes \ -DPKG_GPU=no -DPKG_LATTE=no -DPKG_KIM=no -DPKG_MSCG=no -DPKG_USER-INTEL=no\ -DDOWNLOAD_VORO=yes -DDOWNLOAD_EIGEN3=yes \ -DPKG_USER-ADIOS=no -DPKG_USER-NETCDF=no -DPKG_USER-QUIP=no -DPKG_USER-SCAFACOS=no \ -DPKG_USER-QMMM=no -DPKG_USER-VTK=no -DPKG_USER-H5MD=no \ -DPKG_USER-PLUMED=yes -DDOWNLOAD_PLUMED=no -DPLUMED_MODE=shared \ -DCMAKE_C_COMPILER=mpicc -DCMAKE_CXX_COMPILER=mpic++ \ -DCMAKE_INSTALL_PREFIX=/home1/p001cao/local/app/lammps/05May20
```
