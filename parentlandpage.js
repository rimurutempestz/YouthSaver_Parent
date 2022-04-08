

window.onload = async function get_parentdetail(){
    
    parentlogindetail={userID: localStorage.getItem('userID') , pin: localStorage.getItem('PIN') }
    response = await fetch ('https://customer-jdmb6xkj5a-as.a.run.app/parent/details',{method:'post',body:JSON.stringify(parentlogindetail)})
    response = await response.json()
    parentgivenname = response.customerDetails.Content.ServiceResponse.CDMCustomer.GivenName
    console.log(response)
    document.getElementById("navbarDropdown1").innerText = parentgivenname; 
    

    
    
    customerdetailresponse = response.accountDetails
    localStorage.setItem("parentacno", customerdetailresponse['AccountID'].slice(6,) );
    console.log(customerdetailresponse)
    document.getElementById('accountbal').innerHTML= customerdetailresponse['Currency'] + " " + customerdetailresponse['Balance'] 
    localStorage.setItem("bal", customerdetailresponse['Balance']);
    localStorage.setItem("givenname_response", parentgivenname);
    // response = await fetch('http://tbankonline.com/SMUtBank_API/Gateway?Header={"Header": {"serviceName": "getDepositAccountDetails", "userID": "wpchen2019", "PIN": "123456", "OTP": "999999"}}&Content={"Content": {"accountID": "8688"}}');
    // depositdetail = await response.json();
    // console.log(depositdetail.Content.ServiceResponse.DepositAccount)
    // console.log(depositdetail.Content.ServiceResponse.DepositAccount['balance'])
    // currency = depositdetail.Content.ServiceResponse.DepositAccount['currency']
    // depositbalance = depositdetail.Content.ServiceResponse.DepositAccount['balance']
    // document.getElementById('accountbal').innerHTML= currency + " " + depositbalance
    
}


function addaccount(){
    window.location.href = "selectbank.html";
}

function logout(){
    localStorage.clear();
    window.location.href = "parentlogin.html";
}