---
sort: 1
---

# *class* LmpFrame

[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L71)
```python 
LmpFrame(
   dump_file = None, data_file = None, atom_style = 'auto', pdb_file = None,
   xyz_file = None, from_df = None, box = None, box_angle = None
)
```


---
Create an Object of single-FRAME of LAMMPS (use for both DATA/DUMP files). The docstring is in Google-style.

This class create a data-object (single configuration) for the analysis of computing data from LAMMPS. The file formats implemented in this class
- [LAMMPS DATA Format](https://docs.lammps.org/2001/data_format.html)
- [LAMMPS DUMP Format](https://docs.lammps.org/dump.html)
- [PDB format](https://ftp.wwpdb.org/pub/pdb/doc/format_descriptions/Format_v33_Letter.pdf)
- [XYZ format](https://www.cgl.ucsf.edu/chimera/docs/UsersGuide/xyz.html)

.. image:: https://icme.hpc.msstate.edu/mediawiki/images/e/e7/4kovito.gif

---
This class implemented several ways to create `lmpFRAME` object
        - create an empty data object
        - create_DATA object with input data
        - read from DUMP file
        - read from DATA file
        - read frome PDB file


**Args**

* **dump_file** (str, optional) : filename of DUMP file. Defaults to None.
* **data_file** (str, optional) : filename of DATA file. Defaults to None.
* **pdb_file** (str, optional) : filename of PBD file. Defaults to None.
* **xyz_file** (str, optional) : filename of XYZ file. Defaults to None.
* **from_df** (pd.DataFrame, optional) : create FRAME from data. Defaults to None.


**Attributes**

* **file_name** (str) : name of input file
* **timestep** (int) : the timestep of configuration
* **box** (3x2 np.array) : the box size
* **box_angle** (1x3 np.array) : the box angle
atom (pd.DataFrame) DataFrame of per-atom values
prop_key (list) column-names of properties
mass (pd.DataFrame) DataFrame of per-type masses
FMTstr (str) default format for float numbers, don't use %g because it will lost precision


**Examples**

```python
# empty object
da = io.LmpFrame()
# oject with input data
da = io.LmpFrame(from_df=df)
# from DUMP file
da = io.LmpFrame(dump_file='test.cfg')
# from DATA file
da = io.LmpFrame(data_file='mydata.dat')
# from PDB file
da = io.LmpFrame(pdb_file='test.pdb')
```

---
.. _Use chain mutator calls
        https://stackoverflow.com/questions/36484000/use-an-object-method-with-the-initializer-same-line


**Methods:**


## .create_DATA
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L195)
```python
.create_DATA(
   DataFrame, box = None, box_angle = None
)
```

---
The method to create new FRAME object with input data.


**Args**

* **DataFrame** (pd.DataFrame) :  of input data
* **box** (3x2 np.array, optional) : option to input boxSize. Defaults to None.
* **box_angle** (1x3 np.array, optional) : option to input box_angle. Defaults to None.


**Returns**

* **Obj** (LmpFrame) : update FRAME


**Examples**

```python
        da = io.LmpFrame()
        da.create_DATA(DataFrame=df)
        # or
        da = io.LmpFrame(from_df=df)
```

## .read_DUMP
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L232)
```python
.read_DUMP(
   file_name
)
```

---
The method to create FRAME object by reading DUMP file.


**Args**

* **file_name** (str) : name of input file


**Returns**

* **Obj** (LmpFrame) : update FRAME


**Examples**

```python
        da = io.LmpFrame()
        da.read_DUMP(DataFrame=df)
        # or
        da = io.LmpFrame(dump_file='mydata.cfg')
```
---
Notes:
        use list comprehension in code to get better performance

## .read_DATA
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L295)
```python
.read_DATA(
   file_name, atom_style = 'auto'
)
```

---
The method to create FRAME object by reading DATA file.
The style of atomistic system.The format of "data file" depend on the definition of ["atom_style"](https://lammps.sandia.gov/doc/atom_style.html).
See [list of atom_style format](https://lammps.sandia.gov/doc/read_data.html#description). Can be detected automatically, or explicitly setting
- atomic      : atom-ID atom-type x y z
- charge      : atom-ID atom-type q x y z
- molecular   : atom-ID molecule-ID atom-type x y z
- full        : atom-ID molecule-ID atom-type q x y z

Full [lammps_data format](https://docs.lammps.org/2001/data_format.html)


**Args**

* **file_name** (str) : name of input file
* **atom_style** (str, optional) : option to choose atom_style. Defaults to 'auto'.


**Returns**

* **Obj** (LmpFrame) : update FRAME


**Examples**

```python
        da = io.LmpFrame(data_file='mydata.dat')
```

---
Notes:
        ```

## .read_PDB
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L542)
```python
.read_PDB(
   file_name
)
```

---
The method to create FRAME object by reading PDB file.


**Args**

* **file_name** (str) : name of input file


**Returns**

* **Obj** (LmpFrame) : update FRAME
        record_name(str)
        atom_symbol(str): same as column 'type' in DUMP format
        residue_name(str)
        residue_id(int)
        chain(str)
        occupancy(float)
        beta(float)


**Examples**

```python
da = io.LmpFrame(pdb_file='mydata.pdb')
```

## .read_XYZ
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L602)
```python
.read_XYZ(
   file_name
)
```

---
The method to create FRAME object by reading XYZ file.


**Args**

* **file_name** (str) : name of input file


**Returns**

* **Obj** (LmpFrame) : update FRAME


**Examples**

```python
da = io.LmpFrame(pdb_file='mydata.pdb')
```

## .write_DUMP
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L620)
```python
.write_DUMP(
   file_name, column = None, FMTstr = None
)
```

---
The method to write DUMP file.


**Args**

* **file_name** (str) : name of input file
* **column** (list-of-str, optional) : contains columns to be written. Defaults to None, mean all columns will be written
* **FMTstr** (str, optional) : string format for output values. Defaults to None, mean use self._FMT


**Returns**

* **file**  : the DUMP file


**Examples**

```python
da.write_DUMP('test.cfg', column=['id','type','x','y','z'], FMTstr='%.4f')
```

## .write_DATA
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L692)
```python
.write_DATA(
   file_name, atom_style = 'atomic', ignore_vel = False, ignore_imgFlag = False,
   ignore_pair_coeff = False, comment_line = '', FMTstr = '%.6f'
)
```

---
The method to write DATA file. [DATA format](https://docs.lammps.org/2001/data_format.html)


**Args**

* **file_name** (str) : name of input file
* **atom_style** (str, optional) : the style of atomistic system, can be 'atomic', 'charge', 'molecular', 'full' . Defaults to 'atomic'.
* **ignore_vel** (bool, optional) : to write Velocity values. Defaults to False.
* **ignore_imgFlag** (bool, optional) : to write imgFlag tag. Defaults to False.
* **comment** (str, optional) : comment on second line in DATA file. Defaults to ''.
* **FMTstr** (str, optional) : string format for output values. Defaults to None, mean use self._FMT
* **ignore_pair_coeff** (bool, optional) : ignore pair-coeff when write data. Defaults to False.


**Returns**

* **file**  : the DUMP file


**Examples**

```python
da.write_DATA('test.dat', atom_style='atomic', ignore_imgFlag=False, ignore_vel=False, FMT='%.4f')
```

## .write_XYZ
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L902)
```python
.write_XYZ(
   file_name, column = ['X', 'xu', 'yu', 'zu'], FMTstr = None
)
```

---
The `method` to write XYZ file.


**Args**

* **file_name** (str) : name of input file
* **column** (list-of-str, optional) : contains columns to be written. Defaults to ['X','xu','yu','zu']
* **FMTstr** (str, optional) : string format for output values. Defaults to None, mean use self._FMT


**Returns**

* **file**  : the XYZ file


**Examples**

```python
da.write_XYZ('test.xyz')
```

## .write_PDB
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L953)
```python
.write_PDB(
   file_name, writeBox = False
)
```

---
The method to write [PDB file](https://zhanggroup.org/SSIPe/pdb_atom_format.html)


**Args**

* **file_name** (str) : name of input file
* **writeBox** (bool, optional) : write box or not. Defaults to False.


**Returns**

* **file**  : the PDB file


**Examples**

```python
da.write_PDB('test.pdb')
```

## .add_column
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L1060)
```python
.add_column(
   data, newColumn = None, replace = False
)
```

---
The method to add new columns to da.atom.


**Args**

* **data** (pd.DataFrame, pd.Series, list) : Nxm data of new columns
* **newColumn** (list) : 1xN list contains names of columns. Default to None, mean it will take columnNames from DataFrame
* **replace** (bool, optional) : replace column if existed. Defaults to False.


**Returns**

* **Obj** (LmpFrame) : Update da.atom


**Examples**

```python
da.add_column(df, myColumn=['col1','col2'], replace=True)
```

## .delete_column
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L1105)
```python
.delete_column(
   delColumns
)
```

---
The method to delete columns from da.atom.


**Args**

* **data** (pd.DataFrame, pd.Series, list) : Nxm data of new columns
* **delColumns** (list) : 1xN list contains names of columns to be deleted.


**Returns**

* **Obj** (LmpFrame) : Update da.atom


**Examples**

```python
da.delete_column(delColumns=['col1','col2'])
```

## .set_mass
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L1126)
```python
.set_mass(
   element_dict
)
```

---
The method to set masses of atoms in system. Before use it, need to define element_dict with 2 keys: 'type', 'atom_symbol'
element_dict={'type': list_values, 'atom_symbol':list_values}


**Args**

* **element_dict** (dict) : a dict to define atom-types and atom-symbols.


**Returns**

* **Obj** (LmpFrame) : Update da.atom


**Examples**

```python
da.set_mass(element_dict={'type':[1,2,3], 'atom_symbol':['C','H','N']})
```

## .combine_frame
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L1161)
```python
.combine_frame(
   LmpFrame, merge_type = False, alignment = 'comXYZ', shift_XYZ = None,
   separate_XYZ = None, merge_box = True, use_box = 'box1'
)
```

---
The method to combine 2 Lammps Frames.


**Args**

* **LmpFrame** (LmpFrame Obj) : an Object of LmpFrame
* **merge_type** (bool, optional) : merge the same type in 2 LmpFrame. Defaults to False.
* **alignment** (str, optional) : choose how to align 2 frame. Defaults to 'comXYZ'.
        + 'comXYZ': align based on COM
        + 'minXYZ': align based on left corner
        + 'maxXYZ': align based on right corner
* **shift_XYZ** (list, optional) : shift a distance from COM aligment. Defaults to [0,0,0].
* **separate_XYZ** (list, optional) : Separate 2 frame with a specific value. Defaults to [0,0,0].
* **merge_box** (bool, optional) : choose to merge box or not. Defaults to True.
* **use_box** (str, optional) : be used as the box size if merge_box=False. Defaults to 'box1'.

---
Return:
        Update LmpFrame da1

Usage:
        ```python
        da1.combine_frame(da2)
        ```

TO DO:
        combine box_angle

Refs:
        Deep copy: https://stackoverflow.com/questions/3975376/understanding-dict-copy-shallow-or-deep/3975388#3975388

## .unwrap_coord_DATA
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L1499)
```python
.unwrap_coord_DATA(
   imgFlag = ['x', 'y', 'z'], atom_types = []
)
```

---
The method to upwrap coords in DATA file.


**Args**

* **imgFlag** (list, optional) : image Flags in data file. Defaults to ['x','y','z'].
* **atom_types** (list, optional) : just unwrap some atom-types. Defaults to [], mean unwrap all-types.


**Returns**

* **Obj** (LmpFrame) : update FRAME

---
Notes:
        cannot unwrap_coord_data if imgFlags are not available.

## .flip_coords
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L1538)
```python
.flip_coords(
   dim = [1, 1, 1]
)
```

---
The method to flip coords over the center.


**Args**

* **dim** (list, optional) : choose the dimenstion to take flip. Defaults to [1,1,1].


**Returns**

* **Obj** (LmpFrame) : update FRAME

---
TODOs:
        Remove pandas Warning.

## .wrap_coords_DUMP
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L1598)
```python
.wrap_coords_DUMP(
   dim = [1, 1, 1]
)
```

---
The method to flip coords over the center.


**Args**

* **dim** (list, optional) : choose the dimenstion to take flip. Defaults to [1,1,1].


**Returns**

* **Obj** (LmpFrame) : update FRAME


## .change_atom_type
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L1617)
```python
.change_atom_type(
   old_type, new_type, save_old_type = True
)
```

---
The method to change types of atoms in system.


**Args**

* **old_type** (list) : a list of old-types.
* **new_type** (int) :  one new-type.
* **save_old_type** (bool) : to back up old types. Default to True.


**Returns**

* **Obj** (LmpFrame) : update FRAME


**Examples**

```python
da.chage_atom_type([1,2,3], 2)
```

## .merge_atom_type
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L1655)
```python
.merge_atom_type(
   old_type, save_old_type = True
)
```

---
The method to merge types of atoms in system.


**Args**

* **old_type** (list) : a list of old-types.
* **save_old_type** (bool) : to back up old types. Default to True.


**Returns**

* **Obj** (LmpFrame) : update FRAME


**Examples**

```python
da.chage_atom_type([1,2,3], 2)
```

## .copy
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L1676)
```python
.copy()
```

---
The method to make an indepedent copy of LmpFrame Obj. Then, the change values of the fields of the new object, the old object should not be affected by that.


**Args**

None


**Returns**

* **Obj** (LmpFrame) : new LmpFrame Obj.


**Examples**

```python
da1 = da.copy()
```
---
Refs:
        "shallow copying" vs "deep copying": https://stackoverflow.com/questions/3975376/understanding-dict-copy-shallow-or-deep/3975388#3975388

## .replicate
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L1695)
```python
.replicate(
   dim = [1, 1, 1]
)
```

---
The method to flip coords over the center.


**Args**

* **dim** (list, optional) : choose the dimenstion to take flip. Defaults to [1,1,1].


**Returns**

* **Obj** (LmpFrame) : update FRAME


## .scale_box
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L1724)
```python
.scale_box(
   scale = None, final = None, delta = None, remap = True
)
```

---
The method to change size of simulation box.


**Args**

* **scale** (list, optional) : to set scale ratio on each dimension of the box.
        scale = [0.7, 0.7, None] : if one dimension is set "None" its length is not changed.
* **final** (list, optional) : to set final length on each dimension of the box.
* **delta** (list, optional) : to set amount of change on each dimension of the box.
* **remap** (bool, optional) : remap atom coordinate. Default to True.


**Returns**

* **Obj** (LmpFrame) : update FRAME


**Examples**

```python
da.scale_box(scale=[0.7, 0.7, None])
```

## .check_exist
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L1774)
```python
.check_exist(
   atom_types = None, mass_types = None
)
```

---
The method to check whether something is existed in system or not.


**Args**

* **atom_types** (list-of-int, optional) : atom-types. Default to None.
* **mass_types** (list-of-int, optional) : atom-types. Default to None.


**Returns**

raise Message if error (mgs).


**Examples**

```python
da.isExist(atom_types=[2,3])
```
---
Notes:
        set() also return unique values.

## .compute_mass
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L1803)
```python
.compute_mass(
   atom_types = []
)
```

---
The method to compute mass of selected atom_types.


**Args**

* **atom_types** (list) : atom-types to compute masses. Defaults to [], mean all-types.


**Returns**

* **m** (float) : total mass of selected atoms.


**Examples**

```python
da.compute_mass(atom_types=[2,3])
```

## .compute_wt_percent
[source](https://hide_url.com\blob\main\../thatool/io/LmpFrame.py\#L1834)
```python
.compute_wt_percent(
   atom_types
)
```

---
The method to compute weight percentage of some atom_types.


**Args**

* **atom_types** (list) : atom-types compute percentage of weight.


**Returns**

* weight percentage of chosen atoms.


**Examples**

```python
da.compute_wt_percent(atom_types=[2,3])
```
