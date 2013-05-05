## PathFinder

PathFinder is a lightweight JS object that allows creation and addition of path-like namespacing.

### Usage

#### Add a Namespace
    PathFinder.add('namespace'[,'namespace']...[,object/function])
creates the given namespace(s) in the given object/function. If the last argument is not a valid object/function, it will create them from the window namespace.

    namespace.add('namespace'[,'namespace']...[,object/function])
creates the given namespace(s) in the given object/function. If the last argument is not a valid object/function, it will create them within the calling namespace.

##### Examples
    PathFinder.add('a.b.c.d')
Will create window.a, window.a.b, window.a.b.c, and window.a.b.c.d in one step. Returns PathFinder for further chaining.

    PathFinder.add('c.d', a.b)
Will create window.a.b.c, and window.a.b.c.d in one step, if a.b exists. Otherwise, it will create them in the window namespace. Returns PathFinder for further chaining.

    PathFinder.add('a1','a2.b','a3.c')
Will create `a1`, `a2`, `a2.b`, `a3`, `a3.c` in the window namespace.
    
    a.add('b.c.d')
Will create a.b, a.b.c, and a.b.c.d in one step, provided that a is a Namespace created by Pathfinder. Returns a for further chaining.

    a.add('c.d', b)
Will create b.c and b.c.d, provided that b is a valid object/function. If b is not a valid object/function, will create a.c and a.d. Returns a for further chaining.


#### Get a Namespace
    `PathFinder('namespace')` 
Returns the defined namespace, if it exists. Otherwise, it returns `null`.

##### Examples
    PathFinder('a.b.c') 
Returns `c`, if `a`,`b` and `c` exist **and** are located in each other. 

#### Getting to Root Namespace
    namespace.top()
    namespace.root()
Returns the recorded root namespace of the namespace.

##### Example
    a.b.c.d.root()
Will return `a`, if `a`,`b`,`c` and `d` were accessed at any point using `PathFinder.add()`.

#### Moving Up
    namespace.up()
Will return the recorded parent namespace of the namespace.

##### Example
    a.b.c.d.up()
Will return `c`, if `a`,`b`,`c` and `d` were accessed at any point using `PathFinder.add()`.

#### Getting the Full Namespace Path
    namespace.fullPath()
Will return the recorded `fullPath` of the namespace.

##### Example (using a.b.c.d)
    d.fullPath()
Will return `a.b.c.d`

### Special Usage
    PathFinder()
One nice thing is that PathFinder will get any object along the chain, as long as the chain is valid. This means that you can do a simple multi-namespace check for validity. Or, if you have the `fullPath` of the object/function, you can get it easily.

    PathFinder.add()
PathFinder uses non-destructive, non-referential objects to minimize on leakage and provide maximum benefit. What does this mean? Let's assume that `a`, `a.b`, and `a.b.c` exist. When we `PathFinder('a.b.c.d')`, PathFinder will determine that `a`, `a.b`, and `a.b.c` are valid and will add only a pfcfg object to them. Then it will create `a.b.c.d` giving it the appropriate methods. To avoid incompatibilities, it will not add the `up()` and `root()` methods. Additionally, all pfcfg properties are text, not references.

#### Example of Non-referential Navigation
Assuming that we have a namespace `a.b.c.d` and all parents were 'touched' by `PathFinder.add()`, the following command will work easily (provided `d` is a valid reference).

   PathFinder(d.up().fullPath())
    
### PathFinder Alias

For convenience, if `pf()` is not defined, PathFinder will define it. Use `pf()` exactly as you use `PathFinder()`.

### The PFCFG Object
`pfcfg` stores only strings that can be used by `PathFinder()`. These strings are calculated whenever you `PathFinder.add()` a namespace (even if a namespace is not created). Current properties in the `pfcfg` include `name`,`root`,`fullPath`, and `parent`.
