const router=require('express').Router();

router.get('/', (req,res,next)=>{
  res.json('this is content');
});

module.exports=router;