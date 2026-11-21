function setup(tableId, countId) {
  var table = document.getElementById(tableId);

  table.onclick = function (e) {
    var btn = e.target;
    if (btn.tagName != "BUTTON") return;

    var row = btn.parentNode.parentNode;   
    var name = row.cells[0].textContent;   
    row.remove();

    document.getElementById(countId).textContent = table.rows.length - 1;
    document.getElementById("msg").textContent = name + " - " + btn.textContent + " hoyeche";
  };
}
setup("table1", "count1");
setup("table2", "count2");

var select = document.getElementById("city");
var rows = document.getElementById("work").rows;

select.onchange = function () {
  var count = 0;

  for (var i = 1; i < rows.length; i++) {          
    var city = rows[i].cells[3].textContent;       

    if (select.value == "All cities" || city == select.value) {
      rows[i].style.display = "";
      count++;
    } else {
      rows[i].style.display = "none";
    }
  }

  document.getElementById("total").textContent = count + " ta dekhacche";
};
