var mesh, camera, scene, renderer;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
window.onload = function() {
  init();
  render();
};
function init() {
  // シーンの作成
  scene = new THREE.Scene();

  // 光の作成
  var ambient = new THREE.AmbientLight(0xeeeeee);
  scene.add(ambient);

  // 画面表示の設定
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xcccccc, 0);
  document.body.appendChild(renderer.domElement);

  // カメラの作成
  camera = new THREE.PerspectiveCamera(40, windowWidth / windowHeight, 1, 1000);
  camera.position.set(0, 10, 60);

  // モデルとモーションの読み込み準備
  var modelFile = "./mmd/pmx_haru/HARU_mitp_v007.pmx";
  var onProgress = function(xhr) {};
  var onError = function(xhr) {
    console.log("load mmd error");
  };
  //MMDLoaderをインスタンス化
  var loader = new THREE.MMDLoader();
  //loadModelメソッドにモデルのPATH
  //コールバックに画面に描画するための諸々のプログラムを書く
  loader.loadModel(
    modelFile,
    function(object) {
      mesh = object;
      mesh.position.set(0, -10, 0);
      mesh.rotation.set(0, 0, 0);
      scene.add(mesh);
    },
    onProgress,
    onError
  );

  // リサイズ時
  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  camera.aspect = windowWidth / windowHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(windowWidth, windowHeight);
}

function render() {
  requestAnimationFrame(render);
  renderer.clear();
  renderer.render(scene, camera);
}