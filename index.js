//https://documenter.getpostman.com/view/14382960/UVXokD8M#d8b866d6-0311-495c-96b4-49d4d38a20ed
//GET COIN AND GET BANK API
const apiKey = "ozhscJKQisFUx19mWOekERzdp6e2flxo"
const coinListDom = document.querySelector(".coinlist")
const bankListDom = document.querySelector(".banklist")
const accountNumber = document.querySelector(".account-Number")

const requestOptions = {
       method: 'GET',
       redirect:'follow'
     }

     let isCoinSelect = false
     let isBankSelect = false
     let BankGroup = document.getElementById('bank-group')
     const accountGroup = document.querySelector("#account-group")
    //  let coinListDom = document.querySelector(".coinlist")

     if(isCoinSelect === false){
        BankGroup.style.display = "none"
     }else{
        BankGroup.style.display = "block"
     }

     if(isBankSelect === false){
        accountGroup.style.display = "none"
     }else{
        accountGroup.style.display = "block"
     }

     coinListDom.addEventListener("change", ()=>{
        isCoinSelect = true
        BankGroup.style.display = "block"
     })

     bankListDom.addEventListener("change", ()=>{
        isBankSelect = true
        accountGroup.style.display = "block"
     })

     accountNumber.addEventListener("keyup", ()=>{
        if(accountNumber.value.length == 10){
            document.querySelector(".loader").style.display = "block"
            verifyBankDetails(accountNumber.value, bankListDom.value)
        }else if(accountNumber.value.length<10){
            document.querySelector(".loader").style.display = "none"
            document.querySelector(".name").innerText = ""
            document.querySelector(".name").style.display = "none"
            
        }

     })

    
   
const getCoin = async (key)=>{
   const request = await fetch(`https://merchant.birrionapi.com/api/get_coins?api_key=${key}`,requestOptions)
   console.log(request);
   if (request.status ===200) { 
    
    const coinL = await request.json()
    
    
    if (coinL.status === true) {
     const coinList = coinL.message   
     let coins = "<option value='' disabled  selected>Select Coin to start</option>"
     coinList.forEach((coin) => {
     coins += `<option value='${coin.symbol}'>${coin.name} (${coin.symbol})</option>`
     })
     coinListDom.innerHTML = coins
     }

    else{
     coinListDom.innerHTML = `<option    value="">Loading...</option>`
    }
   }else{
    coinListDom.innerHTML = `<option value="">Network Error... please reload</option>`
   }
      
}

getCoin(apiKey)


const getBank = async ()=>{
    const request = await fetch(`https://merchant.birrionapi.com/api/get-banks`, requestOptions)
   
    if (request.status === 200) {   
        const bankList = await request.json()
    
    const bankListData = bankList.data
    let banks = "<option value='' disabled selected>Select Bank to continue</option>"

    if(bankList.message === "successful"){
        bankListData.forEach((bank)=>{
          banks += `<option value="${bank.code}">${bank.name}</option>` 
        })
    }else{
        bankListDom.innerHTML = `<option value="">Loading...</option>`
    }

    bankListDom.innerHTML = banks
    }else{
        bankListDom.innerHTML = `<option value="">Network Error... Please reload Page</option>`
    } 
    
}

getBank()

//verifying account details
let verifyBankDetails = (accNo, bankCode) =>{

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const userDetail = {
    account_number: accNo,
    bank_code: bankCode
}



const raw = JSON.stringify(userDetail)

    var requestOptionss = {
        method: 'POST',
        redirect: 'follow',
        headers: myHeaders,
        body: raw,
        
    };

    let vbapi = async ()=>{
        const response = await fetch("https://merchant.birrionapi.com/api/verify-bank-account", requestOptionss)
        const result = await response.json()

        if (result.status == false) {
            document.querySelector(".name").innerText = "Invalid Account Number"
            document.querySelector(".name").style.display = "block"
            document.querySelector(".loader").style.display = "none"
        }else{
            document.querySelector(".loader").style.display = "none"
            document.querySelector(".name").innerText = result.data.accountname
            document.querySelector(".name").style.display = "block"
            document.querySelector(".tick").style.display = "block"

        }
    }

    vbapi()

//     fetch("https://merchant.birrionapi.com/api/verify-bank-account", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));
}













