window.boxite = {}

window.boxite.compile = function(interstitial) {
$(window).ready(function() {

marked.setOptions({smartypants: true});

var newlines = / *\n */g;
var paragraphs = /\n *\n/g;
var title = interstitial.header.title;
var line_matches = title.match(newlines);
var title_lines = line_matches ? 1+line_matches.length : 1;
var header_title = "";
for (var i=title_lines; i<3; i++)
    header_title += "<br>";
header_title += title.replace(newlines, "<br>");

window.document.title = title;
$("#title").html(header_title);
$("#header").attr({style: "background-image: url("+interstitial.header.image+")"})
if (interstitial.header.whitegradient) {
    $("#lens").addClass("white");
    $("#title").addClass("white");
}

$("#content").html("");

var lastwasimage = null;
for (var i=0; i<interstitial.content.length; i++) {
    var block = interstitial.content[i];
    var html = "";

    if ($.type(block) === "string") {
            html = marked(block);
            lastwasimage = false;
    } else if ("image" in block) {
        var height = block.height ? "height: "+block.height+"; " : "";
        var caption = block.caption ? '<strong><span class="caption">'+marked(block.caption).slice(3,-5)+'</span></strong>' : "";
        var overlay = block.overlay ? block.overlay : "gradient";
        var place = block.place ? '<span class="place">'+block.place+'</span>' : "";
        var date = block.date ? '<span class="date">'+block.date+'</span>' : "";
        html = '<div class="project-outer" style="'+height+'background-image: url('+block.image+');"><div class="'+overlay+'"><div class="project-inner">'+place+caption+date+'</div></div></div>';
        if (!lastwasimage)
            html = "</p>"+html;
        lastwasimage = true;
    } else {
        console.log("Unknown object:");
        console.log(block);
    }

    $("#content").append(html);
}

$("#content").append('<br><hr />')

}) };