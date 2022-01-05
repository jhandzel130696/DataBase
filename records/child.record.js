const {pool} = require("../utils/db");
const {v4: uuid} = require("uuid");

class ChildRecord {


    constructor(obj) {
        if(obj.name.length<3 ){
            throw new Error('za krotkie imie ')
        }

        this.name=obj.name;
        this.id=obj.id;
        this.giftId=obj.giftId;
    }
static async listAll(){

    const [result]=await pool.execute('select * from `children` order by `name`asc  ')
    //console.log(result);
    return result.map(obj=> new ChildRecord(obj))
}
    async insert(){
        if(!this.id){
            this.id=uuid();
        }
        await pool.execute('insert into `children`(`id`,`name`) values(:id,:name)',{
            id:this.id,
            name:this.name,

        })

        return this.id
    }

    static async findOne(id){
        const [result]=await pool.execute('select * from `children` where `id`= :id',{
            id,
        });
        return result.length === 0 ? null : new ChildRecord(result[0])
    }

    async update(){

        await pool.execute('update `children` set `name`=:name,`giftId`=:giftId where `id`=:id',{
            id:this.id,
            name:this.name,
            giftId:this.giftId,


        })
    }

}

module.exports={
    ChildRecord,
}