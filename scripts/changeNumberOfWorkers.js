function changeNumber()
{
    let label = document.getElementById('label')

    if (label != null)
    {
        let url = objectById + localStorage.getItem('objectId')
        console.log(url)
        var response = {}
        sendRequest('GET',url)
            .then( (value)  =>  {
                label.textContent = 'Исполнители(требуется: '+value['usualTeamSize']+')'
            })
            .catch(err => console.log(err))
    }
}
