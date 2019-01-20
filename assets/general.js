$(document).ready(function()  {
  //load entire view
  $('#content').load('index.php');

  //handle naviation button clicks
  $('ul#nav li a').click(function() {
    var page = $(this).attr('href');
    $('#content').load('' + page + '.php');
  });
});
