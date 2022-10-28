# Compile with IMPI-2019xe + MKL

Note: use intelMPI can run all both centos7 & centos6

## USC1_Eagle - Centos 6.5 cluster with InfiniBand

Load modules

```shell
module load intel/compiler-xe19u5
module load mpi/impi-xe19u5
module load intel/mkl-xe19u5
module load plumed2/2.6httIMPI
module load conda/py37
module load cmake-3.15.1

configuration
cd lammps-folder
mkdir build
cd build
cmake  -C ../cmake/presets/all_on.cmake \
-D CMAKE_INSTALL_PREFIX=/uhome/p001cao/local/app/lammps/20Nov19impi \
-D BUILD_MPI=yes -D LAMMPS_MACHINE=mpi \
-D BUILD_LIB=yes -D BUILD_SHARED_LIBS=yes -D LAMMPS_EXCEPTIONS=yes \
-D PKG_GPU=no -D PKG_KIM=no -D PKG_LATTE=no -D PKG_MSCG=no -D PKG_KOKKOS=no \
-D DOWNLOAD_VORO=yes -D DOWNLOAD_EIGEN3=yes \
-D BUILD_OMP=yes -D PKG_USER-OMP=yes -D PKG_USER-INTEL=no \
-D PKG_USER-ADIOS=no -D PKG_USER-NETCDF=no -D PKG_USER-QUIP=no -D PKG_USER-SCAFACOS=no \
-D PKG_USER-QMMM=no -D PKG_USER-VTK=no -D PKG_USER-H5MD=no \
-D PKG_USER-PLUMED=yes -D DOWNLOAD_PLUMED=no -D PLUMED_MODE=shared \
-D FFT=MKL \
-D MKL_LIBRARY=/uhome/p001cao/local/app/intel/xe19u5/compilers_and_libraries_2019.5.281/linux/mkl/lib/intel64_lin \
-D CMAKE_C_COMPILER=mpiicc -D CMAKE_CXX_COMPILER=mpiicpc -D CMAKE_Fortran_COMPILER=mpiifort \
../cmake

make -j 8
test:  mpirun -np 2 ./lmp_mpi
make install
```

Step 4: create module file
 create file "7Aug19-Impi"
############################################
module load intel/2019xe
module load mpi/impi-2019xe
module load plumed2/2.6.0-Impi
module load conda2-2019
setenv          LAMMPS                  $topdir

prepend-path    PATH                                    $topdir/bin
prepend-path    LD_LIBRARY_PATH         $topdir/lib64
prepend-path    INCLUDE                            $topdir/include/lammps
###############################################################
```

### 2. USC 2

```shell
module load compiler/gcc-10.2              # must load before impi
module load intel/compiler-xe19u5           # intel include lld linker  require GLIBC 2.15
module load intel/mkl-xe19u5
module load intel/impi-xe19u5
source mpivars.sh release
module load tool_dev/cmake-3.18.0
module load tool_dev/gsl-2.6
module load tool_dev/binutils-2.32                # gold

export PATH=$PATH:/home1/p001cao/local/app/intel/xe19u5/compilers_and_libraries_2019.5.281/linux/bin
export CC=mpiicc
export CXX=mpiicpc
export FORTRAN=mpiifort

cmake ../cmake -C ../cmake/presets/all_on.cmake \
-DCMAKE_EXE_LINKER_FLAGS="-fuse-ld=gold -lrt" \
-DLAMMPS_EXCEPTIONS=yes -DBUILD_MPI=yes -DBUILD_OMP=yes -DLAMMPS_MACHINE=mpi \
-DPKG_USER-OMP=yes -DPKG_USER-INTEL=yes -DPKG_GPU=no -DPKG_KOKKOS=no \
-DPKG_USER-SMD=yes -DDOWNLOAD_EIGEN3=yes -DDOWNLOAD_VORO=yes \
-DPKG_KIM=no -DDOWNLOAD_KIM=no -DPKG_LATTE=no -DPKG_MSCG=no -DPKG_USER-ATC=no \
-DPKG_USER-ADIOS=no -DPKG_USER-NETCDF=no -DPKG_USER-QUIP=no -DPKG_USER-SCAFACOS=no \
-DPKG_USER-VTK=no -DPKG_USER-H5MD=no \
-DFFT=MKL \
-DPKG_USER-PLUMED=yes -DDOWNLOAD_PLUMED=yes\
-DCMAKE_C_COMPILER=mpiicc -DCMAKE_CXX_COMPILER=mpiicpc -DCMAKE_Fortran_COMPILER=mpiifort \
-DCMAKE_INSTALL_PREFIX=/home1/p001cao/local/app/lammps/impi-master
#-- NOTE: Kokkos require TBB lib
module load intel/tbb-xe20u2
##-- edit /cmake/Modules/FindTBB_MALLOC.cmake
find_path(TBB_MALLOC_INCLUDE_DIR NAMES tbb.h PATHS $ENV{TBBROOT}/include/tbb)
find_library(TBB_MALLOC_LIBRARY NAMES tbbmalloc PATHS $ENV{TBBROOT}/lib/intel64/gcc4.8)
##--
-DCMAKE_EXE_LINKER_FLAGS="-fuse-ld=lld -lrt" \
source compilervars.sh intel64
source mklvars.sh intel64
```
