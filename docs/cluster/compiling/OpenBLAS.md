
# OpenBLAS
OpenBLAS contains BLAS and LAPACK

## Tachyon - Centos 6.8

### GCC

```sh
cd /home1/p001cao/0SourceCode/tooldev
# git clone https://github.com/xianyi/OpenBLAS.git openBLAS
cd openBLAS
git checkout v0.3.23
rm -rf build && mkdir build && cd build

module load tooldev/cmake-3.27
module load compiler/gcc-11

myGCC=/home1/p001cao/app/compiler/gcc-11
export PATH=$myGCC/bin:$PATH
export CC=$myGCC/bin/gcc export CXX=$myGCC/bin/g++ export FC=$myGCC/bin/gfortran
myPREFIX=/home1/p001cao/app/tooldev/openBLAS-0.3.23

cmake .. -DBUILD_SHARED_LIBS=on -DCMAKE_INSTALL_PREFIX=$myPREFIX

make -j 16 && make install
```