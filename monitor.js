// Node.js example
/* running 'npm run build' is necessary before launching the examples */

var {Apis} = require("bitsharesjs-ws");
let wsString = "wss://bitshares.openledger.info/ws";
let wsStringLocal = "ws://127.0.0.1:8090";

/*
This is a bit of test code I wrote to monitor the blockchain for changes
to a specific account. It opens a socket and scans each block for transfer
operations. You can set filters so only certain operations are logged inside
the transfer object shown below. To do this, uncomment the transfer object and
set specific information you'd like to monitor like to, from, amount, etc.
*/

var transfer = {};

// transfer = { 
//     to: "1.2.21594",
//     from: "1.2.89249",
//     amount: { amount: 100000, asset_id: "1.3.0" }
// }

Apis.instance(wsString, true).init_promise.then((res) => {
    console.log("connected to:", res[0].network);

    Apis.instance().db_api().exec( "set_subscribe_callback", [ updateListener, true ] );
});

function updateListener(object) {
    if (object[0][0].id == '2.1.0') {
        console.log(object[0][0]);
        console.log("-------------Transfers in block " + object[0][0].head_block_number + "------------");
        Apis.instance().db_api().exec("get_block", [ parseInt(object[0][0].head_block_number) ]).then(response => {
            response.transactions.forEach(transaction => {
                transaction.operations.forEach(operation => {
                    if (operation[0] == 0 && Object.keys(transfer).length == 0)
                    {
                        console.log(operation[1]);

                    } else if (operation[0] == 0) {
                        
                        if (operation[1].from == transfer.from && 
                            operation[1].to == transfer.to && 
                            operation[1].amount.amount == transfer.amount.amount &&
                            operation[1].amount.asset_id == transfer.amount.asset_id)
                            {
                                console.log(operation[1]);
                            }
                    }
                })
            })
            console.log("-------------End block " + object[0][0].head_block_number + "------------");
        })
    }
    // console.log("set_subscribe_callback update:\n", object);
    
}
