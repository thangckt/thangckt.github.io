#### BLACS (fail)

https://thelinuxcluster.com/2011/03/27/compiling-blacs-on-centos-5/


``` sh
cd /home1/p001cao/0SourceCode/tooldev
# wget --no-check-certificate https://www.netlib.org/blacs/mpiblacs.tgz
# wget --no-check-certificate https://www.netlib.org/blacs/mpiblacs-patch03.tgz
tar -xvf mpiblacs.tgz
tar -xvf mpiblacs-patch03.tgz
cd BLACS
cp ./BMAKES/Bmake.MPI-LINUX Bmake.inc
```

``` sh
module load mpi/ompi4.1.x-gcc9
```


1. Edit file `Bmake.in`  [see this](https://www.open-mpi.org/faq/?category=mpi-apps#blacs)

``` sh
#=============================================================================
#====================== SECTION 1: PATHS AND LIBRARIES =======================
#=============================================================================
BTOPdir = /home1/p001cao/0SourceCode/tooldev/BLACS
#  -------------------------------------
#  Name and location of the MPI library.
#  -------------------------------------
   MPIdir = /home1/p001cao/app/openmpi/4.1.x-gcc9
   MPILIBdir =
   MPIINCdir = $(MPIdir)/include
   MPILIB =

#=============================================================================
#========================= SECTION 2: BLACS INTERNALS ========================
#=============================================================================
   SYSINC =
   INTFACE = -Df77IsF2C
   SENDIS =
   BUFF =
   TRANSCOMM = -DUseMpi2
   WHATMPI =
   SYSERRORS =

#=============================================================================
#=========================== SECTION 3: COMPILERS ============================
#=============================================================================
   F77            = $(MPIdir)/mpif77
   CC             = $(MPIdir)/mpicc
```

2. Edit `TESTING/Makefile`
```make
blacstest.o : blacstest.f
	$(F77) $(F77NO_OPTFLAGS) -c $*.f
```
to:
```make
blacstest.o : blacstest.f
	$(F77) $(F77NO_OPTFLAGS) -fno-globals -fno-f90 -fugly-complex -w -c $*.f
```

3. Compile the Blacs tests
``` sh
cd TESTING
make clean && make
```
You should see `xCbtest_MPI-LINUX-1` and `xFbtest_MPI-LINUX-1`


