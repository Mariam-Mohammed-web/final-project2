let choosedImg = null;
const gallery = document.getElementById("gallery");
const uploadForm=document.getElementById("upload-form");
const resultDiv=document.getElementById("result");
const resizeForm=document.getElementById("resize-form");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const fileInput= document.getElementById("image");
const emptyGalleryMsg = document.getElementById("empty-gallery")
const API_BASE_URL = "http://localhost:3000"
//function to show loading state
function setLoading(button, isLoading) {
    const btnText = button.querySelector('.btn-text');
    if (isLoading) {
        btnText.textContent = 'Processing...';
        const spinner = document.createElement('span');
        spinner.className = 'loading';
        button.appendChild(spinner);
        button.disabled = true;
    } else {
        btnText.textContent = 'Submit';
        const spinner = button.querySelector('.loading');
        if (spinner) spinner.remove();
        button.disabled = false;
    }
}
async function loadingGallery() {
    try{
        resultDiv.textContent = "loading your images .....";
        const response = await fetch("/api/images");
        if(!response.ok){
            throw new Error("failed in downloading img")
        };
        const images = await response.json();
        gallery.innerHTML="";
        //
        if (images.length === 0) {
            emptyGalleryMsg.style.display = 'block';
            return;
        }
        emptyGalleryMsg.style.display = 'none';
        images.forEach(image=>{
            const container = document.createElement("div");
            container.className="image-container";
            container.dataset.filename=image;
            const img =document.createElement("img")
            img.src = API_BASE_URL  + image;
            img.alt=image
            container.appendChild(img)
            gallery.appendChild(container)
            container.addEventListener("click",function(){
                document.querySelectorAll(".image-container").forEach(element=>{
                    element.classList.remove("selected")
                })
                container.classList.add("selected")
                choosedImg=image.split(".")[0]
                resultDiv.textContent = "selected:"+image;
                resultDiv.className = '';
            })
        })
    }catch(err){
        resultDiv.textContent="error while loading image"
        resultDiv.className="error"
        console.error("err in loading gallery")
    }
}
resizeForm.addEventListener("submit",async function (element){
    element.preventDefault();
    if(!choosedImg){
        resultDiv.textContent="select img"
        resultDiv.className="error"
        return
    }
    const height = heightInput.value
    const width = widthInput.value
    const submitBtn = document.getElementById("resize-submit");
    setLoading(submitBtn, true);
    try{
        const response = await fetch(API_BASE_URL+"/api/images/process?filename="+choosedImg+"&width="+width+"&height="+height)
        if(response.ok){
            const imageUrl = await response.text();
            resultDiv.innerHTML=  `
            <div class="success">Image processed successfully!</div>
            <img src="${imageUrl}" alt="Processed image" class="result-image">
            <div>URL: <a href="${imageUrl}" target="_blank">${imageUrl}</a></div>
        `
        resultDiv.className = 'success';
        }else{
            const err = await response.text();
            resultDiv.textContent="err in"+err
            resultDiv.className="error"

        }
    }catch(err){
        resultDiv.textContent="err in processing img"
        resultDiv.className="error"
        throw new Error("error in processing img"+err)
    }finally{
        setLoading(submitBtn,false)
    }
})
uploadForm.addEventListener("submit", async function(element) {
    element.preventDefault()
    const formData= new FormData()
    if(fileInput.files.length ===0){
        resultDiv.textContent="select file"
        resultDiv.className="error"
        return
    }
    const submitBtn = document.getElementById("upload-submit");
    setLoading(submitBtn, true);
    formData.append("image",fileInput.files[0])
    try{
        const response = await fetch(API_BASE_URL+"/api/upload",{
            method:"POST",
            body:formData
        })
        if(response.ok){
            const data = await response.json()
            resultDiv.textContent = data.message ||"image upladed successfuly"
            resultDiv.className = "success"
            await loadingGallery()
            uploadForm.reset()
        }else{
            const err = await response.text()
            resultDiv.textContent="err in "+err
            resultDiv.className="error"
        }
    }catch(err){
        resultDiv.textContent="err in uploading img"
        resultDiv.className="error"
        console.error("error in uploading img "+err) 
    }finally{
        setLoading(submitBtn,false)
    }
})
document.addEventListener("DOMContentLoaded",function(){loadingGallery()})
