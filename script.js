//#region   vaiables 

var links = document.querySelectorAll('.nav-link')
var arrdata = []
var datacontainer = document.getElementById('datacontainer')

//#endregion
//#region  navebar

for (let index = 0; index < links.length; index++) {
    links[index].addEventListener("click", (e) => {
        getdata(e.target.innerHTML)
    })

}
//#endregion

document.addEventListener('load', getdata())

//#region   call api

function getdata(target = "corn") {
    var req = new XMLHttpRequest()
    req.open('GET', `https://forkify-api.herokuapp.com/api/search?q=${target}`)
    req.send()
    req.addEventListener('readystatechange', () => {

        console.log(req.response)
        arrdata = JSON.parse(req.response).recipes;
        console.log(arrdata.length);
        display(arrdata)
    })
}

//#endregion


//#region  display api response

function display(x) {
    var divv = ''
    for (let index = 0; index < x.length; index++) {

        divv += `<div class="col-md-4">
        <div class="bg-info">
        <img src="${x[index].image_url}"class="w-100 imgdata"  alt="">
            <h6 >${x[index].title}</h6>
            <p>${x[index].social_rank}</p>
           
        </div>
    </div>`

    }
    datacontainer.innerHTML = divv

}

//#endregion