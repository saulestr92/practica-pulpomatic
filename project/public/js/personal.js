var jqxhr;

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
Array.prototype.count_value = function(){
    var count = {};
    for(var i = 0; i < this.length; i++){
        if(!(this[i] in count))count[this[i]] = 0;
        count[this[i]]++;
    }
    return count;
};
Array.prototype.repetidos = function(){
    var count = {};
    for(var i = 0; i < this.length; i++){
        if(!(this[i] in count))count[this[i]] = 0;
        count[this[i]]++;
    }
    for (var key in count) {
        // check if the property/key is defined in the object itself, not in parent
        if (count.hasOwnProperty(key)) {
            if (count[key]>1){
                return false;
            }
        }
    }
    return true;
};

function ayudaicon(form){
    $('#'+form+' :input').each(function(index,obj) {
        id=$(obj).attr('id');
        type=$(obj).attr('type');
        ayu=$(obj).attr('data-ayuda');
        if(type != 'hidden'){
            if(ayu != 'off'){
                campoayuda='<b id="ayu_'+id+'" class="ic_ayuda" style="display: block;"></b>';
                $(obj).parent().parent().prepend(campoayuda);
            }
        }
        $(".ic_ayuda").hide();
        $(obj).on("focus", function (e) {
            $(".ic_ayuda").hide();
            $(this).parent().parent().find(".ic_ayuda").show();
        });
    });
    $(".ic_ayuda").hide();
}

function validarfrm(form){
    var resp= true;
    var campo;
    var campos=[];
    $('#'+form+' :input').each(function(index,obj){
        campo = $(this).attr('id');
        var temp={
            'resp':true,
            'campo':campo,
            'mensaje': ''
        };
        temp=valida(obj,temp);
        if(!temp.resp){
            resp=false;
        }
        campos.push(temp);
    });
    $.each(campos, function( index, value ) {
        if (value.campo!= undefined){
            agregaerror(value);
        }
    });
    return resp;
}

function agregaerrores(objeto){
    if(objeto != undefined){
        $.each(objeto, function (indice, val) { // indice, valor
            if($('#'+val.campo).length){
                if(val.resp){
                        $('#'+val.campo).parent().removeClass("has-error");
                        $('#'+val.campo).parent().children("span").remove();
                }else{
                    if ($('#'+val.campo).parent().attr("class").indexOf('has-error')== -1) {
                        $('#'+val.campo).parent().addClass("has-error");
                        $('#'+val.campo).parent().append('<span class="help-block">'+val.mensaje+'</span>');
                    }else{
                        $('#'+val.campo).parent().children(".help-block").effect( "shake", "slow" );
                        $('#'+val.campo).parent().children(".help-block").html(val.mensaje);
                    }
                } 
            }
        });
    }
}

function agregaerror(objeto){
    if(objeto != undefined){
        if(objeto.resp){
            $('#'+objeto.campo).parent().removeClass("has-error");
            $('#'+objeto.campo).parent().children("span").remove();
        }else{
            if ($('#'+objeto.campo).parent().attr("class").indexOf('has-error')== -1) {
                $('#'+objeto.campo).parent().addClass("has-error");
                $('#'+objeto.campo).parent().append('<span class="help-block">'+objeto.mensaje+'</span>');
            }else{
                $('#'+objeto.campo).parent().children(".help-block").effect( "shake", "slow" );
                $('#'+objeto.campo).parent().children(".help-block").html(objeto.mensaje);
            }
        }
    }
}

function validacampo(objeto){
    if(objeto != undefined){
        if ($('#'+objeto).parent().parent().attr("class").indexOf('has-error')== -1) {
            return true
        }else{
            return false
        }
    }
}

function valida(obj,temp){
    if(!$(obj).attr('omit')){
        var val = $(obj).val().trim();
        if($(obj).attr('type')=='text'){
            $(obj).val(val);
        }
        var patron = $(obj).attr('pattern');
        var Ncampo = $(obj).attr('ref');
        var regla = $(obj).attr('required');
        var msjpatr = $(obj).attr('title');
        var tipe = $(obj).attr('data-conekta');
        if (regla != undefined){
            if(patron!= undefined){
                if(!val.match(patron)){
                    if (val==""){
                        temp.mensaje ='Debe llenar el campo';
                    }else{
                        temp.mensaje = msjpatr+' en el campo';
                    }
                    temp.resp=false;
                }
            }else{
                if (val==""){
                    temp.mensaje ='Debe llenar el campo';
                    temp.resp=false;
                }else{
                }
            }
        }else{
            if(patron!= undefined){
                if (val!=""){
                    if(!val.match(patron)){

                    }
                }
            }
        }
        return temp;
    }
}

function errorTreal (form)
{
    $('#'+form+' :input').each(function(index,obj){
        campo = $(this).attr('id');
        $( "#"+campo ).change(function() {
            obj = $(this).attr('id');
            temp={
                'resp':true,
                'campo':obj,
                'mensaje': ''
            };
            value=valida(this,temp);
            agregaerror(value);
        });
    });
}

function errorTrealcampo(campo){
    $( "#"+campo ).change(function() {
        obj = $(this).attr('id');
        temp={
            'resp':true,
            'campo':obj,
            'mensaje': ''
        };
        value=valida(this,temp);
        agregaerror(value);
    });
}

function restringirform (form,complete=true,comands=true){
    if (typeof form === 'string'){
        if(complete){
            $('#'+form+' :input').each(function(index,obj){
                $(this).attr( 'autocomplete', 'off' );
            });
        }
        if(comands){
            $('#'+form+' :input').bind("cut copy paste",function(e) {
                e.preventDefault();
            });
        }
    }else if(typeof form === 'object'){
        $.each( form ,function (key,data) {
            if (complete) {
                $('#' + data + ' :input').each(function (index, obj) {
                    $(this).attr('autocomplete', 'off');
                });
            }
            if (comands) {
                $('#' + data + ' :input').bind("cut copy paste", function (e) {
                    e.preventDefault();
                });
            }
        });
    }

}

function filtrarlista(campo,lista) {
    $("#"+campo).on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#"+lista+" li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
}

//data,url,before='',success='',error='',datatype='json',type='POST'
function peticionAJAX(peticion){
    opciones={};

    if(peticion.url!=undefined){
        opciones.url=peticion.url;
    }
    if(peticion.datatype!=undefined){
        opciones.datatype=peticion.datatype;
    }else{
        opciones.datatype="aplication/json";
    }
    if(peticion.type!=undefined){
        opciones.type=peticion.type;
        if(!(peticion.type=='GET'||peticion.type=='get')){
            if(peticion.data!=undefined){
                opciones.data=peticion.data;
            }else{
                opciones.data={};
            }
            opciones.data._method='POST';
            opciones.headers={
                'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
            };
        }
    }else{
        opciones.type='GET';
    }
    // before: function() {} , success: function(json) {} , error: function(json.responseJSON){}
    if(peticion.before!= undefined){
        opciones.beforeSend = peticion.before;
    }
    if(peticion.success!= undefined){
        opciones.success = peticion.success;
    }
    if(peticion.error!= undefined){
        opciones.error = peticion.error;
    }
    jqxhr=$.ajax(opciones);
    //jqxhr.always(function (json, textStatus, errorThrown) { });
    //jqxhr.done(function (json, textStatus, errorThrown) { });
    //jqxhr.fail(function (json, textStatus, errorThrown) { });
}

function restringe(campo,patern,max=0) {
    $('#'+campo).on('input keyup ', function () {
        var regla = new RegExp(patern,'gm');
        if (max > 0 &&  patern !=''){
            this.value = this.value.replace(regla,'').slice(0, max);
        }else if (max > 0 && patern ==''){
            this.value = this.value.slice(0, max);
        }else if(max == 0 && patern !=''){
            this.value = this.value.replace(regla,'');
        }
    });
}

function restringecampo(campo) {
    var patron = $('#'+campo).attr('data-pattern');
    var tamano =$('#'+campo).attr('data-length');
    if(patron.length){
        if (tamano.length){
            restringe(campo,patron,tamano);
        }else{
            restringe(campo,patron);
        }
    }else if(tamano.length){
        restringe(campo,'',tamano);
    }
}

function restringefrm(form){
    $('#'+form+' :input').each(function(index,obj){
        var campo = $(obj).attr('id');
        if(campo.length){
            restringecampo(campo);
        }
    });
}


function apendcombo (combo,data,selectpicker=false){
    $('#'+combo).find('option').remove();
    $.each(data, function (indice, val) { // indice, valor
        $('#'+combo).append('<option value="' + indice + '">' + val + '</option>');
    });
    if(selectpicker){
        $('#'+combo).selectpicker('refresh');
    }
}

function validar(valores,tipo){
    var resp = true;
    if(typeof valores==='object'){
        var datos = mapear(valores,tipo);
        Object.keys(datos).forEach(function (key) {
            if(!validaarray(datos[key],key)){
                resp=false;
            }
        });

    }else{
        resp=false;
    }
    return resp;
}
function mapear(claves,tipo='input'){
    var temp=[];
    if (typeof claves==='object') {
        $.each( claves, function( key, value ) {
            temp[value]= $(tipo+"[id='"+value+"']").map(function(){
                return $(this).val();
            }).get();
        });
    } else if(typeof claves==='string') {
        temp[claves] = $(tipo+"[id='"+claves+"']").map(function () {
            return $(this).val();
        }).get();
    } else {
        temp=false;
    }
    return temp;
}
