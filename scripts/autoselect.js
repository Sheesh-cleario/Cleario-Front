function autoselect(){
    let url = objectById + localStorage.getItem('objectId')
    sendRequest('GET',url)
        .then(value => {
            let address = value['objectLocation']
            let amount = value['usualTeamSize']
            let url = autoselectUrl+amount+'?'+'address='+address
            sendRequest('GET', url)
                .then( data => {
                    data.forEach(function (item, i, arr){
                        let elem = document.getElementById(item['cleanerId'])
                        if (elem != null)
                            elem.checked = true
                    })
                    showWorkers()
                })
        })
}