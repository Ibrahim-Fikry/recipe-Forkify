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

//#endregion
//#region  navebar

for (let index = 0; index < links.length; index++) {
    links[index].addEventListener("click", (e) => {
        getdata(e.target.innerHTML)
    })

}
//#endregion

// document.addEventListener('load', getdata())
getdata()

//#region   call api getdata

function getdata(target = "carrot") {
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
function getdetails(id) {
    var reqdetails = new XMLHttpRequest()
    reqdetails.open('GET', `https://forkify-api.herokuapp.com/api/get?rId=${id}`)
    reqdetails.send()
    reqdetails.addEventListener('readystatechange', () => {
        console.log('getdetails');
        if (reqdetails.readyState == 4 && reqdetails.status == 200) {


            detailobj = JSON.parse(reqdetails.response).recipe.ingredients
            console.log('detailobj');
            console.log(detailobj);
            detailsarr = Array.from(detailobj)

        }
    })
}

//#endregion





// { "recipe": { "publisher": "101 Cookbooks", "ingredients": ["Green Garlic Dressing:", "2 stalks green garlic (or scallions), rinsed and chopped (~1/4 cup)", "1/4 teaspoon fine grain sea salt, plus more to taste", "2 tablespoons fresh lemon juice", "1/3 cup / 80 ml extra virgin olive oil", "2 tablespoons ripe avocado", "1 teaspoon honey, or to taste", "fresh pepper to taste", "1/2 bunch kale, destemmed, torn into pieces", "1 cup / 5.5 oz cooked farro or wheat berries (semi-pearled or whole)", "4-5 farmers' market carrots, very thinly sliced", "1 small bulb of fennel, transparently sliced", "1 avocado, cut into small cubes", "a big handful of almond slices, toasted"], "source_url": "http://www.101cookbooks.com/archives/kale-market-salad-recipe.html", "recipe_id": "47893", "image_url": "http://forkify-api.herokuapp.com/images/kale_market_saladd20e.jpg", "social_rank": 100, "publisher_url": "http://www.101cookbooks.com", "title": "Kale Market Salad" } }

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





//#region details

datacontainer.addEventListener('click', (e) => {
        var srctarget = e.target.src
        var srctargetobj = {}
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
            console.log(detailsarr);

            var divv = ""
            for (let index = 0; index <= detailsarr.length; index++) {

                divv += `<h5>${index+1}- ${detailsarr[index]}</h5>
               
                `
            }
            deails.innerHTML = divv
            innerimg.setAttribute('src', srctarget)
            fixedbox.classList.replace('d-none', 'd-flex')
        }
    })
    //#endregion




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