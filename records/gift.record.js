const {pool} = require("../utils/db");
const {ValidationError} = require("../utils/errors");
const {v4:uuid}=require('uuid');
class GiftRecord{

    constructor(obj) {
        if(!obj.name || obj.name.length<3 || obj.name.length>55){
            throw new ValidationError('Nazwa prezentu musi miec o 3 do 55 znakow')
        }

        this.name=obj.name;
        this.count=obj.count;
        this.id=obj.id;
    }


    static async allGifts(){
        const [results] = await pool.execute('select * from `Gifts` ');
        return  results.map(obj=> new GiftRecord(obj))
    }

    async insert(){
        if(!this.id){
            this.id=uuid();
        }
       await pool.execute('insert into `Gifts` values(:id,:name,:count)',{
           id:this.id,
           name:this.name,
           count:this.count,
       })

        return this.id
    }

    static async findOne(id){
        const [result]=await pool.execute('select * from `Gifts` where `id`= :id',{
            id,
        });
        return result.length === 0 ? null : new GiftRecord(result[0])
    }

    async countGivenGifts(){
    const [[{count}]] /*answer[0][0].count*/=await pool.execute('select count(*) as `count` from `children` where `giftId`= :id',{
        id:this.id,
    });


    return count
    }

}


module.exports={
    GiftRecord,
}