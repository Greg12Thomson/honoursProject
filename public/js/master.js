var skills = "Microsoft Visio, Microsoft Word, Mobile IP, WiMAX, MODIS, MP3, Perl, Photoshop, PHP, Python, LAMP, PlanetLab, Ruby, Java, C#, R, Computer Science, SQL,Operating Systems,\
Apple Operating System,\
IBM Operating System,\
Linux,\
Windows Operating System,\
UNIX operating system".split(',');
var submit = false;

$(document).ready(function(){
    $(".list-group").hide();
    $("#clear").hide();
    $("#submit").click(function(){
      if (!submit){
        submit = true;
        $(".list-group").show();
        $("#clear").show();
        var description = $('#jobDescription').val();
        $(".list-group").append('<h3>Skills</h3>');
        $(".list-group").append('<p>Click <a href="#">(?)</a> to find out more about the skill</p>');
        for (var i = 0;i < skills.length;i++){
          // add list of skills
          if (description.includes(skills[i])){
            $(".list-group").append('<button type="button" class="list-group-item">' + skills[i] +'<a href="#">(?)</a> <span class="badge badge-success">add</span></button>');
          }
        }
        $('textarea').highlightTextarea({
          words: skills
        });
      }
    });

    $("#clear").click(function(){
      submit = false;
      $(".list-group").hide();
      $("#clear").hide();
      $('.list-group').empty();
    });
});
