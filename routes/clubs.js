var express = require('express');
var router = express.Router();

var request= require('request');
 
var mensaje="";
/* GET users listing. */

router.get('/',function (req, res, next ) {
  request.get("https://mcroservicio.herokuapp.com/clubs",(error, response,body)=>{
    mensaje='';
    if(error){
        console.log(error);
        mensaje='Error:'+error;
    }
    console.log(JSON.parse(body));
    res.render('clubs/index',{
        mensaje:mensaje,
        title:'Listado de Clubs',
        data: JSON.parse(body)
    });

  });
});


router.get('/add',(req,res)=>{
    mensaje='Agregando Club';
    res.render('clubs/add',{
        mensaje:mensaje,
        title:'Agregar un club',
        IDclub:'',
        Nombre:'',
        Entrenador:'',
        Ciudad:'',
     

    });
});

router.post('/add',function(req,res,next){
    //Extraelosdatosenviadosporlaforma
    let IDclub=req.body.IDclub;
    let Nombre =req.body.Nombre;
    let Entrenador=req.body.Entrenador;
    let Ciudad=req.body.Ciudad;
 

    let errors=false;
    //Sinohayerrores
    if(!errors){
        //Encapsuladatosdelaforma
        var datosForma={
            IDclub:IDclub,
            Nombre:Nombre,
            Entrenador:Entrenador,
            Ciudad:Ciudad
        }//InvocaalMicroservicio
        request.post({url:"https://mcroservicio.herokuapp.com/clubs",json:datosForma},
        (error,response,body)=>{mensaje='Eldatosehaagregadoconéxito';
        if(error){
            console.log(error);
            mensaje='Error:'+error;
        }
        console.log(response);
        res.redirect('/clubs');
        //RedirigeaListadodeEstudiantes
    });
}
});

//DespliegapantallaparaModificarEstudiante
router.get('/update/:IDclub',(req,res)=>{
    IDclub= req.params.IDclub;
    mensaje='Modificando Club con su ID'+ IDclub;
    console.log(mensaje);
    var clubFind;
    //Buscasiexisteelestudiantedeacuerdoalnúmerodecontrol
    URI="https://mcroservicio.herokuapp.com/clubs/"+IDclub;

    console.log('URI:'+ URI);

    request.get(URI,(error,response,body)=>{

        mensaje='';

        if(error){
            //Encasodequesurjaunerror
            console.log(error);
            mensaje='Error:'+error;
        }
        console.log("Club Encontrado ===>");
        console.log(body);
        //DespliegapantallaparamodificardeEstudiante
        res.render('clubs/update',{
            mensaje:mensaje,
            title:'Modificando Atleta',
            Nombre: JSON.parse(body).Nombre,
            Entrenador: JSON.parse(body).Entrenador,
            Ciudad: JSON.parse(body).Ciudad,
        });
    });
});
router.post('/update',function(req,res,next){ 
console.log('Modificando un Club');
//Extraelosdatosenviadosporlaforma
let IDclub=req.body.IDclub;
let Nombre=req.body.Nombre;
let Entrenador=req.body.Entrenador;
let Ciudad=req.body.Ciudad;
let errors=false;//Sinohayerrores
if(!errors){//Encapsuladatosprovenientesdelaforma
    var datosForma= { 
        IDclub:IDclub,
        Nombre:Nombre,
        Entrenador:Entrenador,
        Ciudad:Ciudad
    }//InvocaalMicroserviciodemodificar
    request.put({url:"https://mcroservicio.herokuapp.com/clubs",json: datosForma },
    (error,response,body)=>{
        mensaje='El dato  se ha modificado con éxito';
        if(error){
            console.log(error);
            mensaje='Error:'+error;
            
        }
        console.log(response);
        res.redirect('/clubs');
        //RedirigeaListadodeEstudiantes
    });
}

});
router.get('/delete/:IDclub',(req,res)=>
{IDclub=req.params.IDclub;
    mensaje='Eliminando club'+IDclub;
    console.log(mensaje)
    ;if(IDclub){//InvocaalMicroservicio
        URI="https://mcroservicio.herokuapp.com/clubs/"+IDclub;
        request.delete(URI,(error,response,body)=>{
            mensaje='Eldatosehaeliminadoconéxito';
            if(error){console.log(error);
                mensaje='Error:'+error;
}
console.log(response);
res.redirect('/clubs');
});
}});


module.exports = router;
