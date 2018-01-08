# Bitshares Pay

This repo will house the bitshares-pay code which will facilitate web based checkout with any bitshares asset. Plans are to develop nodejs, pip and php libraries.

Bitshares Pay will allow varying degrees of integration. It could be as simple as a bit of embeddable code that displays a QR code / amount / account name and specified asset with no real knowledge of the backend. It might also have connectivity to the backend so it could conform payment receipt in an interactive fashion. Additionally it would be nice to have an even deeper integration that could allow for an automated refund if certain criteria were not present in the memo field (invoice number or literally anything that the user specifically needs in order to tie a payment back to an order.
 
## Readonly mode

Parameters include:

- Account Name (required)
- Asset (required) 1.3.121 would be bitUSD
- Amount (optional)
- Memo contents (customizable json)
- Theme (optional, default light)

