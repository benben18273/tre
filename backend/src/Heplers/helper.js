const TronWeb =  require('tronweb');


function contract_decimals($input = null)
{
    $output = {
        6 : "picoether",
        8 : "customeight",
        9 : 'nanoether',
        12 : 'microether',
        15 : 'milliether',
        18 : 'ether',
        21 : 'kether',
        24 : 'mether',
        27 : 'gether',
        30 : 'tether',
    };
    if (($input == null)) {
        return $output;
    } else {
        $result = 'ether';
        if (($output[$input])) {
            $result = $output[$input];
        }
        return $result;
    }
}

function customDecimal(input)
{
    let k='';
    for(j = 1; j <= input; j++) {
         k = k + '0';
    }
    return 1+k;
}

function customFromWei(amount,decimal)
{
    return (amount/customDecimal(decimal)).toString()
}
function customToWei(amount,decimal)
{
    return (amount*customDecimal(decimal)).toString()
}
function powerOfTen(x) {
  return Math.pow(10, x);
}

function tronWebCall(req, res) {
    const tronWeb = new TronWeb ({
            fullHost: req.headers.chainlinks,
            headers: {
                "TRON-PRO-API-KEY": process.env.TRONGRID_API_KEY
            }
        });
    return tronWeb;
}
async function checkTx(tronWeb,txId) {
    return true;
  let txObj = await fetchTx(tronWeb, txId);
  if(txObj.hasOwnProperty('Error')) throw Error(txObj.Error);
    while(!txObj.hasOwnProperty('receipt')) {
      await new Promise(resolve => setTimeout(resolve, 45000)); //sleep in miliseconds
      txObj = await fetchTx(txId);
    }
  if(txObj.receipt.result == 'SUCCESS') return true;
  else return false;
}

async function fetchTx(tronWeb,txId) {
  return await tronWeb.trx.getTransactionInfo(txId);
}
module.exports = {
    tronWebCall,
    contract_decimals,
    customDecimal,
    customFromWei,
    customToWei,
    powerOfTen,
    checkTx
}