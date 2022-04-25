function setWorkers(workers)
{
    let loadedId=[]
    workers.forEach(function (item,i,arr){

        let checkbox = document.getElementById(item['cleanerId'])
        if (checkbox != null)
        {
            loadedId.push(item['cleanerId'])
            checkbox.checked = true
        }
    })
    localStorage.setItem('loadedId',JSON.stringify(loadedId))
}