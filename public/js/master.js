var skills = "Microsoft Visio, Microsoft Word, Mobile IP, WiMAX, MODIS, MP3, Perl, Photoshop, PHP, LAMP, PlanetLab, Ruby, Java, C, R, Computer Science, SQL,Operating Systems,\
Apple Operating System,\
IBM Operating System,\
Linux,\
Windows Operating System,\
UNIX operating system".split(',');

$(document).ready(function(){
    $("#btn-group").hide();

    $("#submit").click(function(){
        $("#btn-group").show();
        var description = $('#jobDescription').val();
        for (var i = 0;i < skills.length;i++){
          if (description.includes(skills[i])){
            $( "#btn-group" ).append( '<button type="button" class="btn btn-primary">' + skills[i] + ' <span class="badge">-</span></button>');
          }
        }
        $('textarea').highlightTextarea({
          words: skills
        });
    });
});
