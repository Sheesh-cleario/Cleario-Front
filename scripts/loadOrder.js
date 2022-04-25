
function setWorkers(workers)
{
    workers.forEach(function (item,i,arr){

        let checkbox = document.getElementById(item['cleanerId'])
        if (checkbox != null)
        {
            checkbox.checked = true
        }
    })
}