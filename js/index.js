const columnDefs = [
      { headerName: "S.NO", field: "sNO", cellClass: "grid-cell-centered" },
      { field: "Name" },
      { field: "Email" },
      {field: "Balance"}
    ];

    // specify the data
    var rowData = [
      { sNO: "1", Name: "Monica", Email: "monica@email.com", Balance: 45300 },
      { sNO: "2", Name: "Ross", Email: "ross@email.com", Balance: 95400 },
      { sNO: "3", Name: "Rachel", Email: "rachel@email.com", Balance: 113900 },
      { sNO: "4", Name: "Joey", Email: "joey@email.com", Balance: 54000 },
      { sNO: "5", Name: "Janice", Email: "janice@email.com", Balance: 482000 },
      { sNO: "6", Name: "Chandler", Email: "chandler@email.com", Balance: 95400 },
      { sNO: "7", Name: "Emily", Email: "emily@email.com", Balance: 78950 },
      { sNO: "8", Name: "Phoebe", Email: "phoebe@email.com", Balance: 37000 },
      { sNO: "9", Name: "Ursula", Email: "ursula@email.com", Balance: 224000 },
      { sNO: "10", Name: "Emma", Email: "emma@email.com", Balance: 160000 },
    ];

    // let the grid know which columns and what data to use
    var gridOptions = {
      columnDefs: columnDefs,
      rowData: rowData,
      defaultColDef: {
        resizable: true,
        minWidth: 80,
        flex: 1,
        filter: true
        //enablePivot: true,
    },
    animateRows: true,
    pagination: true,
    paginationPageSize: 10,
    paginationNumberFormatter: function (params) {
        return '[' + params.value.toLocaleString() + ']';
    },
    };

    document.addEventListener("DOMContentLoaded", function () {
        // lookup the container we want the Grid to use
        var eGridDiv = document.querySelector('#myGrid');
        // create the grid passing in the div to use together with the columns & data we want to use
        new agGrid.Grid(eGridDiv, gridOptions);
    });
    function onPageSizeChanged(newPageSize) {
    var value = document.getElementById('page-size').value;
    gridOptions.api.paginationSetPageSize(Number(value));
}

function modalDisplay(){
  console.log("I am here")
  $('#instructions').modal('show');
}

function updateRecord(){
  let recieverName = $("#receiversName").val();
  let recieverAmount = $("#Amount").val();
  let senderName = $("#sendersName").val();
  var re = new RegExp("^[0-9]+$");
  console.log("recieverName =  " + recieverName );
  console.log("recieverAmount = " + recieverAmount);
  if(senderName == '' && recieverName == '' && recieverAmount === ''){
    alert("Please Provide Name and Amount to proceed");
  }
  for(let i = 0; i < rowData.length; i++){
    if(rowData[i].Name == recieverName){
      let balance = parseInt(rowData[i].Balance, 10);
      rowData[i].Balance = parseInt(recieverAmount,10) + balance;
      console.log(rowData[i].Balance);
    }
    if(rowData[i].Name == senderName){
      let balance = parseInt(rowData[i].Balance, 10);
      rowData[i].Balance = balance - parseInt(recieverAmount,10) ;
      console.log(rowData[i].Balance);
    }
  }
  alert("SUCCESSFULL TRANSFER!!")
  gridOptions.api.redrawRows();
  $('#instructions').modal('hide');
}