
let loadedId = JSON.parse(localStorage.getItem('loadedId'))



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
  loadedId = JSON.parse(localStorage.getItem('loadedId'))
  let html = '';
  people.forEach(function (item, i, arr) {
   // let hidden=''
   // if (checkForPreload(item['cleanerId']))
   //   hidden = 'hidden =\'true\''

      html += "<div class=\"worker\"> <div class=\"info\"> <span>" + item['cleanerName'] + "</span> <span>" + item['phoneNumber'] + "</span> </div>" +
          "<div class=\"add\">" +
          "<input type=\"checkbox\" id=\"" + item['cleanerId'] + "\">" +
          "</div>" +
          "</div>";

  });

  return html;
}
function unselectAll(){
  let people = JSON.parse(localStorage.getItem('allPeople'))
  people.forEach(function (item,i,arr) {
    let checkbox = document.getElementById(item['cleanerId'])
    if (checkbox != null)
    {
      checkbox.checked = false
    }
  })
}

function setWorkers(workers)
{
  let loadedId=[]
  workers.forEach(function (item,i,arr){

    let checkbox = document.getElementById(item['cleanerId'])
    if (checkbox != null)
    {
      loadedId.push(item['cleanerId'])
      checkbox.checked = true
      let elem = checkbox.parentNode.parentNode
      elem.setAttribute('hidden','true')
    }
  })
  localStorage.setItem('loadedId',JSON.stringify(loadedId))
}

function showList(addWorkers = false, workers = []) {
  let objectId = localStorage.getItem('objectId')
  let url = objectById + localStorage.getItem('objectId')
  sendRequest('GET', url)
      .then( value => {
        let address = value['objectLocation']
        let fullUrl = cleanerAllByAddress+address
        let people = JSON.parse(localStorage['allPeople'])
        sendRequest('GET', fullUrl,'application/json')
            .then( data => {
              localStorage.setItem('allPeople', JSON.stringify(data))
              let list = data
              let element = document.getElementById('all')
              element.insertAdjacentHTML('beforeend', getList(list))
              if (addWorkers)
                setWorkers(workers)
              showWorkers()
            })

      })


}

//showList();

function add(name, phone, id, addTime = false) {
  let div = document.getElementById('workers');
  let worker = document.createElement('div');
  worker.id = "worker" + name;
  worker.className = "worker-added"

  let info = document.createElement('div');
  info.className = "info";

  let name_s = document.createElement('span');
  name_s.textContent = name+'(id: '+id+')';
  let phone_s = document.createElement('span');
  phone_s.textContent = phone;


  let link2 = document.createElement('div');
  if (addTime) {
    let orderInfo = JSON.parse(localStorage.getItem('orderInfo'))
    let cleaners = orderInfo['cleaners']
    let i;
    for (i = 0; i < cleaners.length; i++){
      if (cleaners[i]['cleanerId']===id)
        break
    }
    let timeStart =''
    if (cleaners[i]['isStartingWorking'])
      timeStart = cleaners[i]['startWorking'].substr(11,5)
    else
      timeStart='-'

    let timeEnd = ''
    if (cleaners[i]['isFinishedWorking'])
      timeEnd = cleaners[i]['endWorking'].substr(11,5)
    else
      timeEnd = '-'

    let timeStartSpan = document.createElement('span')
    timeStartSpan.textContent='Пришёл: '+timeStart
    let timeEndSpan = document.createElement('span')
    timeEndSpan.textContent='Ушёл:   ' + timeEnd
    link2.className='time-div'
    link2.appendChild(timeStartSpan)
    link2.appendChild(timeEndSpan)
  }else {
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
    link2.className = 'delete';
    link2.appendChild(btn);
  }

  info.appendChild(name_s);
  info.appendChild(phone_s);

  worker.appendChild(info);
  worker.appendChild(link2);

  div.appendChild(worker);
}

const listId = [];



function checkForPreload(id)
{
  if (loadedId == null)
    return false
  let found = false
  for (let i = 0; i < loadedId.length; i++){
    if (loadedId[i]===id){
      found = true
      break
    }
  }
  return found
}

console.log(loadedId)


function showWorkers() {
  let people = JSON.parse(localStorage.getItem('allPeople'))
  loadedId = JSON.parse(localStorage.getItem('loadedId'))
  people.forEach(function (item, i, arr) {
    let str = JSON.stringify(item['cleanerId']);
    //str += item['cleanerId'];
    let elem = document.getElementById("worker" + item['cleanerName']);
    if (document.getElementById(str).checked) {
      if (elem == null) {
        listId.push(item['cleanerId']);
        console.log(item['cleanerId']);
        let addTime = checkForPreload(item['cleanerId'])
        add(item['cleanerName'], item['phoneNumber'], item['cleanerId'], addTime);
      }
    } else {
      if (elem != null) {
        const myIndex = listId.indexOf(item['cleanerId']);
        if (myIndex !== -1) {
          listId.splice(myIndex, 1);
        }
        elem.parentNode.removeChild(elem);
      }
    }
  })
  localStorage.setItem('listId', JSON.stringify(listId));
}
