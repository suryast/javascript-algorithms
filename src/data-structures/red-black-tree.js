(function (global) {

  'use strict';

  var Colors = {
    RED: 0,
    BLACK: 1
  };

  global.Colors = Colors;


  function Node(key, value, left, right, color) {
    this._key = key;
    this._left = left;
    this._right = right;
    this._value = value;
    this._color = color;
  }

  Node.prototype.isRed = function () {
    return this._color === Colors.RED;
  };

  Node.prototype.flipColor = function () {
    if (this._color === Colors.RED) {
      this._color = Colors.BLACK;
    } else {
      this._color = Colors.RED;
    }
  };

  'key value left right color'
  .split(' ')
  .forEach(function (key) {
    var valueName = key.substr(0, 1).toUpperCase() + key.substr(1, key.length);
    Node.prototype['get' + valueName] = function () {
      return this['_' + key];
    };
    Node.prototype['set' + valueName] = function (val) {
      this['_' + key] = val;
    };
  });

  global.Node = Node;


  function RBTree() {
    this._root = null;
  }

  RBTree.prototype.put = function (key, value) {
    this._root = this._put(key, value, this._root);
    this._root.setColor(Colors.BLACK);
  };

  RBTree.prototype.isRed = function (node) {
    if (!node) {
      return false;
    }
    return node.isRed();
  };

  RBTree.prototype._put = function (key, value, node) {
    var newRoot = node;
    if (node === null) {
      return new Node(key, value, null, null, Colors.RED);
    }
    if (node.getKey() > key) {
      node._left = this._put(key, value, node._left);
    } else if (node.getKey() < key) {
      node._right = this._put(key, value, node._right);
    }
    if (this.isRed(node._right) && !this.isRed(node._left)) {
      newRoot = this._rotateLeft(node);
    }
    if (this.isRed(node._left) && this.isRed(node._left._left)) {
      newRoot = this._rotateRight(node);
    }
    if (this.isRed(node._left) && this.isRed(node._right)) {
      this._flipColors(node);
    }
    return newRoot;
  };

  RBTree.prototype._flipColors = function (node) {
    node._left.flipColor();
    node._right.flipColor();
  };

  RBTree.prototype._rotateLeft = function (node) {
    var x = node._right;
    if (x !== null) {
      var temp = x._left;
      node.setRight(temp);
      x._left = node;
      x.setColor(node.getColor());
      node.setColor(Colors.RED);
    }
    return x;
  };

  RBTree.prototype._rotateRight = function (node) {
    var x = node._left;
    if (x !== null) {
      var temp = x._right;
      node._left = temp;
      x._right = node;
      x.setColor(node.getColor());
      node.setColor(Colors.RED);
    }
    return x;
  };

  RBTree.prototype.get = function (key) {
    return this._get(this._root, key);
  };

  RBTree.prototype._get = function (node, key) {
    if (node === null) {
      return undefined;
    }
    if (node.getKey() === key) {
      return node.getValue();
    }
    if (node.getKey() > key) {
      return this._get(node.getLeft(), key);
    } else {
      return this._get(node.getRight(), key);
    }
  };

  RBTree.prototype.getIterator = function () {
    return new RBTIterator(this);
  };

  function RBTIterator(tree) {
    this._tree = tree;
  }

  RBTIterator.prototype.next = function () {
  };

  global.RBTree = RBTree;


}(typeof window === 'undefined' ? module.exports : window));
