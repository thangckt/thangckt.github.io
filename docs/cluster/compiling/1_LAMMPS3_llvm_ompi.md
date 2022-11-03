# Compiling with LLVM + OMPI

## USC2_Tachyon - Centos 6.9 cluster with InfiniBand

!!! note

    - To void libs hidden by conda-lib, set absolute path for dynamic libs (*.so). See compile LLVM for more information
    - if error ralate to conda, just unistall libgcc and install python again `conda install -c conda-forge python=3.7`
    - if error relate to `openmpi/mca_pmix_pmix3x.so: undefined symbol:' --> delete isntall folder and reinstall

```shell
cd /home1/p001cao/local/wSourceCode/lammps_dev
git pull origin develop
mkdir build_LLVM && cd build_LLVM
```

```shell
module load tool_dev/cmake-3.24
module load tool_dev/binutils-2.37
module load fftw/fftw3.3.10-ompi4.1.4-clang14
module load mpi/ompi4.1.4-clang14

export myCOMPILER=/home1/p001cao/local/app/openmpi/4.1.4-clang14
export PATH=${myCOMPILER}/bin:$PATH
export CC=mpicc  export CXX=mpic++  export FC=mpifort
export LDFLAGS="-fuse-ld=lld -lrt"  
export CFLAGS="-gdwarf-4 -gstrict-dwarf"                                 # avoid dwarf5 error
## python (require py3), BLAS+LAPACK
export pyROOT=/home1/p001cao/local/app/miniconda3/envs/py37Lammps
export myZLIB=/home1/p001cao/local/app/tool_dev/zlib-1.2.12               # avoid zlib hidden by conda

cmake ../cmake -C ../cmake/presets/all_on.cmake \
-DPython_ROOT_DIR=${pyROOT} \
-DBUILD_MPI=yes -DBUILD_OMP=yes -DPKG_OPENMP=yes -DLAMMPS_MACHINE=mpi -DBUILD_SHARED_LIBS=no \
-DPKG_GPU=no -DPKG_KOKKOS=no -DPKG_INTEL=no -DPKG_MDI=no \
-DPKG_SCAFACOS=no -DPKG_ADIOS=no -DPKG_NETCDF=no -DPKG_VTK=no -DPKG_H5MD=no \
-DPKG_MESONT=no -DPKG_LATTE=no -DPKG_MSCG=no -DPKG_ATC=no -DPKG_KIM=no \
-DPKG_PLUMED=yes -DPKG_ML-PACE=no -DPKG_ML-QUIP=no -DPKG_ML-HDNNP=no  \
-DFFT=FFTW3 \
-DZLIB_INCLUDE_DIR=${myZLIB} -DZLIB_LIBRARY=${myZLIB}/lib/libz.so.1.2.12 \
-DCMAKE_INSTALL_PREFIX=/home1/p001cao/local/app/lammps/llvmOMPI4-dev
```

```shell
make -j 16 && make install
```

!!! info
    - can use export CFLAGS, CXXFLAGS. This same as -DCMAKE_CXX_LINK_FLAGS (CPPFLAG mean both)
    - LDFLAGS same as CMAKE_EXE_LINKER_FLAGS
    - -DUSE_INTERNAL_LINALG=yes is a new option
