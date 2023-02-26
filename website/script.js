  /*animation on scroll*/
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if (entry.isIntersecting){
        entry.target.classList.add('show')
      }
      else{
        entry.target.classList.remove('show')
      }

    });
  });
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el)=>observer.observe(el));

  /*login and sign up forms */

  function show(elementId){
    document.getElementById(elementId).style.display='block';
  }
  function hide(elementId){
    document.getElementById(elementId).style.display='none';
  }
  function switchForms(elementId1, elementId2){
    document.getElementById(elementId1).style.display = 'none';
    document.getElementById(elementId2).style.display ='block';
  }


  /*program popup*/
  setTimeout(function() {
    document.getElementById('popup').style.display='block';
  }, 3000); // 10000 milliseconds = 10 seconds
  

  function closepopup(){
    document.getElementById('popup').style.display='none';
  }


  function exportTableToExcel(tableId, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var table = document.getElementById(tableId);
    var tableRows = table.getElementsByTagName('tr');
    var tableHeader = table.querySelector('thead tr');
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.utils.sheet_add_aoa(ws, [Array.from(tableHeader.children).map(th => th.innerText)], {origin: 'A1'});
    var wbArray = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    var blob = new Blob([wbArray], {type: dataType});
    downloadLink = document.createElement('a');
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.click();
  }

  function exportTableToPDF(tableId, filename = ''){
    var table = document.getElementById(tableId);
    var tableRows = table.getElementsByTagName('tr');
    var tableHeader = table.querySelector('thead tr');
    var pdf = new jsPDF('p', 'pt', 'letter');
    var options = {
      startY: 60,
      margin: {top: 60},
      headStyles: {fillColor: [100, 100, 100], textColor: 255, fontSize: 12},
      columnStyles: {}
    };
    
    // Add table header row
    var headers = [];
    Array.from(tableHeader.children).forEach(function(th) {
      headers.push(th.innerText);
    });
    pdf.autoTable({
      head: [headers],
      body: [],
      ...options
    });
    
    // Add table rows
    var rows = [];
    for (var i = 0; i < tableRows.length; i++) {
      var rowCells = tableRows[i].getElementsByTagName('td');
      var rowData = [];
      for (var j = 0; j < rowCells.length; j++) {
        rowData.push(rowCells[j].innerText);
      }
      rows.push(rowData);
    }
    pdf.autoTable({
      head: [],
      body: rows,
      ...options
    });
    
    // Save PDF file
    pdf.save(filename);
  }
  