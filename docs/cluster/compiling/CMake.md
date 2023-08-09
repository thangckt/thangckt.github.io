# CMake

- need C++ compiler to install CMAKE, so need to load C++ compiler before install
- Source code repo: [https://github.com/Kitware/CMake](https://github.com/Kitware/CMake)
- or download CMake from: [https://cmake.org/download](https://cmake.org/download)

```shell
cd /home1/p001cao/0SourceCode/tooldev
wget https://cmake.org/files/v3.27/cmake-3.27.0.tar.gz
tar zxvf cmake-3.27.0.tar.gz
cd cmake-3.27.0
```

## USC 1 (Eagle)

``` sh
module load compiler/gcc-10.3

./configure --prefix=/uhome/p001cao/app/tooldev/cmake-3.27

make -j 20 && make install
```

## USC 2 (Tacheon)

``` sh
cd /home1/p001cao/0SourceCode/tooldev
tar zxvf cmake-3.27.0.tar.gz
cd cmake-3.27.0

module load compiler/gcc-13

./configure --prefix=/home1/p001cao/app/tooldev/cmake-3.27

make -j 16 && make install
```

## create module file
cd /uhome/p001cao/local/Imodfiles  -->  create file "cmake-3.27"

``` sh
# for Tcl script use only
set         topdir              /uhome/p001cao/app/tooldev/cmake-3.27

setenv          cmake           $topdir
prepend-path    PATH            $topdir/bin
prepend-path    INCLUDE 	      $topdir/share/cmake-3.27/include
```

Validate installation:
``` sh
module load cmake-3.27
cmake --version
```

Ref:
- [https://pachterlab.github.io/kallisto/local_build.html](https://pachterlab.github.io/kallisto/local_build.html)
- [https://github.com/Kitware/CMake](https://github.com/Kitware/CMake)
