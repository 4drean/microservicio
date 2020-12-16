var express = require('express');
var router = express.Router();

var request= require('request');
 
var mensaje="";
/* GET users listing. */

router.get('/',function (req, res, next ) {
  request.get("https://mcroservicio.herokuapp.com/aclubs",(error, response,body)=>{
    mensaje='';
    if(error){
        console.log(error);
        mensaje='Error:'+error;
    }
    console.log(JSON.parse(body));
    res.render('aclubs/index',{
        mensaje:mensaje,
        title:'Listado de Atletas Club',
        data: JSON.parse(body)
    });

  });
});


router.get('/add',(req,res)=>{
    mensaje='Agregando Club';
    res.render('aclubs/add',{
        mensaje:mensaje,
        title:'Agregar un Atleta a un club',
        IDclub:'',
        IDatleta:'',
        Anos:'',
        Estado:''
     

    });
});

router.post('/add',function(req,res,next){
    //Extraelosdatosenviadosporlaforma
    let IDclub=req.body.IDclub;
    let IDatleta =req.body.IDatleta;
    let Anos=req.body.Anos;
    let Estado=req.body.Estado;
 

    let errors=false;
    //Sinohayerrores
    if(!errors){
        //Encapsuladatosdelaforma
        var datosForma={
            IDclub:IDclub,
            IDatleta:IDatleta,
            Anos:Anos,
            Estado:Estado
        }//InvocaalMicroservicio
        request.post({url:"https://mcroservicio.herokuapp.com/aclubs",json:datosForma},
        (error,response,body)=>{mensaje='Eldatosehaagregadoconéxito';
        if(error){
            console.log(error);
            mensaje='Error:'+error;
            
        }
        console.log(response);
        res.redirect('/aclubs');
        //RedirigeaListadodeEstudiantes
    });

}
});

//DespliegapantallaparaModificarEstudiante
router.get('/update/:IDatleta',(req,res)=>{
    IDatleta= req.params.IDatleta;
    mensaje='Modificando registro con su ID'+ IDatleta;
    console.log(mensaje);
    var aclubFind;
    //Buscasiexisteelestudiantedeacuerdoalnúmerodecontrol
    URI="https://mcroservicio.herokuapp.com/aclubs/"+IDatleta;

    console.log('URI:'+ URI);

    request.get(URI,(error,response,body)=>{

        mensaje='';

        if(error){
            //Encasodequesurjaunerror
            console.log(error);
            mensaje='Error:'+error;
        }
        console.log("AtletaClub Encontrado ===>");
        console.log(body);
        //DespliegapantallaparamodificardeEstudiante
        res.render('aclubs/update',{
            mensaje:mensaje,
            title:'Modificando AtletaClub',
            IDclub: JSON.parse(body).IDclub,
            Anos: JSON.parse(body).Anos,
            Estado: JSON.parse(body).Estado,
        });
    });
});
router.post('/update',function(req,res,next){ 
console.log('Modificando un AtletaClub');
//Extraelosdatosenviadosporlaforma
let IDatleta=req.body.IDatleta;
let IDclub=req.body.IDclub;
let Anos=req.body.Anos;
let Estado=req.body.Estado;
let errors=false;//Sinohayerrores
if(!errors){//Encapsuladatosprovenientesdelaforma
    var datosForma= { 
        IDatleta:IDatleta,
        IDclub:IDclub,
        Anos:Anos,
        Estado:Estado,
    }//InvocaalMicroserviciodemodificar
    request.put({url:"https://mcroservicio.herokuapp.com/aclubs",json: datosForma },
    (error,response,body)=>{
        mensaje='El dato  se ha modificado con éxito';
        if(error){
            console.log(error);
            mensaje='Error:'+error;
            
        }
        console.log(response);
        res.redirect('/aclubs');
        //RedirigeaListadodeEstudiantes
    });
}

});
router.get('/delete/:IDatleta',(req,res)=>
{IDatleta=req.params.IDatleta;
    mensaje='Eliminando club'+IDatleta;
    console.log(mensaje)
    ;if(IDatleta){//InvocaalMicroservicio
        URI="https://mcroservicio.herokuapp.com/aclubs/"+IDatleta;
        request.delete(URI,(error,response,body)=>{
            mensaje='Eldatosehaeliminadoconéxito';
            if(error){console.log(error);
                mensaje='Error:'+error;
}
console.log(response);
res.redirect('/aclubs');
});
}});


module.exports = router;
