jQuery(document).ready(function($){
    /*$("#boton").click(function(){
      	$("ul#listas li").append(function(n){
          	return "--> Este elemento de la lista tiene el índice: " + n + ".";
      	});
  	});*/
  var subcategory = "";
  var increment = 17;
  var increment2 = "";
  var totalLabel = '';

	$("#boton").click(function(){
		$(".cont-item").slideToggle();
	});

	$(".btnadditm").click(function(){
		$(".additm1").fadeIn();
	});

	$(".additm1").submit(function(e){
		e.preventDefault(); 
		window.cptctgry = $(this).find($("#cmpcatg")).val();
    window.value = $(this).find($("#value")).val();
	  var txt1 = '<div class="lstitmpl lstitmplcont'+increment+'"><h2>'+cptctgry+'<a class="addstptj_sub btnaddsubctgr"><span>+</span> Add Subcategory</a><a class="addstptj btnAddStep"><span>+</span> Add Step</a></h2><ul class="itemProps"><li></li><li class="precio"><input type="number" value="'+value+'" readonly></li><li><input type="number" value="0" /></li></ul></div>';

    $(".cntrwtb-10").append(txt1);
    increment++;
  	  $(".additm1").fadeOut();
	});

	$(".clsppopadd1").click(function(){
		$(".additm1").fadeOut();
	});

  $(document).on('change', 'input.cantidad', function(event) {
    subcategory = $(this).parent().parent().parent();
    totalLabel = subcategory.attr('totalLabel');
    cantidad = 0;
    var cantidades = $(this).parent().parent().children().children('.cantidad');
    for (var i = 0; i < cantidades.length; i++) {
      cantidad += Number($(cantidades[i]).val());
    }
    valorInd = $(this).parent().parent().children('.precio').children().val();
    var total1 = cantidad * valorInd
    cantidad2 = 0;
    var cantidades2 = $(this).parent().parent().parent().children('div').children('ul').children().children('.cantidad2');
    for (var i = 0; i < cantidades2.length; i++) {
      cantidad2 += Number($(cantidades2[i]).val());
    }
    valorInd2 = $(this).parent().parent().parent().children('div').children('ul').children('.precio').children().val();
    total2 = cantidad2 * valorInd2
    console.log(cantidad)
    console.log(cantidad2)
    console.log(valorInd)
    console.log(valorInd2)
    var newTotal = total1 + total2;
    var total = ".total"+totalLabel;
    $(total).attr('value',newTotal)
    var totales = $('.total');
    var valorTotal2 = 0;
    for (var i = 0; i < totales.length; i++) {
      valorTotal2 += Number($(totales[i]).val());
    }
    $('.totalTotal').attr('value',valorTotal2);
  });
  $(document).on('change', 'input.cantidad2', function(event) {
    subcategory = $(this).parent().parent().parent().parent();
    totalLabel = subcategory.attr('totalLabel');
    cantidad = 0;
    var cantidades = $(this).parent().parent().children().children('.cantidad2');
    for (var i = 0; i < cantidades.length; i++) {
      cantidad += Number($(cantidades[i]).val());
    }
    valorInd = $(this).parent().parent().children('.precio').children().val();
    total1 = cantidad * valorInd
    cantidad2 = 0;
    var cantidades2 = $(this).parent().parent().parent().parent().children('ul').children().children('.cantidad');
    for (var i = 0; i < cantidades2.length; i++) {
      cantidad2 += Number($(cantidades2[i]).val());
    }
    valorInd2 = $(this).parent().parent().parent().parent().children('ul').children('.precio').children().val();
    total2 = cantidad2 * valorInd2
    var newTotal = total1 + total2;
    var total = ".total"+totalLabel;
    $(total).attr('value',newTotal)
    var totales = $('.total');
    var valorTotal2 = 0;
    for (var i = 0; i < totales.length; i++) {
      valorTotal2 += Number($(totales[i]).val());
    }
    $('.totalTotal').attr('value',valorTotal2);
  });

  $(document).on('click', '.btnaddsubctgr', function(event) {
    $(".additm2").fadeIn();
    subcategory = $(this).parent().parent();
  });

  $(document).on('click', '.btnAddStep', function(event) {
    var currentRow = $(this).parent().parent();
    var input1 = '<li><input type="number" class="cantidad" value="0" /></li>';
    var input2 = '<li><input type="number" class="cantidad2" value="0" /></li>';
    currentRow.children('ul.itemProps').append(input1);
    currentRow.children('div').children('ul.itemProps2').append(input2);
  });

  // $(".btnaddsubctgr").click(function(){
  //   $(".additm2").fadeIn();
  //   subcategory = $(this).parent().parent();
  // });

  $(".additm2").submit(function(e){
    e.preventDefault(); 
    window.subcptctgry1 = $(this).find($("#cmpsbcatg1")).val();
    window.value2 = $(this).find($("#value2")).val();
    var txt2 = '<div class="lstitmpl lstitmplcont'+increment2+'"><ul class="itemProps2"><li>'+subcptctgry1+'</li><li class="precio"><input type="number" value="'+value2+'" readonly></li><li><input type="number" class="cantidad2" value="0" /></li></ul></div>';

    subcategory.append(txt2);
      $(".additm2").fadeOut();
  });

  $(".clsppopadd2").click(function(){
    $(".additm2").fadeOut();
  });

});