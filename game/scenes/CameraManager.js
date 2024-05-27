class CameraManager {
    constructor(scene) {
        this.scene = scene;
    }

    setupCamera(target, width, height) {
        this.scene.cameras.main.setBounds(0, 0, width, height);
        this.scene.cameras.main.startFollow(target, true, 0.05, 0.05);
        this.scene.cameras.main.setZoom(2);
    }
}

export default CameraManager;
