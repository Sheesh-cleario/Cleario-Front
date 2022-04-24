
sendRequest('GET', cleanerAll, 'application/json')
    .then(data => localStorage.setItem('allPeople', JSON.stringify(data)))
    .catch(err => console.log(err))

let people = JSON.parse(localStorage['allPeople'])




const dialog = document.querySelector('dialog');
const btnShow = document.getElementById('btn');
btnShow.onclick = function () {
  dialog.show();

  let elem = document.getElementById('back');
  let workers = document.getElementById('workers');

  let height = workers.offsetHeight + 1385;
  elem.style.height = height + 'px';

}


var btnClose = document.getElementById('close');
btnClose.onclick = function () {
  showWorkers();
  let elem = document.getElementById('back');
  elem.style.removeProperty("height");
  dialog.close();
  return false;

};


function getList(people) {
  let html = '';
  people.forEach(function (item, i, arr) {
    html += "<div class=\"worker\"> <div class=\"info\"> <span>" + item['cleanerName'] + "</span> <span>" + item['phoneNumber'] + "</span> </div>" +
      "<div class=\"add\">" +
      "<input type=\"checkbox\" id=\"" + item['cleanerId'] + "\">" +
      "</div>" +
      "</div>";
  });

  return html;
}

function showList() {
  let element = document.getElementById('all');
  element.insertAdjacentHTML('beforeend', getList(people));
}

showList();

function add(name, phone, id) {
  let div = document.getElementById('workers');
  let worker = document.createElement('div');
  worker.id = "worker" + name;
  worker.className = "worker-added"

  let info = document.createElement('div');
  info.className = "info";

  let name_s = document.createElement('span');
  name_s.textContent = name;
  let phone_s = document.createElement('span');
  phone_s.textContent = phone;
  let btn = document.createElement('button');
  btn.id = "btn" + name;
  btn.textContent = "Удалить"
  btn.type = "button";
  btn.onclick = function () {
    let checkbox = document.getElementById(id);
    const myIndex = listId.indexOf(id);
    if (myIndex !== -1) {
      listId.splice(myIndex, 1);
    }
    console.log(id);
    checkbox.checked = false;
    showWorkers();
    return false;
  }

  info.appendChild(name_s);
  info.appendChild(phone_s);

  let link2 = document.createElement('div');
  link2.className = 'delete';
  link2.appendChild(btn);

  worker.appendChild(info);
  worker.appendChild(link2);

  div.appendChild(worker);
}

const listId = [];

function showWorkers() {
  people.forEach(function (item, i, arr) {
    let str = '';
    str += item['cleanerId'];
    let elem = document.getElementById("worker" + item['cleanerName']);
    if (document.getElementById(str).checked) {
      if (elem == null) {
        listId.push(item['cleanerId']);
        console.log(item['cleanerId']);
        add(item['cleanerName'], item['phoneNumber'], item['cleanerId']);
      }
    } else {
      if (elem != null) {
        elem.parentNode.removeChild(elem);
      }
    }
  })
  localStorage.setItem('listId', JSON.stringify(listId));
}
