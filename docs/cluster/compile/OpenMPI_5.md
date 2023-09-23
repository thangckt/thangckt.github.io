
# OpenMPI-5

- There is no `--with-verb` anymore. And openib BTL is remove in this version, so InfiniBand must use "ucx PML". [See more](https://www.open-mpi.org/faq/?category=openfabrics
- May use UCX with OMPI-5 and do not need seperate installation for Eagle, Lion?
- May not be used with UCX-1.11
- See news in 5.x [here](https://github.com/open-mpi/ompi/wiki/5.0.x-FeatureList)
- Use UCX or Libfabric for IB. (Libfabric may use a lot of memory, so may lead to memory problem)
- UCX + OMPI4 may cause `address not mapped` error with GPAW.

## USC1: (Cenntos 6.5)

```shell
module load tool_dev/binutils-2.36                       # gold, should use to avoid link-error
module load compiler/gcc-11.2
export myUCX=/uhome/p001cao/app/tool_dev/ucx-1.11
```

```shell
cd openmpi-5.0.0
mkdir build_eagle && cd build_eagle

../configure CC=gcc CXX=g++ FC=gfortran F77=gfortran LDFLAGS="-fuse-ld=gold -lrt" \
--with-sge --with-ucx=${myUCX}  \
--prefix=/uhome/p001cao/app/openmpi/5.0.0-gcc11.2-eagle
```


## Tachyon - Cenntos 6.9

### Using LLVM

- So far, with version `5.0.0rc12`, compiling fails with error `ld.lld: error: unable to find library -lnuma` and `-ludev`. This mean the current version of `libudev` no longer work. Tried install, but only numa work [install them](https://github.dev/thangckt/src_thangckt.github.io/tree/main/docs/cluster/compile/OpenMPI_4/)
- create link: `ln -sf /lib64/libudev.so.0.5.1 /home1/p001cao/app/compiler/llvm-17/lib/libudev.so.0`

``` sh
cd /home1/p001cao/0SourceCode
# git clone -b v5.0.x --recursive https://github.com/open-mpi/ompi.git  ompi-5.0.x
cd ompi-5.0.x
git pull origin v5.0.x

module load tooldev/autoconf-2.72c
module load tooldev/automake-1.16.5
module load tooldev/libtool-2.4.7
export ACLOCAL_PATH=/home1/p001cao/app/tooldev/libtool-2.4.7/share/aclocal

./autogen.pl
```

``` sh
rm -rf build_clang && mkdir build_clang && cd build_clang

module load compiler/llvm-17          # clang + lld

myLLVM=/home1/p001cao/app/compiler/llvm-17
export PATH=$myLLVM/bin:$PATH
export CC=clang CXX=clang++ FC=gfortran        # flang-new
export LDFLAGS="-fuse-ld=lld -lrt"
NUMAlib=/home1/p001cao/app/tooldev/numactl-2.0.13/lib
UDEVlib=/home1/p001cao/app/tooldev/libudev-zero/lib
export LD_LIBRARY_PATH=$myLLVM/lib:$NUMAlib:$UDEVlib:$LD_LIBRARY_PATH
ln -sf $UDEVlib/libudev.a $myLLVM/lib/libudev.so.0
myUCX=/home1/p001cao/app/tooldev/ucx1.15-clang17
KNEM=/home1/p001cao/app/tooldev/knem-1.1.4
OFI=/home1/p001cao/app/tooldev/libfabric-1.19
myPREFIX=/home1/p001cao/app/mpi/openmpi5.0.x-clang17

../configure --with-sge --with-ucx=${myUCX} --with-knem=${KNEM} --with-ofi=${OFI} --prefix=${myPREFIX}

make  -j 16 && make install
```


