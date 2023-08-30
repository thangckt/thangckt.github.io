<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [FFTW](#fftw)
  - [Download FFTW](#download-fftw)
  - [Compile with OMPI + GCC](#compile-with-ompi--gcc)
    - [USC1](#usc1)
    - [USC2](#usc2)
    - [CAN-GPU](#can-gpu)
  - [4. Make module file](#4-make-module-file)
  - [Compile with OMPI + LLVM](#compile-with-ompi--llvm)
    - [USC2](#usc2-1)

<!-- /TOC -->

# FFTW

- NOTE: To compile with mpi-enable, need to use openMPI-compiler: MPICC=mpicc
- [Installation guide](http://www.fftw.org/fftw3_doc/Installation-on-Unix.html#Installation-on-Unix)

## Download FFTW

[Download FFTW-3.3.10](http://www.fftw.org/download.html)

```shell
tar -xvzf fftw-3.3.10.tar.gz
cd fftw-3.3.10
mkdir build && cd build
```

## Compile with OMPI + GCC

Compiling FFTW 3.3.10 (Single,Double)

```shell
--enable-sse2: Single, Double
--enable-long-double : Long-Double Precision
--enable-float : Single
--enable-shared: fBIC
```

### USC1

```shell
module load mpi/ompi5.0.0-gcc11.2
export PATH=/uhome/p001cao/app/openmpi/5.0.0-gcc11.2-eagle/bin:$PATH
export CC=mpicc  export CXX=mpic++  export FORTRAN=mpifort  export F90=mpif90

../configure --enable-sse2 \
--enable-threads --enable-openmp --enable-mpi --enable-shared \
--prefix=/uhome/p001cao/app/fftw/3.3.10-ompi5.0-gcc11.2
```

### USC2

```shell
module load mpi/ompi4.1.3-gcc10.3
export PATH=$PATH:/home1/p001cao/app/openmpi/4.1.3-gcc10.3/bin
export CC=mpicc  export CXX=mpic++  export FORTRAN=mpifort  export F90=mpif90

../configure --enable-sse2 \
--enable-threads --enable-openmp --enable-mpi --enable-shared \
--prefix=/home1/p001cao/app/fftw/3.3.10-ompi4.1.3-gcc10.3
```

### CAN-GPU

```shell
module load mpi/ompi4.1-gcc7.4-cuda
export PATH=$PATH:/home/thang/app/openmpi/4.1.1-gcc7.4-cuda/bin
export CC=mpicc  export CXX=mpic++  export FORTRAN=mpifort  export F90=mpif90

../configure --enable-sse2 \
--enable-threads --enable-openmp --enable-mpi \
--prefix=/home/thang/app/fftw/3.3.8-ompi4.1-gcc7.4
```

make -j 12
make install

validate:
Inside "/uhome/p001cao/app/fftw/3.3.8-ompi4.1-gcc10.3/lib" you should see at least the files below
libfftw3.a libfftw3_mpi.a libfftw3_omp.a libfftw3_threads.a .... ....

## 4. Make module file

at directory: /uhome/p001cao/local/share/lmodfiles/mpi--> create file "ompi4.1.1-gcc11.2-noUCX"

```shell
# for Tcl script use only
# for Tcl script use only
set     topdir          /uhome/p001cao/app/fftw/3.3.10-ompi5.0-gcc11.2

prepend-path    PATH                $topdir/bin
prepend-path    INCLUDE             $topdir/include
prepend-path    LD_LIBRARY_PATH     $topdir/lib

prepend-path    PKG_CONFIG_PATH     $topdir/lib/pkgconfig
```

## Compile with OMPI + LLVM

### USC2

```shell
cd /home1/p001cao/0SourceCode/tooldev
tar -xvzf fftw-3.3.10.tar.gz
cd fftw-3.3.10
rm -rf build_LLVM && mkdir build_LLVM && cd build_LLVM

module load mpi/ompi4.1.x-clang17

export PATH=/home1/p001cao/app/openmpi/4.1.x-clang17/bin:$PATH
export CC=mpicc  export CXX=mpic++  export FC=mpifort
export LDFLAGS="-fuse-ld=lld -lrt"
export myPREFIX=/home1/p001cao/app/mpi/fftw3.3.10-ompi4.1.x-clang17

../configure --enable-sse2 --enable-threads --enable-openmp --enable-mpi --enable-shared --prefix=${myPREFIX}

make -j 16 && make install
```
