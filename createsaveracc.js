
window.onload = async function registerdetail(){




    parentlogindetail={userID: localStorage.getItem('userID') , pin: localStorage.getItem('PIN') }
    response = await fetch ('https://customer-jdmb6xkj5a-as.a.run.app/parent/details',{method:'post',body:JSON.stringify(parentlogindetail)})
    response = await response.json()
    parentgivenname = response.customerDetails.Content.ServiceResponse.CDMCustomer.GivenName
    parentuserid = localStorage.getItem('userID')
    parentpin = localStorage.getItem('PIN')
    parentcustid = response.customerDetails.Content.ServiceResponse.CDMCustomer.Customer.CustomerID
    parentemail = response.customerDetails.Content.ServiceResponse.CDMCustomer.Profile.Email
    console.log(parentcustid)
    document.getElementById("navbarDropdown1").innerText = parentgivenname; 
    var url_string = window.location;
    var url = new URL(url_string);
    bankid= url.searchParams.get("bankid").split('?')[0];
    currency= url.searchParams.get("bankid").split('?')[1].split('=')[1];
    minOpeningBalance= url.searchParams.get("bankid").split('?')[2].split('=')[1];
    console.log(minOpeningBalance)
    if (bankid==4){
        document.getElementById("bankimg").src = "ocbc.png"
        document.getElementById("bankname").innerText = " OCBC Bank"
        document.getElementById("currency").innerText = " SGD"
    }

    if (bankid==8){
        document.getElementById("bankimg").src = "hsbc.png"
        document.getElementById("bankname").innerText = " HSBC Bank"
        document.getElementById("currency").innerText = " HKD"
    }

    if (bankid==11){
        document.getElementById("bankimg").src = "jpmorgan.jpg"
        document.getElementById("bankname").innerText = " JPMORGAN Bank"
        document.getElementById("currency").innerText = " USD"
    }

    if (bankid==1){
        document.getElementById("bankimg").src = "tbank.png"
        document.getElementById("bankname").innerText = " TBANK Bank"
        document.getElementById("currency").innerText = " SGD"
    }


    
   
    

}
function checksignupform(){
    nricreresult = "s5559212a"
    familyname = document.getElementById('familyname').value
    givenname = document.getElementById('givenname').value
    dob = document.getElementById('dob').value
    

    gender = document.getElementById('gender').value
    occupation = document.getElementById('occupation').value
    streetaddress = document.getElementById('streetaddress').value
    city = document.getElementById('city').value

    state = document.getElementById('state').value
    country = document.getElementById('country').value
    postalcode = document.getElementById('postalcode').value
 
    email = document.getElementById('email').value

    mobileno = document.getElementById('mobileno').value
    preferredid = document.getElementById('preferredid').value

    if (nricreresult == "" || familyname == "", givenname == "" || dob == "", gender == "" || occupation == "", streetaddress == "" 
    || city == "" || state == "" || country == "" || postalcode == "" || email == "" || mobileno == "" || preferredid == "") {
        alert("Please Fill All Required Field");
        return false;
      }
    else{
        createaccount();
    }
}

async function createaccount(){
    // var formData = new FormData();
    // let file = document.getElementById("new_file");
    // if ('files' in file) {
    //     if (file.files.length != 0) {
    //         formData.append('url', file.files[0])
    //         //console.log(file.files[0]);
    //     }
    // }

    // var content_type = "file";
    // formData.append("content_type", content_type);
    // console.log(file.files[0])
    // for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }
    nricresulttest = document.getElementById('ocrresult').value
    console.log(nricresulttest)
    //form values
    nricreresult = "s1897292a"
    familyname = document.getElementById('familyname').value
    givenname = document.getElementById('givenname').value
    dob = document.getElementById('dob').value
    getparentacno = localStorage.getItem("parentacno")

    gender = document.getElementById('gender').value
    occupation = document.getElementById('occupation').value
    streetaddress = document.getElementById('streetaddress').value
    city = document.getElementById('city').value

    state = document.getElementById('state').value
    country = document.getElementById('country').value
    postalcode = document.getElementById('postalcode').value
 
    email = document.getElementById('email').value

    mobileno = document.getElementById('mobileno').value
    preferredid = document.getElementById('preferredid').value
    console.log(bankid)
    createaccountdetail={
        parentUserID : parentuserid,
        parentPin : parentpin,
        parentCustomerID : parentcustid,
        parentGivenName :parentgivenname ,
        parentDepositAccountID:getparentacno,
        parentEmail :parentemail ,
        icNumber :nricreresult ,
        familyName :familyname ,
        givenName : givenname,
        dateOfBirth : dob,
        gender : gender,
        occupation : occupation,
        streetAddress :streetaddress ,
        city : city,
        state : state,
        country : country,
        postalCode : postalcode,
        emailAddress : email,
        countryCode : "+65",
        mobileNumber : mobileno,
        preferredUserID : preferredid,
        currency : currency,
        bankID :bankid ,
        minOpeningBalance : minOpeningBalance
       
    }
    console.log(createaccountdetail)

    createresponse = await fetch("https://customer-jdmb6xkj5a-as.a.run.app/create", {
        method: "POST",
        
     
        body: JSON.stringify(createaccountdetail)
    });
    accountresult = await createresponse.json();
    console.log(accountresult)
    //alert(accountresult.message)
    if(accountresult.message != "account already exist"){
        var myModal = document.getElementById("successmodal");
        var modal = new bootstrap.Modal(myModal);
        modal.show(); 
        //alert('Your Child YouthSaver account has been created.')
       
        //window.location.href = "parentlandpage.html";
    
  
    }
    else{
        //alert(accountresult.message)
        document.getElementById("failmssg").innerText = "Account already existed."
        var myModal = document.getElementById("failmodal");
        var modal = new bootstrap.Modal(myModal);
        modal.show(); 
    }

}
function cancel(){
    window.location.href = "parentlandpage.html"
  }
function logout(){
    localStorage.clear();
    window.location.href = "parentlogin.html";
}