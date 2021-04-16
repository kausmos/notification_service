let sms=require('../medium/sms');
let whatsapp=require('../medium/whatsapp');
const media = {sms, whatsapp};

function createMedium(medium){
        return media[medium];      
    }


module.exports= createMedium;