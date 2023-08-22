<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [UCX](#ucx)
  - [Compile from Source vs. from pre-configured Release](#compile-from-source-vs-from-pre-configured-release)
    - [1. install from Source](#1-install-from-source)
    - [2. install from UCX pre-configured Release](#2-install-from-ucx-pre-configured-release)
  - [Compile with GCC](#compile-with-gcc)
    - [USC2](#usc2)
    - [USC1 (eagle)](#usc1-eagle)
  - [Compile with Intel](#compile-with-intel)
  - [II. UCX optional Libs](#ii-ucx-optional-libs)
    - [1. rdma-core (fail)](#1-rdma-core-fail)
    - [2. libnuma-devel](#2-libnuma-devel)
    - [3. openMPI/UCX: libfabric ()](#3-openmpiucx-libfabric-)
    - [4. openMPI/UCX: KNEM](#4-openmpiucx-knem)
    - [5. openMPI/UCX: XPMEM](#5-openmpiucx-xpmem)
  - [Compile with LLVM](#compile-with-llvm)
    - [USC2](#usc2-1)
      - [Prepare source code](#prepare-source-code)
      - [Building](#building)
      - [Make module file](#make-module-file)

<!-- /TOC -->

# UCX
<img src="https://openucx.org/wp-content/themes/jello/img/UCX_Logo_930x933.png" width=120 />

UCX is needed to compile OpenMPI to use InfiniBand

Work with UCX in short:

- Get the recent release from <https://github.com/openucx/ucx/releases>
- Build and make `ucx` available to your machines
- Configure and compile OMPI with  `--with-ucx="path-to-ucx"`

Afterward, when you launch OMPI run, you set UCX pml:

```sh
mpirun -mca btl self -mca pml ucx ....
```

To control which device and what transport are being used you can add following env variables:

```sh
mpirun -mca btl self -mca pml ucx -x UCX_NET_DEVICES=mlx5_0:1 -x UCX_TLS=rc,shm ....
```

Try to experiment with different TLS's see here for more info.

``` tip "See also
1. https://github.com/openucx/ucx/wiki/OpenMPI-and-OpenSHMEM-installation-with-UCX
2. https://github.com/openucx/ucx/wiki
```

???+ note

    - OpenMPI 4.0,3 support `ucx` 1.7 or older
    - OpenMPI 4.0,4 support newer `ucx`

## Compile from Source vs. from pre-configured Release

For compiling from source codes, need [some tools](https://thangckt.github.io/cluster/compiling/Libtool/)

### 1. install from Source

```note
- work now, but should not be use to avoid runtime errors
- Requirements: `autoconf`, `libtool`, and `automake`
```

```shell
cd /home1/p001cao/local/wSourceCode/tooldev
git clone --branch master https://github.com/openucx/ucx.git  ucx-master
cd ucx-master
module load tooldev/autoconf-2.72c
module load tooldev/automake-1.16.5
module load tooldev/libtool-2.4.7
export ACLOCAL_PATH=/home1/p001cao/app/tooldev/libtool-2.4.7/share/aclocal

./autogen.sh
mkdir build  &&  cd build

module load tooldev/binutils-2.37              # gold
module load compiler/gcc-10.3

export PATH=$PATH:/home1/p001cao/app/compiler/gcc-10.3/bin
export CC=gcc export CXX=g++ export FORTRAN=gfortran
export LDFLAGS="-fuse-ld=gold -lrt"

../configure --enable-mt  \
--prefix=/home1/p001cao/app/tooldev/ucx-master
```

### 2. install from UCX pre-configured Release

```note
- This way no need ./autogen.h
- ver 1.12.1 will cause error: not found auvx.h
```

```shell
wget https://github.com/openucx/ucx/releases/download/v1.12.0/ucx-1.12.0.tar.gz
tar xvf ucx-1.12.0.tar.gz
cd ucx-1.12.0
mkdir build && cd build
```

## Compile with GCC

### USC2

```note
- Error: No components were able to be opened in the pml framework: not solve
- do not use GCC-11 to avoid error: Dwarf Error: found dwarf version '5', use: export CFLAGS='-gdwarf-4 -gstrict-dwarf'
export CFLAGS='-gdwarf-4 -gstrict-dwarf'
```

``` sh
cd /home1/p001cao/0SourceCode/tooldev
# git clone --branch v1.15.x https://github.com/openucx/ucx.git  ucx-1.15.x
cd ucx-1.15.x
git pull origin v1.15.x

module load tooldev/autoconf-2.72c
module load tooldev/automake-1.16.5
module load tooldev/libtool-2.4.7
export ACLOCAL_PATH=/home1/p001cao/app/tooldev/libtool-2.4.7/share/aclocal

./autogen.sh
```

``` sh
rm -rf build && mkdir build  &&  cd build

module load compiler/gcc-13

export PATH=/home1/p001cao/app/compiler/gcc-13/bin:$PATH
export CC=gcc export CXX=gcc++ FORTRAN=gfortran
export LDFLAGS="-lrt"
export myPREFIX=/home1/p001cao/app/tooldev/ucx-1.15

../contrib/configure-release --enable-mt --prefix=${myPREFIX}

make -j 16 && make install
```

Option:

```shell
export CFLAGS='-gdwarf-4 -gstrict-dwarf'
myKNEM=/home1/p001cao/app/tooldev/knem-1.1.4
myNUMA=/home1/p001cao/app/tooldev/numactl-2.0.13

--with-knem=$myKNEM \
LDFLAGS="-fuse-ld=gold -lrt  -L$myNUMA/lib -Wl,-rpath,$myNUMA/lib" \
CFLAGS="-I$myNUMA/include" \

../contrib/configure-release  --enable-optimizations
```

### USC1 (eagle)

```shell
module load tooldev/binutils-2.36              # gold
module load compiler/gcc-11.2

export PATH=$PATH:/uhome/p001cao/app/compiler/gcc-11.2/bin
export CC=gcc export CXX=g++ export FORTRAN=gfortran

../configure --enable-mt --prefix=/uhome/p001cao/app/tooldev/ucx-1.11
```

Option:

```shell
myKNEM=/uhome/p001cao/app/tooldev/knem-1.1.4
myNUMA=/uhome/p001cao/app/tooldev/numactl-2.0.13

--with-knem=$myKNEM \
LDFLAGS="-fuse-ld=gold -lrt  -L$myNUMA/lib -Wl,-rpath,$myNUMA/lib" \
CFLAGS="-I$myNUMA/include" \
```

Other options:

```shell
--disable-numa
--with-rc --with-ud --with-dc --with-ib-hw-tm --with-dm --with-cm \
## consider options
--with-verbs(=DIR)      Build OpenFabrics support, adding DIR/include,
                        DIR/lib, and DIR/lib64 to the search path for
                        headers and libraries
--with-rc               Compile with IB Reliable Connection support
--with-ud               Compile with IB Unreliable Datagram support
--with-dc               Compile with IB Dynamic Connection support
--with-mlx5-dv          Compile with mlx5 Direct Verbs support. Direct Verbs
                        (DV) support provides additional acceleration
                        capabilities that are not available in a regular
                        mode.
--with-ib-hw-tm         Compile with IB Tag Matching support
--with-dm               Compile with Device Memory support

--with-cm               Compile with IB Connection Manager support

##-- Consider
myNUMA=/home1/p001cao/app/tooldev/numactl-2.0.13
LDFLAGS="-fuse-ld=gold -lrt  -L$myNUMA/lib -Wl,-rpath,$myNUMA/lib" \
CFLAGS="-I$myNUMA/include" \
##--
export myKNEM=/home1/p001cao/app/tooldev/knem1.1.3
export myOFI=/home1/p001cao/app/tooldev/libfabric-1.10.1
--with-verbs=${myOFI} --with-knem=${myKNEM} \
https://developer.arm.com/tools-and-software/server-and-hpc/help/porting-and-tuning/building-open-mpi-with-openucx/running-openmpi-with-openucx
```

## Compile with Intel

```shell
module load intel/compiler-xe19u5
export PATH=/home1/p001cao/app/intel/xe19u5/compilers_and_libraries_2019.5.281/linux/bin/intel64:$PATH
export CC=icc  export CXX=icpc  export FORTRAN=ifort
export LD_LIBRARY_PATH=/home1/p001cao/app/intel/xe19u5/compilers_and_libraries_2019.5.281/linux/compiler/lib/intel64_lin:$LD_LIBRARY_PATH

export LD_LIBRARY_PATH=/home1/p001cao/app/tooldev/glibc-2.18/lib:$LD_LIBRARY_PATH
export LD_LIBRARY_PATH=/usr/local/lib

export myKNEM=/home1/p001cao/app/tooldev/knem1.1.3
export myOFI=/home1/p001cao/app/tooldev/libfabric-1.10.1

../contrib/configure-release --disable-numa --enable-mt LDFLAGS="-fuse-ld=lld -lrt" \
--with-verbs=${myOFI} --with-knem=${myKNEM} \
--prefix=/home1/p001cao/app/tooldev/ucx-1.8-intel
```

List of main transports and aliases
<https://github.com/openucx/ucx/wiki/UCX-environment-parameters>
all use all the available transports.
sm  all shared memory transports.
shm same as "sm".
ugni    ugni_rdma and ugni_udt.
rc  RC (=reliable connection), and UD (=unreliable datagram) for connection bootstrap.
"accelerated" transports are used if possible.
ud  UD transport, "accelerated" is used if possible.
dc  DC - Mellanox scalable offloaded dynamic connection transport
rc_x    Same as "rc", but using accelerated transports only
rc_v    Same as "rc", but using Verbs-based transports only
ud_x    Same as "ud", but using accelerated transports only
ud_v    Same as "ud", but using Verbs-based transports only
tcp     TCP over SOCK_STREAM sockets
rdmacm  Use RDMACM connection management for client-server API
sockcm  Use sockets-based connection management for client-server API
cuda_copy   Use cu\*Memcpy for hostcuda device self transfers but also to detect cuda memory
gdr_copy    Use GDRcopy library for hostcuda device self transfers
cuda_ipc    Use CUDA-IPC for cuda devicedevice transfers over PCIe/NVLINK
rocm_copy   Use for host-rocm device transfers
rocm_ipc    Use IPC for rocm device-device transfers
self    Loopback transport to communicate within the same process

## II. UCX optional Libs

### 1. rdma-core (fail)

UCX detects the exiting libraries on the build machine and enables/disables support for various features accordingly. If some of the modules UCX was built with are not found during runtime, they will be silently disabled.
Basic shared memory and TCP support - always enabled
Optimized shared memory - requires knem or xpmem drivers. On modern kernels also CMA (cross-memory-attach) mechanism will be used.
RDMA support - requires rdma-core or libibverbs library.
NVIDIA GPU support - requires Cuda drives
AMD GPU support - requires ROCm drivers

```shell
git clone https://github.com/linux-rdma/rdma-core  rdma-core
cd rdma-core
tar xvf rdma-core-30.0.tar.gz
cd rdma-core-30.0

module load compiler/gcc-10.1.0
module load tooldev/cmake-3.17.2
module load tooldev/libnl-3.0
module load tooldev/libtool-2.4.6

export LD_LIBRARY_PATH=/home1/p001cao/app/tooldev/libnl-3.0/lib:$LD_LIBRARY_PATH ./build.sh
```

### 2. libnuma-devel

<https://github.com/numactl/numactl>

```shell
tar xzf numactl-2.0.13.tar.gz
cd numactl-2.0.13

module load tooldev/autoconf-2.69b
./autogen.sh

mkdir build && cd build
../configure --prefix=/home1/p001cao/app/tooldev/numactl-2.0.13
```

### 3. openMPI/UCX: libfabric ()

wget <https://github.com/ofiwg/libfabric/releases/tag/v1.11.1/libfabric-1.11.1.tar.bz2>
If building directly from the libfabric git tree, run './autogen.sh' before the configure step.

```shell
module load tooldev/autoconf-2.69b
./autogen.sh

tar -xvf libfabric-1.11.1.tar.bz2
cd libfabric-1.11.1
module load compiler/gcc-10.2

## IB cluster
./configure --prefix=/uhome/p001cao/app/tooldev/libfabric-1.11.1-IB

## noIB cluster
./configure --prefix=/uhome/p001cao/app/tooldev/libfabric-1.11.1-noIB

## module
prepend-path PKG_CONFIG_PATH $topdir/lib/pkgconfig
```

### 4. openMPI/UCX: KNEM

<https://knem.gitlabpages.inria.fr/>

```shell
tar zxvf knem-1.1.4.tar.gz
cd knem-1.1.4
./configure --prefix=/uhome/p001cao/app/tooldev/knem-1.1.4
```

### 5. openMPI/UCX: XPMEM

<https://github.com/hjelmn/xpmem/releases/tag/v2.6.3>

<https://github.com/hjelmn/xpmem/wiki/Installing-XPMEM>
--> cannot install: require linux kernel 4.x

```shell
check: uname -a
```

```shell
tar zxvf xpmem-2.6.3.tar.gz
cd xpmem-2.6.3

./configure --prefix=/home1/p001cao/app/tooldev/xpmem-2.6.2
```

## Compile with LLVM

### USC2

#### Prepare source code

Use one of these two following options (now using **from source code**)

**From pre-configured Release**

???+ note
    - ucx-1.12.1 cause compiling error due to missing file. But ucx-1.13 work
    - "-fuse-ld=lld -lrt" error with ucx-1.12.0, so use 'gold' temporary. But lld work with ucx-1.13


```shell
cd /home1/p001cao/local/wSourceCode/tooldev
tar xvf ucx-1.13.1.tar.gz
cd ucx-1.13.1
```

**From source code**

???+ note
    - consider to update: `autoconf`, `libtool`, and `automake`
    - To solve error with `libuct_ib.la: command not found`, use `./contrib/configure-release` but not `/configure`
    - It deos not work with clang 16 (not use now).


```shell
cd /home1/p001cao/0SourceCode/tooldev
# git clone --branch v1.15.x https://github.com/openucx/ucx.git  ucx-1.15.x
cd ucx-1.15.x
git pull origin v1.15.x

module load tooldev/autoconf-2.72c
module load tooldev/automake-1.16.5
module load tooldev/libtool-2.4.7
export ACLOCAL_PATH=/home1/p001cao/app/tooldev/libtool-2.4.7/share/aclocal

./autogen.sh
```

#### Building

```shell
rm -rf build && mkdir build  &&  cd build

module load compiler/llvm-17          # clang + lld

export PATH=/home1/p001cao/app/compiler/llvm-17/bin:$PATH
export CC=clang export CXX=clang++
export LDFLAGS="-fuse-ld=lld -lrt"
export CFLAGS='-gdwarf-4 -gstrict-dwarf'
export CFLAGS="-Wno-unused-but-set-variable"
export myPREFIX=/home1/p001cao/app/tooldev/ucx-1.15


../contrib/configure-release --enable-mt --with-rc --with-dc --with-ud --prefix=${myPREFIX}

make -j 16 && make install
```

#### Make module file

at directory: /uhome/p001cao/local/share/lmodfiles/GCC --> create file "gcc-11.2"

```shell
# for Tcl script use only
set     topdir          /home1/p001cao/app/tooldev/ucx-1.15

prepend-path    PATH                    $topdir/bin
prepend-path    INCLUDE                 $topdir/include
prepend-path    LD_LIBRARY_PATH         $topdir/lib
prepend-path    PKG_CONFIG_PATH         $topdir/lib/pkgconfig
```
