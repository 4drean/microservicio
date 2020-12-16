var express = require('express');
var router = express.Router();

var request= require('request');
 
var mensaje="";
/* GET users listing. */

router.get('/',function (req, res, next ) {
  request.get("https://mcroservicio.herokuapp.com/atletas",(error, response,body)=>{
    mensaje='';
    if(error){
        console.log(error);
        mensaje='Error:'+error;
    }
    console.log(JSON.parse(body));
    res.render('atletas/index',{
        mensaje:mensaje,
        title:'Listado de Atletas',
        data: JSON.parse(body)
    });

  });
});

router.get('/add',(req,res)=>{
    mensaje='Agregando Atleta';
    res.render('atletas/add',{
        mensaje:mensaje,
        title:'Agregar un Atleta',
        IDatleta:'',
        Nombre:'',
        Apellidos:'',
        Edad:'',
        Prueba:'',
        Correo:''

    });
});

router.post('/add',function(req,res,next){
    //Extraelosdatosenviadosporlaforma
    let IDatleta=req.body.IDatleta;
    let Nombre =req.body.Nombre;
    let Apellidos=req.body.Apellidos;
    let Edad=req.body.Edad;
    let Prueba=req.body.Prueba;
    let Correo=req.body.Correo

    let errors=false;
    //Sinohayerrores
    if(!errors){
        //Encapsuladatosdelaforma
        var datosForma={
            IDatleta:IDatleta,
            Nombre:Nombre,
            Apellidos:Apellidos,
            Edad:Edad,
            Prueba:Prueba,
            Correo:Correo
        }//InvocaalMicroservicio
        request.post({url:"https://mcroservicio.herokuapp.com/atletas",json:datosForma},
        (error,response,body)=>{mensaje='Eldatosehaagregadoconéxito';
        if(error){
            console.log(error);
            mensaje='Error:'+error;
        }
        console.log(response);
        res.redirect('/atletas');
        //RedirigeaListadodeEstudiantes
    });
}
});

//DespliegapantallaparaModificarEstudiante
router.get('/update/:IDatleta',(req,res)=>{
    IDatleta= req.params.IDatleta;
    mensaje='Modificando Atleta con ID de la federacion '+ IDatleta;
    console.log(mensaje);
    var AtletaFind;
    //Buscasiexisteelestudiantedeacuerdoalnúmerodecontrol
    URI="https://mcroservicio.herokuapp.com/atletas/"+IDatleta;

    console.log('URI:'+ URI);

    request.get(URI,(error,response,body)=>{

        mensaje='';

        if(error){
            //Encasodequesurjaunerror
            console.log(error);
            mensaje='Error:'+error;
        }
        console.log("Atleta Encontrado ===>");
        console.log(body);
        //DespliegapantallaparamodificardeEstudiante
        res.render('atletas/update',{
            mensaje:mensaje,
            title:'Modificando Atleta',
            NumeroControl: JSON.parse(body).NumeroControl,
            Nombre: JSON.parse(body).Nombre,
            Apellidos: JSON.parse(body).Apellidos,
            Edad: JSON.parse(body).Edad,
            Correo: JSON.parse(body).Correo,
            Prueba:JSON.parse(body).Prueba
        });
    });
});
router.post('/update',function(req,res,next){ 
console.log('Modificando un Atleta');
//Extraelosdatosenviadosporlaforma
let IDatleta=req.body.IDatleta;
let Nombre=req.body.Nombre;
let Apellidos=req.body.Apellidos;
let Prueba=req.body.Prueba;
let errors=false;//Sinohayerrores
if(!errors){//Encapsuladatosprovenientesdelaforma
    var datosForma= { 
        IDatleta:IDatleta,
        Nombre:Nombre,
        Apellidos:Apellidos,
        Prueba:Prueba
    }//InvocaalMicroserviciodemodificar
    request.put({url:"https://mcroservicio.herokuapp.com/atletas",json: datosForma },
    (error,response,body)=>{
        mensaje='El dato  se ha modificado con éxito';
        if(error){
            console.log(error);
            mensaje='Error:'+error;
            
        }
        console.log(response);
        res.redirect('/atletas');
        //RedirigeaListadodeEstudiantes
    });
}

});
router.get('/delete/:IDatleta',(req,res)=>
{IDatleta=req.params.IDatleta;
    mensaje='Eliminando Estudiantecon NúmerodeControl'+IDatleta;
    console.log(mensaje)
    ;if(IDatleta){//InvocaalMicroservicio
        URI="https://mcroservicio.herokuapp.com/atletas/"+IDatleta;
        request.delete(URI,(error,response,body)=>{
            mensaje='Eldatosehaeliminadoconéxito';
            if(error){console.log(error);
                mensaje='Error:'+error;
}
console.log(response);
res.redirect('/atletas');
});
}});


module.exports = router;


