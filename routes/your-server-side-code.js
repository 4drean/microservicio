
var express = require('express');
var router = express.Router();
const stripe =require('stripe')('sk_test_51HhmaHLii8i4qchxcmzt33hySP1ur3IB9dXYRlyoOLvQ3r2IprbmUZCNkmXcf8c8L5P3KaJtpEMwIvsYWKN9Fw6w00uKcGbUG0');
/* GET home page. */


router.post('/',async(req, res)=>{
 const customer=await stripe.customers.create({
email: req.body.stripeEmail,
source: req.body.stripeToken

 });
const charge =await stripe.charges.create({
    amount: '3999',
    currency:'usd',
    customer: customer.id,
    description:'Oficce'
    
});
console.log(charge.id);
res.render('Descargar',{ page:'venta', menuId:'home' });

});

module.exports = router;