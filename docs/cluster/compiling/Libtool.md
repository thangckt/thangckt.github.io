---
sort: 5
---

# Libtool

Libtool needed in the case compiling from source code. Some source codes do not release with `configure` file, then `libtool` is used to accompanied with `autoconf` and `automake` to run:

```sh
./autogen.sh
```

The above command with produce `configure` file, after the configuration can be proceeded with

```sh
./configure ........
```

## Libtool

[Website](https://www.gnu.org/software/libtool/)

```sh
cd /home1/p001cao/local/wSourceCode/tooldev
wget http://ftp.jaist.ac.jp/pub/GNU/libtool/libtool-2.4.7.tar.gz
tar xvfz libtool-2.4.7.tar.gz
cd libtool-2.4.7
```

```sh
./configure --prefix=/home1/p001cao/local/app/tooldev/libtool-2.4.7

make && make install
```

**Module file**

```shell
# for Tcl script use only
set     topdir          /home1/p001cao/local/app/tooldev/libtool-2.4.7

prepend-path    PATH                $topdir/bin
prepend-path    LD_LIBRARY_PATH     $topdir/lib
prepend-path    INCLUDE             $topdir/include
prepend-path    PKG_CONFIG_PATH     $topdir/lib/pkgconfig
```

## Autoconf

Autoconf is an extensible package of M4 macros that produce shell scripts to automatically configure software source code packages.

- [Website](https://www.gnu.org/software/autoconf/)
- [Repo](https://ftp.gnu.org/gnu/autoconf/?C=M;O=D)

```sh
cd /home1/p001cao/local/wSourceCode/tooldev
wget https://ftp.gnu.org/gnu/autoconf/autoconf-2.71.tar.gz
```
Alpha/beta releases of Autoconf
```sh
cd /home1/p001cao/local/wSourceCode/tooldev
wget https://alpha.gnu.org/pub/gnu/autoconf/autoconf-2.72c.tar.gz --no-check-certificate
tar zxf autoconf-2.72c.tar.gz
cd autoconf-2.72c
```

```sh
./configure --prefix=/home1/p001cao/local/app/tooldev/autoconf-2.72c

make && make install
```

**Module file**

```shell
# for Tcl script use only
set     topdir          /home1/p001cao/local/app/tooldev/autoconf-2.72

prepend-path    PATH                    $topdir/bin
prepend-path    LD_LIBRARY_PATH         $topdir/share
```

## Automake

GNU Automake is a tool for automatically generating Makefile.in files compliant with the GNU Coding Standards. Automake requires the use of [GNU Autoconf](https://www.gnu.org/software/automake/).

- [Website](https://www.gnu.org/software/automake/)
- [Repo](https://ftp.gnu.org/gnu/automake/?C=M;O=D)

``` note
Require autoconf>=2.65
```

```sh
cd /home1/p001cao/local/wSourceCode/tooldev
wget http://ftp.gnu.org/gnu/automake/automake-1.16.5.tar.gz
tar xvzf automake-1.16.5.tar.gz
cd automake-1.16.5

module load tooldev/autoconf-2.71
```

```sh
./configure --prefix=/home1/p001cao/local/app/tooldev/automake-1.16.5

make && make install
```

usage:

```sh
export ACLOCAL_PATH=/home1/p001cao/local/app/tooldev/libtool-2.4.7/share/aclocal
```

**Module file**

```shell
# for Tcl script use only
set     topdir          /home1/p001cao/local/app/tooldev/automake-1.16.5

prepend-path    PATH                    $topdir/bin
```

## GSL

[GSL](https://www.gnu.org/software/gsl/) is needed to link LAPACK & BLAS libraries when installing Plumed in Lammps (but no need now)

```sh
cd /home1/p001cao/local/wSourceCode/tooldev
wget ftp://ftp.gnu.org/gnu/gsl/gsl-2.7.tar.gz
tar xvzf gsl-2.7.tar.gz
cd gsl-2.7

./configure --prefix=/home1/p001cao/local/app/tooldev/gsl-2.7

make && make install
```

**Module files**

```tcl
set     topdir          /home1/p001cao/local/app/tooldev/gsl-2.7

prepend-path    PATH                $topdir/bin
prepend-path    LD_LIBRARY_PATH     $topdir/lib
prepend-path    INCLUDE             $topdir/include

prepend-path   PKG_CONFIG_PATH      $topdir/lib/pkgconfig
```

???+ tip "See also"

    [Install GSL on Linux (Ubuntu, Centros, Redhat, Mac OS) + Simple Installation of gcc Compilers](https://coral.ise.lehigh.edu/jild13/2016/07/11/hello/)
