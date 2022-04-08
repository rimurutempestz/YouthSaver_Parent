


function verifylogin(){
    userid = document.getElementById('userid').value
    pin = document.getElementById('pin').value
    if(userid=='' && pin==''){
        alert('Please fill up all the fields.')
    }
    else{
        login();
    }
    
}




async function login(){
    userid = document.getElementById('userid').value
    pin = document.getElementById('pin').value
    console.log(userid,pin)
    getotp={UserID:userid,Pin:pin}

    response = await fetch ('https://sms-jdmb6xkj5a-as.a.run.app/otp',{method:"post",body:JSON.stringify(getotp)})
    response = await response.json()
    response = response.message
    console.log(response)
    if(response == "OTP request sent"){
        var myModal = document.getElementById("otpmodal");
        var modal = new bootstrap.Modal(myModal);
        modal.show(); 

    }
    else{
        alert(response)
    }

    

}


async function otpverify(){
    
    otp = document.getElementById('otp').value
    console.log(userid,pin,otp)
    logindetail= {userID:userid,PIN:pin,OTP:otp}
    response = await fetch ('https://customer-jdmb6xkj5a-as.a.run.app/login',{method:"post",body:JSON.stringify(logindetail)})
    response = await response.json()
    console.log()
    if(Object.keys(response).length==1){
        response = response.message
    }
    else{
        response = response.loginDetails.Content.ServiceResponse.ServiceRespHeader['ErrorDetails'] 
    }
    console.log(response)
    if(response=="Success"){
        localStorage.setItem("userID", userid);
        localStorage.setItem("PIN", pin);
        window.location.href = "parentlandpage.html";
    }
    else{
        alert("Wrong OTP.")
    }
}