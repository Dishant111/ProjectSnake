// Link list
class Node {
  constructor(data) {
    this.id = data;
    this.next = null;
  }
}
class pathList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  addLast(data) {
    let node = new Node(data);
    let cur;
    if (data == null || data.length == 0) {
      console.error("No data Found to add to list");
      return;
    }
    if (this.head == null) {
      this.head = node;
    } else {
      cur = this.head;
      while (cur.next) {
        cur = cur.next;
      }
      cur.next = node;
    }
    this.size += 1;
  }
  removeFirst() {
    let cur;
    if (this.head) {
      cur = this.head;
      this.head = cur.next;
      this.size -= 1;
    }
  }
  isExist(data) {
    let cur = this.head;
    if (cur) {
      if (cur.id == data) {
        return true;
      }
      while (cur.next) {
        if (cur.id == data) {
          return true;
        }
        cur = cur.next;
      }
      return false;
    }
  }
}
export { pathList };
