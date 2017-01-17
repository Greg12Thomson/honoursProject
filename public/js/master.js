// $('#myTabs a').click(function (e) {
//   e.preventDefault()
//   $(this).tab('show')
// })

$(document).ready(function(){
  $('ul.tabs').tabs();
});

$('#textarea1').trigger('autoresize');

$(document).ready(function() {
  $('textarea#textarea1').characterCounter();
});
