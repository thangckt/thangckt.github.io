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

make install
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
