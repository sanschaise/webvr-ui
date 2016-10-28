import test from 'tape';

import { DefaultButtonDom } from './src/DefaultButtonDom';
import { AbstractButtonDom } from './src/AbstractButtonDom';
import * as manager from './src/WebVRManager';


const tFn = (t, fn)=> t.equal(typeof fn, 'function');

test('AbstractButtonDom', (t)=>{
    
    t.plan(4);
    
    const abd = new AbstractButtonDom(document.createElement('div'));
    t.ok(abd.domElement instanceof HTMLElement)
    tFn(t, abd.setTitle);
    tFn(t, abd.setDescription);
    tFn(t, abd.injectCSS);
});

test('DefaultButtonDom', (t)=>{
    
    t.plan(5);
    
    const bd = new DefaultButtonDom(40, 'VR');
    t.ok(bd instanceof AbstractButtonDom);
    t.ok(bd.domElement instanceof HTMLElement);
    t.ok(bd.domElement.querySelector('.webvr-ui-button-title') instanceof HTMLElement);
    t.ok(bd.domElement.querySelector('.webvr-ui-button-button') instanceof HTMLElement);
    t.ok(!!bd.domElement.querySelector('.webvr-ui-button-svg'));
    bd.injectCSS();
    document.body.appendChild(bd.domElement);
});

test('webvr-manager', (t)=>{
    
    t.plan(5);
    
    tFn(t, manager.getVRDisplay);
    tFn(t, manager.enterVR);
    tFn(t, manager.exitVR);
    
    const original = navigator.getVRDisplays;
    
    navigator.getVRDisplays = undefined;
    
    manager.getVRDisplay()
        .then(()=>true, (err)=>t.ok(err.name === 'WEBVR_UNSUPPORTED'));
        
        
    //mock the API to return anticipated results
    navigator.getVRDisplays = ()=>
        new Promise((resolve, reject)=>{
            resolve([{
                capabilities: {
                    canPresent: true
                }
            }])
        });
        
     manager.getVRDisplay()
        .then((display)=> t.equal(typeof display, 'object'))
        .then(()=> navigator.getVRDisplays = original);
});