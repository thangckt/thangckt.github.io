
## OpenMPI-5

- There is no `--with-verb` anymore. And openib BTL is remove in this version, so InfiniBand must use "ucx PML". [See more](https://www.open-mpi.org/faq/?category=openfabrics
- May use UCX with OMPI-5 and do not need seperate installation for Eagle, Lion?
- May not be used with UCX-1.11
- See news in 5.x [here](https://github.com/open-mpi/ompi/tree/v5.0.x)

### USC1: (Cenntos 6.5)

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

### USC2 (Cenntos 6.9) GCC

- On Tacheon, UCX may give better performance.

``` shell
cd /home1/p001cao/local/wSourceCode
# git clone --branch v5.0.x --recursive https://github.com/open-mpi/ompi.git  ompi-5.0.x
cd ompi-5.0.x
git pull origin v5.0.x

module load tooldev/autoconf-2.72c
module load tooldev/automake-1.16.5
module load tooldev/libtool-2.4.7
export ACLOCAL_PATH=/home1/p001cao/app/tooldev/libtool-2.4.7/share/aclocal

./autogen.pl
```

``` shell
rm -rf build_gcc && mkdir build_gcc && cd build_gcc

module load compiler/gcc-13          # clang + lld

export myCOMPILER=/home1/p001cao/app/compiler/gcc-13
export PATH=${myCOMPILER}/bin:$PATH
export CC=gcc export CXX=g++ export FC=gfortran
export LDFLAGS="-fuse-ld=gold -lrt"
export myUCX=/home1/p001cao/app/tooldev/ucx-1.15
export myPREFIX=/home1/p001cao/app/openmpi/5.0.x-gcc13

../configure --with-sge --with-ucx=${myUCX} --prefix=${myPREFIX}
```

### USC2(Cenntos 6.9) - Clang
- So far, with version `5.0.0rc12`, compiling fails with error `ld.lld: error: unable to find library -lnuma` and `-ludev`

``` sh
cd /home1/p001cao/local/wSourceCode
# git clone --branch v5.0.x --recursive https://github.com/open-mpi/ompi.git  ompi-5.0.x
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

module load compiler/llvm-14          # clang + lld

export myCOMPILER=/home1/p001cao/app/compiler/llvm-14
export PATH=${myCOMPILER}/bin:$PATH
export CC=clang export CXX=clang++ export FC=gfortran
export LDFLAGS="-fuse-ld=lld -lrt"
export CPPFLAGS="-gdwarf-4 -gstrict-dwarf"                                 # avoid dwarf5 error
export myUCX=/home1/p001cao/app/tooldev/ucx-1.15
export myPREFIX=/home1/p001cao/app/openmpi/5.0.x-clang14

../configure --with-sge --with-ucx=${myUCX} --prefix=${myPREFIX}
```

```sh
make  -j 16 && make install
```


