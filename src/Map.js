import React, { Component } from 'react';
import * as THREE from 'three';



class Map extends Component{
  componentDidMount(){
    const width = window.innerWidth
    const height = window.innerHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 1
    this.canvas = document.createElement("canvas");
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#fff')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    //ADD CUBE
    const geometry = new THREE.PlaneGeometry( 1, 1, 1 );
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load( '/floorplan.png' );
    const material = new THREE.MeshBasicMaterial( { map: texture } );
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
this.start()
  }
componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
stop = () => {
    cancelAnimationFrame(this.frameId)
  }
animate = () => {
   this.cube.rotation.z += 0.001
   this.cube.position.z += 0.001
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }
renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}
render(){
    return(
      <div
        style={{ height: '500px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
export default Map