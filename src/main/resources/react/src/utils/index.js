export function immutableSplice(arr, index){
    if(arr.length<=index){
        return arr;
    }
    return arr.slice(0,index).concat(arr.slice(index+1));
}

//function courtesy: https://stackoverflow.com/a/21627295/299708
export function isVisibleY(el){
    var rect = el.getBoundingClientRect()
    , top = rect.top
    , height = rect.height; 
    el = el.parentNode;
    do {
      rect = el.getBoundingClientRect();
      if (!(top <= rect.bottom)) return false;
      // Check if the element is out of view due to a container scrolling
      if ((top + height) <= rect.top) return false
      el = el.parentNode;
    } while (el !== document.body);
    // Check its within the document viewport
    return top <= document.documentElement.clientHeight;
};

/**
 *  NB: to use this method, you need to bind it to the object instance calling it
 */
export function bindMethodsToSelf(objClass, otherMothodsToIgnore=[]){
    const self = this;
    Object.getOwnPropertyNames(objClass.prototype).forEach(method => {
        //skip constructor, render and any overrides of lifecycle methods
        if(method.startsWith('component') || method==='constructor' || method==='render') return;
        //any other methods you don't want bound to self
        if(otherMothodsToIgnore.indexOf(method)>-1) return;
        //bind all other methods to class instance
        self[method] = self[method].bind(self);
    });
}