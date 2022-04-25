const draggable_list = document.getElementById('allOrders');


getOrders()
/*sendRequest('GET', allOrder)
    .then(data => localStorage.setItem('allOrders', JSON.stringify(data)))
    .catch(err => console.log(err))*/



function getOrders(){
    sendRequest('GET', allOrder)
        .then(data => load(data))
        .catch(err => console.log(err))

}

function load(allOrders) {

    let elem = document.getElementById('allOrders');
    elem.parentNode.removeChild(elem);

    let div = document.getElementById('listAllOrders');
    let list = document.createElement('ul');
    list.id = 'allOrders';
    div.appendChild(list);
    const draggable_list = document.getElementById('allOrders');

    var colors = ["dodgerblue", "#E85A4F", "limegreen"];
    var icons = ["fa fa-clock fa-3x", "fa fa-exclamation-circle fa-3x", "fa fa-car-side fa-3x", "fa fa-check fa-3x"];
    var orderStatusTexts = ["Ожидает начала", "Работник не пришёл", "В процессе", "Заказ завершён"];
    var StatusColor;
    var orderStatusPattern = `background: white;
                            justify-content: center;
                            align-items: center;
                            width: 380px;
                            height: 56px;
                            border-radius: 20px;`

    function orderStatus(status) {
        let orderStatusText;
        let orderStatusIcon;
        let orderStatusColor;
        switch (status) {
            case 0:
                StatusColor = colors[0];
                orderStatusColor = `display: flex;
                            border: 2px solid ${StatusColor};
                            color: ${StatusColor};` + orderStatusPattern;
                orderStatusIcon = icons[0];
                orderStatusText = orderStatusTexts[0];
                break;
            case 1:
                StatusColor = colors[1];
                orderStatusColor = `display: flex;
                            border: 2px solid ${StatusColor};
                            color: ${StatusColor};` + orderStatusPattern;
                orderStatusIcon = icons[1];
                orderStatusText = orderStatusTexts[1];
                break;
            case 2:
                StatusColor = colors[1];
                orderStatusColor = `display: flex;
                            border: 2px solid ${StatusColor};
                            color: ${StatusColor};` + orderStatusPattern;
                orderStatusIcon = icons[1];
                orderStatusText = orderStatusTexts[1];
                break;
            case 3:
                StatusColor = colors[0];
                orderStatusColor = `display: flex;
                            border: 2px solid ${StatusColor};
                            color: ${StatusColor};` + orderStatusPattern;
                orderStatusIcon = icons[2];
                orderStatusText = orderStatusTexts[2];
                break;
            case 4:
                StatusColor = colors[2];
                orderStatusColor = `display: flex;
                            border: 2px solid ${StatusColor};
                            color: ${StatusColor};` + orderStatusPattern;
                orderStatusIcon = icons[3];
                orderStatusText = orderStatusTexts[3];
                break;
            case 5:
                StatusColor = colors[2];
                orderStatusColor = `display: flex;
                            border: 2px solid ${StatusColor};
                            color: ${StatusColor};` + orderStatusPattern;
                orderStatusIcon = icons[3];
                orderStatusText = orderStatusTexts[3];
                break;
        }
        let orderStatus = `<button style="${orderStatusColor}"
                                    onmouseover="this.style.backgroundColor='${StatusColor}'; this.style.cursor = 'pointer'; this.style.color = 'white'" onmouseout="this.style.backgroundColor='white'; this.style.color = '${StatusColor}'">
                                    <i class="${orderStatusIcon}" aria-hidden="true"></i>
                                    <span class="manager-button-text">${orderStatusText}</span>
                               </button>`
        return orderStatus
    }

    function normalizationOfDate(str) {
        let year = str.substr(0, 4);
        let month = str.substr(5, 2);
        let day = str.substr(8, 2);
        let hour = str.substr(11, 2);
        let minutes = str.substr(14, 2);
        return  day + "/" + month + "/" + year + " " + hour + ":" + minutes
    }

    console.log(allOrders);
    allOrders.reverse();

    for(let i = 0; i < allOrders.length; i++) {
        const listItem = document.createElement('li');
        let href = nextPage(allOrders[i]['status']);
        listItem.innerHTML = `
                <a style="text-decoration: none" href="${href}" onclick="setOrderId(${allOrders[i]['orderId']})">
                    <div class="order manager-order">
                        <div>
                            <div class="order-number">
                                <span>${allOrders[i]['orderName']}, ${allOrders[i]['orderLocation']}</span>
                            </div>
                            <div class="order-date">
                                <span>${normalizationOfDate(allOrders[i]['orderStart'])}</span>
                            </div>
                        </div>
                        <div class="order-status">
                            ${orderStatus(allOrders[i]['status'])}
                        </div>
                    </div>
                </a>
                `;

        draggable_list.appendChild(listItem);
    }
}
function setOrderId(id)
{
    localStorage.setItem('orderId',id)
}

function nextPage(orderStatus)
{
    let href=''
    let status =''
    switch (orderStatus){
        case 0:
            status='0'
            href='managerOrderFormation.html'
            break
        case 1:
            status='1'
            href='managerOrderChangeWorkers.html'
            break
        case 2:
            status='2'
            href='managerOrderChangeWorkers.html'
            break
        case 3:
            status='3'
            href='managerOrderReview.html'
            break
        case 4:
            status='4'
            href='managerOrderReview.html'
            break
        case 5:
            status='5'
            href='managerOrderReview.html'
            break
    }
    return href
}

//setInterval(getOrders, 5000);
