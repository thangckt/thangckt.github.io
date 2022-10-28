---
sort: 1
---

# Compiling

{% include list.liquid all=true %}


## What is needed on cluster?

### 1. Compiler and linker
Compile in order
- GCC
- Biutils
- Clang (use GCC + gold)
- Cmake (use GCC)

### 2. OpenMPI
Compile in order (need Clang or GCC)
- UCX (optional, but should use)
- PMIX (optional)
- OpenMPI

### 3. Lammps
Compile in order (need OpenMPI)
- FFTW (optional, but should use)
- conda
- zlib (optional, but should use on old cluster)
- Lammps
