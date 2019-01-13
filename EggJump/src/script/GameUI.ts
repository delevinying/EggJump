import { ui } from "./../ui/layaMaxUI";
import GameControl from "./GameControl"
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends ui.test.TestSceneUI {
    /**设置单例的引用方式，方便其他类引用 */
    static instance: GameUI;
    /**当前游戏积分字段 */
    private _score: number;//当前的体重
    private _bad: number;//吃到的卡路里
    private _dec: number;//减掉的卡路里
    /**游戏控制脚本引用，避免每次获取组件带来不必要的性能开销 */
    private _control: GameControl;

    constructor() {
        super();
        GameUI.instance = this;
        //关闭多点触控，否则就无敌了
        Laya.MouseManager.multiTouchEnabled = false;
    }

    onEnable(): void {
        this._score = 50;
        this._bad = 0;
        this._dec = 0;
        this._control = this.getComponent(GameControl);
        //点击提示文字，开始游戏
        //    this.tipLbll.on(Laya.Event.CLICK, this, this.onTipClick);
        this.player.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        //    this.onTipClick();
    }

    onTipClick(e: Laya.Event): void {
        this.tipLbll.visible = false;
        this._score = 0;
        this.scoreLbl.text = "";
        this._control.startGame();
    }

    private _lastMoveX: number;
    private _lastMoveY: number;
    onMouseDown() {
        if (this.tipLbll.visible) {
            this.tipLbll.visible = false;
            this._score = 0;
            this.scoreLbl.text = "";
            this._control.startGame();
        }
        this._lastMoveX = this.player.mouseX;
        this._lastMoveY = this.player.mouseY;
        this.player.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        this.player.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        // this.player.on(Laya.Event.MOUSE_OUT,this,this.onMouseOut);
    }

    onMouseMove(e: Laya.Event) {
        var dx: number = this.player.mouseX - this._lastMoveX;
        var dy: number = this.player.mouseY - this._lastMoveY;
        var l_x: number = this.player.x;
        var l_y: number = this.player.y;
        this.player.x = l_x + dx;
        this.player.y = l_y + dy;
        // console.log((l_x+dx)+"-----"+(l_y+dy));
    }

    onMouseUp() {
        this.player.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        this.player.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        // this.player.off(Laya.Event.MOUSE_OUT,this,this.onMouseOut);
    }

    // onMouseOut(){
    //     this.player.off(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
    //     this.player.off(Laya.Event.MOUSE_UP,this,this.onMouseUp);
    //     this.player.off(Laya.Event.MOUSE_OUT,this,this.onMouseOut);
    // }

    /**增加分数 */
    addScore(score: number = 1): void {
        this._score += score;
        this.updateLab();
    }

    addBad(bad: number) {
        this._bad += bad;
        this.updateLab();
    }

    addDec(dec: number) {
        this._dec += dec;
        this.updateLab();
    }

    updateLab() {
        var str = "当前体重：" + this._score + "\n"
            + "吃到的卡路里：" + this._bad + "\n"
            + "燃烧掉的卡路里" + this._dec;
        this.scoreLbl.text = str;
        //随着分数越高，难度增大
        if (this._control.createBoxInterval > 600 && this._score % 20 == 0) this._control.createBoxInterval -= 20;
    }

    /**停止游戏 */
    stopGame(): void {
        // this.tipLbll.visible = true;
        // this.tipLbll.text = "游戏结束了，点击屏幕重新开始";
        // this._control.stopGame();
    }
}