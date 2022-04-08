
window.onload = async function getbankdetail(){
    parentlogindetail={userID: localStorage.getItem('userID') , pin: localStorage.getItem('PIN') }
    custresponse = await fetch ('https://customer-jdmb6xkj5a-as.a.run.app/parent/details',{method:'post',body:JSON.stringify(parentlogindetail)})
    custresponse = await custresponse.json()
    parentgivenname = custresponse.customerDetails.Content.ServiceResponse.CDMCustomer.GivenName
    var user_name= parentgivenname
    document.getElementById("navbarDropdown1").innerText = user_name; 
    response = await fetch('https://banks-jdmb6xkj5a-as.a.run.app/banks?userID=' + localStorage.getItem('userID') + '&pin=' + localStorage.getItem('PIN')
    ,{mode:'cors'});
    depositdetail = await response.json();
    console.log(depositdetail.banks)
    currentbal = localStorage.getItem("bal")
    console.log(currentbal)
    tbank=depositdetail.banks[0]
    ocbcbank=depositdetail.banks[1]
    hsbcbank=depositdetail.banks[2]
    jpmorganbank=depositdetail.banks[3]
    document.getElementById('ocbcmin').innerText+= " "+ ocbcbank['MinOpeningBalance']
    document.getElementById('ocbcinterest').innerText+= " "+ ocbcbank['InterestRate']

    document.getElementById('tbankmin').innerText+= " "+ tbank['MinOpeningBalance']
    document.getElementById('tbankinterest').innerText+= " "+ tbank['InterestRate']

    document.getElementById('jpmorganmin').innerText+= " "+ jpmorganbank['MinOpeningBalance']
    document.getElementById('jpmorganinterest').innerText+= " "+ jpmorganbank['InterestRate']

    document.getElementById('hsbcmin').innerText+= " "+ hsbcbank['MinOpeningBalance']
    document.getElementById('hsbcinterest').innerText+= " "+ hsbcbank['InterestRate']
    
    if(parseFloat(currentbal) < parseFloat(ocbcbank['MinOpeningBalance'])){
        document.getElementById('ocbcbank').style.color = "grey";
        document.getElementById('ocbcimg').style.opacity = "0.5";
        document.getElementById('ocbcbank').onclick = "";
    }

    if(parseFloat(currentbal) < parseFloat(tbank['MinOpeningBalance'])){
        document.getElementById('tbankbank').style.color = "grey";
        document.getElementById('tbankimg').style.opacity = "0.5";
        document.getElementById('tbankbank').onclick = "";
    }
    
    
    if(parseFloat(currentbal) < parseFloat(jpmorganbank['MinOpeningBalance'])){
        document.getElementById('jpmorganbank').style.color = "grey";
        document.getElementById('jpimg').style.opacity = "0.5";
        document.getElementById('jpmorganbank').onclick = "";
    }

    if(parseFloat(currentbal) < parseFloat(hsbcbank['MinOpeningBalance'])){
        document.getElementById('hsbcbank').style.color = "grey";
        document.getElementById('hsbcimg').style.opacity = "0.5";
        document.getElementById('hsbcbank').onclick = "";
    }
   
}
function selectbankcall(clicked_id){
   
    if(clicked_id=="tbankbank"){
        tbankid = document.getElementById('tbankid').innerText
        tbankcurrency = document.getElementById('tbankcurrency').innerText
        console.log(clicked_id,tbankid)
        window.location.href = "createsaveracc.html?bankid=" + tbankid.toString().replace(/\s/g, '') + '?currency=' + tbankcurrency.toString().replace(/\s/g, '')+ '?minbal=' + tbank['MinOpeningBalance'].toString().replace(/\s/g, '');
    }
    if(clicked_id=="ocbcbank"){
        ocbcid = document.getElementById('ocbcid').innerText
        ocbccurrency = document.getElementById('ocbccurrency').innerText
        console.log(clicked_id,ocbcid)
        window.location.href = "createsaveracc.html?bankid=" + ocbcid.toString().replace(/\s/g, '') + '?currency=' + ocbccurrency.toString().replace(/\s/g, '')+ '?minbal=' + ocbcbank['MinOpeningBalance'].toString().replace(/\s/g, '');
    }
    if(clicked_id=="hsbcbank"){
        hsbcid = document.getElementById('hsbcid').innerText
        hsbccurrency = document.getElementById('hsbccurrency').innerText
        console.log(clicked_id,hsbcid)
        window.location.href = "createsaveracc.html?bankid=" + hsbcid.toString().replace(/\s/g, '') + '?currency=' + hsbccurrency.toString().replace(/\s/g, '')+ '?minbal=' + hsbcbank['MinOpeningBalance'].toString().replace(/\s/g, '');
    }
    if(clicked_id=="jpmorganbank"){
        jpmorganid = document.getElementById('jpmorganid').innerText
        jpcurrency = document.getElementById('jpcurrency').innerText
        console.log(clicked_id,jpmorganid)
        window.location.href = "createsaveracc.html?bankid=" + jpmorganid.toString().replace(/\s/g, '') + '?currency=' + jpcurrency.toString().replace(/\s/g, '') + '?minbal=' + jpmorganbank['MinOpeningBalance'].toString().replace(/\s/g, '');
    }
    
}

function logout(){
    localStorage.clear();
    window.location.href = "parentlogin.html";
}