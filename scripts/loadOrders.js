const draggable_list = document.getElementById('allOrders');
var index = 0;

getOrders()
/*sendRequest('GET', allOrder)
    .then(data => localStorage.setItem('allOrders', JSON.stringify(data)))
    .catch(err => console.log(err))*/



function getOrders(){
    sendRequest('GET', allOrder)
        .then(data => localStorage.setItem('allOrders', JSON.stringify(data)))
        .catch(err => console.log(err))
    Load()
}

function Load() {
    const allOrders = JSON.parse(localStorage.getItem("allOrders"));
    console.log(allOrders);
    for(let i = index; i < allOrders.length; i++){
        const listItem = document.createElement('li');
        listItem.innerHTML = `
                <a style="text-decoration: none" href="managerOrderFormation.html">
                    <div class="order manager-order">
                        <div>
                            <div class="order-number">
                                <span>${allOrders[i]['orderName']}, ${allOrders[i]['orderLocation']}</span>
                            </div>
                            <div class="order-date">
                                <span>${allOrders[i]['orderStart']}</span>
                            </div>
                        </div>
                        <div class="order-status">
                            <button class="button manager-button">
                                <i class="fa fa-exclamation-circle fa-3x" aria-hidden="true"></i>
                                <span class="manager-button-text">Ожидание начала</span>
                            </button>
                        </div>

                    </div>
                </a>
                `;

        draggable_list.appendChild(listItem);
        index = allOrders.length;
    }
}

setInterval(getOrders, 5000);
