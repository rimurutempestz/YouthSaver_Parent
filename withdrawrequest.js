
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
    allparentchild = await fetch ('https://account-jdmb6xkj5a-as.a.run.app/accounts?customerID=' +parentcustid )
    allparentchild = await allparentchild.json()
    console.log(allparentchild.accounts)
    var url_string = window.location;
    var url = new URL(url_string);
    getchildcustid= url.searchParams.get("childcustid").split('?')[0];
    for(i in allparentchild.accounts){
        if( allparentchild.accounts[i]['ChildCustomerID'] == getchildcustid ) {
        childname = allparentchild.accounts[i]['ChildName']
        forcesavings = allparentchild.accounts[i]['ForceSavingsBalance']
        childaccid = allparentchild.accounts[i]['ChildAccountID'].slice(6,)
        //childcustid = allparentchild.accounts[i]['ChildCustomerID']
        bankfulldetail = "Deposit (" +  childaccid + ") - Bal $" +  forcesavings
        console.log(childname,bankfulldetail)
        
        childrequest = await fetch ('https://request-jdmb6xkj5a-as.a.run.app/requests?customerID=' +getchildcustid )
        childrequest = await childrequest.json()
        console.log(childrequest.requests)
        for(v in childrequest.requests){
            if(childrequest.requests[v]['Status']=='PENDING' &&  childrequest.requests[v]['CustomerID']==getchildcustid){
            childrequestid = childrequest.requests[v]['RequestID']
            childdescription = childrequest.requests[v]['Description']
            amountrequested = childrequest.requests[v]['Amount']
            
            console.log(childrequestid,childdescription,amountrequested)
            document.getElementById('page-wrap').innerHTML+=
            `<div class="container-fluid">
            
                    <div class="container-fluid" style="padding:10px; width:60%; -moz-box-shadow: 0 0 20px black; -webkit-box-shadow: 0 0 5px black; box-shadow: 0 0 5px black;">
                <div class="row" style="display:inline-block; margin:10px; ">
                        <span class="col-12" > 
                            <b>Withdraw Request from : </b><span id="requestchild">` + childname +`</span>
                        </span> 
                    </div>

                    <br><br> <hr><br>

                    <div class="row" style=" margin:0px;">
                        <span class="col-md-4" ><b>To Child Account</b></span>
                        <span class="col-md-8" >`+ bankfulldetail + `</span>
                    </div><br>

                    <div class="row" style="display:flex; margin:0px;">
                        <span class="col-md-4" ><b>Description</b></span>
                        <span class="col-md-8">`+ childdescription + `</span>
                    </div><br>

                    <div class="row" style="display:flex; margin:0px;">
                        <span class="col-md-4" ><b>Amount Requested</b></span>
                        <span class="col-md-8">`+amountrequested + `</span>
                    </div><br>

                    <div class="row" style="display:flex; margin:0px;">
                        <span class="col-md-4" ><b>Description/Reason (Optional):</b></span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" id="reason_` + childrequestid + `_` + getchildcustid + `" placeholder="">
                        </div>
                    </div><br>
                    
                    
                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-3" style="margin:0 auto; display:block;">
                        <button type="button" id="approve_` + childrequestid + `_` + getchildcustid + `_` + amountrequested + `" class="btn btn-success btn-sm" data-toggle="modal" onclick="approve(this.id)" >Approve </button>
                        <button type="button" id="reject_` + childrequestid + `_` + getchildcustid + `" class="btn btn-danger btn-sm" data-toggle="modal" onclick="reject(this.id)" >Reject </button>
                    
                        </div>
                    </div>
                </div>
            
            
            
            
            
            
            
            </div><br>`
                }
             }
        }
    }
   
    

}

async function approve(id){
    custid = id.split('_')[2]
    requestid = id.split('_')[1]
    amount = id.split('_')[3]
    console.log(custid,requestid,amount)
    approveresponse = await fetch("https://request-jdmb6xkj5a-as.a.run.app/approve?customerID="+custid+"&requestID=" + requestid )
    approveresponse = await approveresponse.json();
    console.log(approveresponse)
    alert(approveresponse.message)
    if(approveresponse.message=='request updated'){
        getcard = await fetch('https://youth-saver-card-be.herokuapp.com/api/card/userCard?userID='+ getchildcustid)
        getcard = await getcard.json();
        
        getcard = getcard.userCards[0].cardID
        console.log(getcard)
        updatedetail={withdrawalLimit:amount,creditLimit:0,isActivated:true}
        console.log(JSON.stringify(updatedetail))
        console.log('https://youth-saver-card-be.herokuapp.com/api/card/userCard?userID='+ getchildcustid+ '&cardID=' + getcard)
        updatecard = await fetch('https://youth-saver-card-be.herokuapp.com/api/card/userCard?userID='+ getchildcustid+ '&cardID=' + getcard,{method:"PUT",body:JSON.stringify(updatedetail),mode:'cors'})
        console.log(updatecard)
        updatecard = await updatecard.json();
        console.log(updatecard)

        window.location.href = "managebank.html";
    }
    
}

async function reject(id){
    custid = id.split('_')[2]
    requestid = id.split('_')[1]
    reasonid = 'reason_' + requestid + '_' + custid
    reason = document.getElementById(reasonid).value
    console.log(custid,requestid,reason)
    rejectdetail={customerID:custid,requestID:requestid,reason:reason}

    rejectresponse = await fetch("https://request-jdmb6xkj5a-as.a.run.app/reject", {
        method: "POST",
        
     
        body: JSON.stringify(rejectdetail)
    });
    rejectresponse = await rejectresponse.json();
    alert(rejectresponse.message)
    window.location.href = "managebank.html";
}

function logout(){
    localStorage.clear();
    window.location.href = "parentlogin.html";
}