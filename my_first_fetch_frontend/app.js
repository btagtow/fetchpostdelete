const resolutionsURL = 'http://localhost:3000/resolutions/'
const resolutionsContainer = document.querySelector(".resolutions")
const addResolution = document.querySelector(".add-resolution")
const title = document.querySelector("#title")
const body = document.querySelector("#body")


fetch(resolutionsURL)
    .then(response => response.json())
    .then(resolutions => { 
        resolutions.map(resolution => {
            const resolutionLi = document.createElement("li")
            resolutionLi.textContent = `Title: ${resolution.title} Body: ${resolution.body}`
            resolutionsContainer.append(resolutionLi)


            const deleteButton = document.createElement("button");
            deleteButton.textContent="DESTROY!"
            resolutionLi.appendChild(deleteButton)

            deleteButton.addEventListener("click", function () { deleteResolution(resolution.id) } );

            //empty parenthesis above are the callback function, so the event listener won't get called until the button gets "clicked"
            //other syntax: ("click", () => deleteResolution(resolution.id) )

        })

    })

addResolution.addEventListener("click", function(){
    console.log("title", title.value)
    console.log("body", body.value)

    const data = { title: title.value, body: body.value }

    fetch(resolutionsURL, {
        method: 'post',
        headers: {
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data)

        }
       
)})

function deleteResolution(resolutionId) {

    console.log("resolution id", resolutionId)

    fetch(`${resolutionsURL}${resolutionId}`, { method: 'delete' })
}

