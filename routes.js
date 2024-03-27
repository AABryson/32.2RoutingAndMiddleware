const express = require('express');
const items = require('./fakeDb');

const router = express.Router()

router.get('/', function(req, res, next){
    try {
    return res.json(items);
    } catch(err) {
        next(err);
    }
})

router.post('/', function(req, res, next){
    try {
        let newItem = {name: req.body.name, price: req.body.price};
        items.push(newItem);
        return res.json({added: newItem})
    } catch(err) {
        next(err);
    }
    
})

router.get('/:name', function(req, res, next){
    try {
        const findItem = items.find(function(val){
            val.name === req.params.name;
        })
        if(findItem===undefined){
            throw new ExpressError('Item not found', 404)
        }
        return res.json({findItem})
    } catch(err) {
        next(err)
    }

})

router.patch('/:name', function(req, res, next){
    try {
        const findItem = items.find(function(key){
            return key.name === req.params.name;
        })
        findItem.name = req.body.name;
        findItem.price = req.body.price;
        console.log(findItem)
        return res.json({ updated:findItem })
    } catch(err) {
        next(err);
    }
})

//router.patch('/:name', function(req, res, next){
//     try {
//         const findItem = items.find(function(item){
//             return item.name === req.params.name;
//         });
//         if (!findItem) {
//             return res.status(404).json({ error: 'Item not found' });
//         }
//         findItem.name = req.body.name;
//         findItem.price = req.body.price;
//         return res.json({ updated: findItem });
//     } catch(err) {
//         next(err);
//     }
// });


router.delete('/:name', function(req, res, next){
    try {
        const findIndex = items.findIndex(function(val) {
            return val.name === req.params.name})
        items.splice(findIndex, 1);
        return res.json({message: 'Deleted'})
    } catch(err) {
        next(err)
    }
})
//router.delete('/:name', function(req, res, next) {
//     try {
//         const findIndex = items.findIndex(item => item.name === req.params.name);
//         if (findIndex === -1) {
//             return res.status(404).json({ message: 'Item not found' });
//         }
//         items.splice(findIndex, 1);
//         return res.json({ message: 'Deleted' });
//     } catch (err) {
//         next(err);
//     }
// });



module.exports = router;