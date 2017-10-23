
document.getElementById("downloadDiv").style.visibility='hidden';
document.getElementById("uploadDiv").style.visibility='hidden';
function openMenuBar()
{
    document.getElementById("windowSlide").style.visibility='visible';
    document.getElementById("windowSlide").style.width = "250px";
}

function closeMenuBar()
{   
    document.getElementById("windowSlide").style.width = "0px";
}

function dloadActivate()
{
    document.getElementById("downloadDiv").style.visibility='visible';
    document.getElementById("uploadDiv").style.visibility='hidden';
}

function uloadActivate()
{
    document.getElementById("fileDownload").style.visibility='hidden';
    document.getElementById("downloadDiv").style.visibility='hidden';
    document.getElementById("uploadDiv").style.visibility='visible';
}
            