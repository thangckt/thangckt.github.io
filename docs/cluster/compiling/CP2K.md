
CP2K is a quantum chemistry and solid state physics software package that can perform atomistic simulations of solid state, liquid, molecular, periodic, material, crystal, and biological systems. CP2K provides a general framework for different modeling methods such as DFT using the mixed Gaussian and plane waves approaches GPW and GAPW. Supported theory levels include DFTB, LDA, GGA, MP2, RPA, semi-empirical methods (AM1, PM3, PM6, RM1, MNDO, …), and classical force fields (AMBER, CHARMM, …). CP2K can do simulations of molecular dynamics, metadynamics, Monte Carlo, Ehrenfest dynamics, vibrational analysis, core level spectroscopy, energy minimization, and transition state optimization using NEB or dimer method.

![](https://www.cp2k.org/_media/wiki:logo.png)\

# Compile CP2K

## USC2_Tachyon - Centos 6.9

???+ note
    Error not found package `DBCSR` (lack of file `findDBCSR.cmake`)

???+ tip "See also"

    [Build cp2k with cmake](https://github.com/cp2k/cp2k/pull/2364)

```shell
cd /home1/p001cao/local/wSourceCode
git clone --recursive -b support/v2023.1 https://github.com/cp2k/cp2k.git cp2k-2023
cd cp2k-2023
# git pull origin master
mkdir build_LLVM && cd build_LLVM
```

```sh
module load tooldev/cmake-3.24
module load tooldev/binutils-2.37
module load tooldev/gsl-2.7
module load mpi/ompi4.1.x-clang14
module load fftw/fftw3.3.10-ompi4.1.4-clang14
module load tooldev/ScaLAPACK-2.2

export myCOMPILER=/home1/p001cao/local/app/openmpi/4.1.x-clang14
export PATH=${myCOMPILER}/bin:$PATH
export CC=mpicc  export CXX=mpic++  export FC=mpifort
export myLAPACK=/home1/p001cao/local/app/tooldev/ScaLAPACK-2.2/lib/libscalapack.a
export myPREFIX=/home1/p001cao/local/app/cp2k/llvmOMPI4-cp2k-2023

cmake ../ -DCP2K_SCALAPACK_LINK_LIBRARIES=${myLAPACK} \
 -DCP2K_USE_LIBXSMM=OFF -DCP2K_USE_DBCSR=OFF \
 -DCMAKE_INSTALL_PREFIX=${myPREFIX}
```

```sh
make -j 16 && make install
```
