const addBox = document.querySelector(".add-box");
popupBox = document.querySelector(".popup-box");
(popupTitle = popupBox.querySelector("header p")),
  (closeIcon = popupBox.querySelector("header i")),
  (titleTag = popupBox.querySelector("input")),
  (descTag = popupBox.querySelector("textarea")),
  (addBtn = popupBox.querySelector("button"));
const copyIcon = document.querySelector(".settings i");
const noteText = document.querySelector(".note .detail span");

// getting notes from local storage if there exist and parsing them to js object else an empty array to notes
let notes = JSON.parse(localStorage.getItem("notes") || "[]");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

addBox.addEventListener("click", () => {
  popupBox.classList.add("show");
  // print('add new note')
});

closeIcon.addEventListener("click", () => {
  titleTag = "";
  descTag = "";
  popupBox.classList.remove("show");
});

function showNotes() {
  document.querySelectorAll(".note").forEach((li) => li.remove());
  notes.forEach((note) => {
    console.log(note);
    let liTag = `
             <li>
            <div class="note">
                <div class="detail">
                    <p>${note.title}</p>
                    <span>${note.description}</span>
                </div>
                <div class="bottom-content">
                    <span>${note.dates}</span>
                    <div class="settings">

                        <i class="uil uil-copy" onclick="copyText(this)"></i>
                        <button style="padding: 2px" onclick="boldText(this)">B</button>
                        <button style="padding: 2px" onclick="underlineText(this)">U</button>
                    </div>
                </div>
            </div>
        </li>
    `;
    //`<li class="note">
    //             <div class="details">
    //                 <p>${note.title}</p>
    //                 <span>${note.noteDesc}</span>
    //             </div>
    //             <div class="bottom-content">
    //                 <span>${note.date}</span>
    //                 <div class="settings">
    //                     <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
    //                     // <ul class="menu">
    //                     //     <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
    //                     //     <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
    //                     // </ul>
    //                 </div>
    //             </div>
    //         </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();

function copyText(elem) {
  var spanNote =
    elem.parentElement.parentElement.previousElementSibling.lastElementChild;
  console.log(elem);
  console.log(spanNote);
  console.log(spanNote.innerHTML);

  navigator.clipboard.writeText(spanNote.innerHTML);

  /* Alert the copied text */
  alert("Copied the text: " + spanNote.innerHTML);
}

function boldText(element){
    var spanNote =
    element.parentElement.parentElement.previousElementSibling
        .lastElementChild;
    console.log(element);
    console.log(spanNote);
    spanNote.classList.toggle('bold')
}
function underlineText(element) {
  var spanNote =
    element.parentElement.parentElement.previousElementSibling.lastElementChild;
  console.log(element);
  console.log(spanNote);
  spanNote.classList.toggle("underline");
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value;
  noteDesc = descTag.value;
  // getting month , day , year from the current date
  if (noteTitle || noteTitle) {
    let dateObj = new Date(),
      month = months[dateObj.getMonth()],
      date = dateObj.getDate(),
      year = dateObj.getFullYear();

    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      dates: `${month} ${date}, ${year}`,
    };
    console.log(noteInfo);
    notes.push(noteInfo);

    // saving notes to local storage
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    closeIcon.click();
  }
  // console.log(noteTitle, noteDesc)
});

copyIcon.addEventListener("click", (e) => {
  print("text copied just now");
});
