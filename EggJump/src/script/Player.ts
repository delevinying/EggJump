export default class Player extends Laya.Script{

    constructor(){super();}

    onEnable(){

    }

    onTriggerEnter(other: any, self: any, contact: any): void {
        var owner: Laya.Sprite = this.owner as Laya.Sprite;
        console.log("label --- "+other.label);
        if (other.label === "food") {
            //碰撞到子弹后，增加积分，播放声音特效
            alert("touch");
        } else if (other.label === "ground") {
            
        }
    }
}