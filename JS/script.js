// alert();
var addBtn = document.getElementById("add_btn");
var regForm = document.querySelector("#registrationForm");
var allInput = regForm.querySelectorAll("input");
var form = document.querySelector(".form_section");
var close = document.getElementById("close");
var plus = document.getElementById("plus");
var fileh = document.getElementById("file");

addBtn.addEventListener("click", function showForm() {
  form.classList.add("active");
});

close.addEventListener("click", function closeForm() {
  form.classList.remove("active");
  for (var i = 0; i < allInput.length; i++) {
    allInput[i].value = "";
  }
});

plus.addEventListener("click", function showFile() {
  fileh.style.width = "100%";
});

// Registering the employee
var userData = [];
var profilPic = document.getElementById("profilePic");
var uploadPic = document.getElementById("file");
var empId = document.getElementById("emp_id");
var empName = document.getElementById("emp_name");
var empEmail = document.getElementById("emp_email");
var empOffice = document.getElementById("emp_offc");
var empJob = document.getElementById("emp_jobt");
var regBtn = document.querySelector(".reg_btn");
var updateBtn = document.querySelector(".up_btn");
var imgUrl;

// registering the data

regBtn.onclick = function (e) {
  e.preventDefault();
  registrationData();
  getDataFromLocal();
  regForm.reset("");
  close.click();
};

if (localStorage.getItem("userData") != null) {
  userData = JSON.parse(localStorage.getItem("userData"));
}

function registrationData() {
  userData.push({
    Id:empId.value,
    Name: empName.value,
    Email: empEmail.value,
    OfficeCode: empOffice.value,
    Job: empJob.value,
    profilPic: imgUrl == undefined ? "img/location.png" : imgUrl,
  });
  // console.log(empId);

  var userString = JSON.stringify(userData);
  localStorage.setItem("userData", userString);
  swal("Good job!", "Registration Successfull!", "success");
}

// start returning data on page from local storage

var tableData = document.querySelector("#table-data");

const getDataFromLocal = () => {
  tableData.innerHTML = "";
  userData.forEach((data, index) => {
    tableData.innerHTML += `
          <tr index='${index}'>    
            <td>${index + 1}</td>
            <td><img src="${data.profilPic}" height="40" width="40"/></td>
            <td>${data.Id}</td>
            <td>${data.Name}</td>
            <td>${data.Email}</td>
            <td>${data.OfficeCode}</td>
            <td>${data.Job}</td>
            <td>
              <button class="edit-btn"><i class="fa-solid fa-eye"></i></button>
              <button class="del-btn"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
    `;
  });

  // delete code start here
  var i;
  var allDelBtn = document.querySelectorAll(".del-btn");
  for (i = 0; i < allDelBtn.length; i++) {
    allDelBtn[i].addEventListener("click", function () {
      var tr = this.parentElement.parentElement;
      var idel = tr.getAttribute("index");

      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Profile!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          userData.splice(idel, 1);
          localStorage.setItem("userData", JSON.stringify(userData));
          // console.log(tr);
          tr.remove();
          swal("Poof! Your Profile has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your Profile is safe!");
        }
      });
    });
  }
  // delete code Ends here

  // update code start here
  var editBtn = document.querySelectorAll(".edit-btn");
  for (i = 0; i < editBtn.length; i++) {
    editBtn[i].onclick = function () {
      var tr = this.parentElement.parentElement;
      var td = tr.getElementsByTagName("td");
      var index = tr.getAttribute("index");
      var imgTag = td[1].getElementsByTagName("img");
      var pro_pic = imgTag[0].src;
      var id = td[2].innerHTML;
      var name = td[3].innerHTML;
      var email = td[4].innerHTML;
      var OfficeCode = td[5].innerHTML;
      var job = td[6].innerHTML;
      addBtn.click();
      regBtn.disabled = true;
      updateBtn.disabled = false;
      // setting the value on form
      empId.value = id;
      empName.value = name;
      empEmail.value = email;
      empOffice.value = OfficeCode;
      empJob.value = job;
      profilPic.src = pro_pic;

      // update the form code
      updateBtn.addEventListener("click", function (e) {
        userData[index] = {
          Id: empId.value,
          Name: empName.value,
          Email: empEmail.value,
          OfficeCode: empOffice.value,
          Job: empJob.value,
          profilPic: uploadPic.value == "" ? profilPic.src : imgUrl,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        window.location = location.href;
        close.click();
      });
    };
  }

  // update code ends here
};

getDataFromLocal();

// image processing

uploadPic.onchange = function () {
  if (uploadPic.files[0].size < 1000000) {
    var fReader = new FileReader();

    fReader.onload = function (b) {
      imgUrl = b.target.result;
      // profilPic.setAttribute("src", imgUrl);
      profilPic.src = imgUrl;
    };

    fReader.readAsDataURL(uploadPic.files[0]);
  } else {
    alert("File size is too long !!");
  }
};

// search filter code starts

var searchEl = document.querySelector("#search_id");
searchEl.addEventListener("input", function (){
  searchFun();
});

function searchFun() {
  var tr = tableData.querySelectorAll("tr");
  var filter = searchEl.value.toLowerCase();
  var i;
  for (i = 0; i < tr.length; i++) {

    var id = tr[i].getElementsByTagName("td")[2].innerHTML;
    var name = tr[i].getElementsByTagName("td")[3].innerHTML;
    var email = tr[i].getElementsByTagName("td")[4].innerHTML;
    var OfficeCode = tr[i].getElementsByTagName("td")[5].innerHTML;
    var job = tr[i].getElementsByTagName("td")[6].innerHTML;


    if (id.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    }else if (name.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    }else if (email.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    }else if (OfficeCode.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    }else if (job.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    }else {
      tr[i].style.display = "none";
    }
  }
}



// search filter code ends


// clearing the data at one click

var clrData = document.querySelector("#clr-btn");
var check = document.querySelector("#check");

clrData.addEventListener('click',()=>{
  if(check.checked==true){
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover all this Profile!",
      icon: "danger",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("userData");
        window.location = location.href;
        swal("Poof! Your Profile has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your Profile is safe!");
      }
    });
  }else{
    swal("Checkbox", "Please check the box to delete all data from table", "warning");
  }
})