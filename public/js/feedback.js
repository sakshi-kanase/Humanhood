const roleSelect = document.getElementById("roleSelect");
const volunteerFields = document.getElementById("volunteerFileds");
const donorFields = document.getElementById("donorFileds");

volunteerFields.style.display="none";
donorFields.style.display="none";

roleSelect.addEventListener("change",function(){
    const role =this.value;
    volunteerFields.style.display="none";
    donorFields.style.display="none";
    if(role === "Volunteer"){
        volunteerFields.style.display = "block";
    }
    if(role === "Donor"){
        donorFields.style.display = "block";
    }
});