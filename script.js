//#region   vaiables 

var links = document.querySelectorAll('.nav-link')
var arrdata = []
var detailobj = {}
var detailsarr = []
var datacontainer = document.getElementById('datacontainer')

var innerimg = document.getElementById('innerimg')
var fixedbox = document.getElementById('fixedbox')
var deails = document.getElementById('deails')
var fixedboxLayer = document.getElementById('fixedboxLayer')
var closebtn = document.getElementById('btn-close')
var forkify = document.getElementById('forkify')

//#endregion
//#region  navebar   & dropdown
// navebar
for (let index = 0; index < links.length; index++) {
    links[index].addEventListener("click", (e) => {
        getdata(e.target.innerHTML)
    })

}

// dropdown

forkify.addEventListener("change", (e) => {
    getdata(forkify.value)
})


//#endregion

document.addEventListener('load', getdata())
document.addEventListener('load', getdetails())
    // getdata()

//#region   call api getdata

function getdata(target = "onion") {
    var req = new XMLHttpRequest()
    req.open('GET', `https://forkify-api.herokuapp.com/api/search?q=${target}`)
    req.send()
    req.addEventListener('readystatechange', () => {
        if (req.readyState == 4 && req.status == 200) {
            arrdata = JSON.parse(req.response).recipes;
            display(arrdata)
        }
    })
}

//#endregion

//#region   call api getdetails
function getdetails(id = 0) {
    var reqdetails = new XMLHttpRequest()
    reqdetails.open('get', `https://forkify-api.herokuapp.com/api/get?rId=${id}`)
    reqdetails.send()
    reqdetails.addEventListener('readystatechange', () => {
        if (reqdetails.readyState == 4 && reqdetails.status == 200) {
            detailsarr = JSON.parse(reqdetails.response).recipe.ingredients
            var divv = ""

            for (let index = 0; index <= detailsarr.length; index++) {

                divv += `<h5>${index+1}-${detailsarr[index]}</h5>
                    
                    `
            }
            deails.innerHTML = divv
        }
    })
}

//#endregion


//#region  display api  get  response


function display(x) {
    var divv = ''
    for (let index = 0; index < x.length; index++) {

        divv += `<div class="col-md-4">
        <div class="p-2">
        <img src="${x[index].image_url}"class="w-100 imgdata pb-2"  alt="">
            <h6 >${x[index].title}</h6>
            <p>${x[index].social_rank}</p>
           
        </div>
    </div>
    
    `

    }
    datacontainer.innerHTML = divv

}

//#endregion





//#region details  for popup  pass id to etdeatil()
var srctargetobj = {}
var srctarget
datacontainer.addEventListener('click', (e) => {
    srctarget = e.target.src

    if (srctarget != null) {
        // 3 alchan agieb el object bta3 el selected img
        for (let index = 0; index < arrdata.length; index++) {
            if (arrdata[index].image_url == srctarget) {
                srctargetobj = arrdata[index];
            }
        }
        //call api detais by id 
        var recipeid = srctargetobj.recipe_id
        getdetails(recipeid)
        innerimg.setAttribute('src', srctarget)
        fixedbox.classList.replace('d-none', 'd-flex')
    }
})





fixedbox.addEventListener('click', (e) => {
    e.stopPropagation()
    closepopup()
})

fixedboxLayer.addEventListener('click', (e) => {
    e.stopPropagation()

})



function closepopup() {
    fixedbox.classList.replace('d-flex',
        'd-none')
}
closebtn.addEventListener('click', closepopup)