function addOrUpdateEmployee(){
    const code = document.getElementById("employee_code").value;
    const name = document.getElementById("employee_name").value;
    const email = document.getElementById("email").value;

    if(!code){
        alert("Mã nhân viên không được để trống!!");
        return;
    }
    if(!name){
        alert("Tên nhân viên không được để trống!!");
        return;
    }
    if(!email){
        alert("Email không được để trống!!");
        return;
    }

    let employees = JSON.parse(localStorage.getItem("employees"))  || [];

    //Kiểm tra trùng lặp mã nhân viên
    let trungLap = false;
    for(let i=0; i < employees.length ;i++){
        if(employees[i].code === code){
            trungLap = true;
            break;
        }
    }
    if(trungLap && document.getElementById("add_update_btn").innerText === "Add Employee"){
        alert("Mã nhân viên đã tồn tại!!");
        return;
    }

    //Kiểm tra trùng lặp email
    for(let i=0; i < employees.length ;i++){
        if(employees[i].email === email){
            trungLap = true;
            break;
        }
    }
    if(trungLap && document.getElementById("add_update_btn").innerText === "Add Employee"){
        alert("Email đã tồn tại!!");
        return;
    }

    //Kiểm tra nhân viên có tồn tại hay không và lưu vị trí để update
    let existEmployee = -1;
    for(let i=0;i< employees.length;i++){
        if(employees[i].code === code ){
            existEmployee = i;
            break;
        }
    }

    if(existEmployee > -1){
        //cập nhật lại thông tin nhân viên
        employees[existEmployee] = { code,name,email};
    }else{
        //thêm mới nhân viên
        employees.push({code,name,email});
    }

    localStorage.setItem("employees",JSON.stringify(employees));
    renderEmployeeList();
    resetForm();
}


function renderEmployeeList(){
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    let text = "";
    for(let i=0;i<employees.length;i++){
        let employee = employees[i];
        text+=
        `
        <tr>
            <td>${i+1}</td>
            <td>${employee.code}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>
                <button class="btn btn_edit" onclick='editEmployee("${employee.code}")'>Sửa</button>
                <button class="btn btn_delete" onclick='deleteEmployee("${employee.code}")'>Xoá</button>
            </td>
        </tr>
        `;
    }
    document.getElementById("employee_list").innerHTML=text;
}

function editEmployee(code){
    let employee;
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    for(let i=0;i<employees.length;i++){
        if(employees[i].code === code){
            employee = employees[i];
            break;
        }
    }
    if(employee){
        document.getElementById("employee_code").value = employee.code;
        document.getElementById("employee_name").value = employee.name;
        document.getElementById("email").value = employee.email;
        document.getElementById("add_update_btn").innerText = "Update Employee";
    }
}

function deleteEmployee(code){
    if(confirm(`Xác nhận xoá nhân viên có mã nhân viên: ${code}`)){
        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        for(let i=0;i<employees.length;i++){
            if(employees[i].code === code){
                employees.splice(i,1);
                break;
            }
        }
        localStorage.setItem("employees",JSON.stringify(employees));
        renderEmployeeList();
    }
}

function resetForm(){
    document.getElementById("employee_code").value = "";
    document.getElementById("employee_name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("add_update_btn").innerText = "Add Employee";
}
//localStorage.clear();