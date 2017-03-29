			function makeFloor() {
				var bufferGeometry = new THREE.PlaneBufferGeometry(390000, 390000, 4, 4 );
				bufferGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

				material = new THREE.MeshLambertMaterial( { color:floorColor, wireframe: false } );

				
				

				floor = new THREE.Mesh( bufferGeometry, material );
				floor.position.y= -100;

				floor.castShadow = true;
				floor.receiveShadow = true;
				scene.add( floor );
				



				};