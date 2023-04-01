jQuery(document).ready(function($){
  var snapUrl;
  var infoArray = {};
  var infoJson;
  function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  var imgData = "";
    $(function() { 
    $("#btnSave").click(function() { 
        html2canvas($("#widget"), {
            onrendered: function(canvas) {
                theCanvas = canvas;
                document.body.appendChild(canvas);

                // Convert and download as image 
                Canvas2Image.saveAsPNG(canvas); 
                $("#img-out").append(canvas);
                // Clean up 
                //document.body.removeChild(canvas);
            }
        });
    });
}); 



    /*var element = $("#imageDIV"); // global variable
    var getCanvas; // global variable
    $('document').ready(function(){
      html2canvas(element, {
        onrendered: function (canvas) {
          $("#previewImage").append(canvas);
          getCanvas = canvas;
        }
      });
    });
    $("#download").on('click', function () {
      var imageData = getCanvas.toDataURL("image/png");
      // Now browser starts downloading it instead of just showing it
      var newData = imageData.replace(/^data:image\/png/, "data:application/octet-stream");
      $("#download").attr("download", "image.png").attr("href", newData);
    });*/

    $(document).on("click", '#snap',function(){
      var catBlocks = $("div.lstitmpl");
      for (var i = 0; i < catBlocks.length; i++) {
        var category = $(catBlocks[i]).children('h2').children('b').text();
        var subcategories = $(catBlocks[i]).children('ul.itemProps');
        if (subcategories.length) {
          infoArray[category]={};
        }
        for (var j = 0; j < subcategories.length; j++) {
          var subTot = 0;
          var subName = $(subcategories[j]).children('li.subName').text();
          var subQuants = $(subcategories[j]).children('li').children('input.cantidad');
          for (var k = 0; k < subQuants.length; k++) {
            subTot += parseInt($(subQuants[k]).val());
          }
          infoArray[category][subName]=subTot;
        }
      }
      $("input[type=number]").attr('type', 'text');

      html2canvas(document.getElementById("outfit"), {
          
        onrendered: function(canvas) {
               imgData = canvas.toDataURL('image/jpeg');
                var url = 'php/img_save.php';
                $.ajax({
                  url: url,
                  type: 'POST',
                  dataType: 'text',
                  data: {base64data : imgData},
                })
                .success(function(answer) {
                  $('#snapUrl').attr('value', answer);;
                  setTimeout(function(){
                    $('#form_register').submit();
                    },200); 
                });
                
        }
      });
      console.log(infoArray)
      infoJson = JSON.stringify(infoArray);
      console.log(infoJson)
      var clientEmail = $("#reg_ml").val();
      var clientTotal = $('input.totalTotal').val();
      var datos = new FormData();
      datos.append("infoJson", infoJson);
      datos.append("clientEmail", clientEmail);
      datos.append("clientTotal", clientTotal);
      $.ajax({
        url:"php/client_mail.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType:"json",
        success:function(answer){
        }
      });
    });
      

    $('#cmd').click(function () {
        doc.fromHTML($('#testPDF').html(), 15, 15, {
            'width': 170,
                'elementHandlers': specialElementHandlers
        });
        doc.save('sample-file.pdf');
    });
    
    $(document).on("click", '.addstptj_sub',function(){
      window.subcategory = $(this).parent().parent();
       $(".additm2").fadeIn();
    });

    $(".btnadditm").click(function(){
      $(".additm1").fadeIn();
    });

    $(".additm1").submit(function(e){
      e.preventDefault(); 
      window.cptctgry = $(this).find($("#cmpcatg")).val();
      var txt1 = '<div class="lstitmpl lstitmplcont16" totalLabel="16"> <h2><b>'+cptctgry+'</b> <a class="addstptj_sub btnaddsubctgr"><span>+</span> Add Subcategory</a></h2> </div>';
      $(".cntrwtb-10").append(txt1);
      $(".additm1").fadeOut();
    });

    $(".clsppopadd1").click(function(){
      $(".additm1").fadeOut();
    });

    $(".additm2").submit(function(e){
      e.preventDefault(); 
      window.subcptctgry1 = $(this).find($("#cmpsbcatg1")).val();
      window.value2 = $(this).find($("#value2")).val();
      window.lstprps = '<ul class="itemProps"> <li class="subName">'+subcptctgry1+'</li> <li class="precio"> <input type="number" name="valnmbr" value="'+value2+'" readonly> </li> <li> <input type="number" name="valcnt" class="cantidad" value="0" /> </li> <a class="addstptj btnAddStep" title="Add Step"><span>+</span></a> <li><input type="number" name="totclmn" value="0" class="smcolttl" readonly></li> </ul>';
      subcategory.append(lstprps);
      $(".additm2").fadeOut();
    });

    $(".clsppopadd2").click(function(){
      $(".additm2").fadeOut();
    });

    window.inputcnt = '<input type="number" name="valcnt" class="cantidad" value="1">';
    $(document).on("click", '.btnAddStep',function(){
      window.n = $(this).parent().find("li").eq(2).find(".cantidad").length;
      if(n > 6){
        alert("Maximum number of steps allowed");
      }else{
        $(this).parent().find("li").eq(2).append(inputcnt);
      }
    });

    $(document).on("click", '.itemProps',function(){
      window.total = 0;
      $(this).find("li").eq(2).find(".cantidad").each(function() {
        if (isNaN(parseFloat($(this).val()))) {
          total += 0;
        } else {
          total += parseFloat($(this).val());
        }
      });
      window.valcolmng = $(this).find(".precio input").val();
      ttlgnrd = total * valcolmng;
      $(this).find("li").eq(3).find(".smcolttl").val(ttlgnrd);

      window.mgtotal = 0;
      $(".itemProps").find(".smcolttl").each(function() {
        if (isNaN(parseFloat($(this).val()))) {
          mgtotal += 0;
        } else {
          mgtotal += parseFloat($(this).val());
        }
      });
      $(".totalTotal").val(mgtotal);
    });


    function sumacol() {
      $(".smcolttl").parent().parent().find("li").eq(2).find(".cantidad").each(function() {
        if (isNaN(parseFloat($(this).val()))) {
          total += 0;
        } else {
          total += parseFloat($(this).val());
        }
      });
    }

  	$("#boton").click(function(){
  		$(".cont-item").slideToggle();
  	});

  	$(".btnadditm").click(function(){
  		$(".additm1").fadeIn();
  	});

  	$(".clsppopadd1").click(function(){
  		$(".additm1").fadeOut();
  	});

    $( function() {
      console.log("fds");
      $( ".datepicker" ).datepicker();
      $( ".datepicker" ).datepicker("option", "dateFormat", 'mm-dd-yy');
    });

    function print() {
    const filename  = 'ThisIsYourPDFFilename.pdf';

    html2canvas(document.querySelector('#nodeToRenderAsPDF')).then(canvas => {
      let pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
      pdf.save(filename);
    });
    }

  // Variant
  // This one lets you improve the PDF sharpness by scaling up the HTML node tree to render as an image before getting pasted on the PDF.
  function print(quality = 1) {
      const filename  = 'ThisIsYourPDFFilename.pdf';

      html2canvas(document.querySelector('#testPDF'), 
                  {scale: quality}
               ).then(canvas => {
        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
        pdf.save(filename);
      });
    }

});