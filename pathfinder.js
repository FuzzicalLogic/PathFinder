(function(me, undefined){
    var cfgAlias = 'pfcfg',
        Namespace = function(cfg) {
            this[cfgAlias] = cfg || {}
        },
        fixPaths = function(o, cfg) {
            if (typeof o !== 'undefined')
                o[cfgAlias] = cfg;
        }
        createNS = function() {
            var n1 = arguments.length, n2 = 0,
                t = this === me ? window : this, 
                s, c, f, cfg, r, p, hasCfg;
            
            if (typeof arguments[n1 - 1] === 'object')
                t = arguments[--n1];
            
            for (var i = 0; i < n1; ++i) {
                s = arguments[i].split('.');
                
                c = s[0];
                hasCfg = typeof t[cfgAlias] !== 'undefined' ? t[cfgAlias] : null;
                
                r = hasCfg
                  ? typeof hasCfg.root !== 'undefined' ? hasCfg.root : s[0] 
                  : s[0];
                p = hasCfg
                  ? typeof hasCfg.name !== 'undefined' ? hasCfg.name : s[0]
                  : s[0];
                f = hasCfg
                  ? typeof hasCfg.fullPath !== 'undefined' ? hasCfg.fullPath + '.' + s[0] : s[0]
                  : s[0];
                  
                if (typeof t[c] === 'undefined')
                    c = t[c] = new Namespace({name:s[0],fullPath:f,root:r,parent:p});
                else {
                    c = t[c]; 
                    fixPaths(c, {name:s[0],fullPath:f,root:r,parent:p});
                }
                
                n2 = s.length;
                for (var j = 1; j < n2; ++j) {
                    f = f + '.' + s[j];
                    if (typeof c[s[j]] === 'undefined')
                        c = c[s[j]] = new Namespace({name:s[j],fullPath:f,root:r,parent:s[j-1]});
                    else { 
                        c = c[s[j]];
                        fixPaths(c,{name:s[j],fullPath:f,root:r,parent:s[j-1]});
                    }
                }
            }
            return this;
        };

    Namespace.prototype = {
        add: createNS,
        top: function() { return window[this[cfgAlias].root]; },
        root: function() { return window[this[cfgAlias].root]; },
        up: function() {
            return me(this[cfgAlias].fullPath.split('.').slice(0,-1).join('.'));
        },
        fullPath: function() { return this[cfgAlias].fullPath; },
        toString: function() { return this[cfgAlias].name; }
    };

    me.add = createNS;
    if (typeof window.pf === 'undefined') 
        window.pf = me;
}(window.PathFinder = window.PathFinder || function(){
    var s,n;
    if (typeof arguments[0] === 'string') {
        s = arguments[0].split('.');
        n = s.length;
        
        if (typeof window[s[0]] !== 'undefined')
            c = window[s[0]];
        else return null;
        
        for (var i=1;i<n;++i) {
            if (c[s[i]] !== 'undefined') 
                c = c[s[i]];
            else return null;
        }
        return c;
    }
}));