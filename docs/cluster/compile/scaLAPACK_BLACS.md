
# scaLAPACK and BLACS
!!! note

    - BLACS is a part of scaLAPACK, don't need to install it separately.
    - Need MPI compiler
    - sometimes, need `-DMPI_C_COMPILER=$OPENMPI/bin/mpicc -DCMAKE_Fortran_COMPILER=$OPENMPI/bin/mpif90 `

## Tachyon - Centos 6.9

### OpenMPI+LLVM
 Error:

```sh
cd /home1/p001cao/0SourceCode/tooldev
# git clone -b master https://github.com/Reference-ScaLAPACK/scalapack.git ScaLAPACK-master  #   v2.2.1  master
cd ScaLAPACK-master
rm -rf build && mkdir build && cd build

module load tooldev/cmake-3.27
module load mpi/ompi4.1.x-clang17
module load tooldev/openBLAS-0.3.23

OPENMPI=/home1/p001cao/app/openmpi/4.1.x-clang17
export PATH=$OPENMPI/bin:$PATH
export CC=mpicc  export CXX=mpic++ export FC=mpifort export F90=mpif90 export F77=mpif77
export LDFLAGS="-fuse-ld=lld -lrt"
export CFLAGS="-Wno-implicit-function-declaration"
export myBLAS=/home1/p001cao/app/tooldev/openBLAS-0.3.23/lib64/libopenblas.so
myPREFIX=/home1/p001cao/app/mpi/scaLAPACK2.2-ompi4.1.x-clang17

cmake .. -DUSE_OPTIMIZED_LAPACK_BLAS=yes -DBUILD_SHARED_LIBS=on \
-DBLAS_LIBRARIES=${myBLAS} -DLAPACK_LIBRARIES=${myBLAS} -DCMAKE_INSTALL_PREFIX=$myPREFIX

make -j 16 && make install
```

### OpenMPI+GCC

```sh
module load tooldev/cmake-3.27
module load mpi/ompi4.1.x-gcc11
module load tooldev/openBLAS-0.3.23

OPENMPI=/home1/p001cao/app/openmpi/4.1.x-gcc11
export PATH=$OPENMPI/bin:$PATH
export CC=mpicc  export CXX=mpic++ export FC=mpifort export F90=mpif90 export F77=mpif77
export myBLAS=/home1/p001cao/app/tooldev/openBLAS-0.3.23/lib64/libopenblas.so
myPREFIX=/home1/p001cao/app/mpi/scaLAPACK2.2-ompi4.1.x-gcc11

cmake .. -DUSE_OPTIMIZED_LAPACK_BLAS=yes -DBUILD_SHARED_LIBS=on \
-DBLAS_LIBRARIES=${myBLAS} -DLAPACK_LIBRARIES=${myBLAS} -DCMAKE_INSTALL_PREFIX=$myPREFIX

make -j 16 && make install
```