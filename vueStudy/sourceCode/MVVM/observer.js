import Dep from './dep';

function observer (data) {
    if (!data || typeof data !== 'object') return;

    for (let key of Object.keys(data)) {
        defineReactive(data, key, data[key])
    }
}

function defineReactive (data, key, val) {
    observer(val);
    let dep = new Dep();
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get: function () {
            Dep.target && dep.depend();
            return val;
        },
        set: function (newVal) {
            if (newVal === val) return;
            val = newVal;
            dep.notify();
        }
    });
}

export default observer;