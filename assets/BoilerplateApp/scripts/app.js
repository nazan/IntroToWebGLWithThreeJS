var demo = (function(){

    "use strict";
    
    var WIDTH = 72;
    var HEIGHT = 36;
    
    var scene=new THREE.Scene(),
        light= new THREE.AmbientLight(0xffffff),
        //light2 = new THREE.PointLight( 0xff0000, 1, 100 ),
        renderer,
        camera,
        renderer = new THREE.WebGLRenderer(),
        box,
        ground,
        controls=null,
        boxes = [],
        time;

        function initScene(){
    
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.getElementById("webgl-container").appendChild(renderer.domElement);

            scene.add(light);
            //scene.add(light2);
                      
            camera = new THREE.PerspectiveCamera(
                    35,
                    window.innerWidth / window.innerHeight,
                    1,
                    1000
                );

            camera.position.set(10, -70, 140);
            
            
            scene.add(camera);  
            
            for(var y = 0; y < HEIGHT; y++) {
                if(boxes[y] == undefined) {
                    boxes[y] = [];
                }
                
                for(var x = 0; x < WIDTH; x++) {
                    boxes[y][x] = new THREE.Mesh(
                      new THREE.CubeGeometry(
                        1,
                        1,
                        1),
                      new THREE.MeshBasicMaterial({color: '#' + Math.floor(Math.random() * 16777215).toString(16)}));
                    
                    boxes[y][x].position.x = x;
                    boxes[y][x].position.y = y;
                    boxes[y][x].position.z = 0; //Math.random() * 10 - 5;
                    
                    scene.add(boxes[y][x]);
                }
            }
            
            camera.lookAt(boxes[Math.floor(HEIGHT/2)][Math.floor(WIDTH/2)].position);


            requestAnimationFrame(render);

        };

        function render() {
                renderer.render(scene, camera);
            
                for(var y = 0; y < HEIGHT; y++) {
                    for(var x = 0; x < WIDTH; x++) {
                        //var now = +new Date;
                        //time = now / Math.floor(Math.abs(Math.sin(now / 5000) * 200) + 300);
//                        console.log(Math.floor(Math.abs(Math.sin(now / 10000) * 200) + 300));
//                        console.log(Math.abs(Math.floor((Math.sin(now / 10000) * 500) + 1)));
//                        console.log(Math.floor((Math.sin(now / 1000) * Math.sin(now / 1000) * 500)));
                        time = (+new Date) / 500;
                        boxes[y][x].position.z = (Math.sin(x/20+time) + Math.cos(y/20+time)) * 5;
                        //boxes[y][x].position.z = Math.sin(x/20+(+new Date / 100)) * 5;
                    }
                }
            
                requestAnimationFrame(render);
        };
       
        window.onload = initScene;

})();
