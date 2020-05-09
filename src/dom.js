window.dom = {
  create(string) {
    //用于新增节点
    const container = document.createElement("template"); //template内容模板元素
    container.innerHTML = string.trim(); //trim 把字符串两边的文本去掉
    return container.content.firstChild;
  },
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling); //找到这个节点的爸爸，然后调用爸爸的insertBefore的方法，把node2插到node下一个节点。若node为最后一个节点，也可以插入，值为null
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node); //节点前面插入
  },
  append(parent, node) {
    parent.appendChild(node); //用于节点新增一个儿子
  },
  wrap(node, parent) {
    dom.before(node, parent);
    //先把新的节点放到原节点的前面;
    dom.append(parent, node); //然后吧原节点放到新的节点里面
  },
  remove(node) {
    node.parentNode.removeChild(node);
    return node; //返回移除的对象
  },
  empty(node) {
    //用于删除后代，所有的
    const { childNodes } = node; //const childNodes = node.childNodes
    const array = [];
    // for (let i = 0; i < childNodes.length; i++) {
    //   dom.remove(childNodes[i]);长度会跟随着一起变化7-6-5
    //   array.push(childNodes[i]);
    // }
    // return array;
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  attr(node, name, value) {
    //重载   用于读写属性
    if (arguments.length === 3) {
      //参数个数等于3
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    //用于读写文本内容   适配
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    //用于读写HTML内容
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    //用于修改style
    if (arguments.length === 3) {
      //dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //dom.style(div,'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //dom.style(div,{color:'red'})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    //class是个对象
    add(node, className) {
      //添加class
      node.classList.add(className);
    },
    remove(node, className) {
      //删除class
      node.classList.remove(className);
    },
    has(node, className) {
      //有没有class
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    //用于添加监听事件
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    //用于删除监听事件
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    //scope范围
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node); //filter过滤器
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      //x存在而且x.nodeType为文本，
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      //x存在而且x.nodeType为文本，
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    //用于遍历所有节点
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    //用于获取排行第几
    const list = dom.children(node.parentNode); //获取爸爸的所有儿子
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
