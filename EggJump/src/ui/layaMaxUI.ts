/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
export module ui.test {
    export class TestSceneUI extends Scene {
		public scoreLbl:Laya.Label;
		public tipLbll:Laya.Label;
		public play:Laya.Sprite;
		public player:Laya.Image;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("test/TestScene");
        }
    }
}