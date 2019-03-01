function inherit(subClass, superClass) {
  function F() {}

  F.prototype = superClass.prototype;

  const f = new F();

  f.constructor = subClass;
  subClass.prototype = f;
}

function SuperClass(name) {
  this.name = name;
}

SuperClass.prototype.getName = function () {
  console.log(this.name);
};

function SubClass(name, age) {
  SuperClass.call(this, name);
  this.age = age;
}

inherit(SubClass, SuperClass);

SubClass.prototype.getAge = function () {
  console.log(this.age);
};

const s1 = new SubClass('liming', 12);

s1.getName();
s1.getAge();

