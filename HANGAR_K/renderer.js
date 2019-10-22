{
    const $raam1 = document.querySelector('#raam1');

    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

 
    const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
    
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    renderer.render(scene, camera);

    const render = (time) => {
        time *= 0.001;  // convert time to seconds

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        
        cube.rotation.x = time;
        cube.rotation.y = time;
      
        renderer.render(scene, camera);
        
        requestAnimationFrame(render);
      };

    const init = () => {
        requestAnimationFrame(render);
        
        $raam1.addEventListener('mouseover', () => {
            console.log('jeej');
            $raam1.currentTime = 0;
            $raam1.play();
        })
        $raam1.addEventListener('mouseout', () => {
            console.log('out');
            $raam1.pause();
        })
    
    };
    

    const resizeRendererToDisplaySize = (renderer) => {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width  = canvas.clientWidth  * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
    }
    
  init();
}