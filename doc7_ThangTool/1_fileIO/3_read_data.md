---
sort: 3
---

# read_data

This module contains functions to read data from text files.



## logMFD
[source](https://hide_url.com\blob\main\../thatool/io/read_data.py\#L13)
```python
.logMFD(
   file_name, dim = 1, mod = 'full'
)
```

---
Function to read data from LogMFD calculation.


**Args**

* **file_name** (str) : the logmfd.out file.
* **dim** (int, optional) : dimension of LogMFD calulation. Defaults to 1.
* **mod** (str, optional) : mode 'compact' read only Mean-Force and CV, mode 'full' read whole text file. Defaults to 'full'.


**Raises**

* **Exception**  : _description_


**Returns**

df (pd.DataFrame)

----


## matrix_auto
[source](https://hide_url.com\blob\main\../thatool/io/read_data.py\#L50)
```python
.matrix_auto(
   file_name, column_line = None, set_column_name = None, comment = '#',
   read_note = False
)
```

---
Function to read Data that number of values in each line are not equal, ex: p2p binance (missing values)
This cannot be read by Numpy, Pandas,...


**Args**

* **file_name** (str) : the text file.
* **column_line** (int, optional) : the line to extract column-names. Defaults to None.
* **set_column_name** (list, optional) : Names of columns to extract. Defaults to None.
* **comment** (str) : comment-line mark. Defaults to "#".


**Returns**

df (pd.DataFrame)

---
Notes:
        To return 2 lists from list comprehension, it is better (may faster) running 2 separated list comprehensions.
        .strip() function remove trailing and leading space in string.

----


## matrix
[source](https://hide_url.com\blob\main\../thatool/io/read_data.py\#L102)
```python
.matrix(
   file_name, column_line = None, set_column_name = None, usecols = None
)
```

---
Function to read Data that is as a regular matrix.
The names of columns are exatract based on `set_column_name` or `column_line`.
If both `set_column_name` and `column_line` are not available, the default column's name is: 0 1 2...


**Args**

* **file_name** (str) : the text file.
* **column_line** (int, optional) : the line to extract column-names. Defaults to None.
* **set_column_name** (list, optional) : Names of columns to extract. Defaults to None.
* **usecols** (tuple, optional) : only extract some columns. Defaults to None.


**Returns**

df (pd.DataFrame)

----


## lammps_var
[source](https://hide_url.com\blob\main\../thatool/io/read_data.py\#L161)
```python
.lammps_var(
   file_name, var_name = None
)
```

---
Function to extract variable values from LAMMPS input file.


**Args**

* **file_name** (str) : the text file in LAMMPS input format.
* **var_name** (list, optional) : list of varibalbes to be extracted. Default to []. mean extract all.


**Returns**

* **ds** (pd.Series) : pandas Series contains variable in Lammps file


----


## plumed_var
[source](https://hide_url.com\blob\main\../thatool/io/read_data.py\#L189)
```python
.plumed_var(
   file_name, var_name, block_name = None
)
```

---
Function to extract variable values from PLUMED input file.


**Args**

* **file_name** (str) : the text file in LAMMPS input format.
* **var_name** (str) : list of keyworks in PLUMED, ex: INTERVAL,...
* **block_name** (str, optional) : block command in Plumed, ex: METAD, LOGMFD. Defaults to None.


**Returns**

* **value** (float) : value of plumed_var.

---
Search number: https://stackoverflow.com/questions/15814592/how-do-i-include-negative-decimal-numbers-in-this-regular-expression

----


## load_data_from_dir
[source](https://hide_url.com\blob\main\../thatool/io/read_data.py\#L219)
```python
.load_data_from_dir(
   search_key = 'deform_', file_ext = '.txt', read_note = False
)
```

---
read data from all *.txt files in current and sub-folders.


**Args**

* **search_key** (str) : a string to search file_name.
* **file_ext** (str) : file extension. Default to '.txt'


**Returns**

* **ldf** (list-of-DataFrame) : list of DataFrames.

---
        files (list): list of file_names
