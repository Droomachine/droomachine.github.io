$(document).ready(function () {
    if (localStorage.getItem('checked-checkboxes') && $.parseJSON(localStorage.getItem('checked-checkboxes')).length !== 0)
    {
      var arrCheckedCheckboxes = $.parseJSON(localStorage.getItem('checked-checkboxes'));
      $(arrCheckedCheckboxes.toString()).prop('checked', true);
      var filt =  arrCheckedCheckboxes.filter(myFilter);
        function myFilter(value){
          var exp = /#(\d+)/;
          return exp.test(value);
        }
      var width = Math.round(filt.length/386*10000)/100;
      document.getElementById("normalStats").style.width = width +'%';
      document.getElementById("normalStats").innerHTML = width + '%';

      filt =  arrCheckedCheckboxes.filter(myFilter2);
        function myFilter2(value){
          var exp = /^#shiny.*$/;
          return exp.test(value);
        }
       width = Math.round(filt.length/78*10000)/100;
      document.getElementById("shinyStats").style.width = width +'%';
      document.getElementById("shinyStats").innerHTML = width + '%';


      filt =  arrCheckedCheckboxes.filter(myFilter3);
        function myFilter3(value){
          var exp = /^#special.*$/;
          return exp.test(value);
        }
       width = Math.round(filt.length/40*10000)/100;
      document.getElementById("specialStats").style.width = width +'%';
      document.getElementById("specialStats").innerHTML = width + '%';


      filt =  arrCheckedCheckboxes.filter(myFilter4);
        function myFilter4(value){
          var exp = /^#alolan.*$/;
          return exp.test(value);
        }
       width = Math.round(filt.length/18*10000)/100;
      document.getElementById("alolanStats").style.width = width +'%';
      document.getElementById("alolanStats").innerHTML = width + '%';



    }

  });
