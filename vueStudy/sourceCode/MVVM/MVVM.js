import observer from './observer';
import Compile from './compile';

class MVVM {
    constructor (options) {
       this.$options =  options;
       let data = this._data = this.$options.data;

       observer(data);
   
       // 数据代理
       // 实现 vm.xxx -> vm._data.xxx
       Object.keys(data).forEach(key =>  this._proxyData(key));

       this._initComputed();

       this.$compile = new Compile(options.el || document.body, this)
    }

    _proxyData (key) {
        let me = this;
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                return me._data[key];
            },
            set: function proxySetter(newVal) {
                me._data[key] = newVal;
            }
        });
    }

    _initComputed() {
        var me = this;
        var computed = this.$options.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(function(key) {
                Object.defineProperty(me, key, {
                    get: typeof computed[key] === 'function' 
                            ? computed[key] 
                            : computed[key].get,
                    set: function() {}
                });
            });
        }
    }
}

window.MVVM = MVVM;