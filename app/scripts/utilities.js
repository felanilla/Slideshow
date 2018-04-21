var UTILITIES = {

    getClasses: function(element) {
        var className = document.getElementsByClassName(element);
        var classNameCount = className.length;
        var classStore = new Array();
        for (var i = 0; i < classNameCount; i++) {
            classStore.push(className[i].classList.item(0) + '-' + i);
            className[i].classList.add(className[i].classList.item(0) + '-' + i);
        }
        return classStore;
    }
};

module.exports = {
    getClasses : UTILITIES.getClasses
};
