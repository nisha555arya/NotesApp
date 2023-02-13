const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".create-popup-box");

const icon = document.querySelector('.icon');
const createCloseIcon = document.querySelector('.createClose');
const editCloseIcon = document.querySelector('.editClose');
const createBtn = document.querySelector(".createBtn");
const editBtn = document.querySelector(".editBtn");
const titleTag = document.querySelector(".createTitle");
const descTag = document.querySelector(".createDescription");
const settings = document.querySelector(".settings");
const edit_btn = document.querySelector(".edit");
const delete_btn = document.querySelector(".delete");


 const months =["January","Febuary","March","April","May","June","July","August","September","October","November","December"];

 //getting localstorage notes if exist and parsing them
//  to js object else passing an empty array to notes

const notes = JSON.parse(localStorage.getItem("notes"))||[];

icon.addEventListener("click" , () => {
    popupBox.classList.add("show");

});
createCloseIcon.addEventListener("click" , () => {
    titleTag.value = "";
    descTag.value = "";
    popupBox.classList.remove("show");
});

editCloseIcon.addEventListener("click" , () => {
    titleTag.value = "";
    descTag.value = "";
    document.querySelector(".edit-popup-box").classList.remove("show");
});

  
function showNotes(){
    notes.forEach((note, index) =>{
        let liTag = `<li class="note">
                       <div class="deatils">
                           <p>${note.title}</p>
                           <span>${note.descripton}</span>
                       </div>
                       <div class="bottom-content">
                           <span>${note.date}</span>
                           <div class="settings">
                               <i class="fa fa-ellipsis-h"></i>
                               <ul class="menu">
                               <li class="editIcon"><i class="fa fa-pencil  edit"></i> Edit</li>
                               <li class="deleteIcon"><i class="fa fa-trash  delete "></i>Delete</li>
                           </ul>
                           </div>
                       </div>
                   </li>`
       addBox.insertAdjacentHTML("afterend" ,liTag);        
       document.querySelector(".deleteIcon").addEventListener("click",function(){
        localStorage.setItem("notes",JSON.stringify(notes.filter((n,i)=>i!==index)));
        location.reload();
       })

       document.querySelector(".editIcon").addEventListener("click",function(){
        document.querySelector(".edit-popup-box").classList.add("show");
        document.querySelector(".editTitle").value=note.title;
        document.querySelector(".editDescription").value=note.descripton;
        editBtn.addEventListener("click" , e => {
            e.preventDefault();
            let noteTitle = document.querySelector(".editTitle").value,
            noteDesc = document.querySelector(".editDescription").value;
           const targetNote=notes.filter((n)=>n.id===note.id)
                let noteInfo = {
                    title: noteTitle, descripton:noteDesc,
                    date: note.date,
                    id:note.id
                }
                localStorage.setItem("notes", JSON.stringify(notes.map((n)=>(n.id==note.id?noteInfo:n))));
                editCloseIcon.click();
                location.reload();
        });
       })
    });
}

function showCurrentNotes(data){
        let liTag = ` <li class="note">
                       <div class="deatils">
                           <p>${data.title}</p>
                           <span>${data.descripton}</span>
                       </div>
                       <div class="bottom-content">
                           <span>${data.date}</span>
                           <div class="settings">
                               <i class="fa fa-ellipsis-h"></i>
                               <ul class="menu">
                               <li><i class="fa fa-pencil  edit"></i> Edit</li>
                               <li class="deleteIcon"><i class="fa fa-trash  delete "></i>Delete</li>
                           </ul>
                           </div>
                       </div>
                   </li>`
       addBox.insertAdjacentHTML("afterend" ,liTag);       
  
}
showNotes();

createBtn.addEventListener("click" , e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;
    console.log(noteTitle);

    if(noteTitle || noteDesc){
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

//  let store the object in  local storage
        let noteInfo = {
            title: noteTitle, descripton:noteDesc,
            date: `${month},${day},${year}`,
            id:`id${Math.random().toString(16).slice(2)}`
        }
        // console.log(noteInfo);
        notes.push(noteInfo); // adding new note to notes
        //saving notes to localstorage
        ///we have convert object into sting to store in local storage
        localStorage.setItem("notes", JSON.stringify(notes));
        createCloseIcon.click();
         showCurrentNotes(noteInfo);

    }
});


    