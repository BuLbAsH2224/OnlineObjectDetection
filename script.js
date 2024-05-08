
function getResult(){
    cocoSsd.load().then(model => {
        model.detect(document.querySelector("#imageUser")).then(predictions => {
         console.log(predictions)
         let text = document.querySelectorAll("h1");
         let shape = document.querySelectorAll("div");
         if(text.length != 0){
            for(let i = 0; i < text.length;i++ ){
         text[i].remove()
            }
         }
         if(shape.length != 0){
            for(let i = 0; i < shape.length;i++ ){
                shape[i].remove()
                   }
            }
      
         for (let item of predictions) {
            let text = document.createElement("h1");
           text.innerText = `${item.class} ${Math.trunc(item.score * 100)}%`
           let shape = document.createElement("div");
           shape.style.position = `absolute`
          
            let cords = item.bbox;
            shape.style.left = `${cords[0]}px`
            shape.style.top = `${cords[1]}px`
            shape.style.width = `${cords[2]}px`
            shape.style.height = `${cords[3]}px`
            document.body.append(shape)
            shape.append(text)
         }
        });
      });
}


  (document.querySelector("input")).addEventListener('drop', ev => {

    ev.preventDefault()



    file = ev.dataTransfer.files[0]




    
    createImage(file);
})



async function createImage(image){
    if(document.querySelector('img') != null){
        document.querySelector('img').remove()
    }
    const imageEl = document.createElement('img')
    imageEl.id = "imageUser";
    imageEl.src = await URL.createObjectURL(image) 
    document.querySelector("input").before(imageEl)
    getResult();
}
