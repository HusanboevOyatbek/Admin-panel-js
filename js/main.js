let tbody = document.getElementById("tbody");
let formModal = document.getElementById("form");
let outerModal = document.getElementById("outer-modal");
let innerModal = document.getElementById("inner-modal");
let addStudentBtn = document.getElementById("add-student-btn");
let selectedUser = null
let isim = document.getElementById("ism")
let familya = document.getElementById("familya");
let group = document.getElementById("group");
let work = document.getElementById("work");
let changebtn = document.getElementById("change-btn");
let selectedFilter = document.getElementById("selected-filter");
console.log(selectedFilter);

changebtn.textContent = selectedUser ?  "tahrirlash" : "qoshish"

let students = JSON.parse(localStorage.getItem("students") || "[]")

localStorage.setItem("students", JSON.stringify(students))

function getStudent(content, data) {
    content.innerHTML = ""

    data.map((el , index) => {
        content.innerHTML += `
   <tr
                                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">

                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    ${index + 1} </th>

                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    ${el.firsName}                                </th>
                                <td class="px-6 py-4">
                                    ${el.lastName}
                                </td>
                                <td class="px-6 py-4">
                                    ${el.group}
                                </td>
                                <td class="px-6 py-4">
                                    ${el.isWork ? "ishlaydi" : "ishlamaydi"}
                                </td>
                                <td class="px-6 py-4 flex gap-[10px]">
                                    <button
                                    onClick="editStudent(${el.id})"
                                     class="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline">Taxrirlash</button>
                                    <button
                                    onclick="deleteStudent(${el.id})"
                                    class="font-medium cursor-pointer text-red-600 dark:text-blue-500 hover:underline">O'chirish</button>
                                </td>
                            </tr>
    `
    })
}
getStudent(tbody, students)

formModal.addEventListener("submit", function(e) {

    e.preventDefault();
    let obj = {}

    if(selectedUser){
        students = students.map((el) =>{
            if(el.id === selectedUser){
                el.firsName = e.target[0].value
                el.lastName = e.target[1].value
                el.group = e.target[2].value
                el.isWork = e.target[3].checked
            }
            return el
        })
    }else{
        obj.id = students.length + 1;
        obj.firsName = e.target[0].value
        obj.lastName = e.target[1].value
        obj.group = e.target[2].value
        obj.isWork = e.target[3].checked
        students.push(obj)
    }
  
    localStorage.setItem("students", JSON.stringify(students))
    getStudent(tbody, students)
    outerModal.classList.add("hidden") 
    selectedUser = null

})

outerModal.addEventListener("click", function(){
    outerModal.classList.add("hidden") 
    selectedUser = null
})

innerModal.addEventListener("click", function(e){
    e.stopPropagation()
})

addStudentBtn.addEventListener("click", function(){
    changebtn.textContent = "Qoshish"
    console.log(changebtn);
    outerModal.classList.remove("hidden") 

})

function deleteStudent(id){
    students = students.filter((el) => el.id !==id)
    localStorage.setItem("students", JSON.stringify(students))
    getStudent(tbody, students)

}

function editStudent(id){
    changebtn.textContent = "Taxrirlash"
    console.log(changebtn);
    
    selectedUser = id;
    outerModal.classList.remove("hidden") 
    let object = students.find((el) => el.id === id)
    isim.value = object.firsName
    familya.value = object.lastName
    group.value = object.group
    work.checked = object.isWork
    
}

selectedFilter.addEventListener("click", function(e){
    let value = e.target.value;

    if(value === "All"){
        filtered = students;

    }else{
        filtered = students.filter((el) => el.group === value)
    }
   
    getStudent(tbody, filtered)


})