function uploadFile()
            {
                 /**
                 * Two variables should already be set.
                 * dropboxToken = OAuth access token, specific to the user.
                 * file = file object selected in the file widget.
                 */
                
                //document.getElementById('progressUpload').innerHTML = "The upload process is going on...";
                
                
                var file = document.getElementById('upload');
                var xhr = new XMLHttpRequest();
                
                xhr.upload.onprogress = function(evt) {
                    var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
                    document.getElementById('progressUpload').innerHTML = 'File Upload Progress: '+percentComplete+'%';
                    
                };
                xhr.onload = function() {
                  if (xhr.status === 200) {
                    var fileInfo = JSON.parse(xhr.response);
                    document.getElementById('progressUpload').innerHTML='File has been successfully uploaded.';
                  }
                  else {
                    alert(xhr.response || 'Unable to upload file');
                    // Upload failed. Do something here with the error.
                  }
                };
                 
                xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
                xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
                xhr.setRequestHeader('Content-Type', 'application/octet-stream');
                xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
                  path: '/' +  file.value.substr(12),
                  mode: 'add',
                  autorename: true,
                  mute: false
                }));
                 
                xhr.send(file.files[0]);
            }
            
            function download(){
                
                //window.location.href = 'http://www.google.com';
                window.location.href = link.getLink();
            }
            
            document.getElementById('fileDownload').style.visibility='hidden';
            
            var link = (function()   
            {
                var linkVal; // PRIVATE OBJECT
                var public={}; // PUBLIC OBJECT
                
                public.setLink=function(l)
                {
                    linkVal = l;
                };
                
                public.getLink = function()
                {
                    return linkVal;
                };
                return public;  //NEEDED IN ORDER FOR OTHER FUNCTION TO ACCESS PRIVATE OBJECT
            }());
            
            options = {
            
                error: function (errorMessage) {},
                // Required. Called when a user selects an item in the Chooser.
               
                success:function(files) {
                    document.getElementById('fileDownload').style.visibility='visible';
                    document.getElementById('fileDownload').innerHTML='Click Here';
                    link.setLink(files[0].link.substr(0,files[0].link.length-1)+'1');
                },
                // Optional. Called when the user closes the dialog without selecting a file
                // and does not include any parameters.
                cancel: function() {
                },
                // Optional. "preview" (default) is a preview link to the document for sharing,
                // "direct" is an expiring link to download the contents of the file. For more
                // information about link types, see Link types below.
                linkType: "preview", // or "direct"
                // Optional. A value of false (default) limits selection to a single file, while
                // true enables multiple file selection.
                multiselect: false, // or true
                // Optional. This is a list of file extensions. If specified, the user will
                // only be able to select files with these extensions. You may also specify
                // file types, such as "video" or "images" in the list. For more information,
                // see File types below. By default, all extensions are allowed.
                //extensions: ['.pdf', '.doc', '.docx', '.png', '.jpeg', '.jpg'],
            };
            
            function chooser(){
                Dropbox.choose(options);
            }
