let sms=require('../medium/sms');
let whatsapp=require('../medium/whatsapp');
const media = {sms, whatsapp};

function createMedium(medium){
        const mediumObj = new media[medium]();
        Object.freeze(mediumObj);
        return mediumObj;
    }


module.exports = createMedium;