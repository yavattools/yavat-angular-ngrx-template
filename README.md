# yavat-angular-ngrx-template

APIs added for agencies, collections,escrow,nonescrow,paymentdetails

getList:
  http://localhost:3000/agencies
  http://localhost:3000/getCollectionDates
  http://localhost:3000/escrow
  http://localhost:3000/nonEscrow
  http://localhost:3000/paymentdetails

Get By Id: 
  http://localhost:3000/agencies/1
  http://localhost:3000/getCollectionDates/1
  http://localhost:3000/escrow/1
  http://localhost:3000/nonEscrow/1
  http://localhost:3000/paymentdetails/1

Getby any other field: (examples, but you can pass any field with &)
  http://localhost:3000/agencies?agencyMasterId=1
  http://localhost:3000/getCollectionDates?collectionPracticesId=1&agencyMasterid=1
  http://localhost:3000/escrow?escrowId=1
  http://localhost:3000/nonEscrow?nonescrowId=1
  http://localhost:3000/paymentdetails?agencyMasterId=1

Add
  http://localhost:3000/agencies
  http://localhost:3000/getCollectionDates
  http://localhost:3000/escrow
  http://localhost:3000/nonEscrow
  http://localhost:3000/paymentdetails

Update by id:
  http://localhost:3000/agencies/1
  http://localhost:3000/getCollectionDates/1
  http://localhost:3000/escrow/1
  http://localhost:3000/nonEscrow/1
  http://localhost:3000/paymentdetails/1

Delete by id:
  http://localhost:3000/agencies/1
  http://localhost:3000/getCollectionDates/1
  http://localhost:3000/escrow/1
  http://localhost:3000/nonEscrow/1
  http://localhost:3000/paymentdetails/1
