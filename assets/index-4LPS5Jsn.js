(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const oa="166",lh=0,La=1,ch=2,dc=1,hh=2,Un=3,wn=0,$e=1,on=2,ei=0,Oi=1,Ia=2,Na=3,Da=4,uh=5,pi=100,dh=101,fh=102,ph=103,mh=104,vh=200,gh=201,xh=202,yh=203,yo=204,_o=205,_h=206,Mh=207,Sh=208,Eh=209,wh=210,Ah=211,Th=212,bh=213,Rh=214,Ch=0,Ph=1,Lh=2,gs=3,Ih=4,Nh=5,Dh=6,Uh=7,fc=0,Bh=1,Fh=2,ni=0,Oh=1,zh=2,Vh=3,pc=4,kh=5,Hh=6,Gh=7,Ua="attached",Wh="detached",mc=300,Hi=301,Gi=302,Mo=303,So=304,Rs=306,Wi=1e3,Qn=1001,xs=1002,Ze=1003,vc=1004,fr=1005,nn=1006,hs=1007,Fn=1008,Vn=1009,gc=1010,xc=1011,Mr=1012,aa=1013,vi=1014,gn=1015,Rr=1016,la=1017,ca=1018,Xi=1020,yc=35902,_c=1021,Mc=1022,an=1023,Sc=1024,Ec=1025,zi=1026,qi=1027,ha=1028,ua=1029,wc=1030,da=1031,fa=1033,us=33776,ds=33777,fs=33778,ps=33779,Eo=35840,wo=35841,Ao=35842,To=35843,bo=36196,Ro=37492,Co=37496,Po=37808,Lo=37809,Io=37810,No=37811,Do=37812,Uo=37813,Bo=37814,Fo=37815,Oo=37816,zo=37817,Vo=37818,ko=37819,Ho=37820,Go=37821,ms=36492,Wo=36494,Xo=36495,Ac=36283,qo=36284,Yo=36285,Ko=36286,Sr=2300,Er=2301,Us=2302,Ba=2400,Fa=2401,Oa=2402,Xh=2500,qh=0,Tc=1,Zo=2,Yh=3200,Kh=3201,bc=0,Zh=1,jn="",ke="srgb",Ge="srgb-linear",pa="display-p3",Cs="display-p3-linear",ys="linear",Ae="srgb",_s="rec709",Ms="p3",xi=7680,za=519,jh=512,Jh=513,$h=514,Rc=515,Qh=516,tu=517,eu=518,nu=519,jo=35044,Va="300 es",On=2e3,Ss=2001;class Qi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,s=i.length;r<s;r++)i[r].call(this,t);t.target=null}}}const We=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ka=1234567;const mr=Math.PI/180,Yi=180/Math.PI;function cn(){const o=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(We[o&255]+We[o>>8&255]+We[o>>16&255]+We[o>>24&255]+"-"+We[t&255]+We[t>>8&255]+"-"+We[t>>16&15|64]+We[t>>24&255]+"-"+We[e&63|128]+We[e>>8&255]+"-"+We[e>>16&255]+We[e>>24&255]+We[n&255]+We[n>>8&255]+We[n>>16&255]+We[n>>24&255]).toLowerCase()}function He(o,t,e){return Math.max(t,Math.min(e,o))}function ma(o,t){return(o%t+t)%t}function iu(o,t,e,n,i){return n+(o-t)*(i-n)/(e-t)}function ru(o,t,e){return o!==t?(e-o)/(t-o):0}function vr(o,t,e){return(1-e)*o+e*t}function su(o,t,e,n){return vr(o,t,1-Math.exp(-e*n))}function ou(o,t=1){return t-Math.abs(ma(o,t*2)-t)}function au(o,t,e){return o<=t?0:o>=e?1:(o=(o-t)/(e-t),o*o*(3-2*o))}function lu(o,t,e){return o<=t?0:o>=e?1:(o=(o-t)/(e-t),o*o*o*(o*(o*6-15)+10))}function cu(o,t){return o+Math.floor(Math.random()*(t-o+1))}function hu(o,t){return o+Math.random()*(t-o)}function uu(o){return o*(.5-Math.random())}function du(o){o!==void 0&&(ka=o);let t=ka+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function fu(o){return o*mr}function pu(o){return o*Yi}function mu(o){return(o&o-1)===0&&o!==0}function vu(o){return Math.pow(2,Math.ceil(Math.log(o)/Math.LN2))}function gu(o){return Math.pow(2,Math.floor(Math.log(o)/Math.LN2))}function xu(o,t,e,n,i){const r=Math.cos,s=Math.sin,a=r(e/2),l=s(e/2),c=r((t+n)/2),u=s((t+n)/2),h=r((t-n)/2),d=s((t-n)/2),f=r((n-t)/2),m=s((n-t)/2);switch(i){case"XYX":o.set(a*u,l*h,l*d,a*c);break;case"YZY":o.set(l*d,a*u,l*h,a*c);break;case"ZXZ":o.set(l*h,l*d,a*u,a*c);break;case"XZX":o.set(a*u,l*m,l*f,a*c);break;case"YXY":o.set(l*f,a*u,l*m,a*c);break;case"ZYZ":o.set(l*m,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function vn(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function xe(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}const Es={DEG2RAD:mr,RAD2DEG:Yi,generateUUID:cn,clamp:He,euclideanModulo:ma,mapLinear:iu,inverseLerp:ru,lerp:vr,damp:su,pingpong:ou,smoothstep:au,smootherstep:lu,randInt:cu,randFloat:hu,randFloatSpread:uu,seededRandom:du,degToRad:fu,radToDeg:pu,isPowerOfTwo:mu,ceilPowerOfTwo:vu,floorPowerOfTwo:gu,setQuaternionFromProperEuler:xu,normalize:xe,denormalize:vn};class Xt{constructor(t=0,e=0){Xt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(He(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,s=this.y-t.y;return this.x=r*n-s*i+t.x,this.y=r*i+s*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class he{constructor(t,e,n,i,r,s,a,l,c){he.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,s,a,l,c)}set(t,e,n,i,r,s,a,l,c){const u=this.elements;return u[0]=t,u[1]=i,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=s,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,s=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],m=n[8],g=i[0],p=i[3],v=i[6],x=i[1],_=i[4],y=i[7],R=i[2],C=i[5],L=i[8];return r[0]=s*g+a*x+l*R,r[3]=s*p+a*_+l*C,r[6]=s*v+a*y+l*L,r[1]=c*g+u*x+h*R,r[4]=c*p+u*_+h*C,r[7]=c*v+u*y+h*L,r[2]=d*g+f*x+m*R,r[5]=d*p+f*_+m*C,r[8]=d*v+f*y+m*L,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],s=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*s*u-e*a*c-n*r*u+n*a*l+i*r*c-i*s*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],s=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*s-a*c,d=a*l-u*r,f=c*r-s*l,m=e*h+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/m;return t[0]=h*g,t[1]=(i*c-u*n)*g,t[2]=(a*n-i*s)*g,t[3]=d*g,t[4]=(u*e-i*l)*g,t[5]=(i*r-a*e)*g,t[6]=f*g,t[7]=(n*l-c*e)*g,t[8]=(s*e-n*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,s,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*s+c*a)+s+t,-i*c,i*l,-i*(-c*s+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Bs.makeScale(t,e)),this}rotate(t){return this.premultiply(Bs.makeRotation(-t)),this}translate(t,e){return this.premultiply(Bs.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Bs=new he;function Cc(o){for(let t=o.length-1;t>=0;--t)if(o[t]>=65535)return!0;return!1}function wr(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function yu(){const o=wr("canvas");return o.style.display="block",o}const Ha={};function va(o){o in Ha||(Ha[o]=!0,console.warn(o))}function _u(o,t,e){return new Promise(function(n,i){function r(){switch(o.clientWaitSync(t,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:i();break;case o.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Ga=new he().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Wa=new he().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ir={[Ge]:{transfer:ys,primaries:_s,toReference:o=>o,fromReference:o=>o},[ke]:{transfer:Ae,primaries:_s,toReference:o=>o.convertSRGBToLinear(),fromReference:o=>o.convertLinearToSRGB()},[Cs]:{transfer:ys,primaries:Ms,toReference:o=>o.applyMatrix3(Wa),fromReference:o=>o.applyMatrix3(Ga)},[pa]:{transfer:Ae,primaries:Ms,toReference:o=>o.convertSRGBToLinear().applyMatrix3(Wa),fromReference:o=>o.applyMatrix3(Ga).convertLinearToSRGB()}},Mu=new Set([Ge,Cs]),ve={enabled:!0,_workingColorSpace:Ge,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(o){if(!Mu.has(o))throw new Error(`Unsupported working color space, "${o}".`);this._workingColorSpace=o},convert:function(o,t,e){if(this.enabled===!1||t===e||!t||!e)return o;const n=Ir[t].toReference,i=Ir[e].fromReference;return i(n(o))},fromWorkingColorSpace:function(o,t){return this.convert(o,this._workingColorSpace,t)},toWorkingColorSpace:function(o,t){return this.convert(o,t,this._workingColorSpace)},getPrimaries:function(o){return Ir[o].primaries},getTransfer:function(o){return o===jn?ys:Ir[o].transfer}};function Vi(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function Fs(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let yi;class Su{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{yi===void 0&&(yi=wr("canvas")),yi.width=t.width,yi.height=t.height;const n=yi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=yi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=wr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let s=0;s<r.length;s++)r[s]=Vi(r[s]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Vi(e[n]/255)*255):e[n]=Vi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Eu=0;class Pc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Eu++}),this.uuid=cn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let s=0,a=i.length;s<a;s++)i[s].isDataTexture?r.push(Os(i[s].image)):r.push(Os(i[s]))}else r=Os(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Os(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?Su.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let wu=0;class Be extends Qi{constructor(t=Be.DEFAULT_IMAGE,e=Be.DEFAULT_MAPPING,n=Qn,i=Qn,r=nn,s=Fn,a=an,l=Vn,c=Be.DEFAULT_ANISOTROPY,u=jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wu++}),this.uuid=cn(),this.name="",this.source=new Pc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=s,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Xt(0,0),this.repeat=new Xt(1,1),this.center=new Xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new he,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==mc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Wi:t.x=t.x-Math.floor(t.x);break;case Qn:t.x=t.x<0?0:1;break;case xs:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Wi:t.y=t.y-Math.floor(t.y);break;case Qn:t.y=t.y<0?0:1;break;case xs:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Be.DEFAULT_IMAGE=null;Be.DEFAULT_MAPPING=mc;Be.DEFAULT_ANISOTROPY=1;class ge{constructor(t=0,e=0,n=0,i=1){ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i+s[12]*r,this.y=s[1]*e+s[5]*n+s[9]*i+s[13]*r,this.z=s[2]*e+s[6]*n+s[10]*i+s[14]*r,this.w=s[3]*e+s[7]*n+s[11]*i+s[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],m=l[9],g=l[2],p=l[6],v=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-g)<.01&&Math.abs(m-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+g)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+v-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(c+1)/2,y=(f+1)/2,R=(v+1)/2,C=(u+d)/4,L=(h+g)/4,N=(m+p)/4;return _>y&&_>R?_<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(_),i=C/n,r=L/n):y>R?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=C/i,r=N/i):R<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(R),n=L/r,i=N/r),this.set(n,i,r,e),this}let x=Math.sqrt((p-m)*(p-m)+(h-g)*(h-g)+(d-u)*(d-u));return Math.abs(x)<.001&&(x=1),this.x=(p-m)/x,this.y=(h-g)/x,this.z=(d-u)/x,this.w=Math.acos((c+f+v-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Au extends Qi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Be(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const s=n.count;for(let a=0;a<s;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Pc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ii extends Au{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Lc extends Be{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ze,this.minFilter=Ze,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Tu extends Be{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ze,this.minFilter=Ze,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hn{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,s,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const d=r[s+0],f=r[s+1],m=r[s+2],g=r[s+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=g;return}if(h!==g||l!==d||c!==f||u!==m){let p=1-a;const v=l*d+c*f+u*m+h*g,x=v>=0?1:-1,_=1-v*v;if(_>Number.EPSILON){const R=Math.sqrt(_),C=Math.atan2(R,v*x);p=Math.sin(p*C)/R,a=Math.sin(a*C)/R}const y=a*x;if(l=l*p+d*y,c=c*p+f*y,u=u*p+m*y,h=h*p+g*y,p===1-a){const R=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=R,c*=R,u*=R,h*=R}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,r,s){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=r[s],d=r[s+1],f=r[s+2],m=r[s+3];return t[e]=a*m+u*h+l*f-c*d,t[e+1]=l*m+u*d+c*h-a*f,t[e+2]=c*m+u*f+a*d-l*h,t[e+3]=u*m-a*h-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,s=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(r/2),d=l(n/2),f=l(i/2),m=l(r/2);switch(s){case"XYZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"YZX":this._x=d*u*h+c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h-d*f*m;break;case"XZY":this._x=d*u*h-c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],s=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],d=n+a+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(s-i)*f}else if(n>a&&n>h){const f=2*Math.sqrt(1+n-a-h);this._w=(u-l)/f,this._x=.25*f,this._y=(i+s)/f,this._z=(r+c)/f}else if(a>h){const f=2*Math.sqrt(1+a-n-h);this._w=(r-c)/f,this._x=(i+s)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-n-a);this._w=(s-i)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(He(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,s=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+s*a+i*c-r*l,this._y=i*u+s*l+r*a-n*c,this._z=r*u+s*c+n*l-i*a,this._w=s*u-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,s=this._w;let a=s*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=s,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*s+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,d=Math.sin(e*u)/c;return this._w=s*h+this._w*d,this._x=n*h+this._x*d,this._y=i*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(t=0,e=0,n=0){k.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,s=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*s,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*s,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*s,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,s=t.y,a=t.z,l=t.w,c=2*(s*i-a*n),u=2*(a*e-r*i),h=2*(r*n-s*e);return this.x=e+l*c+s*h-a*u,this.y=n+l*u+a*c-r*h,this.z=i+l*h+r*u-s*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,s=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*s-n*l,this.z=n*a-i*s,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return zs.copy(this).projectOnVector(t),this.sub(zs)}reflect(t){return this.sub(zs.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(He(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zs=new k,Xa=new hn;class kn{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(fn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(fn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=fn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let s=0,a=r.count;s<a;s++)t.isMesh===!0?t.getVertexPosition(s,fn):fn.fromBufferAttribute(r,s),fn.applyMatrix4(t.matrixWorld),this.expandByPoint(fn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Nr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Nr.copy(n.boundingBox)),Nr.applyMatrix4(t.matrixWorld),this.union(Nr)}const i=t.children;for(let r=0,s=i.length;r<s;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,fn),fn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(rr),Dr.subVectors(this.max,rr),_i.subVectors(t.a,rr),Mi.subVectors(t.b,rr),Si.subVectors(t.c,rr),Hn.subVectors(Mi,_i),Gn.subVectors(Si,Mi),si.subVectors(_i,Si);let e=[0,-Hn.z,Hn.y,0,-Gn.z,Gn.y,0,-si.z,si.y,Hn.z,0,-Hn.x,Gn.z,0,-Gn.x,si.z,0,-si.x,-Hn.y,Hn.x,0,-Gn.y,Gn.x,0,-si.y,si.x,0];return!Vs(e,_i,Mi,Si,Dr)||(e=[1,0,0,0,1,0,0,0,1],!Vs(e,_i,Mi,Si,Dr))?!1:(Ur.crossVectors(Hn,Gn),e=[Ur.x,Ur.y,Ur.z],Vs(e,_i,Mi,Si,Dr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,fn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(fn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Cn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Cn=[new k,new k,new k,new k,new k,new k,new k,new k],fn=new k,Nr=new kn,_i=new k,Mi=new k,Si=new k,Hn=new k,Gn=new k,si=new k,rr=new k,Dr=new k,Ur=new k,oi=new k;function Vs(o,t,e,n,i){for(let r=0,s=o.length-3;r<=s;r+=3){oi.fromArray(o,r);const a=i.x*Math.abs(oi.x)+i.y*Math.abs(oi.y)+i.z*Math.abs(oi.z),l=t.dot(oi),c=e.dot(oi),u=n.dot(oi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const bu=new kn,sr=new k,ks=new k;class An{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):bu.setFromPoints(t).getCenter(n);let i=0;for(let r=0,s=t.length;r<s;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;sr.subVectors(t,this.center);const e=sr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(sr,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ks.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(sr.copy(t.center).add(ks)),this.expandByPoint(sr.copy(t.center).sub(ks))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Pn=new k,Hs=new k,Br=new k,Wn=new k,Gs=new k,Fr=new k,Ws=new k;class Cr{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Pn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Pn.copy(this.origin).addScaledVector(this.direction,e),Pn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Hs.copy(t).add(e).multiplyScalar(.5),Br.copy(e).sub(t).normalize(),Wn.copy(this.origin).sub(Hs);const r=t.distanceTo(e)*.5,s=-this.direction.dot(Br),a=Wn.dot(this.direction),l=-Wn.dot(Br),c=Wn.lengthSq(),u=Math.abs(1-s*s);let h,d,f,m;if(u>0)if(h=s*l-a,d=s*a-l,m=r*u,h>=0)if(d>=-m)if(d<=m){const g=1/u;h*=g,d*=g,f=h*(h+s*d+2*a)+d*(s*h+d+2*l)+c}else d=r,h=Math.max(0,-(s*d+a)),f=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(s*d+a)),f=-h*h+d*(d+2*l)+c;else d<=-m?(h=Math.max(0,-(-s*r+a)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c):d<=m?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(h=Math.max(0,-(s*r+a)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c);else d=s>0?-r:r,h=Math.max(0,-(s*d+a)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Hs).addScaledVector(Br,d),f}intersectSphere(t,e){Pn.subVectors(t.center,this.origin);const n=Pn.dot(this.direction),i=Pn.dot(Pn)-n*n,r=t.radius*t.radius;if(i>r)return null;const s=Math.sqrt(r-i),a=n-s,l=n+s;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,s,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),u>=0?(r=(t.min.y-d.y)*u,s=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,s=(t.min.y-d.y)*u),n>s||r>i||((r>n||isNaN(n))&&(n=r),(s<i||isNaN(i))&&(i=s),h>=0?(a=(t.min.z-d.z)*h,l=(t.max.z-d.z)*h):(a=(t.max.z-d.z)*h,l=(t.min.z-d.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Pn)!==null}intersectTriangle(t,e,n,i,r){Gs.subVectors(e,t),Fr.subVectors(n,t),Ws.crossVectors(Gs,Fr);let s=this.direction.dot(Ws),a;if(s>0){if(i)return null;a=1}else if(s<0)a=-1,s=-s;else return null;Wn.subVectors(this.origin,t);const l=a*this.direction.dot(Fr.crossVectors(Wn,Fr));if(l<0)return null;const c=a*this.direction.dot(Gs.cross(Wn));if(c<0||l+c>s)return null;const u=-a*Wn.dot(Ws);return u<0?null:this.at(u/s,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class se{constructor(t,e,n,i,r,s,a,l,c,u,h,d,f,m,g,p){se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,s,a,l,c,u,h,d,f,m,g,p)}set(t,e,n,i,r,s,a,l,c,u,h,d,f,m,g,p){const v=this.elements;return v[0]=t,v[4]=e,v[8]=n,v[12]=i,v[1]=r,v[5]=s,v[9]=a,v[13]=l,v[2]=c,v[6]=u,v[10]=h,v[14]=d,v[3]=f,v[7]=m,v[11]=g,v[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new se().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ei.setFromMatrixColumn(t,0).length(),r=1/Ei.setFromMatrixColumn(t,1).length(),s=1/Ei.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*s,e[9]=n[9]*s,e[10]=n[10]*s,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,s=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const d=s*u,f=s*h,m=a*u,g=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=f+m*c,e[5]=d-g*c,e[9]=-a*l,e[2]=g-d*c,e[6]=m+f*c,e[10]=s*l}else if(t.order==="YXZ"){const d=l*u,f=l*h,m=c*u,g=c*h;e[0]=d+g*a,e[4]=m*a-f,e[8]=s*c,e[1]=s*h,e[5]=s*u,e[9]=-a,e[2]=f*a-m,e[6]=g+d*a,e[10]=s*l}else if(t.order==="ZXY"){const d=l*u,f=l*h,m=c*u,g=c*h;e[0]=d-g*a,e[4]=-s*h,e[8]=m+f*a,e[1]=f+m*a,e[5]=s*u,e[9]=g-d*a,e[2]=-s*c,e[6]=a,e[10]=s*l}else if(t.order==="ZYX"){const d=s*u,f=s*h,m=a*u,g=a*h;e[0]=l*u,e[4]=m*c-f,e[8]=d*c+g,e[1]=l*h,e[5]=g*c+d,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=s*l}else if(t.order==="YZX"){const d=s*l,f=s*c,m=a*l,g=a*c;e[0]=l*u,e[4]=g-d*h,e[8]=m*h+f,e[1]=h,e[5]=s*u,e[9]=-a*u,e[2]=-c*u,e[6]=f*h+m,e[10]=d-g*h}else if(t.order==="XZY"){const d=s*l,f=s*c,m=a*l,g=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=d*h+g,e[5]=s*u,e[9]=f*h-m,e[2]=m*h-f,e[6]=a*u,e[10]=g*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ru,t,Cu)}lookAt(t,e,n){const i=this.elements;return tn.subVectors(t,e),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),Xn.crossVectors(n,tn),Xn.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),Xn.crossVectors(n,tn)),Xn.normalize(),Or.crossVectors(tn,Xn),i[0]=Xn.x,i[4]=Or.x,i[8]=tn.x,i[1]=Xn.y,i[5]=Or.y,i[9]=tn.y,i[2]=Xn.z,i[6]=Or.z,i[10]=tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,s=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],m=n[2],g=n[6],p=n[10],v=n[14],x=n[3],_=n[7],y=n[11],R=n[15],C=i[0],L=i[4],N=i[8],E=i[12],M=i[1],A=i[5],O=i[9],U=i[13],Z=i[2],X=i[6],$=i[10],z=i[14],I=i[3],et=i[7],Q=i[11],B=i[15];return r[0]=s*C+a*M+l*Z+c*I,r[4]=s*L+a*A+l*X+c*et,r[8]=s*N+a*O+l*$+c*Q,r[12]=s*E+a*U+l*z+c*B,r[1]=u*C+h*M+d*Z+f*I,r[5]=u*L+h*A+d*X+f*et,r[9]=u*N+h*O+d*$+f*Q,r[13]=u*E+h*U+d*z+f*B,r[2]=m*C+g*M+p*Z+v*I,r[6]=m*L+g*A+p*X+v*et,r[10]=m*N+g*O+p*$+v*Q,r[14]=m*E+g*U+p*z+v*B,r[3]=x*C+_*M+y*Z+R*I,r[7]=x*L+_*A+y*X+R*et,r[11]=x*N+_*O+y*$+R*Q,r[15]=x*E+_*U+y*z+R*B,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],s=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],d=t[10],f=t[14],m=t[3],g=t[7],p=t[11],v=t[15];return m*(+r*l*h-i*c*h-r*a*d+n*c*d+i*a*f-n*l*f)+g*(+e*l*f-e*c*d+r*s*d-i*s*f+i*c*u-r*l*u)+p*(+e*c*h-e*a*f-r*s*h+n*s*f+r*a*u-n*c*u)+v*(-i*a*u-e*l*h+e*a*d+i*s*h-n*s*d+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],s=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],d=t[10],f=t[11],m=t[12],g=t[13],p=t[14],v=t[15],x=h*p*c-g*d*c+g*l*f-a*p*f-h*l*v+a*d*v,_=m*d*c-u*p*c-m*l*f+s*p*f+u*l*v-s*d*v,y=u*g*c-m*h*c+m*a*f-s*g*f-u*a*v+s*h*v,R=m*h*l-u*g*l-m*a*d+s*g*d+u*a*p-s*h*p,C=e*x+n*_+i*y+r*R;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/C;return t[0]=x*L,t[1]=(g*d*r-h*p*r-g*i*f+n*p*f+h*i*v-n*d*v)*L,t[2]=(a*p*r-g*l*r+g*i*c-n*p*c-a*i*v+n*l*v)*L,t[3]=(h*l*r-a*d*r-h*i*c+n*d*c+a*i*f-n*l*f)*L,t[4]=_*L,t[5]=(u*p*r-m*d*r+m*i*f-e*p*f-u*i*v+e*d*v)*L,t[6]=(m*l*r-s*p*r-m*i*c+e*p*c+s*i*v-e*l*v)*L,t[7]=(s*d*r-u*l*r+u*i*c-e*d*c-s*i*f+e*l*f)*L,t[8]=y*L,t[9]=(m*h*r-u*g*r-m*n*f+e*g*f+u*n*v-e*h*v)*L,t[10]=(s*g*r-m*a*r+m*n*c-e*g*c-s*n*v+e*a*v)*L,t[11]=(u*a*r-s*h*r-u*n*c+e*h*c+s*n*f-e*a*f)*L,t[12]=R*L,t[13]=(u*g*i-m*h*i+m*n*d-e*g*d-u*n*p+e*h*p)*L,t[14]=(m*a*i-s*g*i-m*n*l+e*g*l+s*n*p-e*a*p)*L,t[15]=(s*h*i-u*a*i+u*n*l-e*h*l-s*n*d+e*a*d)*L,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,s=t.x,a=t.y,l=t.z,c=r*s,u=r*a;return this.set(c*s+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*s,0,c*l-i*a,u*l+i*s,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,s){return this.set(1,n,r,0,t,1,s,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,s=e._y,a=e._z,l=e._w,c=r+r,u=s+s,h=a+a,d=r*c,f=r*u,m=r*h,g=s*u,p=s*h,v=a*h,x=l*c,_=l*u,y=l*h,R=n.x,C=n.y,L=n.z;return i[0]=(1-(g+v))*R,i[1]=(f+y)*R,i[2]=(m-_)*R,i[3]=0,i[4]=(f-y)*C,i[5]=(1-(d+v))*C,i[6]=(p+x)*C,i[7]=0,i[8]=(m+_)*L,i[9]=(p-x)*L,i[10]=(1-(d+g))*L,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Ei.set(i[0],i[1],i[2]).length();const s=Ei.set(i[4],i[5],i[6]).length(),a=Ei.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],pn.copy(this);const c=1/r,u=1/s,h=1/a;return pn.elements[0]*=c,pn.elements[1]*=c,pn.elements[2]*=c,pn.elements[4]*=u,pn.elements[5]*=u,pn.elements[6]*=u,pn.elements[8]*=h,pn.elements[9]*=h,pn.elements[10]*=h,e.setFromRotationMatrix(pn),n.x=r,n.y=s,n.z=a,this}makePerspective(t,e,n,i,r,s,a=On){const l=this.elements,c=2*r/(e-t),u=2*r/(n-i),h=(e+t)/(e-t),d=(n+i)/(n-i);let f,m;if(a===On)f=-(s+r)/(s-r),m=-2*s*r/(s-r);else if(a===Ss)f=-s/(s-r),m=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,s,a=On){const l=this.elements,c=1/(e-t),u=1/(n-i),h=1/(s-r),d=(e+t)*c,f=(n+i)*u;let m,g;if(a===On)m=(s+r)*h,g=-2*h;else if(a===Ss)m=r*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=g,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ei=new k,pn=new se,Ru=new k(0,0,0),Cu=new k(1,1,1),Xn=new k,Or=new k,tn=new k,qa=new se,Ya=new hn;class xn{constructor(t=0,e=0,n=0,i=xn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],s=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-He(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(He(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-He(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(He(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-He(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return qa.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qa,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ya.setFromEuler(this),this.setFromQuaternion(Ya,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xn.DEFAULT_ORDER="XYZ";class ga{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Pu=0;const Ka=new k,wi=new hn,Ln=new se,zr=new k,or=new k,Lu=new k,Iu=new hn,Za=new k(1,0,0),ja=new k(0,1,0),Ja=new k(0,0,1),$a={type:"added"},Nu={type:"removed"},Ai={type:"childadded",child:null},Xs={type:"childremoved",child:null};class Ce extends Qi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Pu++}),this.uuid=cn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ce.DEFAULT_UP.clone();const t=new k,e=new xn,n=new hn,i=new k(1,1,1);function r(){n.setFromEuler(e,!1)}function s(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new se},normalMatrix:{value:new he}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=Ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ga,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return wi.setFromAxisAngle(t,e),this.quaternion.multiply(wi),this}rotateOnWorldAxis(t,e){return wi.setFromAxisAngle(t,e),this.quaternion.premultiply(wi),this}rotateX(t){return this.rotateOnAxis(Za,t)}rotateY(t){return this.rotateOnAxis(ja,t)}rotateZ(t){return this.rotateOnAxis(Ja,t)}translateOnAxis(t,e){return Ka.copy(t).applyQuaternion(this.quaternion),this.position.add(Ka.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Za,t)}translateY(t){return this.translateOnAxis(ja,t)}translateZ(t){return this.translateOnAxis(Ja,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?zr.copy(t):zr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),or.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(or,zr,this.up):Ln.lookAt(zr,or,this.up),this.quaternion.setFromRotationMatrix(Ln),i&&(Ln.extractRotation(i.matrixWorld),wi.setFromRotationMatrix(Ln),this.quaternion.premultiply(wi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent($a),Ai.child=t,this.dispatchEvent(Ai),Ai.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Nu),Xs.child=t,this.dispatchEvent(Xs),Xs.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent($a),Ai.child=t,this.dispatchEvent(Ai),Ai.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const s=this.children[n].getObjectByProperty(t,e);if(s!==void 0)return s}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,t,Lu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,Iu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){const a=s(t.geometries),l=s(t.materials),c=s(t.textures),u=s(t.images),h=s(t.shapes),d=s(t.skeletons),f=s(t.animations),m=s(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function s(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Ce.DEFAULT_UP=new k(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mn=new k,In=new k,qs=new k,Nn=new k,Ti=new k,bi=new k,Qa=new k,Ys=new k,Ks=new k,Zs=new k;class _n{constructor(t=new k,e=new k,n=new k){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),mn.subVectors(t,e),i.cross(mn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){mn.subVectors(i,e),In.subVectors(n,e),qs.subVectors(t,e);const s=mn.dot(mn),a=mn.dot(In),l=mn.dot(qs),c=In.dot(In),u=In.dot(qs),h=s*c-a*a;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(c*l-a*u)*d,m=(s*u-a*l)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Nn)===null?!1:Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(t,e,n,i,r,s,a,l){return this.getBarycoord(t,e,n,i,Nn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Nn.x),l.addScaledVector(s,Nn.y),l.addScaledVector(a,Nn.z),l)}static isFrontFacing(t,e,n,i){return mn.subVectors(n,e),In.subVectors(t,e),mn.cross(In).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mn.subVectors(this.c,this.b),In.subVectors(this.a,this.b),mn.cross(In).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return _n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return _n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return _n.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return _n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return _n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let s,a;Ti.subVectors(i,n),bi.subVectors(r,n),Ys.subVectors(t,n);const l=Ti.dot(Ys),c=bi.dot(Ys);if(l<=0&&c<=0)return e.copy(n);Ks.subVectors(t,i);const u=Ti.dot(Ks),h=bi.dot(Ks);if(u>=0&&h<=u)return e.copy(i);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return s=l/(l-u),e.copy(n).addScaledVector(Ti,s);Zs.subVectors(t,r);const f=Ti.dot(Zs),m=bi.dot(Zs);if(m>=0&&f<=m)return e.copy(r);const g=f*c-l*m;if(g<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(bi,a);const p=u*m-f*h;if(p<=0&&h-u>=0&&f-m>=0)return Qa.subVectors(r,i),a=(h-u)/(h-u+(f-m)),e.copy(i).addScaledVector(Qa,a);const v=1/(p+g+d);return s=g*v,a=d*v,e.copy(n).addScaledVector(Ti,s).addScaledVector(bi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Ic={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qn={h:0,s:0,l:0},Vr={h:0,s:0,l:0};function js(o,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?o+(t-o)*6*e:e<1/2?t:e<2/3?o+(t-o)*6*(2/3-e):o}class ee{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ve.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ve.workingColorSpace){return this.r=t,this.g=e,this.b=n,ve.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ve.workingColorSpace){if(t=ma(t,1),e=He(e,0,1),n=He(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,s=2*n-r;this.r=js(s,r,t+1/3),this.g=js(s,r,t),this.b=js(s,r,t-1/3)}return ve.toWorkingColorSpace(this,i),this}setStyle(t,e=ke){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const s=i[1],a=i[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(s===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ke){const n=Ic[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Vi(t.r),this.g=Vi(t.g),this.b=Vi(t.b),this}copyLinearToSRGB(t){return this.r=Fs(t.r),this.g=Fs(t.g),this.b=Fs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ke){return ve.fromWorkingColorSpace(Xe.copy(this),t),Math.round(He(Xe.r*255,0,255))*65536+Math.round(He(Xe.g*255,0,255))*256+Math.round(He(Xe.b*255,0,255))}getHexString(t=ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ve.workingColorSpace){ve.fromWorkingColorSpace(Xe.copy(this),e);const n=Xe.r,i=Xe.g,r=Xe.b,s=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const u=(a+s)/2;if(a===s)l=0,c=0;else{const h=s-a;switch(c=u<=.5?h/(s+a):h/(2-s-a),s){case n:l=(i-r)/h+(i<r?6:0);break;case i:l=(r-n)/h+2;break;case r:l=(n-i)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=ve.workingColorSpace){return ve.fromWorkingColorSpace(Xe.copy(this),e),t.r=Xe.r,t.g=Xe.g,t.b=Xe.b,t}getStyle(t=ke){ve.fromWorkingColorSpace(Xe.copy(this),t);const e=Xe.r,n=Xe.g,i=Xe.b;return t!==ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(qn),this.setHSL(qn.h+t,qn.s+e,qn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(qn),t.getHSL(Vr);const n=vr(qn.h,Vr.h,e),i=vr(qn.s,Vr.s,e),r=vr(qn.l,Vr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xe=new ee;ee.NAMES=Ic;let Du=0;class Sn extends Qi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Du++}),this.uuid=cn(),this.name="",this.type="Material",this.blending=Oi,this.side=wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yo,this.blendDst=_o,this.blendEquation=pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=za,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xi,this.stencilZFail=xi,this.stencilZPass=xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Oi&&(n.blending=this.blending),this.side!==wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==yo&&(n.blendSrc=this.blendSrc),this.blendDst!==_o&&(n.blendDst=this.blendDst),this.blendEquation!==pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==gs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==za&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const s=[];for(const a in r){const l=r[a];delete l.metadata,s.push(l)}return s}if(e){const r=i(t.textures),s=i(t.images);r.length>0&&(n.textures=r),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}onBeforeRender(){console.warn("Material: onBeforeRender() has been removed.")}}class ln extends Sn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=fc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ue=new k,kr=new Xt;class je{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=jo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=gn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return va("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)kr.fromBufferAttribute(this,e),kr.applyMatrix3(t),this.setXY(e,kr.x,kr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix3(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=vn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=xe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=vn(e,this.array)),e}setX(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=vn(e,this.array)),e}setY(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=vn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=vn(e,this.array)),e}setW(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array),i=xe(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array),i=xe(i,this.array),r=xe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==jo&&(t.usage=this.usage),t}}class Nc extends je{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Dc extends je{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Je extends je{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Uu=0;const rn=new se,Js=new Ce,Ri=new k,en=new kn,ar=new kn,ze=new k;class un extends Qi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=cn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Cc(t)?Dc:Nc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new he().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return rn.makeRotationFromQuaternion(t),this.applyMatrix4(rn),this}rotateX(t){return rn.makeRotationX(t),this.applyMatrix4(rn),this}rotateY(t){return rn.makeRotationY(t),this.applyMatrix4(rn),this}rotateZ(t){return rn.makeRotationZ(t),this.applyMatrix4(rn),this}translate(t,e,n){return rn.makeTranslation(t,e,n),this.applyMatrix4(rn),this}scale(t,e,n){return rn.makeScale(t,e,n),this.applyMatrix4(rn),this}lookAt(t){return Js.lookAt(t),Js.updateMatrix(),this.applyMatrix4(Js.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Je(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];en.setFromBufferAttribute(r),this.morphTargetsRelative?(ze.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(ze),ze.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(ze)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new An);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(t),e)for(let r=0,s=e.length;r<s;r++){const a=e[r];ar.setFromBufferAttribute(a),this.morphTargetsRelative?(ze.addVectors(en.min,ar.min),en.expandByPoint(ze),ze.addVectors(en.max,ar.max),en.expandByPoint(ze)):(en.expandByPoint(ar.min),en.expandByPoint(ar.max))}en.getCenter(n);let i=0;for(let r=0,s=t.count;r<s;r++)ze.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(ze));if(e)for(let r=0,s=e.length;r<s;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)ze.fromBufferAttribute(a,c),l&&(Ri.fromBufferAttribute(t,c),ze.add(Ri)),i=Math.max(i,n.distanceToSquared(ze))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new je(new Float32Array(4*n.count),4));const s=this.getAttribute("tangent"),a=[],l=[];for(let N=0;N<n.count;N++)a[N]=new k,l[N]=new k;const c=new k,u=new k,h=new k,d=new Xt,f=new Xt,m=new Xt,g=new k,p=new k;function v(N,E,M){c.fromBufferAttribute(n,N),u.fromBufferAttribute(n,E),h.fromBufferAttribute(n,M),d.fromBufferAttribute(r,N),f.fromBufferAttribute(r,E),m.fromBufferAttribute(r,M),u.sub(c),h.sub(c),f.sub(d),m.sub(d);const A=1/(f.x*m.y-m.x*f.y);isFinite(A)&&(g.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(A),p.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(A),a[N].add(g),a[E].add(g),a[M].add(g),l[N].add(p),l[E].add(p),l[M].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let N=0,E=x.length;N<E;++N){const M=x[N],A=M.start,O=M.count;for(let U=A,Z=A+O;U<Z;U+=3)v(t.getX(U+0),t.getX(U+1),t.getX(U+2))}const _=new k,y=new k,R=new k,C=new k;function L(N){R.fromBufferAttribute(i,N),C.copy(R);const E=a[N];_.copy(E),_.sub(R.multiplyScalar(R.dot(E))).normalize(),y.crossVectors(C,E);const A=y.dot(l[N])<0?-1:1;s.setXYZW(N,_.x,_.y,_.z,A)}for(let N=0,E=x.length;N<E;++N){const M=x[N],A=M.start,O=M.count;for(let U=A,Z=A+O;U<Z;U+=3)L(t.getX(U+0)),L(t.getX(U+1)),L(t.getX(U+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new je(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new k,r=new k,s=new k,a=new k,l=new k,c=new k,u=new k,h=new k;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),g=t.getX(d+1),p=t.getX(d+2);i.fromBufferAttribute(e,m),r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,p),u.subVectors(s,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,p),a.add(u),l.add(u),c.add(u),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),s.fromBufferAttribute(e,d+2),u.subVectors(s,r),h.subVectors(i,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ze.fromBufferAttribute(t,e),ze.normalize(),t.setXYZ(e,ze.x,ze.y,ze.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u);let f=0,m=0;for(let g=0,p=l.length;g<p;g++){a.isInterleavedBufferAttribute?f=l[g]*a.data.stride+a.offset:f=l[g]*u;for(let v=0;v<u;v++)d[m++]=c[f++]}return new je(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new un,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let a=0,l=s.length;a<l;a++){const c=s[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(t.data))}u.length>0&&(i[l]=u,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const s=t.groups;for(let c=0,u=s.length;c<u;c++){const h=s[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const tl=new se,ai=new Cr,Hr=new An,el=new k,Ci=new k,Pi=new k,Li=new k,$s=new k,Gr=new k,Wr=new Xt,Xr=new Xt,qr=new Xt,nl=new k,il=new k,rl=new k,Yr=new k,Kr=new k;class Ne extends Ce{constructor(t=new un,e=new ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,s=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){Gr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&($s.fromBufferAttribute(h,t),s?Gr.addScaledVector($s,u):Gr.addScaledVector($s.sub(e),u))}e.add(Gr)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(r),ai.copy(t.ray).recast(t.near),!(Hr.containsPoint(ai.origin)===!1&&(ai.intersectSphere(Hr,el)===null||ai.origin.distanceToSquared(el)>(t.far-t.near)**2))&&(tl.copy(r).invert(),ai.copy(t.ray).applyMatrix4(tl),!(n.boundingBox!==null&&ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ai)))}_computeIntersections(t,e,n){let i;const r=this.geometry,s=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(s))for(let m=0,g=d.length;m<g;m++){const p=d[m],v=s[p.materialIndex],x=Math.max(p.start,f.start),_=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let y=x,R=_;y<R;y+=3){const C=a.getX(y),L=a.getX(y+1),N=a.getX(y+2);i=Zr(this,v,t,n,c,u,h,C,L,N),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const m=Math.max(0,f.start),g=Math.min(a.count,f.start+f.count);for(let p=m,v=g;p<v;p+=3){const x=a.getX(p),_=a.getX(p+1),y=a.getX(p+2);i=Zr(this,s,t,n,c,u,h,x,_,y),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(s))for(let m=0,g=d.length;m<g;m++){const p=d[m],v=s[p.materialIndex],x=Math.max(p.start,f.start),_=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let y=x,R=_;y<R;y+=3){const C=y,L=y+1,N=y+2;i=Zr(this,v,t,n,c,u,h,C,L,N),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const m=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let p=m,v=g;p<v;p+=3){const x=p,_=p+1,y=p+2;i=Zr(this,s,t,n,c,u,h,x,_,y),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function Bu(o,t,e,n,i,r,s,a){let l;if(t.side===$e?l=n.intersectTriangle(s,r,i,!0,a):l=n.intersectTriangle(i,r,s,t.side===wn,a),l===null)return null;Kr.copy(a),Kr.applyMatrix4(o.matrixWorld);const c=e.ray.origin.distanceTo(Kr);return c<e.near||c>e.far?null:{distance:c,point:Kr.clone(),object:o}}function Zr(o,t,e,n,i,r,s,a,l,c){o.getVertexPosition(a,Ci),o.getVertexPosition(l,Pi),o.getVertexPosition(c,Li);const u=Bu(o,t,e,n,Ci,Pi,Li,Yr);if(u){i&&(Wr.fromBufferAttribute(i,a),Xr.fromBufferAttribute(i,l),qr.fromBufferAttribute(i,c),u.uv=_n.getInterpolation(Yr,Ci,Pi,Li,Wr,Xr,qr,new Xt)),r&&(Wr.fromBufferAttribute(r,a),Xr.fromBufferAttribute(r,l),qr.fromBufferAttribute(r,c),u.uv1=_n.getInterpolation(Yr,Ci,Pi,Li,Wr,Xr,qr,new Xt)),s&&(nl.fromBufferAttribute(s,a),il.fromBufferAttribute(s,l),rl.fromBufferAttribute(s,c),u.normal=_n.getInterpolation(Yr,Ci,Pi,Li,nl,il,rl,new k),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new k,materialIndex:0};_n.getNormal(Ci,Pi,Li,h.normal),u.face=h}return u}class zn extends un{constructor(t=1,e=1,n=1,i=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:s};const a=this;i=Math.floor(i),r=Math.floor(r),s=Math.floor(s);const l=[],c=[],u=[],h=[];let d=0,f=0;m("z","y","x",-1,-1,n,e,t,s,r,0),m("z","y","x",1,-1,n,e,-t,s,r,1),m("x","z","y",1,1,t,n,e,i,s,2),m("x","z","y",1,-1,t,n,-e,i,s,3),m("x","y","z",1,-1,t,e,n,i,r,4),m("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Je(c,3)),this.setAttribute("normal",new Je(u,3)),this.setAttribute("uv",new Je(h,2));function m(g,p,v,x,_,y,R,C,L,N,E){const M=y/L,A=R/N,O=y/2,U=R/2,Z=C/2,X=L+1,$=N+1;let z=0,I=0;const et=new k;for(let Q=0;Q<$;Q++){const B=Q*A-U;for(let J=0;J<X;J++){const H=J*M-O;et[g]=H*x,et[p]=B*_,et[v]=Z,c.push(et.x,et.y,et.z),et[g]=0,et[p]=0,et[v]=C>0?1:-1,u.push(et.x,et.y,et.z),h.push(J/L),h.push(1-Q/N),z+=1}}for(let Q=0;Q<N;Q++)for(let B=0;B<L;B++){const J=d+B+X*Q,H=d+B+X*(Q+1),T=d+(B+1)+X*(Q+1),b=d+(B+1)+X*Q;l.push(J,H,b),l.push(H,T,b),I+=6}a.addGroup(f,I,E),f+=I,d+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ki(o){const t={};for(const e in o){t[e]={};for(const n in o[e]){const i=o[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ye(o){const t={};for(let e=0;e<o.length;e++){const n=Ki(o[e]);for(const i in n)t[i]=n[i]}return t}function Fu(o){const t=[];for(let e=0;e<o.length;e++)t.push(o[e].clone());return t}function Uc(o){const t=o.getRenderTarget();return t===null?o.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ve.workingColorSpace}const Ou={clone:Ki,merge:Ye};var zu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ri extends Sn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zu,this.fragmentShader=Vu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ki(t.uniforms),this.uniformsGroups=Fu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const s=this.uniforms[i].value;s&&s.isTexture?e.uniforms[i]={type:"t",value:s.toJSON(t).uuid}:s&&s.isColor?e.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?e.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?e.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?e.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?e.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?e.uniforms[i]={type:"m4",value:s.toArray()}:e.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Bc extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=On}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Yn=new k,sl=new Xt,ol=new Xt;class Ke extends Bc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Yi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(mr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Yi*2*Math.atan(Math.tan(mr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z),Yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z)}getViewSize(t,e){return this.getViewBounds(t,sl,ol),e.subVectors(ol,sl)}setViewOffset(t,e,n,i,r,s){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(mr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;r+=s.offsetX*i/l,e-=s.offsetY*n/c,i*=s.width/l,n*=s.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ii=-90,Ni=1;class ku extends Ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ke(Ii,Ni,t,e);i.layers=this.layers,this.add(i);const r=new Ke(Ii,Ni,t,e);r.layers=this.layers,this.add(r);const s=new Ke(Ii,Ni,t,e);s.layers=this.layers,this.add(s);const a=new Ke(Ii,Ni,t,e);a.layers=this.layers,this.add(a);const l=new Ke(Ii,Ni,t,e);l.layers=this.layers,this.add(l);const c=new Ke(Ii,Ni,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,s,a,l]=e;for(const c of e)this.remove(c);if(t===On)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ss)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,s,a,l,c,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,s),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(h,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Fc extends Be{constructor(t,e,n,i,r,s,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Hi,super(t,e,n,i,r,s,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Hu extends ii{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Fc(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:nn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new zn(5,5,5),r=new ri({name:"CubemapFromEquirect",uniforms:Ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$e,blending:ei});r.uniforms.tEquirect.value=e;const s=new Ne(i,r),a=e.minFilter;return e.minFilter===Fn&&(e.minFilter=nn),new ku(1,10,this).update(t,s),e.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let s=0;s<6;s++)t.setRenderTarget(this,s),t.clear(e,n,i);t.setRenderTarget(r)}}const Qs=new k,Gu=new k,Wu=new he;class Zn{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Qs.subVectors(n,e).cross(Gu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Qs),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Wu.getNormalMatrix(t),i=this.coplanarPoint(Qs).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const li=new An,jr=new k;class xa{constructor(t=new Zn,e=new Zn,n=new Zn,i=new Zn,r=new Zn,s=new Zn){this.planes=[t,e,n,i,r,s]}set(t,e,n,i,r,s){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(s),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=On){const n=this.planes,i=t.elements,r=i[0],s=i[1],a=i[2],l=i[3],c=i[4],u=i[5],h=i[6],d=i[7],f=i[8],m=i[9],g=i[10],p=i[11],v=i[12],x=i[13],_=i[14],y=i[15];if(n[0].setComponents(l-r,d-c,p-f,y-v).normalize(),n[1].setComponents(l+r,d+c,p+f,y+v).normalize(),n[2].setComponents(l+s,d+u,p+m,y+x).normalize(),n[3].setComponents(l-s,d-u,p-m,y-x).normalize(),n[4].setComponents(l-a,d-h,p-g,y-_).normalize(),e===On)n[5].setComponents(l+a,d+h,p+g,y+_).normalize();else if(e===Ss)n[5].setComponents(a,h,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(li)}intersectsSprite(t){return li.center.set(0,0,0),li.radius=.7071067811865476,li.applyMatrix4(t.matrixWorld),this.intersectsSphere(li)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(jr.x=i.normal.x>0?t.max.x:t.min.x,jr.y=i.normal.y>0?t.max.y:t.min.y,jr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(jr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Oc(){let o=null,t=!1,e=null,n=null;function i(r,s){e(r,s),n=o.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=o.requestAnimationFrame(i),t=!0)},stop:function(){o.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){o=r}}}function Xu(o){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,h=c.byteLength,d=o.createBuffer();o.bindBuffer(l,d),o.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=o.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=o.HALF_FLOAT:f=o.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=o.SHORT;else if(c instanceof Uint32Array)f=o.UNSIGNED_INT;else if(c instanceof Int32Array)f=o.INT;else if(c instanceof Int8Array)f=o.BYTE;else if(c instanceof Uint8Array)f=o.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){const u=l.array,h=l._updateRange,d=l.updateRanges;if(o.bindBuffer(c,a),h.count===-1&&d.length===0&&o.bufferSubData(c,0,u),d.length!==0){for(let f=0,m=d.length;f<m;f++){const g=d[f];o.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}h.count!==-1&&(o.bufferSubData(c,h.offset*u.BYTES_PER_ELEMENT,u,h.offset,h.count),h.count=-1),l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(o.deleteBuffer(l.buffer),t.delete(a))}function s(a,l){if(a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:s}}class Zi extends un{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,s=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=t/a,d=e/l,f=[],m=[],g=[],p=[];for(let v=0;v<u;v++){const x=v*d-s;for(let _=0;_<c;_++){const y=_*h-r;m.push(y,-x,0),g.push(0,0,1),p.push(_/a),p.push(1-v/l)}}for(let v=0;v<l;v++)for(let x=0;x<a;x++){const _=x+c*v,y=x+c*(v+1),R=x+1+c*(v+1),C=x+1+c*v;f.push(_,y,C),f.push(y,R,C)}this.setIndex(f),this.setAttribute("position",new Je(m,3)),this.setAttribute("normal",new Je(g,3)),this.setAttribute("uv",new Je(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zi(t.width,t.height,t.widthSegments,t.heightSegments)}}var qu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ku=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ju=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ju=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$u=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Qu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,td=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ed=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,nd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,id=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,sd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,od=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ad=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ld=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ud=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,dd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,fd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,pd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,md=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,vd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,gd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,xd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_d=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Md=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Sd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ed=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,wd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ad=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Td=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,bd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Rd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Cd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Pd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ld=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Id=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Nd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Dd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ud=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Od=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,zd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,kd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Gd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Wd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Xd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,qd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Yd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$d=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ef=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,of=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,af=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,cf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,uf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,df=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ff=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,mf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,vf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_f=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Sf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ef=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Af=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Cf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Pf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Lf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,If=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Nf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Df=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Uf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Bf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ff=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Of=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,kf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Hf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Xf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Yf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$f=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Qf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,tp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ep=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,np=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ip=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,op=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ap=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,up=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,fp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,pp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,gp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_p=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Mp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Sp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ep=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,wp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ap=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ce={alphahash_fragment:qu,alphahash_pars_fragment:Yu,alphamap_fragment:Ku,alphamap_pars_fragment:Zu,alphatest_fragment:ju,alphatest_pars_fragment:Ju,aomap_fragment:$u,aomap_pars_fragment:Qu,batching_pars_vertex:td,batching_vertex:ed,begin_vertex:nd,beginnormal_vertex:id,bsdfs:rd,iridescence_fragment:sd,bumpmap_pars_fragment:od,clipping_planes_fragment:ad,clipping_planes_pars_fragment:ld,clipping_planes_pars_vertex:cd,clipping_planes_vertex:hd,color_fragment:ud,color_pars_fragment:dd,color_pars_vertex:fd,color_vertex:pd,common:md,cube_uv_reflection_fragment:vd,defaultnormal_vertex:gd,displacementmap_pars_vertex:xd,displacementmap_vertex:yd,emissivemap_fragment:_d,emissivemap_pars_fragment:Md,colorspace_fragment:Sd,colorspace_pars_fragment:Ed,envmap_fragment:wd,envmap_common_pars_fragment:Ad,envmap_pars_fragment:Td,envmap_pars_vertex:bd,envmap_physical_pars_fragment:Od,envmap_vertex:Rd,fog_vertex:Cd,fog_pars_vertex:Pd,fog_fragment:Ld,fog_pars_fragment:Id,gradientmap_pars_fragment:Nd,lightmap_pars_fragment:Dd,lights_lambert_fragment:Ud,lights_lambert_pars_fragment:Bd,lights_pars_begin:Fd,lights_toon_fragment:zd,lights_toon_pars_fragment:Vd,lights_phong_fragment:kd,lights_phong_pars_fragment:Hd,lights_physical_fragment:Gd,lights_physical_pars_fragment:Wd,lights_fragment_begin:Xd,lights_fragment_maps:qd,lights_fragment_end:Yd,logdepthbuf_fragment:Kd,logdepthbuf_pars_fragment:Zd,logdepthbuf_pars_vertex:jd,logdepthbuf_vertex:Jd,map_fragment:$d,map_pars_fragment:Qd,map_particle_fragment:tf,map_particle_pars_fragment:ef,metalnessmap_fragment:nf,metalnessmap_pars_fragment:rf,morphinstance_vertex:sf,morphcolor_vertex:of,morphnormal_vertex:af,morphtarget_pars_vertex:lf,morphtarget_vertex:cf,normal_fragment_begin:hf,normal_fragment_maps:uf,normal_pars_fragment:df,normal_pars_vertex:ff,normal_vertex:pf,normalmap_pars_fragment:mf,clearcoat_normal_fragment_begin:vf,clearcoat_normal_fragment_maps:gf,clearcoat_pars_fragment:xf,iridescence_pars_fragment:yf,opaque_fragment:_f,packing:Mf,premultiplied_alpha_fragment:Sf,project_vertex:Ef,dithering_fragment:wf,dithering_pars_fragment:Af,roughnessmap_fragment:Tf,roughnessmap_pars_fragment:bf,shadowmap_pars_fragment:Rf,shadowmap_pars_vertex:Cf,shadowmap_vertex:Pf,shadowmask_pars_fragment:Lf,skinbase_vertex:If,skinning_pars_vertex:Nf,skinning_vertex:Df,skinnormal_vertex:Uf,specularmap_fragment:Bf,specularmap_pars_fragment:Ff,tonemapping_fragment:Of,tonemapping_pars_fragment:zf,transmission_fragment:Vf,transmission_pars_fragment:kf,uv_pars_fragment:Hf,uv_pars_vertex:Gf,uv_vertex:Wf,worldpos_vertex:Xf,background_vert:qf,background_frag:Yf,backgroundCube_vert:Kf,backgroundCube_frag:Zf,cube_vert:jf,cube_frag:Jf,depth_vert:$f,depth_frag:Qf,distanceRGBA_vert:tp,distanceRGBA_frag:ep,equirect_vert:np,equirect_frag:ip,linedashed_vert:rp,linedashed_frag:sp,meshbasic_vert:op,meshbasic_frag:ap,meshlambert_vert:lp,meshlambert_frag:cp,meshmatcap_vert:hp,meshmatcap_frag:up,meshnormal_vert:dp,meshnormal_frag:fp,meshphong_vert:pp,meshphong_frag:mp,meshphysical_vert:vp,meshphysical_frag:gp,meshtoon_vert:xp,meshtoon_frag:yp,points_vert:_p,points_frag:Mp,shadow_vert:Sp,shadow_frag:Ep,sprite_vert:wp,sprite_frag:Ap},Vt={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new he},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new he}},envmap:{envMap:{value:null},envMapRotation:{value:new he},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new he}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new he}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new he},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new he},normalScale:{value:new Xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new he},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new he}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new he}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new he}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0},uvTransform:{value:new he}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new Xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new he},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0}}},yn={basic:{uniforms:Ye([Vt.common,Vt.specularmap,Vt.envmap,Vt.aomap,Vt.lightmap,Vt.fog]),vertexShader:ce.meshbasic_vert,fragmentShader:ce.meshbasic_frag},lambert:{uniforms:Ye([Vt.common,Vt.specularmap,Vt.envmap,Vt.aomap,Vt.lightmap,Vt.emissivemap,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.fog,Vt.lights,{emissive:{value:new ee(0)}}]),vertexShader:ce.meshlambert_vert,fragmentShader:ce.meshlambert_frag},phong:{uniforms:Ye([Vt.common,Vt.specularmap,Vt.envmap,Vt.aomap,Vt.lightmap,Vt.emissivemap,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.fog,Vt.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30}}]),vertexShader:ce.meshphong_vert,fragmentShader:ce.meshphong_frag},standard:{uniforms:Ye([Vt.common,Vt.envmap,Vt.aomap,Vt.lightmap,Vt.emissivemap,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.roughnessmap,Vt.metalnessmap,Vt.fog,Vt.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag},toon:{uniforms:Ye([Vt.common,Vt.aomap,Vt.lightmap,Vt.emissivemap,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.gradientmap,Vt.fog,Vt.lights,{emissive:{value:new ee(0)}}]),vertexShader:ce.meshtoon_vert,fragmentShader:ce.meshtoon_frag},matcap:{uniforms:Ye([Vt.common,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.fog,{matcap:{value:null}}]),vertexShader:ce.meshmatcap_vert,fragmentShader:ce.meshmatcap_frag},points:{uniforms:Ye([Vt.points,Vt.fog]),vertexShader:ce.points_vert,fragmentShader:ce.points_frag},dashed:{uniforms:Ye([Vt.common,Vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ce.linedashed_vert,fragmentShader:ce.linedashed_frag},depth:{uniforms:Ye([Vt.common,Vt.displacementmap]),vertexShader:ce.depth_vert,fragmentShader:ce.depth_frag},normal:{uniforms:Ye([Vt.common,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,{opacity:{value:1}}]),vertexShader:ce.meshnormal_vert,fragmentShader:ce.meshnormal_frag},sprite:{uniforms:Ye([Vt.sprite,Vt.fog]),vertexShader:ce.sprite_vert,fragmentShader:ce.sprite_frag},background:{uniforms:{uvTransform:{value:new he},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ce.background_vert,fragmentShader:ce.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new he}},vertexShader:ce.backgroundCube_vert,fragmentShader:ce.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ce.cube_vert,fragmentShader:ce.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ce.equirect_vert,fragmentShader:ce.equirect_frag},distanceRGBA:{uniforms:Ye([Vt.common,Vt.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ce.distanceRGBA_vert,fragmentShader:ce.distanceRGBA_frag},shadow:{uniforms:Ye([Vt.lights,Vt.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:ce.shadow_vert,fragmentShader:ce.shadow_frag}};yn.physical={uniforms:Ye([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new he},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new he},clearcoatNormalScale:{value:new Xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new he},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new he},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new he},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new he},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new he},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new he},transmissionSamplerSize:{value:new Xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new he},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new he},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new he},anisotropyVector:{value:new Xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new he}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag};const Jr={r:0,b:0,g:0},ci=new xn,Tp=new se;function bp(o,t,e,n,i,r,s){const a=new ee(0);let l=r===!0?0:1,c,u,h=null,d=0,f=null;function m(x){let _=x.isScene===!0?x.background:null;return _&&_.isTexture&&(_=(x.backgroundBlurriness>0?e:t).get(_)),_}function g(x){let _=!1;const y=m(x);y===null?v(a,l):y&&y.isColor&&(v(y,1),_=!0);const R=o.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,s):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(o.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function p(x,_){const y=m(_);y&&(y.isCubeTexture||y.mapping===Rs)?(u===void 0&&(u=new Ne(new zn(1,1,1),new ri({name:"BackgroundCubeMaterial",uniforms:Ki(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,C,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),ci.copy(_.backgroundRotation),ci.x*=-1,ci.y*=-1,ci.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ci.y*=-1,ci.z*=-1),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Tp.makeRotationFromEuler(ci)),u.material.toneMapped=ve.getTransfer(y.colorSpace)!==Ae,(h!==y||d!==y.version||f!==o.toneMapping)&&(u.material.needsUpdate=!0,h=y,d=y.version,f=o.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Ne(new Zi(2,2),new ri({name:"BackgroundMaterial",uniforms:Ki(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=ve.getTransfer(y.colorSpace)!==Ae,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||f!==o.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,f=o.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function v(x,_){x.getRGB(Jr,Uc(o)),n.buffers.color.setClear(Jr.r,Jr.g,Jr.b,_,s)}return{getClearColor:function(){return a},setClearColor:function(x,_=1){a.set(x),l=_,v(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,v(a,l)},render:g,addToRenderList:p}}function Rp(o,t){const e=o.getParameter(o.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,s=!1;function a(M,A,O,U,Z){let X=!1;const $=h(U,O,A);r!==$&&(r=$,c(r.object)),X=f(M,U,O,Z),X&&m(M,U,O,Z),Z!==null&&t.update(Z,o.ELEMENT_ARRAY_BUFFER),(X||s)&&(s=!1,y(M,A,O,U),Z!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function l(){return o.createVertexArray()}function c(M){return o.bindVertexArray(M)}function u(M){return o.deleteVertexArray(M)}function h(M,A,O){const U=O.wireframe===!0;let Z=n[M.id];Z===void 0&&(Z={},n[M.id]=Z);let X=Z[A.id];X===void 0&&(X={},Z[A.id]=X);let $=X[U];return $===void 0&&($=d(l()),X[U]=$),$}function d(M){const A=[],O=[],U=[];for(let Z=0;Z<e;Z++)A[Z]=0,O[Z]=0,U[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:O,attributeDivisors:U,object:M,attributes:{},index:null}}function f(M,A,O,U){const Z=r.attributes,X=A.attributes;let $=0;const z=O.getAttributes();for(const I in z)if(z[I].location>=0){const Q=Z[I];let B=X[I];if(B===void 0&&(I==="instanceMatrix"&&M.instanceMatrix&&(B=M.instanceMatrix),I==="instanceColor"&&M.instanceColor&&(B=M.instanceColor)),Q===void 0||Q.attribute!==B||B&&Q.data!==B.data)return!0;$++}return r.attributesNum!==$||r.index!==U}function m(M,A,O,U){const Z={},X=A.attributes;let $=0;const z=O.getAttributes();for(const I in z)if(z[I].location>=0){let Q=X[I];Q===void 0&&(I==="instanceMatrix"&&M.instanceMatrix&&(Q=M.instanceMatrix),I==="instanceColor"&&M.instanceColor&&(Q=M.instanceColor));const B={};B.attribute=Q,Q&&Q.data&&(B.data=Q.data),Z[I]=B,$++}r.attributes=Z,r.attributesNum=$,r.index=U}function g(){const M=r.newAttributes;for(let A=0,O=M.length;A<O;A++)M[A]=0}function p(M){v(M,0)}function v(M,A){const O=r.newAttributes,U=r.enabledAttributes,Z=r.attributeDivisors;O[M]=1,U[M]===0&&(o.enableVertexAttribArray(M),U[M]=1),Z[M]!==A&&(o.vertexAttribDivisor(M,A),Z[M]=A)}function x(){const M=r.newAttributes,A=r.enabledAttributes;for(let O=0,U=A.length;O<U;O++)A[O]!==M[O]&&(o.disableVertexAttribArray(O),A[O]=0)}function _(M,A,O,U,Z,X,$){$===!0?o.vertexAttribIPointer(M,A,O,Z,X):o.vertexAttribPointer(M,A,O,U,Z,X)}function y(M,A,O,U){g();const Z=U.attributes,X=O.getAttributes(),$=A.defaultAttributeValues;for(const z in X){const I=X[z];if(I.location>=0){let et=Z[z];if(et===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(et=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(et=M.instanceColor)),et!==void 0){const Q=et.normalized,B=et.itemSize,J=t.get(et);if(J===void 0)continue;const H=J.buffer,T=J.type,b=J.bytesPerElement,G=T===o.INT||T===o.UNSIGNED_INT||et.gpuType===aa;if(et.isInterleavedBufferAttribute){const j=et.data,nt=j.stride,q=et.offset;if(j.isInstancedInterleavedBuffer){for(let rt=0;rt<I.locationSize;rt++)v(I.location+rt,j.meshPerAttribute);M.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let rt=0;rt<I.locationSize;rt++)p(I.location+rt);o.bindBuffer(o.ARRAY_BUFFER,H);for(let rt=0;rt<I.locationSize;rt++)_(I.location+rt,B/I.locationSize,T,Q,nt*b,(q+B/I.locationSize*rt)*b,G)}else{if(et.isInstancedBufferAttribute){for(let j=0;j<I.locationSize;j++)v(I.location+j,et.meshPerAttribute);M.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let j=0;j<I.locationSize;j++)p(I.location+j);o.bindBuffer(o.ARRAY_BUFFER,H);for(let j=0;j<I.locationSize;j++)_(I.location+j,B/I.locationSize,T,Q,B*b,B/I.locationSize*j*b,G)}}else if($!==void 0){const Q=$[z];if(Q!==void 0)switch(Q.length){case 2:o.vertexAttrib2fv(I.location,Q);break;case 3:o.vertexAttrib3fv(I.location,Q);break;case 4:o.vertexAttrib4fv(I.location,Q);break;default:o.vertexAttrib1fv(I.location,Q)}}}}x()}function R(){N();for(const M in n){const A=n[M];for(const O in A){const U=A[O];for(const Z in U)u(U[Z].object),delete U[Z];delete A[O]}delete n[M]}}function C(M){if(n[M.id]===void 0)return;const A=n[M.id];for(const O in A){const U=A[O];for(const Z in U)u(U[Z].object),delete U[Z];delete A[O]}delete n[M.id]}function L(M){for(const A in n){const O=n[A];if(O[M.id]===void 0)continue;const U=O[M.id];for(const Z in U)u(U[Z].object),delete U[Z];delete O[M.id]}}function N(){E(),s=!0,r!==i&&(r=i,c(r.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:N,resetDefaultState:E,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfProgram:L,initAttributes:g,enableAttribute:p,disableUnusedAttributes:x}}function Cp(o,t,e){let n;function i(c){n=c}function r(c,u){o.drawArrays(n,c,u),e.update(u,n,1)}function s(c,u,h){h!==0&&(o.drawArraysInstanced(n,c,u,h),e.update(u,n,h))}function a(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let f=0;for(let m=0;m<h;m++)f+=u[m];e.update(f,n,1)}function l(c,u,h,d){if(h===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)s(c[m],u[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let m=0;for(let g=0;g<h;g++)m+=u[g];for(let g=0;g<d.length;g++)e.update(m,n,d[g])}}this.setMode=i,this.render=r,this.renderInstances=s,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Pp(o,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");i=o.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(C){return!(C!==an&&n.convert(C)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const L=C===Rr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Vn&&n.convert(C)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==gn&&!L)}function l(C){if(C==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,d=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),f=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=o.getParameter(o.MAX_TEXTURE_SIZE),g=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),p=o.getParameter(o.MAX_VERTEX_ATTRIBS),v=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),x=o.getParameter(o.MAX_VARYING_VECTORS),_=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),y=f>0,R=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:y,maxSamples:R}}function Lp(o){const t=this;let e=null,n=0,i=!1,r=!1;const s=new Zn,a=new he,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||i;return i=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,f){const m=h.clippingPlanes,g=h.clipIntersection,p=h.clipShadows,v=o.get(h);if(!i||m===null||m.length===0||r&&!p)r?u(null):c();else{const x=r?0:n,_=x*4;let y=v.clippingState||null;l.value=y,y=u(m,d,_,f);for(let R=0;R!==_;++R)y[R]=e[R];v.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,d,f,m){const g=h!==null?h.length:0;let p=null;if(g!==0){if(p=l.value,m!==!0||p===null){const v=f+g*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(p===null||p.length<v)&&(p=new Float32Array(v));for(let _=0,y=f;_!==g;++_,y+=4)s.copy(h[_]).applyMatrix4(x,a),s.normal.toArray(p,y),p[y+3]=s.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,p}}function Ip(o){let t=new WeakMap;function e(s,a){return a===Mo?s.mapping=Hi:a===So&&(s.mapping=Gi),s}function n(s){if(s&&s.isTexture){const a=s.mapping;if(a===Mo||a===So)if(t.has(s)){const l=t.get(s).texture;return e(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new Hu(l.height);return c.fromEquirectangularTexture(o,s),t.set(s,c),s.addEventListener("dispose",i),e(c.texture,s.mapping)}else return null}}return s}function i(s){const a=s.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class ya extends Bc{constructor(t=-1,e=1,n=1,i=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,s=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,s=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,s,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Bi=4,al=[.125,.215,.35,.446,.526,.582],mi=20,to=new ya,ll=new ee;let eo=null,no=0,io=0,ro=!1;const fi=(1+Math.sqrt(5))/2,Di=1/fi,cl=[new k(-fi,Di,0),new k(fi,Di,0),new k(-Di,0,fi),new k(Di,0,fi),new k(0,fi,-Di),new k(0,fi,Di),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)];class hl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){eo=this._renderer.getRenderTarget(),no=this._renderer.getActiveCubeFace(),io=this._renderer.getActiveMipmapLevel(),ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(eo,no,io),this._renderer.xr.enabled=ro,t.scissorTest=!1,$r(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Hi||t.mapping===Gi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),eo=this._renderer.getRenderTarget(),no=this._renderer.getActiveCubeFace(),io=this._renderer.getActiveMipmapLevel(),ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:nn,minFilter:nn,generateMipmaps:!1,type:Rr,format:an,colorSpace:Ge,depthBuffer:!1},i=ul(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ul(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Np(r)),this._blurMaterial=Dp(r,t,e)}return i}_compileMaterial(t){const e=new Ne(this._lodPlanes[0],t);this._renderer.compile(e,to)}_sceneToCubeUV(t,e,n,i){const a=new Ke(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(ll),u.toneMapping=ni,u.autoClear=!1;const f=new ln({name:"PMREM.Background",side:$e,depthWrite:!1,depthTest:!1}),m=new Ne(new zn,f);let g=!1;const p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,g=!0):(f.color.copy(ll),g=!0);for(let v=0;v<6;v++){const x=v%3;x===0?(a.up.set(0,l[v],0),a.lookAt(c[v],0,0)):x===1?(a.up.set(0,0,l[v]),a.lookAt(0,c[v],0)):(a.up.set(0,l[v],0),a.lookAt(0,0,c[v]));const _=this._cubeSize;$r(i,x*_,v>2?_:0,_,_),u.setRenderTarget(i),g&&u.render(m,a),u.render(t,a)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=h,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Hi||t.mapping===Gi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=fl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dl());const r=i?this._cubemapMaterial:this._equirectMaterial,s=new Ne(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;$r(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(s,to)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=cl[(i-r-1)%cl.length];this._blur(t,r-1,r,s,a)}e.autoClear=n}_blur(t,e,n,i,r){const s=this._pingPongRenderTarget;this._halfBlur(t,s,e,n,i,"latitudinal",r),this._halfBlur(s,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,s,a){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ne(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*mi-1),g=r/m,p=isFinite(r)?1+Math.floor(u*g):mi;p>mi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${mi}`);const v=[];let x=0;for(let L=0;L<mi;++L){const N=L/g,E=Math.exp(-N*N/2);v.push(E),L===0?x+=E:L<p&&(x+=2*E)}for(let L=0;L<v.length;L++)v[L]=v[L]/x;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=v,d.latitudinal.value=s==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:_}=this;d.dTheta.value=m,d.mipInt.value=_-n;const y=this._sizeLods[i],R=3*y*(i>_-Bi?i-_+Bi:0),C=4*(this._cubeSize-y);$r(e,R,C,3*y,2*y),l.setRenderTarget(e),l.render(h,to)}}function Np(o){const t=[],e=[],n=[];let i=o;const r=o-Bi+1+al.length;for(let s=0;s<r;s++){const a=Math.pow(2,i);e.push(a);let l=1/a;s>o-Bi?l=al[s-o+Bi-1]:s===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,m=6,g=3,p=2,v=1,x=new Float32Array(g*m*f),_=new Float32Array(p*m*f),y=new Float32Array(v*m*f);for(let C=0;C<f;C++){const L=C%3*2/3-1,N=C>2?0:-1,E=[L,N,0,L+2/3,N,0,L+2/3,N+1,0,L,N,0,L+2/3,N+1,0,L,N+1,0];x.set(E,g*m*C),_.set(d,p*m*C);const M=[C,C,C,C,C,C];y.set(M,v*m*C)}const R=new un;R.setAttribute("position",new je(x,g)),R.setAttribute("uv",new je(_,p)),R.setAttribute("faceIndex",new je(y,v)),t.push(R),i>Bi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ul(o,t,e){const n=new ii(o,t,e);return n.texture.mapping=Rs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $r(o,t,e,n,i){o.viewport.set(t,e,n,i),o.scissor.set(t,e,n,i)}function Dp(o,t,e){const n=new Float32Array(mi),i=new k(0,1,0);return new ri({name:"SphericalGaussianBlur",defines:{n:mi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:_a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function dl(){return new ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function fl(){return new ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function _a(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Up(o){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Mo||l===So,u=l===Hi||l===Gi;if(c||u){let h=t.get(a);const d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new hl(o)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const f=a.image;return c&&f&&f.height>0||u&&f&&i(f)?(e===null&&(e=new hl(o)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function s(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:s}}function Bp(o){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=o.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&va("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Fp(o,t,e,n){const i={},r=new WeakMap;function s(h){const d=h.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);for(const m in d.morphAttributes){const g=d.morphAttributes[m];for(let p=0,v=g.length;p<v;p++)t.remove(g[p])}d.removeEventListener("dispose",s),delete i[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(h,d){return i[d.id]===!0||(d.addEventListener("dispose",s),i[d.id]=!0,e.memory.geometries++),d}function l(h){const d=h.attributes;for(const m in d)t.update(d[m],o.ARRAY_BUFFER);const f=h.morphAttributes;for(const m in f){const g=f[m];for(let p=0,v=g.length;p<v;p++)t.update(g[p],o.ARRAY_BUFFER)}}function c(h){const d=[],f=h.index,m=h.attributes.position;let g=0;if(f!==null){const x=f.array;g=f.version;for(let _=0,y=x.length;_<y;_+=3){const R=x[_+0],C=x[_+1],L=x[_+2];d.push(R,C,C,L,L,R)}}else if(m!==void 0){const x=m.array;g=m.version;for(let _=0,y=x.length/3-1;_<y;_+=3){const R=_+0,C=_+1,L=_+2;d.push(R,C,C,L,L,R)}}else return;const p=new(Cc(d)?Dc:Nc)(d,1);p.version=g;const v=r.get(h);v&&t.remove(v),r.set(h,p)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function Op(o,t,e){let n;function i(d){n=d}let r,s;function a(d){r=d.type,s=d.bytesPerElement}function l(d,f){o.drawElements(n,f,r,d*s),e.update(f,n,1)}function c(d,f,m){m!==0&&(o.drawElementsInstanced(n,f,r,d*s,m),e.update(f,n,m))}function u(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let p=0;for(let v=0;v<m;v++)p+=f[v];e.update(p,n,1)}function h(d,f,m,g){if(m===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<d.length;v++)c(d[v]/s,f[v],g[v]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,g,0,m);let v=0;for(let x=0;x<m;x++)v+=f[x];for(let x=0;x<g.length;x++)e.update(v,n,g[x])}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function zp(o){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,s,a){switch(e.calls++,s){case o.TRIANGLES:e.triangles+=a*(r/3);break;case o.LINES:e.lines+=a*(r/2);break;case o.LINE_STRIP:e.lines+=a*(r-1);break;case o.LINE_LOOP:e.lines+=a*r;break;case o.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Vp(o,t,e){const n=new WeakMap,i=new ge;function r(s,a,l){const c=s.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(a);if(d===void 0||d.count!==h){let M=function(){N.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var f=M;d!==void 0&&d.texture.dispose();const m=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,v=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],_=a.morphAttributes.color||[];let y=0;m===!0&&(y=1),g===!0&&(y=2),p===!0&&(y=3);let R=a.attributes.position.count*y,C=1;R>t.maxTextureSize&&(C=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const L=new Float32Array(R*C*4*h),N=new Lc(L,R,C,h);N.type=gn,N.needsUpdate=!0;const E=y*4;for(let A=0;A<h;A++){const O=v[A],U=x[A],Z=_[A],X=R*C*4*A;for(let $=0;$<O.count;$++){const z=$*E;m===!0&&(i.fromBufferAttribute(O,$),L[X+z+0]=i.x,L[X+z+1]=i.y,L[X+z+2]=i.z,L[X+z+3]=0),g===!0&&(i.fromBufferAttribute(U,$),L[X+z+4]=i.x,L[X+z+5]=i.y,L[X+z+6]=i.z,L[X+z+7]=0),p===!0&&(i.fromBufferAttribute(Z,$),L[X+z+8]=i.x,L[X+z+9]=i.y,L[X+z+10]=i.z,L[X+z+11]=Z.itemSize===4?i.w:1)}}d={count:h,texture:N,size:new Xt(R,C)},n.set(a,d),a.addEventListener("dispose",M)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(o,"morphTexture",s.morphTexture,e);else{let m=0;for(let p=0;p<c.length;p++)m+=c[p];const g=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(o,"morphTargetBaseInfluence",g),l.getUniforms().setValue(o,"morphTargetInfluences",c)}l.getUniforms().setValue(o,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(o,"morphTargetsTextureSize",d.size)}return{update:r}}function kp(o,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,h=t.get(l,u);if(i.get(h)!==c&&(t.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,o.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,o.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return h}function s(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:s}}class zc extends Be{constructor(t,e,n,i,r,s,a,l,c,u=zi){if(u!==zi&&u!==qi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===zi&&(n=vi),n===void 0&&u===qi&&(n=Xi),super(null,i,r,s,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ze,this.minFilter=l!==void 0?l:Ze,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Vc=new Be,pl=new zc(1,1),kc=new Lc,Hc=new Tu,Gc=new Fc,ml=[],vl=[],gl=new Float32Array(16),xl=new Float32Array(9),yl=new Float32Array(4);function tr(o,t,e){const n=o[0];if(n<=0||n>0)return o;const i=t*e;let r=ml[i];if(r===void 0&&(r=new Float32Array(i),ml[i]=r),t!==0){n.toArray(r,0);for(let s=1,a=0;s!==t;++s)a+=e,o[s].toArray(r,a)}return r}function Fe(o,t){if(o.length!==t.length)return!1;for(let e=0,n=o.length;e<n;e++)if(o[e]!==t[e])return!1;return!0}function Oe(o,t){for(let e=0,n=t.length;e<n;e++)o[e]=t[e]}function Ps(o,t){let e=vl[t];e===void 0&&(e=new Int32Array(t),vl[t]=e);for(let n=0;n!==t;++n)e[n]=o.allocateTextureUnit();return e}function Hp(o,t){const e=this.cache;e[0]!==t&&(o.uniform1f(this.addr,t),e[0]=t)}function Gp(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(o.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;o.uniform2fv(this.addr,t),Oe(e,t)}}function Wp(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(o.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(o.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Fe(e,t))return;o.uniform3fv(this.addr,t),Oe(e,t)}}function Xp(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(o.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;o.uniform4fv(this.addr,t),Oe(e,t)}}function qp(o,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;o.uniformMatrix2fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;yl.set(n),o.uniformMatrix2fv(this.addr,!1,yl),Oe(e,n)}}function Yp(o,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;o.uniformMatrix3fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;xl.set(n),o.uniformMatrix3fv(this.addr,!1,xl),Oe(e,n)}}function Kp(o,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;o.uniformMatrix4fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;gl.set(n),o.uniformMatrix4fv(this.addr,!1,gl),Oe(e,n)}}function Zp(o,t){const e=this.cache;e[0]!==t&&(o.uniform1i(this.addr,t),e[0]=t)}function jp(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(o.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;o.uniform2iv(this.addr,t),Oe(e,t)}}function Jp(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(o.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;o.uniform3iv(this.addr,t),Oe(e,t)}}function $p(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(o.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;o.uniform4iv(this.addr,t),Oe(e,t)}}function Qp(o,t){const e=this.cache;e[0]!==t&&(o.uniform1ui(this.addr,t),e[0]=t)}function tm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(o.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;o.uniform2uiv(this.addr,t),Oe(e,t)}}function em(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(o.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;o.uniform3uiv(this.addr,t),Oe(e,t)}}function nm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(o.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;o.uniform4uiv(this.addr,t),Oe(e,t)}}function im(o,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i);let r;this.type===o.SAMPLER_2D_SHADOW?(pl.compareFunction=Rc,r=pl):r=Vc,e.setTexture2D(t||r,i)}function rm(o,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Hc,i)}function sm(o,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Gc,i)}function om(o,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||kc,i)}function am(o){switch(o){case 5126:return Hp;case 35664:return Gp;case 35665:return Wp;case 35666:return Xp;case 35674:return qp;case 35675:return Yp;case 35676:return Kp;case 5124:case 35670:return Zp;case 35667:case 35671:return jp;case 35668:case 35672:return Jp;case 35669:case 35673:return $p;case 5125:return Qp;case 36294:return tm;case 36295:return em;case 36296:return nm;case 35678:case 36198:case 36298:case 36306:case 35682:return im;case 35679:case 36299:case 36307:return rm;case 35680:case 36300:case 36308:case 36293:return sm;case 36289:case 36303:case 36311:case 36292:return om}}function lm(o,t){o.uniform1fv(this.addr,t)}function cm(o,t){const e=tr(t,this.size,2);o.uniform2fv(this.addr,e)}function hm(o,t){const e=tr(t,this.size,3);o.uniform3fv(this.addr,e)}function um(o,t){const e=tr(t,this.size,4);o.uniform4fv(this.addr,e)}function dm(o,t){const e=tr(t,this.size,4);o.uniformMatrix2fv(this.addr,!1,e)}function fm(o,t){const e=tr(t,this.size,9);o.uniformMatrix3fv(this.addr,!1,e)}function pm(o,t){const e=tr(t,this.size,16);o.uniformMatrix4fv(this.addr,!1,e)}function mm(o,t){o.uniform1iv(this.addr,t)}function vm(o,t){o.uniform2iv(this.addr,t)}function gm(o,t){o.uniform3iv(this.addr,t)}function xm(o,t){o.uniform4iv(this.addr,t)}function ym(o,t){o.uniform1uiv(this.addr,t)}function _m(o,t){o.uniform2uiv(this.addr,t)}function Mm(o,t){o.uniform3uiv(this.addr,t)}function Sm(o,t){o.uniform4uiv(this.addr,t)}function Em(o,t,e){const n=this.cache,i=t.length,r=Ps(e,i);Fe(n,r)||(o.uniform1iv(this.addr,r),Oe(n,r));for(let s=0;s!==i;++s)e.setTexture2D(t[s]||Vc,r[s])}function wm(o,t,e){const n=this.cache,i=t.length,r=Ps(e,i);Fe(n,r)||(o.uniform1iv(this.addr,r),Oe(n,r));for(let s=0;s!==i;++s)e.setTexture3D(t[s]||Hc,r[s])}function Am(o,t,e){const n=this.cache,i=t.length,r=Ps(e,i);Fe(n,r)||(o.uniform1iv(this.addr,r),Oe(n,r));for(let s=0;s!==i;++s)e.setTextureCube(t[s]||Gc,r[s])}function Tm(o,t,e){const n=this.cache,i=t.length,r=Ps(e,i);Fe(n,r)||(o.uniform1iv(this.addr,r),Oe(n,r));for(let s=0;s!==i;++s)e.setTexture2DArray(t[s]||kc,r[s])}function bm(o){switch(o){case 5126:return lm;case 35664:return cm;case 35665:return hm;case 35666:return um;case 35674:return dm;case 35675:return fm;case 35676:return pm;case 5124:case 35670:return mm;case 35667:case 35671:return vm;case 35668:case 35672:return gm;case 35669:case 35673:return xm;case 5125:return ym;case 36294:return _m;case 36295:return Mm;case 36296:return Sm;case 35678:case 36198:case 36298:case 36306:case 35682:return Em;case 35679:case 36299:case 36307:return wm;case 35680:case 36300:case 36308:case 36293:return Am;case 36289:case 36303:case 36311:case 36292:return Tm}}class Rm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=am(e.type)}}class Cm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=bm(e.type)}}class Pm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,s=i.length;r!==s;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const so=/(\w+)(\])?(\[|\.)?/g;function _l(o,t){o.seq.push(t),o.map[t.id]=t}function Lm(o,t,e){const n=o.name,i=n.length;for(so.lastIndex=0;;){const r=so.exec(n),s=so.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&s+2===i){_l(e,c===void 0?new Rm(a,o,t):new Cm(a,o,t));break}else{let h=e.map[a];h===void 0&&(h=new Pm(a),_l(e,h)),e=h}}}class vs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),s=t.getUniformLocation(e,r.name);Lm(r,s,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,s=e.length;r!==s;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const s=t[i];s.id in e&&n.push(s)}return n}}function Ml(o,t,e){const n=o.createShader(t);return o.shaderSource(n,e),o.compileShader(n),n}const Im=37297;let Nm=0;function Dm(o,t){const e=o.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let s=i;s<r;s++){const a=s+1;n.push(`${a===t?">":" "} ${a}: ${e[s]}`)}return n.join(`
`)}function Um(o){const t=ve.getPrimaries(ve.workingColorSpace),e=ve.getPrimaries(o);let n;switch(t===e?n="":t===Ms&&e===_s?n="LinearDisplayP3ToLinearSRGB":t===_s&&e===Ms&&(n="LinearSRGBToLinearDisplayP3"),o){case Ge:case Cs:return[n,"LinearTransferOETF"];case ke:case pa:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",o),[n,"LinearTransferOETF"]}}function Sl(o,t,e){const n=o.getShaderParameter(t,o.COMPILE_STATUS),i=o.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const s=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Dm(o.getShaderSource(t),s)}else return i}function Bm(o,t){const e=Um(t);return`vec4 ${o}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Fm(o,t){let e;switch(t){case Oh:e="Linear";break;case zh:e="Reinhard";break;case Vh:e="OptimizedCineon";break;case pc:e="ACESFilmic";break;case Hh:e="AgX";break;case Gh:e="Neutral";break;case kh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+o+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Om(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pr).join(`
`)}function zm(o){const t=[];for(const e in o){const n=o[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Vm(o,t){const e={},n=o.getProgramParameter(t,o.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=o.getActiveAttrib(t,i),s=r.name;let a=1;r.type===o.FLOAT_MAT2&&(a=2),r.type===o.FLOAT_MAT3&&(a=3),r.type===o.FLOAT_MAT4&&(a=4),e[s]={type:r.type,location:o.getAttribLocation(t,s),locationSize:a}}return e}function pr(o){return o!==""}function El(o,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function wl(o,t){return o.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const km=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jo(o){return o.replace(km,Gm)}const Hm=new Map;function Gm(o,t){let e=ce[t];if(e===void 0){const n=Hm.get(t);if(n!==void 0)e=ce[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Jo(e)}const Wm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Al(o){return o.replace(Wm,Xm)}function Xm(o,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Tl(o){let t=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?t+=`
#define HIGH_PRECISION`:o.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function qm(o){let t="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===dc?t="SHADOWMAP_TYPE_PCF":o.shadowMapType===hh?t="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===Un&&(t="SHADOWMAP_TYPE_VSM"),t}function Ym(o){let t="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case Hi:case Gi:t="ENVMAP_TYPE_CUBE";break;case Rs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Km(o){let t="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case Gi:t="ENVMAP_MODE_REFRACTION";break}return t}function Zm(o){let t="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case fc:t="ENVMAP_BLENDING_MULTIPLY";break;case Bh:t="ENVMAP_BLENDING_MIX";break;case Fh:t="ENVMAP_BLENDING_ADD";break}return t}function jm(o){const t=o.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Jm(o,t,e,n){const i=o.getContext(),r=e.defines;let s=e.vertexShader,a=e.fragmentShader;const l=qm(e),c=Ym(e),u=Km(e),h=Zm(e),d=jm(e),f=Om(e),m=zm(r),g=i.createProgram();let p,v,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(pr).join(`
`),p.length>0&&(p+=`
`),v=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(pr).join(`
`),v.length>0&&(v+=`
`)):(p=[Tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pr).join(`
`),v=[Tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ni?"#define TONE_MAPPING":"",e.toneMapping!==ni?ce.tonemapping_pars_fragment:"",e.toneMapping!==ni?Fm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ce.colorspace_pars_fragment,Bm("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(pr).join(`
`)),s=Jo(s),s=El(s,e),s=wl(s,e),a=Jo(a),a=El(a,e),a=wl(a,e),s=Al(s),a=Al(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["#define varying in",e.glslVersion===Va?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Va?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const _=x+p+s,y=x+v+a,R=Ml(i,i.VERTEX_SHADER,_),C=Ml(i,i.FRAGMENT_SHADER,y);i.attachShader(g,R),i.attachShader(g,C),e.index0AttributeName!==void 0?i.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function L(A){if(o.debug.checkShaderErrors){const O=i.getProgramInfoLog(g).trim(),U=i.getShaderInfoLog(R).trim(),Z=i.getShaderInfoLog(C).trim();let X=!0,$=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(X=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(i,g,R,C);else{const z=Sl(i,R,"vertex"),I=Sl(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+O+`
`+z+`
`+I)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(U===""||Z==="")&&($=!1);$&&(A.diagnostics={runnable:X,programLog:O,vertexShader:{log:U,prefix:p},fragmentShader:{log:Z,prefix:v}})}i.deleteShader(R),i.deleteShader(C),N=new vs(i,g),E=Vm(i,g)}let N;this.getUniforms=function(){return N===void 0&&L(this),N};let E;this.getAttributes=function(){return E===void 0&&L(this),E};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(g,Im)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Nm++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=R,this.fragmentShader=C,this}let $m=0;class Qm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),s=this._getShaderCacheForMaterial(t);return s.has(i)===!1&&(s.add(i),i.usedTimes++),s.has(r)===!1&&(s.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new tv(t),e.set(t,n)),n}}class tv{constructor(t){this.id=$m++,this.code=t,this.usedTimes=0}}function ev(o,t,e,n,i,r,s){const a=new ga,l=new Qm,c=new Set,u=[],h=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(E){return c.add(E),E===0?"uv":`uv${E}`}function p(E,M,A,O,U){const Z=O.fog,X=U.geometry,$=E.isMeshStandardMaterial?O.environment:null,z=(E.isMeshStandardMaterial?e:t).get(E.envMap||$),I=z&&z.mapping===Rs?z.image.height:null,et=m[E.type];E.precision!==null&&(f=i.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const Q=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,B=Q!==void 0?Q.length:0;let J=0;X.morphAttributes.position!==void 0&&(J=1),X.morphAttributes.normal!==void 0&&(J=2),X.morphAttributes.color!==void 0&&(J=3);let H,T,b,G;if(et){const ue=yn[et];H=ue.vertexShader,T=ue.fragmentShader}else H=E.vertexShader,T=E.fragmentShader,l.update(E),b=l.getVertexShaderID(E),G=l.getFragmentShaderID(E);const j=o.getRenderTarget(),nt=U.isInstancedMesh===!0,q=U.isBatchedMesh===!0,rt=!!E.map,ft=!!E.matcap,D=!!z,Rt=!!E.aoMap,yt=!!E.lightMap,at=!!E.bumpMap,st=!!E.normalMap,Zt=!!E.displacementMap,Tt=!!E.emissiveMap,Ht=!!E.metalnessMap,P=!!E.roughnessMap,w=E.anisotropy>0,tt=E.clearcoat>0,ct=E.dispersion>0,mt=E.iridescence>0,lt=E.sheen>0,Ot=E.transmission>0,gt=w&&!!E.anisotropyMap,It=tt&&!!E.clearcoatMap,jt=tt&&!!E.clearcoatNormalMap,At=tt&&!!E.clearcoatRoughnessMap,kt=mt&&!!E.iridescenceMap,re=mt&&!!E.iridescenceThicknessMap,Kt=lt&&!!E.sheenColorMap,zt=lt&&!!E.sheenRoughnessMap,$t=!!E.specularMap,te=!!E.specularColorMap,pe=!!E.specularIntensityMap,Y=Ot&&!!E.transmissionMap,St=Ot&&!!E.thicknessMap,ut=!!E.gradientMap,pt=!!E.alphaMap,Et=E.alphaTest>0,Jt=!!E.alphaHash,oe=!!E.extensions;let _e=ni;E.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(_e=o.toneMapping);const Te={shaderID:et,shaderType:E.type,shaderName:E.name,vertexShader:H,fragmentShader:T,defines:E.defines,customVertexShaderID:b,customFragmentShaderID:G,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:q,batchingColor:q&&U._colorsTexture!==null,instancing:nt,instancingColor:nt&&U.instanceColor!==null,instancingMorph:nt&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:j===null?o.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Ge,alphaToCoverage:!!E.alphaToCoverage,map:rt,matcap:ft,envMap:D,envMapMode:D&&z.mapping,envMapCubeUVHeight:I,aoMap:Rt,lightMap:yt,bumpMap:at,normalMap:st,displacementMap:d&&Zt,emissiveMap:Tt,normalMapObjectSpace:st&&E.normalMapType===Zh,normalMapTangentSpace:st&&E.normalMapType===bc,metalnessMap:Ht,roughnessMap:P,anisotropy:w,anisotropyMap:gt,clearcoat:tt,clearcoatMap:It,clearcoatNormalMap:jt,clearcoatRoughnessMap:At,dispersion:ct,iridescence:mt,iridescenceMap:kt,iridescenceThicknessMap:re,sheen:lt,sheenColorMap:Kt,sheenRoughnessMap:zt,specularMap:$t,specularColorMap:te,specularIntensityMap:pe,transmission:Ot,transmissionMap:Y,thicknessMap:St,gradientMap:ut,opaque:E.transparent===!1&&E.blending===Oi&&E.alphaToCoverage===!1,alphaMap:pt,alphaTest:Et,alphaHash:Jt,combine:E.combine,mapUv:rt&&g(E.map.channel),aoMapUv:Rt&&g(E.aoMap.channel),lightMapUv:yt&&g(E.lightMap.channel),bumpMapUv:at&&g(E.bumpMap.channel),normalMapUv:st&&g(E.normalMap.channel),displacementMapUv:Zt&&g(E.displacementMap.channel),emissiveMapUv:Tt&&g(E.emissiveMap.channel),metalnessMapUv:Ht&&g(E.metalnessMap.channel),roughnessMapUv:P&&g(E.roughnessMap.channel),anisotropyMapUv:gt&&g(E.anisotropyMap.channel),clearcoatMapUv:It&&g(E.clearcoatMap.channel),clearcoatNormalMapUv:jt&&g(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&g(E.clearcoatRoughnessMap.channel),iridescenceMapUv:kt&&g(E.iridescenceMap.channel),iridescenceThicknessMapUv:re&&g(E.iridescenceThicknessMap.channel),sheenColorMapUv:Kt&&g(E.sheenColorMap.channel),sheenRoughnessMapUv:zt&&g(E.sheenRoughnessMap.channel),specularMapUv:$t&&g(E.specularMap.channel),specularColorMapUv:te&&g(E.specularColorMap.channel),specularIntensityMapUv:pe&&g(E.specularIntensityMap.channel),transmissionMapUv:Y&&g(E.transmissionMap.channel),thicknessMapUv:St&&g(E.thicknessMap.channel),alphaMapUv:pt&&g(E.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(st||w),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!X.attributes.uv&&(rt||pt),fog:!!Z,useFog:E.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:U.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:B,morphTextureStride:J,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:E.dithering,shadowMapEnabled:o.shadowMap.enabled&&A.length>0,shadowMapType:o.shadowMap.type,toneMapping:_e,decodeVideoTexture:rt&&E.map.isVideoTexture===!0&&ve.getTransfer(E.map.colorSpace)===Ae,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===on,flipSided:E.side===$e,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:oe&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&E.extensions.multiDraw===!0||q)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Te.vertexUv1s=c.has(1),Te.vertexUv2s=c.has(2),Te.vertexUv3s=c.has(3),c.clear(),Te}function v(E){const M=[];if(E.shaderID?M.push(E.shaderID):(M.push(E.customVertexShaderID),M.push(E.customFragmentShaderID)),E.defines!==void 0)for(const A in E.defines)M.push(A),M.push(E.defines[A]);return E.isRawShaderMaterial===!1&&(x(M,E),_(M,E),M.push(o.outputColorSpace)),M.push(E.customProgramCacheKey),M.join()}function x(E,M){E.push(M.precision),E.push(M.outputColorSpace),E.push(M.envMapMode),E.push(M.envMapCubeUVHeight),E.push(M.mapUv),E.push(M.alphaMapUv),E.push(M.lightMapUv),E.push(M.aoMapUv),E.push(M.bumpMapUv),E.push(M.normalMapUv),E.push(M.displacementMapUv),E.push(M.emissiveMapUv),E.push(M.metalnessMapUv),E.push(M.roughnessMapUv),E.push(M.anisotropyMapUv),E.push(M.clearcoatMapUv),E.push(M.clearcoatNormalMapUv),E.push(M.clearcoatRoughnessMapUv),E.push(M.iridescenceMapUv),E.push(M.iridescenceThicknessMapUv),E.push(M.sheenColorMapUv),E.push(M.sheenRoughnessMapUv),E.push(M.specularMapUv),E.push(M.specularColorMapUv),E.push(M.specularIntensityMapUv),E.push(M.transmissionMapUv),E.push(M.thicknessMapUv),E.push(M.combine),E.push(M.fogExp2),E.push(M.sizeAttenuation),E.push(M.morphTargetsCount),E.push(M.morphAttributeCount),E.push(M.numDirLights),E.push(M.numPointLights),E.push(M.numSpotLights),E.push(M.numSpotLightMaps),E.push(M.numHemiLights),E.push(M.numRectAreaLights),E.push(M.numDirLightShadows),E.push(M.numPointLightShadows),E.push(M.numSpotLightShadows),E.push(M.numSpotLightShadowsWithMaps),E.push(M.numLightProbes),E.push(M.shadowMapType),E.push(M.toneMapping),E.push(M.numClippingPlanes),E.push(M.numClipIntersection),E.push(M.depthPacking)}function _(E,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.doubleSided&&a.enable(10),M.flipSided&&a.enable(11),M.useDepthPacking&&a.enable(12),M.dithering&&a.enable(13),M.transmission&&a.enable(14),M.sheen&&a.enable(15),M.opaque&&a.enable(16),M.pointsUvs&&a.enable(17),M.decodeVideoTexture&&a.enable(18),M.alphaToCoverage&&a.enable(19),E.push(a.mask)}function y(E){const M=m[E.type];let A;if(M){const O=yn[M];A=Ou.clone(O.uniforms)}else A=E.uniforms;return A}function R(E,M){let A;for(let O=0,U=u.length;O<U;O++){const Z=u[O];if(Z.cacheKey===M){A=Z,++A.usedTimes;break}}return A===void 0&&(A=new Jm(o,M,E,r),u.push(A)),A}function C(E){if(--E.usedTimes===0){const M=u.indexOf(E);u[M]=u[u.length-1],u.pop(),E.destroy()}}function L(E){l.remove(E)}function N(){l.dispose()}return{getParameters:p,getProgramCacheKey:v,getUniforms:y,acquireProgram:R,releaseProgram:C,releaseShaderCache:L,programs:u,dispose:N}}function nv(){let o=new WeakMap;function t(r){let s=o.get(r);return s===void 0&&(s={},o.set(r,s)),s}function e(r){o.delete(r)}function n(r,s,a){o.get(r)[s]=a}function i(){o=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function iv(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.material.id!==t.material.id?o.material.id-t.material.id:o.z!==t.z?o.z-t.z:o.id-t.id}function bl(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.z!==t.z?t.z-o.z:o.id-t.id}function Rl(){const o=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function s(h,d,f,m,g,p){let v=o[t];return v===void 0?(v={id:h.id,object:h,geometry:d,material:f,groupOrder:m,renderOrder:h.renderOrder,z:g,group:p},o[t]=v):(v.id=h.id,v.object=h,v.geometry=d,v.material=f,v.groupOrder=m,v.renderOrder=h.renderOrder,v.z=g,v.group=p),t++,v}function a(h,d,f,m,g,p){const v=s(h,d,f,m,g,p);f.transmission>0?n.push(v):f.transparent===!0?i.push(v):e.push(v)}function l(h,d,f,m,g,p){const v=s(h,d,f,m,g,p);f.transmission>0?n.unshift(v):f.transparent===!0?i.unshift(v):e.unshift(v)}function c(h,d){e.length>1&&e.sort(h||iv),n.length>1&&n.sort(d||bl),i.length>1&&i.sort(d||bl)}function u(){for(let h=t,d=o.length;h<d;h++){const f=o[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:u,sort:c}}function rv(){let o=new WeakMap;function t(n,i){const r=o.get(n);let s;return r===void 0?(s=new Rl,o.set(n,[s])):i>=r.length?(s=new Rl,r.push(s)):s=r[i],s}function e(){o=new WeakMap}return{get:t,dispose:e}}function sv(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new k,color:new ee};break;case"SpotLight":e={position:new k,direction:new k,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new ee,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":e={color:new ee,position:new k,halfWidth:new k,halfHeight:new k};break}return o[t.id]=e,e}}}function ov(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[t.id]=e,e}}}let av=0;function lv(o,t){return(t.castShadow?2:0)-(o.castShadow?2:0)+(t.map?1:0)-(o.map?1:0)}function cv(o){const t=new sv,e=ov(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new k);const i=new k,r=new se,s=new se;function a(c){let u=0,h=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,m=0,g=0,p=0,v=0,x=0,_=0,y=0,R=0,C=0,L=0;c.sort(lv);for(let E=0,M=c.length;E<M;E++){const A=c[E],O=A.color,U=A.intensity,Z=A.distance,X=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)u+=O.r*U,h+=O.g*U,d+=O.b*U;else if(A.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(A.sh.coefficients[$],U);L++}else if(A.isDirectionalLight){const $=t.get(A);if($.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const z=A.shadow,I=e.get(A);I.shadowIntensity=z.intensity,I.shadowBias=z.bias,I.shadowNormalBias=z.normalBias,I.shadowRadius=z.radius,I.shadowMapSize=z.mapSize,n.directionalShadow[f]=I,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=A.shadow.matrix,x++}n.directional[f]=$,f++}else if(A.isSpotLight){const $=t.get(A);$.position.setFromMatrixPosition(A.matrixWorld),$.color.copy(O).multiplyScalar(U),$.distance=Z,$.coneCos=Math.cos(A.angle),$.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),$.decay=A.decay,n.spot[g]=$;const z=A.shadow;if(A.map&&(n.spotLightMap[R]=A.map,R++,z.updateMatrices(A),A.castShadow&&C++),n.spotLightMatrix[g]=z.matrix,A.castShadow){const I=e.get(A);I.shadowIntensity=z.intensity,I.shadowBias=z.bias,I.shadowNormalBias=z.normalBias,I.shadowRadius=z.radius,I.shadowMapSize=z.mapSize,n.spotShadow[g]=I,n.spotShadowMap[g]=X,y++}g++}else if(A.isRectAreaLight){const $=t.get(A);$.color.copy(O).multiplyScalar(U),$.halfWidth.set(A.width*.5,0,0),$.halfHeight.set(0,A.height*.5,0),n.rectArea[p]=$,p++}else if(A.isPointLight){const $=t.get(A);if($.color.copy(A.color).multiplyScalar(A.intensity),$.distance=A.distance,$.decay=A.decay,A.castShadow){const z=A.shadow,I=e.get(A);I.shadowIntensity=z.intensity,I.shadowBias=z.bias,I.shadowNormalBias=z.normalBias,I.shadowRadius=z.radius,I.shadowMapSize=z.mapSize,I.shadowCameraNear=z.camera.near,I.shadowCameraFar=z.camera.far,n.pointShadow[m]=I,n.pointShadowMap[m]=X,n.pointShadowMatrix[m]=A.shadow.matrix,_++}n.point[m]=$,m++}else if(A.isHemisphereLight){const $=t.get(A);$.skyColor.copy(A.color).multiplyScalar(U),$.groundColor.copy(A.groundColor).multiplyScalar(U),n.hemi[v]=$,v++}}p>0&&(o.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Vt.LTC_FLOAT_1,n.rectAreaLTC2=Vt.LTC_FLOAT_2):(n.rectAreaLTC1=Vt.LTC_HALF_1,n.rectAreaLTC2=Vt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const N=n.hash;(N.directionalLength!==f||N.pointLength!==m||N.spotLength!==g||N.rectAreaLength!==p||N.hemiLength!==v||N.numDirectionalShadows!==x||N.numPointShadows!==_||N.numSpotShadows!==y||N.numSpotMaps!==R||N.numLightProbes!==L)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=p,n.point.length=m,n.hemi.length=v,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=y+R-C,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=L,N.directionalLength=f,N.pointLength=m,N.spotLength=g,N.rectAreaLength=p,N.hemiLength=v,N.numDirectionalShadows=x,N.numPointShadows=_,N.numSpotShadows=y,N.numSpotMaps=R,N.numLightProbes=L,n.version=av++)}function l(c,u){let h=0,d=0,f=0,m=0,g=0;const p=u.matrixWorldInverse;for(let v=0,x=c.length;v<x;v++){const _=c[v];if(_.isDirectionalLight){const y=n.directional[h];y.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),h++}else if(_.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),f++}else if(_.isRectAreaLight){const y=n.rectArea[m];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(p),s.identity(),r.copy(_.matrixWorld),r.premultiply(p),s.extractRotation(r),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(s),y.halfHeight.applyMatrix4(s),m++}else if(_.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(p),d++}else if(_.isHemisphereLight){const y=n.hemi[g];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(p),g++}}}return{setup:a,setupView:l,state:n}}function Cl(o){const t=new cv(o),e=[],n=[];function i(u){c.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function s(u){n.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:s}}function hv(o){let t=new WeakMap;function e(i,r=0){const s=t.get(i);let a;return s===void 0?(a=new Cl(o),t.set(i,[a])):r>=s.length?(a=new Cl(o),s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class uv extends Sn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class dv extends Sn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const fv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function mv(o,t,e){let n=new xa;const i=new Xt,r=new Xt,s=new ge,a=new uv({depthPacking:Kh}),l=new dv,c={},u=e.maxTextureSize,h={[wn]:$e,[$e]:wn,[on]:on},d=new ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xt},radius:{value:4}},vertexShader:fv,fragmentShader:pv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new un;m.setAttribute("position",new je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Ne(m,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dc;let v=this.type;this.render=function(C,L,N){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||C.length===0)return;const E=o.getRenderTarget(),M=o.getActiveCubeFace(),A=o.getActiveMipmapLevel(),O=o.state;O.setBlending(ei),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const U=v!==Un&&this.type===Un,Z=v===Un&&this.type!==Un;for(let X=0,$=C.length;X<$;X++){const z=C[X],I=z.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;i.copy(I.mapSize);const et=I.getFrameExtents();if(i.multiply(et),r.copy(I.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/et.x),i.x=r.x*et.x,I.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/et.y),i.y=r.y*et.y,I.mapSize.y=r.y)),I.map===null||U===!0||Z===!0){const B=this.type!==Un?{minFilter:Ze,magFilter:Ze}:{};I.map!==null&&I.map.dispose(),I.map=new ii(i.x,i.y,B),I.map.texture.name=z.name+".shadowMap",I.camera.updateProjectionMatrix()}o.setRenderTarget(I.map),o.clear();const Q=I.getViewportCount();for(let B=0;B<Q;B++){const J=I.getViewport(B);s.set(r.x*J.x,r.y*J.y,r.x*J.z,r.y*J.w),O.viewport(s),I.updateMatrices(z,B),n=I.getFrustum(),y(L,N,I.camera,z,this.type)}I.isPointLightShadow!==!0&&this.type===Un&&x(I,N),I.needsUpdate=!1}v=this.type,p.needsUpdate=!1,o.setRenderTarget(E,M,A)};function x(C,L){const N=t.update(g);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new ii(i.x,i.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,o.setRenderTarget(C.mapPass),o.clear(),o.renderBufferDirect(L,null,N,d,g,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,o.setRenderTarget(C.map),o.clear(),o.renderBufferDirect(L,null,N,f,g,null)}function _(C,L,N,E){let M=null;const A=N.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(A!==void 0)M=A;else if(M=N.isPointLight===!0?l:a,o.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0){const O=M.uuid,U=L.uuid;let Z=c[O];Z===void 0&&(Z={},c[O]=Z);let X=Z[U];X===void 0&&(X=M.clone(),Z[U]=X,L.addEventListener("dispose",R)),M=X}if(M.visible=L.visible,M.wireframe=L.wireframe,E===Un?M.side=L.shadowSide!==null?L.shadowSide:L.side:M.side=L.shadowSide!==null?L.shadowSide:h[L.side],M.alphaMap=L.alphaMap,M.alphaTest=L.alphaTest,M.map=L.map,M.clipShadows=L.clipShadows,M.clippingPlanes=L.clippingPlanes,M.clipIntersection=L.clipIntersection,M.displacementMap=L.displacementMap,M.displacementScale=L.displacementScale,M.displacementBias=L.displacementBias,M.wireframeLinewidth=L.wireframeLinewidth,M.linewidth=L.linewidth,N.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const O=o.properties.get(M);O.light=N}return M}function y(C,L,N,E,M){if(C.visible===!1)return;if(C.layers.test(L.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===Un)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,C.matrixWorld);const U=t.update(C),Z=C.material;if(Array.isArray(Z)){const X=U.groups;for(let $=0,z=X.length;$<z;$++){const I=X[$],et=Z[I.materialIndex];if(et&&et.visible){const Q=_(C,et,E,M);C.onBeforeShadow(o,C,L,N,U,Q,I),o.renderBufferDirect(N,null,U,Q,C,I),C.onAfterShadow(o,C,L,N,U,Q,I)}}}else if(Z.visible){const X=_(C,Z,E,M);C.onBeforeShadow(o,C,L,N,U,X,null),o.renderBufferDirect(N,null,U,X,C,null),C.onAfterShadow(o,C,L,N,U,X,null)}}const O=C.children;for(let U=0,Z=O.length;U<Z;U++)y(O[U],L,N,E,M)}function R(C){C.target.removeEventListener("dispose",R);for(const N in c){const E=c[N],M=C.target.uuid;M in E&&(E[M].dispose(),delete E[M])}}}function vv(o){function t(){let Y=!1;const St=new ge;let ut=null;const pt=new ge(0,0,0,0);return{setMask:function(Et){ut!==Et&&!Y&&(o.colorMask(Et,Et,Et,Et),ut=Et)},setLocked:function(Et){Y=Et},setClear:function(Et,Jt,oe,_e,Te){Te===!0&&(Et*=_e,Jt*=_e,oe*=_e),St.set(Et,Jt,oe,_e),pt.equals(St)===!1&&(o.clearColor(Et,Jt,oe,_e),pt.copy(St))},reset:function(){Y=!1,ut=null,pt.set(-1,0,0,0)}}}function e(){let Y=!1,St=null,ut=null,pt=null;return{setTest:function(Et){Et?G(o.DEPTH_TEST):j(o.DEPTH_TEST)},setMask:function(Et){St!==Et&&!Y&&(o.depthMask(Et),St=Et)},setFunc:function(Et){if(ut!==Et){switch(Et){case Ch:o.depthFunc(o.NEVER);break;case Ph:o.depthFunc(o.ALWAYS);break;case Lh:o.depthFunc(o.LESS);break;case gs:o.depthFunc(o.LEQUAL);break;case Ih:o.depthFunc(o.EQUAL);break;case Nh:o.depthFunc(o.GEQUAL);break;case Dh:o.depthFunc(o.GREATER);break;case Uh:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}ut=Et}},setLocked:function(Et){Y=Et},setClear:function(Et){pt!==Et&&(o.clearDepth(Et),pt=Et)},reset:function(){Y=!1,St=null,ut=null,pt=null}}}function n(){let Y=!1,St=null,ut=null,pt=null,Et=null,Jt=null,oe=null,_e=null,Te=null;return{setTest:function(ue){Y||(ue?G(o.STENCIL_TEST):j(o.STENCIL_TEST))},setMask:function(ue){St!==ue&&!Y&&(o.stencilMask(ue),St=ue)},setFunc:function(ue,Me,ot){(ut!==ue||pt!==Me||Et!==ot)&&(o.stencilFunc(ue,Me,ot),ut=ue,pt=Me,Et=ot)},setOp:function(ue,Me,ot){(Jt!==ue||oe!==Me||_e!==ot)&&(o.stencilOp(ue,Me,ot),Jt=ue,oe=Me,_e=ot)},setLocked:function(ue){Y=ue},setClear:function(ue){Te!==ue&&(o.clearStencil(ue),Te=ue)},reset:function(){Y=!1,St=null,ut=null,pt=null,Et=null,Jt=null,oe=null,_e=null,Te=null}}}const i=new t,r=new e,s=new n,a=new WeakMap,l=new WeakMap;let c={},u={},h=new WeakMap,d=[],f=null,m=!1,g=null,p=null,v=null,x=null,_=null,y=null,R=null,C=new ee(0,0,0),L=0,N=!1,E=null,M=null,A=null,O=null,U=null;const Z=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,$=0;const z=o.getParameter(o.VERSION);z.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(z)[1]),X=$>=1):z.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),X=$>=2);let I=null,et={};const Q=o.getParameter(o.SCISSOR_BOX),B=o.getParameter(o.VIEWPORT),J=new ge().fromArray(Q),H=new ge().fromArray(B);function T(Y,St,ut,pt){const Et=new Uint8Array(4),Jt=o.createTexture();o.bindTexture(Y,Jt),o.texParameteri(Y,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(Y,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let oe=0;oe<ut;oe++)Y===o.TEXTURE_3D||Y===o.TEXTURE_2D_ARRAY?o.texImage3D(St,0,o.RGBA,1,1,pt,0,o.RGBA,o.UNSIGNED_BYTE,Et):o.texImage2D(St+oe,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,Et);return Jt}const b={};b[o.TEXTURE_2D]=T(o.TEXTURE_2D,o.TEXTURE_2D,1),b[o.TEXTURE_CUBE_MAP]=T(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),b[o.TEXTURE_2D_ARRAY]=T(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),b[o.TEXTURE_3D]=T(o.TEXTURE_3D,o.TEXTURE_3D,1,1),i.setClear(0,0,0,1),r.setClear(1),s.setClear(0),G(o.DEPTH_TEST),r.setFunc(gs),at(!1),st(La),G(o.CULL_FACE),Rt(ei);function G(Y){c[Y]!==!0&&(o.enable(Y),c[Y]=!0)}function j(Y){c[Y]!==!1&&(o.disable(Y),c[Y]=!1)}function nt(Y,St){return u[Y]!==St?(o.bindFramebuffer(Y,St),u[Y]=St,Y===o.DRAW_FRAMEBUFFER&&(u[o.FRAMEBUFFER]=St),Y===o.FRAMEBUFFER&&(u[o.DRAW_FRAMEBUFFER]=St),!0):!1}function q(Y,St){let ut=d,pt=!1;if(Y){ut=h.get(St),ut===void 0&&(ut=[],h.set(St,ut));const Et=Y.textures;if(ut.length!==Et.length||ut[0]!==o.COLOR_ATTACHMENT0){for(let Jt=0,oe=Et.length;Jt<oe;Jt++)ut[Jt]=o.COLOR_ATTACHMENT0+Jt;ut.length=Et.length,pt=!0}}else ut[0]!==o.BACK&&(ut[0]=o.BACK,pt=!0);pt&&o.drawBuffers(ut)}function rt(Y){return f!==Y?(o.useProgram(Y),f=Y,!0):!1}const ft={[pi]:o.FUNC_ADD,[dh]:o.FUNC_SUBTRACT,[fh]:o.FUNC_REVERSE_SUBTRACT};ft[ph]=o.MIN,ft[mh]=o.MAX;const D={[vh]:o.ZERO,[gh]:o.ONE,[xh]:o.SRC_COLOR,[yo]:o.SRC_ALPHA,[wh]:o.SRC_ALPHA_SATURATE,[Sh]:o.DST_COLOR,[_h]:o.DST_ALPHA,[yh]:o.ONE_MINUS_SRC_COLOR,[_o]:o.ONE_MINUS_SRC_ALPHA,[Eh]:o.ONE_MINUS_DST_COLOR,[Mh]:o.ONE_MINUS_DST_ALPHA,[Ah]:o.CONSTANT_COLOR,[Th]:o.ONE_MINUS_CONSTANT_COLOR,[bh]:o.CONSTANT_ALPHA,[Rh]:o.ONE_MINUS_CONSTANT_ALPHA};function Rt(Y,St,ut,pt,Et,Jt,oe,_e,Te,ue){if(Y===ei){m===!0&&(j(o.BLEND),m=!1);return}if(m===!1&&(G(o.BLEND),m=!0),Y!==uh){if(Y!==g||ue!==N){if((p!==pi||_!==pi)&&(o.blendEquation(o.FUNC_ADD),p=pi,_=pi),ue)switch(Y){case Oi:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Ia:o.blendFunc(o.ONE,o.ONE);break;case Na:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Da:o.blendFuncSeparate(o.ZERO,o.SRC_COLOR,o.ZERO,o.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",Y);break}else switch(Y){case Oi:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Ia:o.blendFunc(o.SRC_ALPHA,o.ONE);break;case Na:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Da:o.blendFunc(o.ZERO,o.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",Y);break}v=null,x=null,y=null,R=null,C.set(0,0,0),L=0,g=Y,N=ue}return}Et=Et||St,Jt=Jt||ut,oe=oe||pt,(St!==p||Et!==_)&&(o.blendEquationSeparate(ft[St],ft[Et]),p=St,_=Et),(ut!==v||pt!==x||Jt!==y||oe!==R)&&(o.blendFuncSeparate(D[ut],D[pt],D[Jt],D[oe]),v=ut,x=pt,y=Jt,R=oe),(_e.equals(C)===!1||Te!==L)&&(o.blendColor(_e.r,_e.g,_e.b,Te),C.copy(_e),L=Te),g=Y,N=!1}function yt(Y,St){Y.side===on?j(o.CULL_FACE):G(o.CULL_FACE);let ut=Y.side===$e;St&&(ut=!ut),at(ut),Y.blending===Oi&&Y.transparent===!1?Rt(ei):Rt(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),r.setFunc(Y.depthFunc),r.setTest(Y.depthTest),r.setMask(Y.depthWrite),i.setMask(Y.colorWrite);const pt=Y.stencilWrite;s.setTest(pt),pt&&(s.setMask(Y.stencilWriteMask),s.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),s.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),Tt(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?G(o.SAMPLE_ALPHA_TO_COVERAGE):j(o.SAMPLE_ALPHA_TO_COVERAGE)}function at(Y){E!==Y&&(Y?o.frontFace(o.CW):o.frontFace(o.CCW),E=Y)}function st(Y){Y!==lh?(G(o.CULL_FACE),Y!==M&&(Y===La?o.cullFace(o.BACK):Y===ch?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):j(o.CULL_FACE),M=Y}function Zt(Y){Y!==A&&(X&&o.lineWidth(Y),A=Y)}function Tt(Y,St,ut){Y?(G(o.POLYGON_OFFSET_FILL),(O!==St||U!==ut)&&(o.polygonOffset(St,ut),O=St,U=ut)):j(o.POLYGON_OFFSET_FILL)}function Ht(Y){Y?G(o.SCISSOR_TEST):j(o.SCISSOR_TEST)}function P(Y){Y===void 0&&(Y=o.TEXTURE0+Z-1),I!==Y&&(o.activeTexture(Y),I=Y)}function w(Y,St,ut){ut===void 0&&(I===null?ut=o.TEXTURE0+Z-1:ut=I);let pt=et[ut];pt===void 0&&(pt={type:void 0,texture:void 0},et[ut]=pt),(pt.type!==Y||pt.texture!==St)&&(I!==ut&&(o.activeTexture(ut),I=ut),o.bindTexture(Y,St||b[Y]),pt.type=Y,pt.texture=St)}function tt(){const Y=et[I];Y!==void 0&&Y.type!==void 0&&(o.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function ct(){try{o.compressedTexImage2D.apply(o,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function mt(){try{o.compressedTexImage3D.apply(o,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function lt(){try{o.texSubImage2D.apply(o,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Ot(){try{o.texSubImage3D.apply(o,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function gt(){try{o.compressedTexSubImage2D.apply(o,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function It(){try{o.compressedTexSubImage3D.apply(o,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function jt(){try{o.texStorage2D.apply(o,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function At(){try{o.texStorage3D.apply(o,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function kt(){try{o.texImage2D.apply(o,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function re(){try{o.texImage3D.apply(o,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Kt(Y){J.equals(Y)===!1&&(o.scissor(Y.x,Y.y,Y.z,Y.w),J.copy(Y))}function zt(Y){H.equals(Y)===!1&&(o.viewport(Y.x,Y.y,Y.z,Y.w),H.copy(Y))}function $t(Y,St){let ut=l.get(St);ut===void 0&&(ut=new WeakMap,l.set(St,ut));let pt=ut.get(Y);pt===void 0&&(pt=o.getUniformBlockIndex(St,Y.name),ut.set(Y,pt))}function te(Y,St){const pt=l.get(St).get(Y);a.get(St)!==pt&&(o.uniformBlockBinding(St,pt,Y.__bindingPointIndex),a.set(St,pt))}function pe(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),c={},I=null,et={},u={},h=new WeakMap,d=[],f=null,m=!1,g=null,p=null,v=null,x=null,_=null,y=null,R=null,C=new ee(0,0,0),L=0,N=!1,E=null,M=null,A=null,O=null,U=null,J.set(0,0,o.canvas.width,o.canvas.height),H.set(0,0,o.canvas.width,o.canvas.height),i.reset(),r.reset(),s.reset()}return{buffers:{color:i,depth:r,stencil:s},enable:G,disable:j,bindFramebuffer:nt,drawBuffers:q,useProgram:rt,setBlending:Rt,setMaterial:yt,setFlipSided:at,setCullFace:st,setLineWidth:Zt,setPolygonOffset:Tt,setScissorTest:Ht,activeTexture:P,bindTexture:w,unbindTexture:tt,compressedTexImage2D:ct,compressedTexImage3D:mt,texImage2D:kt,texImage3D:re,updateUBOMapping:$t,uniformBlockBinding:te,texStorage2D:jt,texStorage3D:At,texSubImage2D:lt,texSubImage3D:Ot,compressedTexSubImage2D:gt,compressedTexSubImage3D:It,scissor:Kt,viewport:zt,reset:pe}}function Pl(o,t,e,n){const i=gv(n);switch(e){case _c:return o*t;case Sc:return o*t;case Ec:return o*t*2;case ha:return o*t/i.components*i.byteLength;case ua:return o*t/i.components*i.byteLength;case wc:return o*t*2/i.components*i.byteLength;case da:return o*t*2/i.components*i.byteLength;case Mc:return o*t*3/i.components*i.byteLength;case an:return o*t*4/i.components*i.byteLength;case fa:return o*t*4/i.components*i.byteLength;case us:case ds:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case fs:case ps:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case wo:case To:return Math.max(o,16)*Math.max(t,8)/4;case Eo:case Ao:return Math.max(o,8)*Math.max(t,8)/2;case bo:case Ro:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case Co:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case Po:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case Lo:return Math.floor((o+4)/5)*Math.floor((t+3)/4)*16;case Io:return Math.floor((o+4)/5)*Math.floor((t+4)/5)*16;case No:return Math.floor((o+5)/6)*Math.floor((t+4)/5)*16;case Do:return Math.floor((o+5)/6)*Math.floor((t+5)/6)*16;case Uo:return Math.floor((o+7)/8)*Math.floor((t+4)/5)*16;case Bo:return Math.floor((o+7)/8)*Math.floor((t+5)/6)*16;case Fo:return Math.floor((o+7)/8)*Math.floor((t+7)/8)*16;case Oo:return Math.floor((o+9)/10)*Math.floor((t+4)/5)*16;case zo:return Math.floor((o+9)/10)*Math.floor((t+5)/6)*16;case Vo:return Math.floor((o+9)/10)*Math.floor((t+7)/8)*16;case ko:return Math.floor((o+9)/10)*Math.floor((t+9)/10)*16;case Ho:return Math.floor((o+11)/12)*Math.floor((t+9)/10)*16;case Go:return Math.floor((o+11)/12)*Math.floor((t+11)/12)*16;case ms:case Wo:case Xo:return Math.ceil(o/4)*Math.ceil(t/4)*16;case Ac:case qo:return Math.ceil(o/4)*Math.ceil(t/4)*8;case Yo:case Ko:return Math.ceil(o/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function gv(o){switch(o){case Vn:case gc:return{byteLength:1,components:1};case Mr:case xc:case Rr:return{byteLength:2,components:1};case la:case ca:return{byteLength:2,components:4};case vi:case aa:case gn:return{byteLength:4,components:1};case yc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}function xv(o,t,e,n,i,r,s){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Xt,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(P,w){return f?new OffscreenCanvas(P,w):wr("canvas")}function g(P,w,tt){let ct=1;const mt=Ht(P);if((mt.width>tt||mt.height>tt)&&(ct=tt/Math.max(mt.width,mt.height)),ct<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const lt=Math.floor(ct*mt.width),Ot=Math.floor(ct*mt.height);h===void 0&&(h=m(lt,Ot));const gt=w?m(lt,Ot):h;return gt.width=lt,gt.height=Ot,gt.getContext("2d").drawImage(P,0,0,lt,Ot),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+mt.width+"x"+mt.height+") to ("+lt+"x"+Ot+")."),gt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+mt.width+"x"+mt.height+")."),P;return P}function p(P){return P.generateMipmaps&&P.minFilter!==Ze&&P.minFilter!==nn}function v(P){o.generateMipmap(P)}function x(P,w,tt,ct,mt=!1){if(P!==null){if(o[P]!==void 0)return o[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let lt=w;if(w===o.RED&&(tt===o.FLOAT&&(lt=o.R32F),tt===o.HALF_FLOAT&&(lt=o.R16F),tt===o.UNSIGNED_BYTE&&(lt=o.R8)),w===o.RED_INTEGER&&(tt===o.UNSIGNED_BYTE&&(lt=o.R8UI),tt===o.UNSIGNED_SHORT&&(lt=o.R16UI),tt===o.UNSIGNED_INT&&(lt=o.R32UI),tt===o.BYTE&&(lt=o.R8I),tt===o.SHORT&&(lt=o.R16I),tt===o.INT&&(lt=o.R32I)),w===o.RG&&(tt===o.FLOAT&&(lt=o.RG32F),tt===o.HALF_FLOAT&&(lt=o.RG16F),tt===o.UNSIGNED_BYTE&&(lt=o.RG8)),w===o.RG_INTEGER&&(tt===o.UNSIGNED_BYTE&&(lt=o.RG8UI),tt===o.UNSIGNED_SHORT&&(lt=o.RG16UI),tt===o.UNSIGNED_INT&&(lt=o.RG32UI),tt===o.BYTE&&(lt=o.RG8I),tt===o.SHORT&&(lt=o.RG16I),tt===o.INT&&(lt=o.RG32I)),w===o.RGB&&tt===o.UNSIGNED_INT_5_9_9_9_REV&&(lt=o.RGB9_E5),w===o.RGBA){const Ot=mt?ys:ve.getTransfer(ct);tt===o.FLOAT&&(lt=o.RGBA32F),tt===o.HALF_FLOAT&&(lt=o.RGBA16F),tt===o.UNSIGNED_BYTE&&(lt=Ot===Ae?o.SRGB8_ALPHA8:o.RGBA8),tt===o.UNSIGNED_SHORT_4_4_4_4&&(lt=o.RGBA4),tt===o.UNSIGNED_SHORT_5_5_5_1&&(lt=o.RGB5_A1)}return(lt===o.R16F||lt===o.R32F||lt===o.RG16F||lt===o.RG32F||lt===o.RGBA16F||lt===o.RGBA32F)&&t.get("EXT_color_buffer_float"),lt}function _(P,w){let tt;return P?w===null||w===vi||w===Xi?tt=o.DEPTH24_STENCIL8:w===gn?tt=o.DEPTH32F_STENCIL8:w===Mr&&(tt=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===vi||w===Xi?tt=o.DEPTH_COMPONENT24:w===gn?tt=o.DEPTH_COMPONENT32F:w===Mr&&(tt=o.DEPTH_COMPONENT16),tt}function y(P,w){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==Ze&&P.minFilter!==nn?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function R(P){const w=P.target;w.removeEventListener("dispose",R),L(w),w.isVideoTexture&&u.delete(w)}function C(P){const w=P.target;w.removeEventListener("dispose",C),E(w)}function L(P){const w=n.get(P);if(w.__webglInit===void 0)return;const tt=P.source,ct=d.get(tt);if(ct){const mt=ct[w.__cacheKey];mt.usedTimes--,mt.usedTimes===0&&N(P),Object.keys(ct).length===0&&d.delete(tt)}n.remove(P)}function N(P){const w=n.get(P);o.deleteTexture(w.__webglTexture);const tt=P.source,ct=d.get(tt);delete ct[w.__cacheKey],s.memory.textures--}function E(P){const w=n.get(P);if(P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let ct=0;ct<6;ct++){if(Array.isArray(w.__webglFramebuffer[ct]))for(let mt=0;mt<w.__webglFramebuffer[ct].length;mt++)o.deleteFramebuffer(w.__webglFramebuffer[ct][mt]);else o.deleteFramebuffer(w.__webglFramebuffer[ct]);w.__webglDepthbuffer&&o.deleteRenderbuffer(w.__webglDepthbuffer[ct])}else{if(Array.isArray(w.__webglFramebuffer))for(let ct=0;ct<w.__webglFramebuffer.length;ct++)o.deleteFramebuffer(w.__webglFramebuffer[ct]);else o.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&o.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&o.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ct=0;ct<w.__webglColorRenderbuffer.length;ct++)w.__webglColorRenderbuffer[ct]&&o.deleteRenderbuffer(w.__webglColorRenderbuffer[ct]);w.__webglDepthRenderbuffer&&o.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const tt=P.textures;for(let ct=0,mt=tt.length;ct<mt;ct++){const lt=n.get(tt[ct]);lt.__webglTexture&&(o.deleteTexture(lt.__webglTexture),s.memory.textures--),n.remove(tt[ct])}n.remove(P)}let M=0;function A(){M=0}function O(){const P=M;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),M+=1,P}function U(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function Z(P,w){const tt=n.get(P);if(P.isVideoTexture&&Zt(P),P.isRenderTargetTexture===!1&&P.version>0&&tt.__version!==P.version){const ct=P.image;if(ct===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ct.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{H(tt,P,w);return}}e.bindTexture(o.TEXTURE_2D,tt.__webglTexture,o.TEXTURE0+w)}function X(P,w){const tt=n.get(P);if(P.version>0&&tt.__version!==P.version){H(tt,P,w);return}e.bindTexture(o.TEXTURE_2D_ARRAY,tt.__webglTexture,o.TEXTURE0+w)}function $(P,w){const tt=n.get(P);if(P.version>0&&tt.__version!==P.version){H(tt,P,w);return}e.bindTexture(o.TEXTURE_3D,tt.__webglTexture,o.TEXTURE0+w)}function z(P,w){const tt=n.get(P);if(P.version>0&&tt.__version!==P.version){T(tt,P,w);return}e.bindTexture(o.TEXTURE_CUBE_MAP,tt.__webglTexture,o.TEXTURE0+w)}const I={[Wi]:o.REPEAT,[Qn]:o.CLAMP_TO_EDGE,[xs]:o.MIRRORED_REPEAT},et={[Ze]:o.NEAREST,[vc]:o.NEAREST_MIPMAP_NEAREST,[fr]:o.NEAREST_MIPMAP_LINEAR,[nn]:o.LINEAR,[hs]:o.LINEAR_MIPMAP_NEAREST,[Fn]:o.LINEAR_MIPMAP_LINEAR},Q={[jh]:o.NEVER,[nu]:o.ALWAYS,[Jh]:o.LESS,[Rc]:o.LEQUAL,[$h]:o.EQUAL,[eu]:o.GEQUAL,[Qh]:o.GREATER,[tu]:o.NOTEQUAL};function B(P,w){if(w.type===gn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===nn||w.magFilter===hs||w.magFilter===fr||w.magFilter===Fn||w.minFilter===nn||w.minFilter===hs||w.minFilter===fr||w.minFilter===Fn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(P,o.TEXTURE_WRAP_S,I[w.wrapS]),o.texParameteri(P,o.TEXTURE_WRAP_T,I[w.wrapT]),(P===o.TEXTURE_3D||P===o.TEXTURE_2D_ARRAY)&&o.texParameteri(P,o.TEXTURE_WRAP_R,I[w.wrapR]),o.texParameteri(P,o.TEXTURE_MAG_FILTER,et[w.magFilter]),o.texParameteri(P,o.TEXTURE_MIN_FILTER,et[w.minFilter]),w.compareFunction&&(o.texParameteri(P,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(P,o.TEXTURE_COMPARE_FUNC,Q[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Ze||w.minFilter!==fr&&w.minFilter!==Fn||w.type===gn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const tt=t.get("EXT_texture_filter_anisotropic");o.texParameterf(P,tt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function J(P,w){let tt=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",R));const ct=w.source;let mt=d.get(ct);mt===void 0&&(mt={},d.set(ct,mt));const lt=U(w);if(lt!==P.__cacheKey){mt[lt]===void 0&&(mt[lt]={texture:o.createTexture(),usedTimes:0},s.memory.textures++,tt=!0),mt[lt].usedTimes++;const Ot=mt[P.__cacheKey];Ot!==void 0&&(mt[P.__cacheKey].usedTimes--,Ot.usedTimes===0&&N(w)),P.__cacheKey=lt,P.__webglTexture=mt[lt].texture}return tt}function H(P,w,tt){let ct=o.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ct=o.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ct=o.TEXTURE_3D);const mt=J(P,w),lt=w.source;e.bindTexture(ct,P.__webglTexture,o.TEXTURE0+tt);const Ot=n.get(lt);if(lt.version!==Ot.__version||mt===!0){e.activeTexture(o.TEXTURE0+tt);const gt=ve.getPrimaries(ve.workingColorSpace),It=w.colorSpace===jn?null:ve.getPrimaries(w.colorSpace),jt=w.colorSpace===jn||gt===It?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,w.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,w.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt);let At=g(w.image,!1,i.maxTextureSize);At=Tt(w,At);const kt=r.convert(w.format,w.colorSpace),re=r.convert(w.type);let Kt=x(w.internalFormat,kt,re,w.colorSpace,w.isVideoTexture);B(ct,w);let zt;const $t=w.mipmaps,te=w.isVideoTexture!==!0,pe=Ot.__version===void 0||mt===!0,Y=lt.dataReady,St=y(w,At);if(w.isDepthTexture)Kt=_(w.format===qi,w.type),pe&&(te?e.texStorage2D(o.TEXTURE_2D,1,Kt,At.width,At.height):e.texImage2D(o.TEXTURE_2D,0,Kt,At.width,At.height,0,kt,re,null));else if(w.isDataTexture)if($t.length>0){te&&pe&&e.texStorage2D(o.TEXTURE_2D,St,Kt,$t[0].width,$t[0].height);for(let ut=0,pt=$t.length;ut<pt;ut++)zt=$t[ut],te?Y&&e.texSubImage2D(o.TEXTURE_2D,ut,0,0,zt.width,zt.height,kt,re,zt.data):e.texImage2D(o.TEXTURE_2D,ut,Kt,zt.width,zt.height,0,kt,re,zt.data);w.generateMipmaps=!1}else te?(pe&&e.texStorage2D(o.TEXTURE_2D,St,Kt,At.width,At.height),Y&&e.texSubImage2D(o.TEXTURE_2D,0,0,0,At.width,At.height,kt,re,At.data)):e.texImage2D(o.TEXTURE_2D,0,Kt,At.width,At.height,0,kt,re,At.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){te&&pe&&e.texStorage3D(o.TEXTURE_2D_ARRAY,St,Kt,$t[0].width,$t[0].height,At.depth);for(let ut=0,pt=$t.length;ut<pt;ut++)if(zt=$t[ut],w.format!==an)if(kt!==null)if(te){if(Y)if(w.layerUpdates.size>0){const Et=Pl(zt.width,zt.height,w.format,w.type);for(const Jt of w.layerUpdates){const oe=zt.data.subarray(Jt*Et/zt.data.BYTES_PER_ELEMENT,(Jt+1)*Et/zt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,ut,0,0,Jt,zt.width,zt.height,1,kt,oe,0,0)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,ut,0,0,0,zt.width,zt.height,At.depth,kt,zt.data,0,0)}else e.compressedTexImage3D(o.TEXTURE_2D_ARRAY,ut,Kt,zt.width,zt.height,At.depth,0,zt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else te?Y&&e.texSubImage3D(o.TEXTURE_2D_ARRAY,ut,0,0,0,zt.width,zt.height,At.depth,kt,re,zt.data):e.texImage3D(o.TEXTURE_2D_ARRAY,ut,Kt,zt.width,zt.height,At.depth,0,kt,re,zt.data)}else{te&&pe&&e.texStorage2D(o.TEXTURE_2D,St,Kt,$t[0].width,$t[0].height);for(let ut=0,pt=$t.length;ut<pt;ut++)zt=$t[ut],w.format!==an?kt!==null?te?Y&&e.compressedTexSubImage2D(o.TEXTURE_2D,ut,0,0,zt.width,zt.height,kt,zt.data):e.compressedTexImage2D(o.TEXTURE_2D,ut,Kt,zt.width,zt.height,0,zt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):te?Y&&e.texSubImage2D(o.TEXTURE_2D,ut,0,0,zt.width,zt.height,kt,re,zt.data):e.texImage2D(o.TEXTURE_2D,ut,Kt,zt.width,zt.height,0,kt,re,zt.data)}else if(w.isDataArrayTexture)if(te){if(pe&&e.texStorage3D(o.TEXTURE_2D_ARRAY,St,Kt,At.width,At.height,At.depth),Y)if(w.layerUpdates.size>0){const ut=Pl(At.width,At.height,w.format,w.type);for(const pt of w.layerUpdates){const Et=At.data.subarray(pt*ut/At.data.BYTES_PER_ELEMENT,(pt+1)*ut/At.data.BYTES_PER_ELEMENT);e.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,pt,At.width,At.height,1,kt,re,Et)}w.clearLayerUpdates()}else e.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,At.width,At.height,At.depth,kt,re,At.data)}else e.texImage3D(o.TEXTURE_2D_ARRAY,0,Kt,At.width,At.height,At.depth,0,kt,re,At.data);else if(w.isData3DTexture)te?(pe&&e.texStorage3D(o.TEXTURE_3D,St,Kt,At.width,At.height,At.depth),Y&&e.texSubImage3D(o.TEXTURE_3D,0,0,0,0,At.width,At.height,At.depth,kt,re,At.data)):e.texImage3D(o.TEXTURE_3D,0,Kt,At.width,At.height,At.depth,0,kt,re,At.data);else if(w.isFramebufferTexture){if(pe)if(te)e.texStorage2D(o.TEXTURE_2D,St,Kt,At.width,At.height);else{let ut=At.width,pt=At.height;for(let Et=0;Et<St;Et++)e.texImage2D(o.TEXTURE_2D,Et,Kt,ut,pt,0,kt,re,null),ut>>=1,pt>>=1}}else if($t.length>0){if(te&&pe){const ut=Ht($t[0]);e.texStorage2D(o.TEXTURE_2D,St,Kt,ut.width,ut.height)}for(let ut=0,pt=$t.length;ut<pt;ut++)zt=$t[ut],te?Y&&e.texSubImage2D(o.TEXTURE_2D,ut,0,0,kt,re,zt):e.texImage2D(o.TEXTURE_2D,ut,Kt,kt,re,zt);w.generateMipmaps=!1}else if(te){if(pe){const ut=Ht(At);e.texStorage2D(o.TEXTURE_2D,St,Kt,ut.width,ut.height)}Y&&e.texSubImage2D(o.TEXTURE_2D,0,0,0,kt,re,At)}else e.texImage2D(o.TEXTURE_2D,0,Kt,kt,re,At);p(w)&&v(ct),Ot.__version=lt.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function T(P,w,tt){if(w.image.length!==6)return;const ct=J(P,w),mt=w.source;e.bindTexture(o.TEXTURE_CUBE_MAP,P.__webglTexture,o.TEXTURE0+tt);const lt=n.get(mt);if(mt.version!==lt.__version||ct===!0){e.activeTexture(o.TEXTURE0+tt);const Ot=ve.getPrimaries(ve.workingColorSpace),gt=w.colorSpace===jn?null:ve.getPrimaries(w.colorSpace),It=w.colorSpace===jn||Ot===gt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,w.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,w.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);const jt=w.isCompressedTexture||w.image[0].isCompressedTexture,At=w.image[0]&&w.image[0].isDataTexture,kt=[];for(let pt=0;pt<6;pt++)!jt&&!At?kt[pt]=g(w.image[pt],!0,i.maxCubemapSize):kt[pt]=At?w.image[pt].image:w.image[pt],kt[pt]=Tt(w,kt[pt]);const re=kt[0],Kt=r.convert(w.format,w.colorSpace),zt=r.convert(w.type),$t=x(w.internalFormat,Kt,zt,w.colorSpace),te=w.isVideoTexture!==!0,pe=lt.__version===void 0||ct===!0,Y=mt.dataReady;let St=y(w,re);B(o.TEXTURE_CUBE_MAP,w);let ut;if(jt){te&&pe&&e.texStorage2D(o.TEXTURE_CUBE_MAP,St,$t,re.width,re.height);for(let pt=0;pt<6;pt++){ut=kt[pt].mipmaps;for(let Et=0;Et<ut.length;Et++){const Jt=ut[Et];w.format!==an?Kt!==null?te?Y&&e.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Et,0,0,Jt.width,Jt.height,Kt,Jt.data):e.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Et,$t,Jt.width,Jt.height,0,Jt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):te?Y&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Et,0,0,Jt.width,Jt.height,Kt,zt,Jt.data):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Et,$t,Jt.width,Jt.height,0,Kt,zt,Jt.data)}}}else{if(ut=w.mipmaps,te&&pe){ut.length>0&&St++;const pt=Ht(kt[0]);e.texStorage2D(o.TEXTURE_CUBE_MAP,St,$t,pt.width,pt.height)}for(let pt=0;pt<6;pt++)if(At){te?Y&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,kt[pt].width,kt[pt].height,Kt,zt,kt[pt].data):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,$t,kt[pt].width,kt[pt].height,0,Kt,zt,kt[pt].data);for(let Et=0;Et<ut.length;Et++){const oe=ut[Et].image[pt].image;te?Y&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Et+1,0,0,oe.width,oe.height,Kt,zt,oe.data):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Et+1,$t,oe.width,oe.height,0,Kt,zt,oe.data)}}else{te?Y&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,Kt,zt,kt[pt]):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,$t,Kt,zt,kt[pt]);for(let Et=0;Et<ut.length;Et++){const Jt=ut[Et];te?Y&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Et+1,0,0,Kt,zt,Jt.image[pt]):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Et+1,$t,Kt,zt,Jt.image[pt])}}}p(w)&&v(o.TEXTURE_CUBE_MAP),lt.__version=mt.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function b(P,w,tt,ct,mt,lt){const Ot=r.convert(tt.format,tt.colorSpace),gt=r.convert(tt.type),It=x(tt.internalFormat,Ot,gt,tt.colorSpace);if(!n.get(w).__hasExternalTextures){const At=Math.max(1,w.width>>lt),kt=Math.max(1,w.height>>lt);mt===o.TEXTURE_3D||mt===o.TEXTURE_2D_ARRAY?e.texImage3D(mt,lt,It,At,kt,w.depth,0,Ot,gt,null):e.texImage2D(mt,lt,It,At,kt,0,Ot,gt,null)}e.bindFramebuffer(o.FRAMEBUFFER,P),st(w)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,ct,mt,n.get(tt).__webglTexture,0,at(w)):(mt===o.TEXTURE_2D||mt>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&mt<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,ct,mt,n.get(tt).__webglTexture,lt),e.bindFramebuffer(o.FRAMEBUFFER,null)}function G(P,w,tt){if(o.bindRenderbuffer(o.RENDERBUFFER,P),w.depthBuffer){const ct=w.depthTexture,mt=ct&&ct.isDepthTexture?ct.type:null,lt=_(w.stencilBuffer,mt),Ot=w.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,gt=at(w);st(w)?a.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,gt,lt,w.width,w.height):tt?o.renderbufferStorageMultisample(o.RENDERBUFFER,gt,lt,w.width,w.height):o.renderbufferStorage(o.RENDERBUFFER,lt,w.width,w.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Ot,o.RENDERBUFFER,P)}else{const ct=w.textures;for(let mt=0;mt<ct.length;mt++){const lt=ct[mt],Ot=r.convert(lt.format,lt.colorSpace),gt=r.convert(lt.type),It=x(lt.internalFormat,Ot,gt,lt.colorSpace),jt=at(w);tt&&st(w)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,jt,It,w.width,w.height):st(w)?a.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,jt,It,w.width,w.height):o.renderbufferStorage(o.RENDERBUFFER,It,w.width,w.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function j(P,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(o.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),Z(w.depthTexture,0);const ct=n.get(w.depthTexture).__webglTexture,mt=at(w);if(w.depthTexture.format===zi)st(w)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,ct,0,mt):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,ct,0);else if(w.depthTexture.format===qi)st(w)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,ct,0,mt):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,ct,0);else throw new Error("Unknown depthTexture format")}function nt(P){const w=n.get(P),tt=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!w.__autoAllocateDepthBuffer){if(tt)throw new Error("target.depthTexture not supported in Cube render targets");j(w.__webglFramebuffer,P)}else if(tt){w.__webglDepthbuffer=[];for(let ct=0;ct<6;ct++)e.bindFramebuffer(o.FRAMEBUFFER,w.__webglFramebuffer[ct]),w.__webglDepthbuffer[ct]=o.createRenderbuffer(),G(w.__webglDepthbuffer[ct],P,!1)}else e.bindFramebuffer(o.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=o.createRenderbuffer(),G(w.__webglDepthbuffer,P,!1);e.bindFramebuffer(o.FRAMEBUFFER,null)}function q(P,w,tt){const ct=n.get(P);w!==void 0&&b(ct.__webglFramebuffer,P,P.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),tt!==void 0&&nt(P)}function rt(P){const w=P.texture,tt=n.get(P),ct=n.get(w);P.addEventListener("dispose",C);const mt=P.textures,lt=P.isWebGLCubeRenderTarget===!0,Ot=mt.length>1;if(Ot||(ct.__webglTexture===void 0&&(ct.__webglTexture=o.createTexture()),ct.__version=w.version,s.memory.textures++),lt){tt.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(w.mipmaps&&w.mipmaps.length>0){tt.__webglFramebuffer[gt]=[];for(let It=0;It<w.mipmaps.length;It++)tt.__webglFramebuffer[gt][It]=o.createFramebuffer()}else tt.__webglFramebuffer[gt]=o.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){tt.__webglFramebuffer=[];for(let gt=0;gt<w.mipmaps.length;gt++)tt.__webglFramebuffer[gt]=o.createFramebuffer()}else tt.__webglFramebuffer=o.createFramebuffer();if(Ot)for(let gt=0,It=mt.length;gt<It;gt++){const jt=n.get(mt[gt]);jt.__webglTexture===void 0&&(jt.__webglTexture=o.createTexture(),s.memory.textures++)}if(P.samples>0&&st(P)===!1){tt.__webglMultisampledFramebuffer=o.createFramebuffer(),tt.__webglColorRenderbuffer=[],e.bindFramebuffer(o.FRAMEBUFFER,tt.__webglMultisampledFramebuffer);for(let gt=0;gt<mt.length;gt++){const It=mt[gt];tt.__webglColorRenderbuffer[gt]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,tt.__webglColorRenderbuffer[gt]);const jt=r.convert(It.format,It.colorSpace),At=r.convert(It.type),kt=x(It.internalFormat,jt,At,It.colorSpace,P.isXRRenderTarget===!0),re=at(P);o.renderbufferStorageMultisample(o.RENDERBUFFER,re,kt,P.width,P.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+gt,o.RENDERBUFFER,tt.__webglColorRenderbuffer[gt])}o.bindRenderbuffer(o.RENDERBUFFER,null),P.depthBuffer&&(tt.__webglDepthRenderbuffer=o.createRenderbuffer(),G(tt.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(o.FRAMEBUFFER,null)}}if(lt){e.bindTexture(o.TEXTURE_CUBE_MAP,ct.__webglTexture),B(o.TEXTURE_CUBE_MAP,w);for(let gt=0;gt<6;gt++)if(w.mipmaps&&w.mipmaps.length>0)for(let It=0;It<w.mipmaps.length;It++)b(tt.__webglFramebuffer[gt][It],P,w,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,It);else b(tt.__webglFramebuffer[gt],P,w,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);p(w)&&v(o.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ot){for(let gt=0,It=mt.length;gt<It;gt++){const jt=mt[gt],At=n.get(jt);e.bindTexture(o.TEXTURE_2D,At.__webglTexture),B(o.TEXTURE_2D,jt),b(tt.__webglFramebuffer,P,jt,o.COLOR_ATTACHMENT0+gt,o.TEXTURE_2D,0),p(jt)&&v(o.TEXTURE_2D)}e.unbindTexture()}else{let gt=o.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(gt=P.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),e.bindTexture(gt,ct.__webglTexture),B(gt,w),w.mipmaps&&w.mipmaps.length>0)for(let It=0;It<w.mipmaps.length;It++)b(tt.__webglFramebuffer[It],P,w,o.COLOR_ATTACHMENT0,gt,It);else b(tt.__webglFramebuffer,P,w,o.COLOR_ATTACHMENT0,gt,0);p(w)&&v(gt),e.unbindTexture()}P.depthBuffer&&nt(P)}function ft(P){const w=P.textures;for(let tt=0,ct=w.length;tt<ct;tt++){const mt=w[tt];if(p(mt)){const lt=P.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:o.TEXTURE_2D,Ot=n.get(mt).__webglTexture;e.bindTexture(lt,Ot),v(lt),e.unbindTexture()}}}const D=[],Rt=[];function yt(P){if(P.samples>0){if(st(P)===!1){const w=P.textures,tt=P.width,ct=P.height;let mt=o.COLOR_BUFFER_BIT;const lt=P.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Ot=n.get(P),gt=w.length>1;if(gt)for(let It=0;It<w.length;It++)e.bindFramebuffer(o.FRAMEBUFFER,Ot.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+It,o.RENDERBUFFER,null),e.bindFramebuffer(o.FRAMEBUFFER,Ot.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+It,o.TEXTURE_2D,null,0);e.bindFramebuffer(o.READ_FRAMEBUFFER,Ot.__webglMultisampledFramebuffer),e.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ot.__webglFramebuffer);for(let It=0;It<w.length;It++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(mt|=o.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(mt|=o.STENCIL_BUFFER_BIT)),gt){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Ot.__webglColorRenderbuffer[It]);const jt=n.get(w[It]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,jt,0)}o.blitFramebuffer(0,0,tt,ct,0,0,tt,ct,mt,o.NEAREST),l===!0&&(D.length=0,Rt.length=0,D.push(o.COLOR_ATTACHMENT0+It),P.depthBuffer&&P.resolveDepthBuffer===!1&&(D.push(lt),Rt.push(lt),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,Rt)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,D))}if(e.bindFramebuffer(o.READ_FRAMEBUFFER,null),e.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),gt)for(let It=0;It<w.length;It++){e.bindFramebuffer(o.FRAMEBUFFER,Ot.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+It,o.RENDERBUFFER,Ot.__webglColorRenderbuffer[It]);const jt=n.get(w[It]).__webglTexture;e.bindFramebuffer(o.FRAMEBUFFER,Ot.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+It,o.TEXTURE_2D,jt,0)}e.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ot.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const w=P.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[w])}}}function at(P){return Math.min(i.maxSamples,P.samples)}function st(P){const w=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Zt(P){const w=s.render.frame;u.get(P)!==w&&(u.set(P,w),P.update())}function Tt(P,w){const tt=P.colorSpace,ct=P.format,mt=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||tt!==Ge&&tt!==jn&&(ve.getTransfer(tt)===Ae?(ct!==an||mt!==Vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",tt)),w}function Ht(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=A,this.setTexture2D=Z,this.setTexture2DArray=X,this.setTexture3D=$,this.setTextureCube=z,this.rebindTextures=q,this.setupRenderTarget=rt,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=yt,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=b,this.useMultisampledRTT=st}function yv(o,t){function e(n,i=jn){let r;const s=ve.getTransfer(i);if(n===Vn)return o.UNSIGNED_BYTE;if(n===la)return o.UNSIGNED_SHORT_4_4_4_4;if(n===ca)return o.UNSIGNED_SHORT_5_5_5_1;if(n===yc)return o.UNSIGNED_INT_5_9_9_9_REV;if(n===gc)return o.BYTE;if(n===xc)return o.SHORT;if(n===Mr)return o.UNSIGNED_SHORT;if(n===aa)return o.INT;if(n===vi)return o.UNSIGNED_INT;if(n===gn)return o.FLOAT;if(n===Rr)return o.HALF_FLOAT;if(n===_c)return o.ALPHA;if(n===Mc)return o.RGB;if(n===an)return o.RGBA;if(n===Sc)return o.LUMINANCE;if(n===Ec)return o.LUMINANCE_ALPHA;if(n===zi)return o.DEPTH_COMPONENT;if(n===qi)return o.DEPTH_STENCIL;if(n===ha)return o.RED;if(n===ua)return o.RED_INTEGER;if(n===wc)return o.RG;if(n===da)return o.RG_INTEGER;if(n===fa)return o.RGBA_INTEGER;if(n===us||n===ds||n===fs||n===ps)if(s===Ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===us)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ds)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===fs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ps)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===us)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ds)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===fs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ps)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Eo||n===wo||n===Ao||n===To)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Eo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===wo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ao)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===To)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===bo||n===Ro||n===Co)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===bo||n===Ro)return s===Ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Co)return s===Ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Po||n===Lo||n===Io||n===No||n===Do||n===Uo||n===Bo||n===Fo||n===Oo||n===zo||n===Vo||n===ko||n===Ho||n===Go)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Po)return s===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Lo)return s===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Io)return s===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===No)return s===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Do)return s===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Uo)return s===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Bo)return s===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Fo)return s===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Oo)return s===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===zo)return s===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Vo)return s===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ko)return s===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ho)return s===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Go)return s===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ms||n===Wo||n===Xo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ms)return s===Ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Wo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Xo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ac||n===qo||n===Yo||n===Ko)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ms)return r.COMPRESSED_RED_RGTC1_EXT;if(n===qo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Yo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ko)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xi?o.UNSIGNED_INT_24_8:o[n]!==void 0?o[n]:null}return{convert:e}}class _v extends Ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Mn extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Mv={type:"move"};class oo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,s=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){s=!0;for(const g of t.hand.values()){const p=e.getJointPose(g,n),v=this._getHandJoint(c,g);p!==null&&(v.matrix.fromArray(p.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=p.radius),v.visible=p!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Mv)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Mn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Sv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ev=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class wv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Be,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ri({vertexShader:Sv,fragmentShader:Ev,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ne(new Zi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Av extends Qi{constructor(t,e){super();const n=this;let i=null,r=1,s=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,m=null;const g=new wv,p=e.getContextAttributes();let v=null,x=null;const _=[],y=[],R=new Xt;let C=null;const L=new Ke;L.layers.enable(1),L.viewport=new ge;const N=new Ke;N.layers.enable(2),N.viewport=new ge;const E=[L,N],M=new _v;M.layers.enable(1),M.layers.enable(2);let A=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(T){let b=_[T];return b===void 0&&(b=new oo,_[T]=b),b.getTargetRaySpace()},this.getControllerGrip=function(T){let b=_[T];return b===void 0&&(b=new oo,_[T]=b),b.getGripSpace()},this.getHand=function(T){let b=_[T];return b===void 0&&(b=new oo,_[T]=b),b.getHandSpace()};function U(T){const b=y.indexOf(T.inputSource);if(b===-1)return;const G=_[b];G!==void 0&&(G.update(T.inputSource,T.frame,c||s),G.dispatchEvent({type:T.type,data:T.inputSource}))}function Z(){i.removeEventListener("select",U),i.removeEventListener("selectstart",U),i.removeEventListener("selectend",U),i.removeEventListener("squeeze",U),i.removeEventListener("squeezestart",U),i.removeEventListener("squeezeend",U),i.removeEventListener("end",Z),i.removeEventListener("inputsourceschange",X);for(let T=0;T<_.length;T++){const b=y[T];b!==null&&(y[T]=null,_[T].disconnect(b))}A=null,O=null,g.reset(),t.setRenderTarget(v),f=null,d=null,h=null,i=null,x=null,H.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(T){r=T,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(T){a=T,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(T){c=T},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(T){if(i=T,i!==null){if(v=t.getRenderTarget(),i.addEventListener("select",U),i.addEventListener("selectstart",U),i.addEventListener("selectend",U),i.addEventListener("squeeze",U),i.addEventListener("squeezestart",U),i.addEventListener("squeezeend",U),i.addEventListener("end",Z),i.addEventListener("inputsourceschange",X),p.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(R),i.renderState.layers===void 0){const b={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,b),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new ii(f.framebufferWidth,f.framebufferHeight,{format:an,type:Vn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let b=null,G=null,j=null;p.depth&&(j=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,b=p.stencil?qi:zi,G=p.stencil?Xi:vi);const nt={colorFormat:e.RGBA8,depthFormat:j,scaleFactor:r};h=new XRWebGLBinding(i,e),d=h.createProjectionLayer(nt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),x=new ii(d.textureWidth,d.textureHeight,{format:an,type:Vn,depthTexture:new zc(d.textureWidth,d.textureHeight,G,void 0,void 0,void 0,void 0,void 0,void 0,b),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await i.requestReferenceSpace(a),H.setContext(i),H.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function X(T){for(let b=0;b<T.removed.length;b++){const G=T.removed[b],j=y.indexOf(G);j>=0&&(y[j]=null,_[j].disconnect(G))}for(let b=0;b<T.added.length;b++){const G=T.added[b];let j=y.indexOf(G);if(j===-1){for(let q=0;q<_.length;q++)if(q>=y.length){y.push(G),j=q;break}else if(y[q]===null){y[q]=G,j=q;break}if(j===-1)break}const nt=_[j];nt&&nt.connect(G)}}const $=new k,z=new k;function I(T,b,G){$.setFromMatrixPosition(b.matrixWorld),z.setFromMatrixPosition(G.matrixWorld);const j=$.distanceTo(z),nt=b.projectionMatrix.elements,q=G.projectionMatrix.elements,rt=nt[14]/(nt[10]-1),ft=nt[14]/(nt[10]+1),D=(nt[9]+1)/nt[5],Rt=(nt[9]-1)/nt[5],yt=(nt[8]-1)/nt[0],at=(q[8]+1)/q[0],st=rt*yt,Zt=rt*at,Tt=j/(-yt+at),Ht=Tt*-yt;b.matrixWorld.decompose(T.position,T.quaternion,T.scale),T.translateX(Ht),T.translateZ(Tt),T.matrixWorld.compose(T.position,T.quaternion,T.scale),T.matrixWorldInverse.copy(T.matrixWorld).invert();const P=rt+Tt,w=ft+Tt,tt=st-Ht,ct=Zt+(j-Ht),mt=D*ft/w*P,lt=Rt*ft/w*P;T.projectionMatrix.makePerspective(tt,ct,mt,lt,P,w),T.projectionMatrixInverse.copy(T.projectionMatrix).invert()}function et(T,b){b===null?T.matrixWorld.copy(T.matrix):T.matrixWorld.multiplyMatrices(b.matrixWorld,T.matrix),T.matrixWorldInverse.copy(T.matrixWorld).invert()}this.updateCamera=function(T){if(i===null)return;g.texture!==null&&(T.near=g.depthNear,T.far=g.depthFar),M.near=N.near=L.near=T.near,M.far=N.far=L.far=T.far,(A!==M.near||O!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),A=M.near,O=M.far,L.near=A,L.far=O,N.near=A,N.far=O,L.updateProjectionMatrix(),N.updateProjectionMatrix(),T.updateProjectionMatrix());const b=T.parent,G=M.cameras;et(M,b);for(let j=0;j<G.length;j++)et(G[j],b);G.length===2?I(M,L,N):M.projectionMatrix.copy(L.projectionMatrix),Q(T,M,b)};function Q(T,b,G){G===null?T.matrix.copy(b.matrixWorld):(T.matrix.copy(G.matrixWorld),T.matrix.invert(),T.matrix.multiply(b.matrixWorld)),T.matrix.decompose(T.position,T.quaternion,T.scale),T.updateMatrixWorld(!0),T.projectionMatrix.copy(b.projectionMatrix),T.projectionMatrixInverse.copy(b.projectionMatrixInverse),T.isPerspectiveCamera&&(T.fov=Yi*2*Math.atan(1/T.projectionMatrix.elements[5]),T.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(T){l=T,d!==null&&(d.fixedFoveation=T),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=T)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(M)};let B=null;function J(T,b){if(u=b.getViewerPose(c||s),m=b,u!==null){const G=u.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let j=!1;G.length!==M.cameras.length&&(M.cameras.length=0,j=!0);for(let q=0;q<G.length;q++){const rt=G[q];let ft=null;if(f!==null)ft=f.getViewport(rt);else{const Rt=h.getViewSubImage(d,rt);ft=Rt.viewport,q===0&&(t.setRenderTargetTextures(x,Rt.colorTexture,d.ignoreDepthValues?void 0:Rt.depthStencilTexture),t.setRenderTarget(x))}let D=E[q];D===void 0&&(D=new Ke,D.layers.enable(q),D.viewport=new ge,E[q]=D),D.matrix.fromArray(rt.transform.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale),D.projectionMatrix.fromArray(rt.projectionMatrix),D.projectionMatrixInverse.copy(D.projectionMatrix).invert(),D.viewport.set(ft.x,ft.y,ft.width,ft.height),q===0&&(M.matrix.copy(D.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),j===!0&&M.cameras.push(D)}const nt=i.enabledFeatures;if(nt&&nt.includes("depth-sensing")){const q=h.getDepthInformation(G[0]);q&&q.isValid&&q.texture&&g.init(t,q,i.renderState)}}for(let G=0;G<_.length;G++){const j=y[G],nt=_[G];j!==null&&nt!==void 0&&nt.update(j,b,c||s)}B&&B(T,b),b.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:b}),m=null}const H=new Oc;H.setAnimationLoop(J),this.setAnimationLoop=function(T){B=T},this.dispose=function(){}}}const hi=new xn,Tv=new se;function bv(o,t){function e(p,v){p.matrixAutoUpdate===!0&&p.updateMatrix(),v.value.copy(p.matrix)}function n(p,v){v.color.getRGB(p.fogColor.value,Uc(o)),v.isFog?(p.fogNear.value=v.near,p.fogFar.value=v.far):v.isFogExp2&&(p.fogDensity.value=v.density)}function i(p,v,x,_,y){v.isMeshBasicMaterial||v.isMeshLambertMaterial?r(p,v):v.isMeshToonMaterial?(r(p,v),h(p,v)):v.isMeshPhongMaterial?(r(p,v),u(p,v)):v.isMeshStandardMaterial?(r(p,v),d(p,v),v.isMeshPhysicalMaterial&&f(p,v,y)):v.isMeshMatcapMaterial?(r(p,v),m(p,v)):v.isMeshDepthMaterial?r(p,v):v.isMeshDistanceMaterial?(r(p,v),g(p,v)):v.isMeshNormalMaterial?r(p,v):v.isLineBasicMaterial?(s(p,v),v.isLineDashedMaterial&&a(p,v)):v.isPointsMaterial?l(p,v,x,_):v.isSpriteMaterial?c(p,v):v.isShadowMaterial?(p.color.value.copy(v.color),p.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function r(p,v){p.opacity.value=v.opacity,v.color&&p.diffuse.value.copy(v.color),v.emissive&&p.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(p.map.value=v.map,e(v.map,p.mapTransform)),v.alphaMap&&(p.alphaMap.value=v.alphaMap,e(v.alphaMap,p.alphaMapTransform)),v.bumpMap&&(p.bumpMap.value=v.bumpMap,e(v.bumpMap,p.bumpMapTransform),p.bumpScale.value=v.bumpScale,v.side===$e&&(p.bumpScale.value*=-1)),v.normalMap&&(p.normalMap.value=v.normalMap,e(v.normalMap,p.normalMapTransform),p.normalScale.value.copy(v.normalScale),v.side===$e&&p.normalScale.value.negate()),v.displacementMap&&(p.displacementMap.value=v.displacementMap,e(v.displacementMap,p.displacementMapTransform),p.displacementScale.value=v.displacementScale,p.displacementBias.value=v.displacementBias),v.emissiveMap&&(p.emissiveMap.value=v.emissiveMap,e(v.emissiveMap,p.emissiveMapTransform)),v.specularMap&&(p.specularMap.value=v.specularMap,e(v.specularMap,p.specularMapTransform)),v.alphaTest>0&&(p.alphaTest.value=v.alphaTest);const x=t.get(v),_=x.envMap,y=x.envMapRotation;_&&(p.envMap.value=_,hi.copy(y),hi.x*=-1,hi.y*=-1,hi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(hi.y*=-1,hi.z*=-1),p.envMapRotation.value.setFromMatrix4(Tv.makeRotationFromEuler(hi)),p.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=v.reflectivity,p.ior.value=v.ior,p.refractionRatio.value=v.refractionRatio),v.lightMap&&(p.lightMap.value=v.lightMap,p.lightMapIntensity.value=v.lightMapIntensity,e(v.lightMap,p.lightMapTransform)),v.aoMap&&(p.aoMap.value=v.aoMap,p.aoMapIntensity.value=v.aoMapIntensity,e(v.aoMap,p.aoMapTransform))}function s(p,v){p.diffuse.value.copy(v.color),p.opacity.value=v.opacity,v.map&&(p.map.value=v.map,e(v.map,p.mapTransform))}function a(p,v){p.dashSize.value=v.dashSize,p.totalSize.value=v.dashSize+v.gapSize,p.scale.value=v.scale}function l(p,v,x,_){p.diffuse.value.copy(v.color),p.opacity.value=v.opacity,p.size.value=v.size*x,p.scale.value=_*.5,v.map&&(p.map.value=v.map,e(v.map,p.uvTransform)),v.alphaMap&&(p.alphaMap.value=v.alphaMap,e(v.alphaMap,p.alphaMapTransform)),v.alphaTest>0&&(p.alphaTest.value=v.alphaTest)}function c(p,v){p.diffuse.value.copy(v.color),p.opacity.value=v.opacity,p.rotation.value=v.rotation,v.map&&(p.map.value=v.map,e(v.map,p.mapTransform)),v.alphaMap&&(p.alphaMap.value=v.alphaMap,e(v.alphaMap,p.alphaMapTransform)),v.alphaTest>0&&(p.alphaTest.value=v.alphaTest)}function u(p,v){p.specular.value.copy(v.specular),p.shininess.value=Math.max(v.shininess,1e-4)}function h(p,v){v.gradientMap&&(p.gradientMap.value=v.gradientMap)}function d(p,v){p.metalness.value=v.metalness,v.metalnessMap&&(p.metalnessMap.value=v.metalnessMap,e(v.metalnessMap,p.metalnessMapTransform)),p.roughness.value=v.roughness,v.roughnessMap&&(p.roughnessMap.value=v.roughnessMap,e(v.roughnessMap,p.roughnessMapTransform)),v.envMap&&(p.envMapIntensity.value=v.envMapIntensity)}function f(p,v,x){p.ior.value=v.ior,v.sheen>0&&(p.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),p.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(p.sheenColorMap.value=v.sheenColorMap,e(v.sheenColorMap,p.sheenColorMapTransform)),v.sheenRoughnessMap&&(p.sheenRoughnessMap.value=v.sheenRoughnessMap,e(v.sheenRoughnessMap,p.sheenRoughnessMapTransform))),v.clearcoat>0&&(p.clearcoat.value=v.clearcoat,p.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(p.clearcoatMap.value=v.clearcoatMap,e(v.clearcoatMap,p.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,e(v.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(p.clearcoatNormalMap.value=v.clearcoatNormalMap,e(v.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===$e&&p.clearcoatNormalScale.value.negate())),v.dispersion>0&&(p.dispersion.value=v.dispersion),v.iridescence>0&&(p.iridescence.value=v.iridescence,p.iridescenceIOR.value=v.iridescenceIOR,p.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(p.iridescenceMap.value=v.iridescenceMap,e(v.iridescenceMap,p.iridescenceMapTransform)),v.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=v.iridescenceThicknessMap,e(v.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),v.transmission>0&&(p.transmission.value=v.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),v.transmissionMap&&(p.transmissionMap.value=v.transmissionMap,e(v.transmissionMap,p.transmissionMapTransform)),p.thickness.value=v.thickness,v.thicknessMap&&(p.thicknessMap.value=v.thicknessMap,e(v.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=v.attenuationDistance,p.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(p.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(p.anisotropyMap.value=v.anisotropyMap,e(v.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=v.specularIntensity,p.specularColor.value.copy(v.specularColor),v.specularColorMap&&(p.specularColorMap.value=v.specularColorMap,e(v.specularColorMap,p.specularColorMapTransform)),v.specularIntensityMap&&(p.specularIntensityMap.value=v.specularIntensityMap,e(v.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,v){v.matcap&&(p.matcap.value=v.matcap)}function g(p,v){const x=t.get(v).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Rv(o,t,e,n){let i={},r={},s=[];const a=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,_){const y=_.program;n.uniformBlockBinding(x,y)}function c(x,_){let y=i[x.id];y===void 0&&(m(x),y=u(x),i[x.id]=y,x.addEventListener("dispose",p));const R=_.program;n.updateUBOMapping(x,R);const C=t.render.frame;r[x.id]!==C&&(d(x),r[x.id]=C)}function u(x){const _=h();x.__bindingPointIndex=_;const y=o.createBuffer(),R=x.__size,C=x.usage;return o.bindBuffer(o.UNIFORM_BUFFER,y),o.bufferData(o.UNIFORM_BUFFER,R,C),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,_,y),y}function h(){for(let x=0;x<a;x++)if(s.indexOf(x)===-1)return s.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const _=i[x.id],y=x.uniforms,R=x.__cache;o.bindBuffer(o.UNIFORM_BUFFER,_);for(let C=0,L=y.length;C<L;C++){const N=Array.isArray(y[C])?y[C]:[y[C]];for(let E=0,M=N.length;E<M;E++){const A=N[E];if(f(A,C,E,R)===!0){const O=A.__offset,U=Array.isArray(A.value)?A.value:[A.value];let Z=0;for(let X=0;X<U.length;X++){const $=U[X],z=g($);typeof $=="number"||typeof $=="boolean"?(A.__data[0]=$,o.bufferSubData(o.UNIFORM_BUFFER,O+Z,A.__data)):$.isMatrix3?(A.__data[0]=$.elements[0],A.__data[1]=$.elements[1],A.__data[2]=$.elements[2],A.__data[3]=0,A.__data[4]=$.elements[3],A.__data[5]=$.elements[4],A.__data[6]=$.elements[5],A.__data[7]=0,A.__data[8]=$.elements[6],A.__data[9]=$.elements[7],A.__data[10]=$.elements[8],A.__data[11]=0):($.toArray(A.__data,Z),Z+=z.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,O,A.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function f(x,_,y,R){const C=x.value,L=_+"_"+y;if(R[L]===void 0)return typeof C=="number"||typeof C=="boolean"?R[L]=C:R[L]=C.clone(),!0;{const N=R[L];if(typeof C=="number"||typeof C=="boolean"){if(N!==C)return R[L]=C,!0}else if(N.equals(C)===!1)return N.copy(C),!0}return!1}function m(x){const _=x.uniforms;let y=0;const R=16;for(let L=0,N=_.length;L<N;L++){const E=Array.isArray(_[L])?_[L]:[_[L]];for(let M=0,A=E.length;M<A;M++){const O=E[M],U=Array.isArray(O.value)?O.value:[O.value];for(let Z=0,X=U.length;Z<X;Z++){const $=U[Z],z=g($),I=y%R;I!==0&&R-I<z.boundary&&(y+=R-I),O.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=y,y+=z.storage}}}const C=y%R;return C>0&&(y+=R-C),x.__size=y,x.__cache={},this}function g(x){const _={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(_.boundary=4,_.storage=4):x.isVector2?(_.boundary=8,_.storage=8):x.isVector3||x.isColor?(_.boundary=16,_.storage=12):x.isVector4?(_.boundary=16,_.storage=16):x.isMatrix3?(_.boundary=48,_.storage=48):x.isMatrix4?(_.boundary=64,_.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),_}function p(x){const _=x.target;_.removeEventListener("dispose",p);const y=s.indexOf(_.__bindingPointIndex);s.splice(y,1),o.deleteBuffer(i[_.id]),delete i[_.id],delete r[_.id]}function v(){for(const x in i)o.deleteBuffer(i[x]);s=[],i={},r={}}return{bind:l,update:c,dispose:v}}class Cv{constructor(t={}){const{canvas:e=yu(),context:n=null,depth:i=!0,stencil:r=!1,alpha:s=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=s;const f=new Uint32Array(4),m=new Int32Array(4);let g=null,p=null;const v=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ke,this.toneMapping=ni,this.toneMappingExposure=1;const _=this;let y=!1,R=0,C=0,L=null,N=-1,E=null;const M=new ge,A=new ge;let O=null;const U=new ee(0);let Z=0,X=e.width,$=e.height,z=1,I=null,et=null;const Q=new ge(0,0,X,$),B=new ge(0,0,X,$);let J=!1;const H=new xa;let T=!1,b=!1;const G=new se,j=new k,nt=new ge,q={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let rt=!1;function ft(){return L===null?z:1}let D=n;function Rt(S,V){return e.getContext(S,V)}try{const S={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${oa}`),e.addEventListener("webglcontextlost",ut,!1),e.addEventListener("webglcontextrestored",pt,!1),e.addEventListener("webglcontextcreationerror",Et,!1),D===null){const V="webgl2";if(D=Rt(V,S),D===null)throw Rt(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let yt,at,st,Zt,Tt,Ht,P,w,tt,ct,mt,lt,Ot,gt,It,jt,At,kt,re,Kt,zt,$t,te,pe;function Y(){yt=new Bp(D),yt.init(),$t=new yv(D,yt),at=new Pp(D,yt,t,$t),st=new vv(D),Zt=new zp(D),Tt=new nv,Ht=new xv(D,yt,st,Tt,at,$t,Zt),P=new Ip(_),w=new Up(_),tt=new Xu(D),te=new Rp(D,tt),ct=new Fp(D,tt,Zt,te),mt=new kp(D,ct,tt,Zt),re=new Vp(D,at,Ht),jt=new Lp(Tt),lt=new ev(_,P,w,yt,at,te,jt),Ot=new bv(_,Tt),gt=new rv,It=new hv(yt),kt=new bp(_,P,w,st,mt,d,l),At=new mv(_,mt,at),pe=new Rv(D,Zt,at,st),Kt=new Cp(D,yt,Zt),zt=new Op(D,yt,Zt),Zt.programs=lt.programs,_.capabilities=at,_.extensions=yt,_.properties=Tt,_.renderLists=gt,_.shadowMap=At,_.state=st,_.info=Zt}Y();const St=new Av(_,D);this.xr=St,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const S=yt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=yt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(S){S!==void 0&&(z=S,this.setSize(X,$,!1))},this.getSize=function(S){return S.set(X,$)},this.setSize=function(S,V,K=!0){if(St.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=S,$=V,e.width=Math.floor(S*z),e.height=Math.floor(V*z),K===!0&&(e.style.width=S+"px",e.style.height=V+"px"),this.setViewport(0,0,S,V)},this.getDrawingBufferSize=function(S){return S.set(X*z,$*z).floor()},this.setDrawingBufferSize=function(S,V,K){X=S,$=V,z=K,e.width=Math.floor(S*K),e.height=Math.floor(V*K),this.setViewport(0,0,S,V)},this.getCurrentViewport=function(S){return S.copy(M)},this.getViewport=function(S){return S.copy(Q)},this.setViewport=function(S,V,K,F){S.isVector4?Q.set(S.x,S.y,S.z,S.w):Q.set(S,V,K,F),st.viewport(M.copy(Q).multiplyScalar(z).round())},this.getScissor=function(S){return S.copy(B)},this.setScissor=function(S,V,K,F){S.isVector4?B.set(S.x,S.y,S.z,S.w):B.set(S,V,K,F),st.scissor(A.copy(B).multiplyScalar(z).round())},this.getScissorTest=function(){return J},this.setScissorTest=function(S){st.setScissorTest(J=S)},this.setOpaqueSort=function(S){I=S},this.setTransparentSort=function(S){et=S},this.getClearColor=function(S){return S.copy(kt.getClearColor())},this.setClearColor=function(){kt.setClearColor.apply(kt,arguments)},this.getClearAlpha=function(){return kt.getClearAlpha()},this.setClearAlpha=function(){kt.setClearAlpha.apply(kt,arguments)},this.clear=function(S=!0,V=!0,K=!0){let F=0;if(S){let W=!1;if(L!==null){const ht=L.texture.format;W=ht===fa||ht===da||ht===ua}if(W){const ht=L.texture.type,bt=ht===Vn||ht===vi||ht===Mr||ht===Xi||ht===la||ht===ca,_t=kt.getClearColor(),wt=kt.getClearAlpha(),Mt=_t.r,Yt=_t.g,qt=_t.b;bt?(f[0]=Mt,f[1]=Yt,f[2]=qt,f[3]=wt,D.clearBufferuiv(D.COLOR,0,f)):(m[0]=Mt,m[1]=Yt,m[2]=qt,m[3]=wt,D.clearBufferiv(D.COLOR,0,m))}else F|=D.COLOR_BUFFER_BIT}V&&(F|=D.DEPTH_BUFFER_BIT),K&&(F|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ut,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",Et,!1),gt.dispose(),It.dispose(),Tt.dispose(),P.dispose(),w.dispose(),mt.dispose(),te.dispose(),pe.dispose(),lt.dispose(),St.dispose(),St.removeEventListener("sessionstart",ot),St.removeEventListener("sessionend",dt),vt.stop()};function ut(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const S=Zt.autoReset,V=At.enabled,K=At.autoUpdate,F=At.needsUpdate,W=At.type;Y(),Zt.autoReset=S,At.enabled=V,At.autoUpdate=K,At.needsUpdate=F,At.type=W}function Et(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Jt(S){const V=S.target;V.removeEventListener("dispose",Jt),oe(V)}function oe(S){_e(S),Tt.remove(S)}function _e(S){const V=Tt.get(S).programs;V!==void 0&&(V.forEach(function(K){lt.releaseProgram(K)}),S.isShaderMaterial&&lt.releaseShaderCache(S))}this.renderBufferDirect=function(S,V,K,F,W,ht){V===null&&(V=q);const bt=W.isMesh&&W.matrixWorld.determinant()<0,_t=Gt(S,V,K,F,W);st.setMaterial(F,bt);let wt=K.index,Mt=1;if(F.wireframe===!0){if(wt=ct.getWireframeAttribute(K),wt===void 0)return;Mt=2}const Yt=K.drawRange,qt=K.attributes.position;let ne=Yt.start*Mt,me=(Yt.start+Yt.count)*Mt;ht!==null&&(ne=Math.max(ne,ht.start*Mt),me=Math.min(me,(ht.start+ht.count)*Mt)),wt!==null?(ne=Math.max(ne,0),me=Math.min(me,wt.count)):qt!=null&&(ne=Math.max(ne,0),me=Math.min(me,qt.count));const de=me-ne;if(de<0||de===1/0)return;te.setup(W,F,_t,K,wt);let ae,le=Kt;if(wt!==null&&(ae=tt.get(wt),le=zt,le.setIndex(ae)),W.isMesh)F.wireframe===!0?(st.setLineWidth(F.wireframeLinewidth*ft()),le.setMode(D.LINES)):le.setMode(D.TRIANGLES);else if(W.isLine){let Bt=F.linewidth;Bt===void 0&&(Bt=1),st.setLineWidth(Bt*ft()),W.isLineSegments?le.setMode(D.LINES):W.isLineLoop?le.setMode(D.LINE_LOOP):le.setMode(D.LINE_STRIP)}else W.isPoints?le.setMode(D.POINTS):W.isSprite&&le.setMode(D.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)le.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(yt.get("WEBGL_multi_draw"))le.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Bt=W._multiDrawStarts,Ee=W._multiDrawCounts,ie=W._multiDrawCount,Se=wt?tt.get(wt).bytesPerElement:1,be=Tt.get(F).currentProgram.getUniforms();for(let we=0;we<ie;we++)be.setValue(D,"_gl_DrawID",we),le.render(Bt[we]/Se,Ee[we])}else if(W.isInstancedMesh)le.renderInstances(ne,de,W.count);else if(K.isInstancedBufferGeometry){const Bt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Ee=Math.min(K.instanceCount,Bt);le.renderInstances(ne,de,Ee)}else le.render(ne,de)};function Te(S,V,K){S.transparent===!0&&S.side===on&&S.forceSinglePass===!1?(S.side=$e,S.needsUpdate=!0,it(S,V,K),S.side=wn,S.needsUpdate=!0,it(S,V,K),S.side=on):it(S,V,K)}this.compile=function(S,V,K=null){K===null&&(K=S),p=It.get(K),p.init(V),x.push(p),K.traverseVisible(function(W){W.isLight&&W.layers.test(V.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),S!==K&&S.traverseVisible(function(W){W.isLight&&W.layers.test(V.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),p.setupLights();const F=new Set;return S.traverse(function(W){const ht=W.material;if(ht)if(Array.isArray(ht))for(let bt=0;bt<ht.length;bt++){const _t=ht[bt];Te(_t,K,W),F.add(_t)}else Te(ht,K,W),F.add(ht)}),x.pop(),p=null,F},this.compileAsync=function(S,V,K=null){const F=this.compile(S,V,K);return new Promise(W=>{function ht(){if(F.forEach(function(bt){Tt.get(bt).currentProgram.isReady()&&F.delete(bt)}),F.size===0){W(S);return}setTimeout(ht,10)}yt.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let ue=null;function Me(S){ue&&ue(S)}function ot(){vt.stop()}function dt(){vt.start()}const vt=new Oc;vt.setAnimationLoop(Me),typeof self<"u"&&vt.setContext(self),this.setAnimationLoop=function(S){ue=S,St.setAnimationLoop(S),S===null?vt.stop():vt.start()},St.addEventListener("sessionstart",ot),St.addEventListener("sessionend",dt),this.render=function(S,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),St.enabled===!0&&St.isPresenting===!0&&(St.cameraAutoUpdate===!0&&St.updateCamera(V),V=St.getCamera()),S.isScene===!0&&S.onBeforeRender(_,S,V,L),p=It.get(S,x.length),p.init(V),x.push(p),G.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),H.setFromProjectionMatrix(G),b=this.localClippingEnabled,T=jt.init(this.clippingPlanes,b),g=gt.get(S,v.length),g.init(),v.push(g),St.enabled===!0&&St.isPresenting===!0){const ht=_.xr.getDepthSensingMesh();ht!==null&&xt(ht,V,-1/0,_.sortObjects)}xt(S,V,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(I,et),rt=St.enabled===!1||St.isPresenting===!1||St.hasDepthSensing()===!1,rt&&kt.addToRenderList(g,S),this.info.render.frame++,T===!0&&jt.beginShadows();const K=p.state.shadowsArray;At.render(K,S,V),T===!0&&jt.endShadows(),this.info.autoReset===!0&&this.info.reset();const F=g.opaque,W=g.transmissive;if(p.setupLights(),V.isArrayCamera){const ht=V.cameras;if(W.length>0)for(let bt=0,_t=ht.length;bt<_t;bt++){const wt=ht[bt];Ft(F,W,S,wt)}rt&&kt.render(S);for(let bt=0,_t=ht.length;bt<_t;bt++){const wt=ht[bt];Qt(g,S,wt,wt.viewport)}}else W.length>0&&Ft(F,W,S,V),rt&&kt.render(S),Qt(g,S,V);L!==null&&(Ht.updateMultisampleRenderTarget(L),Ht.updateRenderTargetMipmap(L)),S.isScene===!0&&S.onAfterRender(_,S,V),te.resetDefaultState(),N=-1,E=null,x.pop(),x.length>0?(p=x[x.length-1],T===!0&&jt.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?g=v[v.length-1]:g=null};function xt(S,V,K,F){if(S.visible===!1)return;if(S.layers.test(V.layers)){if(S.isGroup)K=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(V);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||H.intersectsSprite(S)){F&&nt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(G);const bt=mt.update(S),_t=S.material;_t.visible&&g.push(S,bt,_t,K,nt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||H.intersectsObject(S))){const bt=mt.update(S),_t=S.material;if(F&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),nt.copy(S.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),nt.copy(bt.boundingSphere.center)),nt.applyMatrix4(S.matrixWorld).applyMatrix4(G)),Array.isArray(_t)){const wt=bt.groups;for(let Mt=0,Yt=wt.length;Mt<Yt;Mt++){const qt=wt[Mt],ne=_t[qt.materialIndex];ne&&ne.visible&&g.push(S,bt,ne,K,nt.z,qt)}}else _t.visible&&g.push(S,bt,_t,K,nt.z,null)}}const ht=S.children;for(let bt=0,_t=ht.length;bt<_t;bt++)xt(ht[bt],V,K,F)}function Qt(S,V,K,F){const W=S.opaque,ht=S.transmissive,bt=S.transparent;p.setupLightsView(K),T===!0&&jt.setGlobalState(_.clippingPlanes,K),F&&st.viewport(M.copy(F)),W.length>0&&Ct(W,V,K),ht.length>0&&Ct(ht,V,K),bt.length>0&&Ct(bt,V,K),st.buffers.depth.setTest(!0),st.buffers.depth.setMask(!0),st.buffers.color.setMask(!0),st.setPolygonOffset(!1)}function Ft(S,V,K,F){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[F.id]===void 0&&(p.state.transmissionRenderTarget[F.id]=new ii(1,1,{generateMipmaps:!0,type:yt.has("EXT_color_buffer_half_float")||yt.has("EXT_color_buffer_float")?Rr:Vn,minFilter:Fn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ve.workingColorSpace}));const ht=p.state.transmissionRenderTarget[F.id],bt=F.viewport||M;ht.setSize(bt.z,bt.w);const _t=_.getRenderTarget();_.setRenderTarget(ht),_.getClearColor(U),Z=_.getClearAlpha(),Z<1&&_.setClearColor(16777215,.5),rt?kt.render(K):_.clear();const wt=_.toneMapping;_.toneMapping=ni;const Mt=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),p.setupLightsView(F),T===!0&&jt.setGlobalState(_.clippingPlanes,F),Ct(S,K,F),Ht.updateMultisampleRenderTarget(ht),Ht.updateRenderTargetMipmap(ht),yt.has("WEBGL_multisampled_render_to_texture")===!1){let Yt=!1;for(let qt=0,ne=V.length;qt<ne;qt++){const me=V[qt],de=me.object,ae=me.geometry,le=me.material,Bt=me.group;if(le.side===on&&de.layers.test(F.layers)){const Ee=le.side;le.side=$e,le.needsUpdate=!0,Dt(de,K,F,ae,le,Bt),le.side=Ee,le.needsUpdate=!0,Yt=!0}}Yt===!0&&(Ht.updateMultisampleRenderTarget(ht),Ht.updateRenderTargetMipmap(ht))}_.setRenderTarget(_t),_.setClearColor(U,Z),Mt!==void 0&&(F.viewport=Mt),_.toneMapping=wt}function Ct(S,V,K){const F=V.isScene===!0?V.overrideMaterial:null;for(let W=0,ht=S.length;W<ht;W++){const bt=S[W],_t=bt.object,wt=bt.geometry,Mt=F===null?bt.material:F,Yt=bt.group;_t.layers.test(K.layers)&&Dt(_t,V,K,wt,Mt,Yt)}}function Dt(S,V,K,F,W,ht){S.onBeforeRender(_,V,K,F,W,ht),S.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),W.transparent===!0&&W.side===on&&W.forceSinglePass===!1?(W.side=$e,W.needsUpdate=!0,_.renderBufferDirect(K,V,F,W,S,ht),W.side=wn,W.needsUpdate=!0,_.renderBufferDirect(K,V,F,W,S,ht),W.side=on):_.renderBufferDirect(K,V,F,W,S,ht),S.onAfterRender(_,V,K,F,W,ht)}function it(S,V,K){V.isScene!==!0&&(V=q);const F=Tt.get(S),W=p.state.lights,ht=p.state.shadowsArray,bt=W.state.version,_t=lt.getParameters(S,W.state,ht,V,K),wt=lt.getProgramCacheKey(_t);let Mt=F.programs;F.environment=S.isMeshStandardMaterial?V.environment:null,F.fog=V.fog,F.envMap=(S.isMeshStandardMaterial?w:P).get(S.envMap||F.environment),F.envMapRotation=F.environment!==null&&S.envMap===null?V.environmentRotation:S.envMapRotation,Mt===void 0&&(S.addEventListener("dispose",Jt),Mt=new Map,F.programs=Mt);let Yt=Mt.get(wt);if(Yt!==void 0){if(F.currentProgram===Yt&&F.lightsStateVersion===bt)return Ut(S,_t),Yt}else _t.uniforms=lt.getUniforms(S),S.onBeforeCompile(_t,_),Yt=lt.acquireProgram(_t,wt),Mt.set(wt,Yt),F.uniforms=_t.uniforms;const qt=F.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(qt.clippingPlanes=jt.uniform),Ut(S,_t),F.needsLights=Pt(S),F.lightsStateVersion=bt,F.needsLights&&(qt.ambientLightColor.value=W.state.ambient,qt.lightProbe.value=W.state.probe,qt.directionalLights.value=W.state.directional,qt.directionalLightShadows.value=W.state.directionalShadow,qt.spotLights.value=W.state.spot,qt.spotLightShadows.value=W.state.spotShadow,qt.rectAreaLights.value=W.state.rectArea,qt.ltc_1.value=W.state.rectAreaLTC1,qt.ltc_2.value=W.state.rectAreaLTC2,qt.pointLights.value=W.state.point,qt.pointLightShadows.value=W.state.pointShadow,qt.hemisphereLights.value=W.state.hemi,qt.directionalShadowMap.value=W.state.directionalShadowMap,qt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,qt.spotShadowMap.value=W.state.spotShadowMap,qt.spotLightMatrix.value=W.state.spotLightMatrix,qt.spotLightMap.value=W.state.spotLightMap,qt.pointShadowMap.value=W.state.pointShadowMap,qt.pointShadowMatrix.value=W.state.pointShadowMatrix),F.currentProgram=Yt,F.uniformsList=null,Yt}function Lt(S){if(S.uniformsList===null){const V=S.currentProgram.getUniforms();S.uniformsList=vs.seqWithValue(V.seq,S.uniforms)}return S.uniformsList}function Ut(S,V){const K=Tt.get(S);K.outputColorSpace=V.outputColorSpace,K.batching=V.batching,K.batchingColor=V.batchingColor,K.instancing=V.instancing,K.instancingColor=V.instancingColor,K.instancingMorph=V.instancingMorph,K.skinning=V.skinning,K.morphTargets=V.morphTargets,K.morphNormals=V.morphNormals,K.morphColors=V.morphColors,K.morphTargetsCount=V.morphTargetsCount,K.numClippingPlanes=V.numClippingPlanes,K.numIntersection=V.numClipIntersection,K.vertexAlphas=V.vertexAlphas,K.vertexTangents=V.vertexTangents,K.toneMapping=V.toneMapping}function Gt(S,V,K,F,W){V.isScene!==!0&&(V=q),Ht.resetTextureUnits();const ht=V.fog,bt=F.isMeshStandardMaterial?V.environment:null,_t=L===null?_.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Ge,wt=(F.isMeshStandardMaterial?w:P).get(F.envMap||bt),Mt=F.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Yt=!!K.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),qt=!!K.morphAttributes.position,ne=!!K.morphAttributes.normal,me=!!K.morphAttributes.color;let de=ni;F.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(de=_.toneMapping);const ae=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,le=ae!==void 0?ae.length:0,Bt=Tt.get(F),Ee=p.state.lights;if(T===!0&&(b===!0||S!==E)){const De=S===E&&F.id===N;jt.setState(F,S,De)}let ie=!1;F.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==Ee.state.version||Bt.outputColorSpace!==_t||W.isBatchedMesh&&Bt.batching===!1||!W.isBatchedMesh&&Bt.batching===!0||W.isBatchedMesh&&Bt.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Bt.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Bt.instancing===!1||!W.isInstancedMesh&&Bt.instancing===!0||W.isSkinnedMesh&&Bt.skinning===!1||!W.isSkinnedMesh&&Bt.skinning===!0||W.isInstancedMesh&&Bt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Bt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Bt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Bt.instancingMorph===!1&&W.morphTexture!==null||Bt.envMap!==wt||F.fog===!0&&Bt.fog!==ht||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==jt.numPlanes||Bt.numIntersection!==jt.numIntersection)||Bt.vertexAlphas!==Mt||Bt.vertexTangents!==Yt||Bt.morphTargets!==qt||Bt.morphNormals!==ne||Bt.morphColors!==me||Bt.toneMapping!==de||Bt.morphTargetsCount!==le)&&(ie=!0):(ie=!0,Bt.__version=F.version);let Se=Bt.currentProgram;ie===!0&&(Se=it(F,V,W));let be=!1,we=!1,Qe=!1;const Wt=Se.getUniforms(),Le=Bt.uniforms;if(st.useProgram(Se.program)&&(be=!0,we=!0,Qe=!0),F.id!==N&&(N=F.id,we=!0),be||E!==S){Wt.setValue(D,"projectionMatrix",S.projectionMatrix),Wt.setValue(D,"viewMatrix",S.matrixWorldInverse);const De=Wt.map.cameraPosition;De!==void 0&&De.setValue(D,j.setFromMatrixPosition(S.matrixWorld)),at.logarithmicDepthBuffer&&Wt.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&Wt.setValue(D,"isOrthographic",S.isOrthographicCamera===!0),E!==S&&(E=S,we=!0,Qe=!0)}if(W.isSkinnedMesh){Wt.setOptional(D,W,"bindMatrix"),Wt.setOptional(D,W,"bindMatrixInverse");const De=W.skeleton;De&&(De.boneTexture===null&&De.computeBoneTexture(),Wt.setValue(D,"boneTexture",De.boneTexture,Ht))}W.isBatchedMesh&&(Wt.setOptional(D,W,"batchingTexture"),Wt.setValue(D,"batchingTexture",W._matricesTexture,Ht),Wt.setOptional(D,W,"batchingIdTexture"),Wt.setValue(D,"batchingIdTexture",W._indirectTexture,Ht),Wt.setOptional(D,W,"batchingColorTexture"),W._colorsTexture!==null&&Wt.setValue(D,"batchingColorTexture",W._colorsTexture,Ht));const Ie=K.morphAttributes;if((Ie.position!==void 0||Ie.normal!==void 0||Ie.color!==void 0)&&re.update(W,K,Se),(we||Bt.receiveShadow!==W.receiveShadow)&&(Bt.receiveShadow=W.receiveShadow,Wt.setValue(D,"receiveShadow",W.receiveShadow)),F.isMeshGouraudMaterial&&F.envMap!==null&&(Le.envMap.value=wt,Le.flipEnvMap.value=wt.isCubeTexture&&wt.isRenderTargetTexture===!1?-1:1),F.isMeshStandardMaterial&&F.envMap===null&&V.environment!==null&&(Le.envMapIntensity.value=V.environmentIntensity),we&&(Wt.setValue(D,"toneMappingExposure",_.toneMappingExposure),Bt.needsLights&&Nt(Le,Qe),ht&&F.fog===!0&&Ot.refreshFogUniforms(Le,ht),Ot.refreshMaterialUniforms(Le,F,z,$,p.state.transmissionRenderTarget[S.id]),vs.upload(D,Lt(Bt),Le,Ht)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(vs.upload(D,Lt(Bt),Le,Ht),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&Wt.setValue(D,"center",W.center),Wt.setValue(D,"modelViewMatrix",W.modelViewMatrix),Wt.setValue(D,"normalMatrix",W.normalMatrix),Wt.setValue(D,"modelMatrix",W.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){const De=F.uniformsGroups;for(let dn=0,Ds=De.length;dn<Ds;dn++){const Lr=De[dn];pe.update(Lr,Se),pe.bind(Lr,Se)}}return Se}function Nt(S,V){S.ambientLightColor.needsUpdate=V,S.lightProbe.needsUpdate=V,S.directionalLights.needsUpdate=V,S.directionalLightShadows.needsUpdate=V,S.pointLights.needsUpdate=V,S.pointLightShadows.needsUpdate=V,S.spotLights.needsUpdate=V,S.spotLightShadows.needsUpdate=V,S.rectAreaLights.needsUpdate=V,S.hemisphereLights.needsUpdate=V}function Pt(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(S,V,K){Tt.get(S.texture).__webglTexture=V,Tt.get(S.depthTexture).__webglTexture=K;const F=Tt.get(S);F.__hasExternalTextures=!0,F.__autoAllocateDepthBuffer=K===void 0,F.__autoAllocateDepthBuffer||yt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),F.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,V){const K=Tt.get(S);K.__webglFramebuffer=V,K.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(S,V=0,K=0){L=S,R=V,C=K;let F=!0,W=null,ht=!1,bt=!1;if(S){const wt=Tt.get(S);wt.__useDefaultFramebuffer!==void 0?(st.bindFramebuffer(D.FRAMEBUFFER,null),F=!1):wt.__webglFramebuffer===void 0?Ht.setupRenderTarget(S):wt.__hasExternalTextures&&Ht.rebindTextures(S,Tt.get(S.texture).__webglTexture,Tt.get(S.depthTexture).__webglTexture);const Mt=S.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(bt=!0);const Yt=Tt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Yt[V])?W=Yt[V][K]:W=Yt[V],ht=!0):S.samples>0&&Ht.useMultisampledRTT(S)===!1?W=Tt.get(S).__webglMultisampledFramebuffer:Array.isArray(Yt)?W=Yt[K]:W=Yt,M.copy(S.viewport),A.copy(S.scissor),O=S.scissorTest}else M.copy(Q).multiplyScalar(z).floor(),A.copy(B).multiplyScalar(z).floor(),O=J;if(st.bindFramebuffer(D.FRAMEBUFFER,W)&&F&&st.drawBuffers(S,W),st.viewport(M),st.scissor(A),st.setScissorTest(O),ht){const wt=Tt.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+V,wt.__webglTexture,K)}else if(bt){const wt=Tt.get(S.texture),Mt=V||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,wt.__webglTexture,K||0,Mt)}N=-1},this.readRenderTargetPixels=function(S,V,K,F,W,ht,bt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=Tt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&bt!==void 0&&(_t=_t[bt]),_t){st.bindFramebuffer(D.FRAMEBUFFER,_t);try{const wt=S.texture,Mt=wt.format,Yt=wt.type;if(!at.textureFormatReadable(Mt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!at.textureTypeReadable(Yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=S.width-F&&K>=0&&K<=S.height-W&&D.readPixels(V,K,F,W,$t.convert(Mt),$t.convert(Yt),ht)}finally{const wt=L!==null?Tt.get(L).__webglFramebuffer:null;st.bindFramebuffer(D.FRAMEBUFFER,wt)}}},this.readRenderTargetPixelsAsync=async function(S,V,K,F,W,ht,bt){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _t=Tt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&bt!==void 0&&(_t=_t[bt]),_t){st.bindFramebuffer(D.FRAMEBUFFER,_t);try{const wt=S.texture,Mt=wt.format,Yt=wt.type;if(!at.textureFormatReadable(Mt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!at.textureTypeReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(V>=0&&V<=S.width-F&&K>=0&&K<=S.height-W){const qt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,qt),D.bufferData(D.PIXEL_PACK_BUFFER,ht.byteLength,D.STREAM_READ),D.readPixels(V,K,F,W,$t.convert(Mt),$t.convert(Yt),0),D.flush();const ne=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);await _u(D,ne,4);try{D.bindBuffer(D.PIXEL_PACK_BUFFER,qt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ht)}finally{D.deleteBuffer(qt),D.deleteSync(ne)}return ht}}finally{const wt=L!==null?Tt.get(L).__webglFramebuffer:null;st.bindFramebuffer(D.FRAMEBUFFER,wt)}}},this.copyFramebufferToTexture=function(S,V=null,K=0){S.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),V=arguments[0]||null,S=arguments[1]);const F=Math.pow(2,-K),W=Math.floor(S.image.width*F),ht=Math.floor(S.image.height*F),bt=V!==null?V.x:0,_t=V!==null?V.y:0;Ht.setTexture2D(S,0),D.copyTexSubImage2D(D.TEXTURE_2D,K,0,0,bt,_t,W,ht),st.unbindTexture()},this.copyTextureToTexture=function(S,V,K=null,F=null,W=0){S.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),F=arguments[0]||null,S=arguments[1],V=arguments[2],W=arguments[3]||0,K=null);let ht,bt,_t,wt,Mt,Yt;K!==null?(ht=K.max.x-K.min.x,bt=K.max.y-K.min.y,_t=K.min.x,wt=K.min.y):(ht=S.image.width,bt=S.image.height,_t=0,wt=0),F!==null?(Mt=F.x,Yt=F.y):(Mt=0,Yt=0);const qt=$t.convert(V.format),ne=$t.convert(V.type);Ht.setTexture2D(V,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,V.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,V.unpackAlignment);const me=D.getParameter(D.UNPACK_ROW_LENGTH),de=D.getParameter(D.UNPACK_IMAGE_HEIGHT),ae=D.getParameter(D.UNPACK_SKIP_PIXELS),le=D.getParameter(D.UNPACK_SKIP_ROWS),Bt=D.getParameter(D.UNPACK_SKIP_IMAGES),Ee=S.isCompressedTexture?S.mipmaps[W]:S.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,Ee.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ee.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,_t),D.pixelStorei(D.UNPACK_SKIP_ROWS,wt),S.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,W,Mt,Yt,ht,bt,qt,ne,Ee.data):S.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,W,Mt,Yt,Ee.width,Ee.height,qt,Ee.data):D.texSubImage2D(D.TEXTURE_2D,W,Mt,Yt,ht,bt,qt,ne,Ee),D.pixelStorei(D.UNPACK_ROW_LENGTH,me),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,de),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ae),D.pixelStorei(D.UNPACK_SKIP_ROWS,le),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Bt),W===0&&V.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),st.unbindTexture()},this.copyTextureToTexture3D=function(S,V,K=null,F=null,W=0){S.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),K=arguments[0]||null,F=arguments[1]||null,S=arguments[2],V=arguments[3],W=arguments[4]||0);let ht,bt,_t,wt,Mt,Yt,qt,ne,me;const de=S.isCompressedTexture?S.mipmaps[W]:S.image;K!==null?(ht=K.max.x-K.min.x,bt=K.max.y-K.min.y,_t=K.max.z-K.min.z,wt=K.min.x,Mt=K.min.y,Yt=K.min.z):(ht=de.width,bt=de.height,_t=de.depth,wt=0,Mt=0,Yt=0),F!==null?(qt=F.x,ne=F.y,me=F.z):(qt=0,ne=0,me=0);const ae=$t.convert(V.format),le=$t.convert(V.type);let Bt;if(V.isData3DTexture)Ht.setTexture3D(V,0),Bt=D.TEXTURE_3D;else if(V.isDataArrayTexture||V.isCompressedArrayTexture)Ht.setTexture2DArray(V,0),Bt=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,V.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,V.unpackAlignment);const Ee=D.getParameter(D.UNPACK_ROW_LENGTH),ie=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Se=D.getParameter(D.UNPACK_SKIP_PIXELS),be=D.getParameter(D.UNPACK_SKIP_ROWS),we=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,de.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,de.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,wt),D.pixelStorei(D.UNPACK_SKIP_ROWS,Mt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Yt),S.isDataTexture||S.isData3DTexture?D.texSubImage3D(Bt,W,qt,ne,me,ht,bt,_t,ae,le,de.data):V.isCompressedArrayTexture?D.compressedTexSubImage3D(Bt,W,qt,ne,me,ht,bt,_t,ae,de.data):D.texSubImage3D(Bt,W,qt,ne,me,ht,bt,_t,ae,le,de),D.pixelStorei(D.UNPACK_ROW_LENGTH,Ee),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ie),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Se),D.pixelStorei(D.UNPACK_SKIP_ROWS,be),D.pixelStorei(D.UNPACK_SKIP_IMAGES,we),W===0&&V.generateMipmaps&&D.generateMipmap(Bt),st.unbindTexture()},this.initRenderTarget=function(S){Tt.get(S).__webglFramebuffer===void 0&&Ht.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Ht.setTextureCube(S,0):S.isData3DTexture?Ht.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Ht.setTexture2DArray(S,0):Ht.setTexture2D(S,0),st.unbindTexture()},this.resetState=function(){R=0,C=0,L=null,st.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===pa?"display-p3":"srgb",e.unpackColorSpace=ve.workingColorSpace===Cs?"display-p3":"srgb"}}class Ma{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new ee(t),this.near=e,this.far=n}clone(){return new Ma(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Pv extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentIntensity=1,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Lv{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=jo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=cn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return va("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=cn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=cn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const qe=new k;class Sa{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix4(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyNormalMatrix(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.transformDirection(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=vn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=xe(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=xe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=vn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=vn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=vn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=vn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array),i=xe(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array),i=xe(i,this.array),r=xe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new je(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Sa(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Ll=new k,Il=new ge,Nl=new ge,Iv=new k,Dl=new se,Qr=new k,ao=new An,Ul=new se,lo=new Cr;class Nv extends Ne{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ua,this.bindMatrix=new se,this.bindMatrixInverse=new se,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new kn),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Qr),this.boundingBox.expandByPoint(Qr)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new An),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Qr),this.boundingSphere.expandByPoint(Qr)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ao.copy(this.boundingSphere),ao.applyMatrix4(i),t.ray.intersectsSphere(ao)!==!1&&(Ul.copy(i).invert(),lo.copy(t.ray).applyMatrix4(Ul),!(this.boundingBox!==null&&lo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,lo)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new ge,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Ua?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Wh?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;Il.fromBufferAttribute(i.attributes.skinIndex,t),Nl.fromBufferAttribute(i.attributes.skinWeight,t),Ll.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const s=Nl.getComponent(r);if(s!==0){const a=Il.getComponent(r);Dl.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Iv.copy(Ll).applyMatrix4(Dl),s)}}return e.applyMatrix4(this.bindMatrixInverse)}}class Wc extends Ce{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Xc extends Be{constructor(t=null,e=1,n=1,i,r,s,a,l,c=Ze,u=Ze,h,d){super(null,s,a,l,c,u,i,r,h,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Bl=new se,Dv=new se;class Ea{constructor(t=[],e=[]){this.uuid=cn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new se)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new se;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,s=t.length;r<s;r++){const a=t[r]?t[r].matrixWorld:Dv;Bl.multiplyMatrices(a,e[r]),Bl.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Ea(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new Xc(e,t,t,an,gn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const r=t.bones[n];let s=e[r];s===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),s=new Wc),this.bones.push(s),this.boneInverses.push(new se().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,r=e.length;i<r;i++){const s=e[i];t.bones.push(s.uuid);const a=n[i];t.boneInverses.push(a.toArray())}return t}}class $o extends je{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ui=new se,Fl=new se,ts=[],Ol=new kn,Uv=new se,lr=new Ne,cr=new An;class Bv extends Ne{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new $o(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Uv)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new kn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ui),Ol.copy(t.boundingBox).applyMatrix4(Ui),this.boundingBox.union(Ol)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new An),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ui),cr.copy(t.boundingSphere).applyMatrix4(Ui),this.boundingSphere.union(cr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,s=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(lr.geometry=this.geometry,lr.material=this.material,lr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),cr.copy(this.boundingSphere),cr.applyMatrix4(n),t.ray.intersectsSphere(cr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Ui),Fl.multiplyMatrices(n,Ui),lr.matrixWorld=Fl,lr.raycast(t,ts);for(let s=0,a=ts.length;s<a;s++){const l=ts[s];l.instanceId=r,l.object=this,e.push(l)}ts.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new $o(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Xc(new Float32Array(i*this.count),i,this.count,ha,gn));const r=this.morphTexture.source.data.data;let s=0;for(let c=0;c<n.length;c++)s+=n[c];const a=this.geometry.morphTargetsRelative?1:1-s,l=i*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class qc extends Sn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ws=new k,As=new k,zl=new se,hr=new Cr,es=new An,co=new k,Vl=new k;class wa extends Ce{constructor(t=new un,e=new qc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)ws.fromBufferAttribute(e,i-1),As.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=ws.distanceTo(As);t.setAttribute("lineDistance",new Je(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),es.copy(n.boundingSphere),es.applyMatrix4(i),es.radius+=r,t.ray.intersectsSphere(es)===!1)return;zl.copy(i).invert(),hr.copy(t.ray).applyMatrix4(zl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,s.start),m=Math.min(u.count,s.start+s.count);for(let g=f,p=m-1;g<p;g+=c){const v=u.getX(g),x=u.getX(g+1),_=ns(this,t,hr,l,v,x);_&&e.push(_)}if(this.isLineLoop){const g=u.getX(m-1),p=u.getX(f),v=ns(this,t,hr,l,g,p);v&&e.push(v)}}else{const f=Math.max(0,s.start),m=Math.min(d.count,s.start+s.count);for(let g=f,p=m-1;g<p;g+=c){const v=ns(this,t,hr,l,g,g+1);v&&e.push(v)}if(this.isLineLoop){const g=ns(this,t,hr,l,m-1,f);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ns(o,t,e,n,i,r){const s=o.geometry.attributes.position;if(ws.fromBufferAttribute(s,i),As.fromBufferAttribute(s,r),e.distanceSqToSegment(ws,As,co,Vl)>n)return;co.applyMatrix4(o.matrixWorld);const l=t.ray.origin.distanceTo(co);if(!(l<t.near||l>t.far))return{distance:l,point:Vl.clone().applyMatrix4(o.matrixWorld),index:i,face:null,faceIndex:null,object:o}}const kl=new k,Hl=new k;class Fv extends wa{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)kl.fromBufferAttribute(e,i),Hl.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+kl.distanceTo(Hl);t.setAttribute("lineDistance",new Je(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ov extends wa{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Yc extends Sn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Gl=new se,Qo=new Cr,is=new An,rs=new k;class zv extends Ce{constructor(t=new un,e=new Yc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),is.copy(n.boundingSphere),is.applyMatrix4(i),is.radius+=r,t.ray.intersectsSphere(is)===!1)return;Gl.copy(i).invert(),Qo.copy(t.ray).applyMatrix4(Gl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const d=Math.max(0,s.start),f=Math.min(c.count,s.start+s.count);for(let m=d,g=f;m<g;m++){const p=c.getX(m);rs.fromBufferAttribute(h,p),Wl(rs,p,l,i,t,e,this)}}else{const d=Math.max(0,s.start),f=Math.min(h.count,s.start+s.count);for(let m=d,g=f;m<g;m++)rs.fromBufferAttribute(h,m),Wl(rs,m,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Wl(o,t,e,n,i,r,s){const a=Qo.distanceSqToPoint(o);if(a<e){const l=new k;Qo.closestPointToPoint(o,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,object:s})}}class Vv extends Be{constructor(t,e,n,i,r,s,a,l,c){super(t,e,n,i,r,s,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Tn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let s=1;s<=t;s++)n=this.getPoint(s/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let s;e?s=e:s=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-s,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===s)return i/(r-1);const u=n[i],d=n[i+1]-u,f=(s-u)/d;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const s=this.getPoint(i),a=this.getPoint(r),l=e||(s.isVector2?new Xt:new k);return l.copy(a).sub(s).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new k,i=[],r=[],s=[],a=new k,l=new se;for(let f=0;f<=t;f++){const m=f/t;i[f]=this.getTangentAt(m,new k)}r[0]=new k,s[0]=new k;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),d=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),s[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),s[f]=s[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(He(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}s[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(He(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),s[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:s}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Aa extends Tn{constructor(t=0,e=0,n=1,i=1,r=0,s=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=s,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Xt){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const s=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(s?r=0:r=i),this.aClockwise===!0&&!s&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class kv extends Aa{constructor(t,e,n,i,r,s){super(t,e,n,n,i,r,s),this.isArcCurve=!0,this.type="ArcCurve"}}function Ta(){let o=0,t=0,e=0,n=0;function i(r,s,a,l){o=r,t=a,e=-3*r+3*s-2*a-l,n=2*r-2*s+a+l}return{initCatmullRom:function(r,s,a,l,c){i(s,a,c*(a-r),c*(l-s))},initNonuniformCatmullRom:function(r,s,a,l,c,u,h){let d=(s-r)/c-(a-r)/(c+u)+(a-s)/u,f=(a-s)/u-(l-s)/(u+h)+(l-a)/h;d*=u,f*=u,i(s,a,d,f)},calc:function(r){const s=r*r,a=s*r;return o+t*r+e*s+n*a}}}const ss=new k,ho=new Ta,uo=new Ta,fo=new Ta;class Hv extends Tn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new k){const n=e,i=this.points,r=i.length,s=(r-(this.closed?0:1))*t;let a=Math.floor(s),l=s-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=i[(a-1)%r]:(ss.subVectors(i[0],i[1]).add(i[0]),c=ss);const h=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?u=i[(a+2)%r]:(ss.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=ss),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(h),f),g=Math.pow(h.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(u),f);g<1e-4&&(g=1),m<1e-4&&(m=g),p<1e-4&&(p=g),ho.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,m,g,p),uo.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,m,g,p),fo.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,m,g,p)}else this.curveType==="catmullrom"&&(ho.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),uo.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),fo.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return n.set(ho.calc(l),uo.calc(l),fo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new k().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Xl(o,t,e,n,i){const r=(n-t)*.5,s=(i-e)*.5,a=o*o,l=o*a;return(2*e-2*n+r+s)*l+(-3*e+3*n-2*r-s)*a+r*o+e}function Gv(o,t){const e=1-o;return e*e*t}function Wv(o,t){return 2*(1-o)*o*t}function Xv(o,t){return o*o*t}function gr(o,t,e,n){return Gv(o,t)+Wv(o,e)+Xv(o,n)}function qv(o,t){const e=1-o;return e*e*e*t}function Yv(o,t){const e=1-o;return 3*e*e*o*t}function Kv(o,t){return 3*(1-o)*o*o*t}function Zv(o,t){return o*o*o*t}function xr(o,t,e,n,i){return qv(o,t)+Yv(o,e)+Kv(o,n)+Zv(o,i)}class Kc extends Tn{constructor(t=new Xt,e=new Xt,n=new Xt,i=new Xt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Xt){const n=e,i=this.v0,r=this.v1,s=this.v2,a=this.v3;return n.set(xr(t,i.x,r.x,s.x,a.x),xr(t,i.y,r.y,s.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class jv extends Tn{constructor(t=new k,e=new k,n=new k,i=new k){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new k){const n=e,i=this.v0,r=this.v1,s=this.v2,a=this.v3;return n.set(xr(t,i.x,r.x,s.x,a.x),xr(t,i.y,r.y,s.y,a.y),xr(t,i.z,r.z,s.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Zc extends Tn{constructor(t=new Xt,e=new Xt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Xt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Xt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jv extends Tn{constructor(t=new k,e=new k){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new k){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new k){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jc extends Tn{constructor(t=new Xt,e=new Xt,n=new Xt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Xt){const n=e,i=this.v0,r=this.v1,s=this.v2;return n.set(gr(t,i.x,r.x,s.x),gr(t,i.y,r.y,s.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $v extends Tn{constructor(t=new k,e=new k,n=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new k){const n=e,i=this.v0,r=this.v1,s=this.v2;return n.set(gr(t,i.x,r.x,s.x),gr(t,i.y,r.y,s.y),gr(t,i.z,r.z,s.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jc extends Tn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Xt){const n=e,i=this.points,r=(i.length-1)*t,s=Math.floor(r),a=r-s,l=i[s===0?s:s-1],c=i[s],u=i[s>i.length-2?i.length-1:s+1],h=i[s>i.length-3?i.length-1:s+2];return n.set(Xl(a,l.x,c.x,u.x,h.x),Xl(a,l.y,c.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new Xt().fromArray(i))}return this}}var ql=Object.freeze({__proto__:null,ArcCurve:kv,CatmullRomCurve3:Hv,CubicBezierCurve:Kc,CubicBezierCurve3:jv,EllipseCurve:Aa,LineCurve:Zc,LineCurve3:Jv,QuadraticBezierCurve:jc,QuadraticBezierCurve3:$v,SplineCurve:Jc});class Qv extends Tn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ql[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const s=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-s/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const s=r[i],a=s.isEllipseCurve?t*2:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?t*s.points.length:t,l=s.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new ql[i.type]().fromJSON(i))}return this}}class ta extends Qv{constructor(t){super(),this.type="Path",this.currentPoint=new Xt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Zc(this.currentPoint.clone(),new Xt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new jc(this.currentPoint.clone(),new Xt(t,e),new Xt(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,s){const a=new Kc(this.currentPoint.clone(),new Xt(t,e),new Xt(n,i),new Xt(r,s));return this.curves.push(a),this.currentPoint.set(r,s),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Jc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,s){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,r,s),this}absarc(t,e,n,i,r,s){return this.absellipse(t,e,n,n,i,r,s),this}ellipse(t,e,n,i,r,s,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,n,i,r,s,a,l),this}absellipse(t,e,n,i,r,s,a,l){const c=new Aa(t,e,n,i,r,s,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Ts extends un{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],s=[],a=[],l=[],c=new k,u=new Xt;s.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=e;h++,d+=3){const f=n+h/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),s.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(s[d]/t+1)/2,u.y=(s[d+1]/t+1)/2,l.push(u.x,u.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Je(s,3)),this.setAttribute("normal",new Je(a,3)),this.setAttribute("uv",new Je(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ts(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class $c extends ta{constructor(t){super(t),this.uuid=cn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new ta().fromJSON(i))}return this}}const tg={triangulate:function(o,t,e=2){const n=t&&t.length,i=n?t[0]*e:o.length;let r=Qc(o,0,i,e,!0);const s=[];if(!r||r.next===r.prev)return s;let a,l,c,u,h,d,f;if(n&&(r=sg(o,t,r,e)),o.length>80*e){a=c=o[0],l=u=o[1];for(let m=e;m<i;m+=e)h=o[m],d=o[m+1],h<a&&(a=h),d<l&&(l=d),h>c&&(c=h),d>u&&(u=d);f=Math.max(c-a,u-l),f=f!==0?32767/f:0}return Ar(r,s,e,a,l,f,0),s}};function Qc(o,t,e,n,i){let r,s;if(i===vg(o,t,e,n)>0)for(r=t;r<e;r+=n)s=Yl(r,o[r],o[r+1],s);else for(r=e-n;r>=t;r-=n)s=Yl(r,o[r],o[r+1],s);return s&&Ls(s,s.next)&&(br(s),s=s.next),s}function gi(o,t){if(!o)return o;t||(t=o);let e=o,n;do if(n=!1,!e.steiner&&(Ls(e,e.next)||Pe(e.prev,e,e.next)===0)){if(br(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ar(o,t,e,n,i,r,s){if(!o)return;!s&&r&&hg(o,n,i,r);let a=o,l,c;for(;o.prev!==o.next;){if(l=o.prev,c=o.next,r?ng(o,n,i,r):eg(o)){t.push(l.i/e|0),t.push(o.i/e|0),t.push(c.i/e|0),br(o),o=c.next,a=c.next;continue}if(o=c,o===a){s?s===1?(o=ig(gi(o),t,e),Ar(o,t,e,n,i,r,2)):s===2&&rg(o,t,e,n,i,r):Ar(gi(o),t,e,n,i,r,1);break}}}function eg(o){const t=o.prev,e=o,n=o.next;if(Pe(t,e,n)>=0)return!1;const i=t.x,r=e.x,s=n.x,a=t.y,l=e.y,c=n.y,u=i<r?i<s?i:s:r<s?r:s,h=a<l?a<c?a:c:l<c?l:c,d=i>r?i>s?i:s:r>s?r:s,f=a>l?a>c?a:c:l>c?l:c;let m=n.next;for(;m!==t;){if(m.x>=u&&m.x<=d&&m.y>=h&&m.y<=f&&Fi(i,a,r,l,s,c,m.x,m.y)&&Pe(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function ng(o,t,e,n){const i=o.prev,r=o,s=o.next;if(Pe(i,r,s)>=0)return!1;const a=i.x,l=r.x,c=s.x,u=i.y,h=r.y,d=s.y,f=a<l?a<c?a:c:l<c?l:c,m=u<h?u<d?u:d:h<d?h:d,g=a>l?a>c?a:c:l>c?l:c,p=u>h?u>d?u:d:h>d?h:d,v=ea(f,m,t,e,n),x=ea(g,p,t,e,n);let _=o.prevZ,y=o.nextZ;for(;_&&_.z>=v&&y&&y.z<=x;){if(_.x>=f&&_.x<=g&&_.y>=m&&_.y<=p&&_!==i&&_!==s&&Fi(a,u,l,h,c,d,_.x,_.y)&&Pe(_.prev,_,_.next)>=0||(_=_.prevZ,y.x>=f&&y.x<=g&&y.y>=m&&y.y<=p&&y!==i&&y!==s&&Fi(a,u,l,h,c,d,y.x,y.y)&&Pe(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;_&&_.z>=v;){if(_.x>=f&&_.x<=g&&_.y>=m&&_.y<=p&&_!==i&&_!==s&&Fi(a,u,l,h,c,d,_.x,_.y)&&Pe(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;y&&y.z<=x;){if(y.x>=f&&y.x<=g&&y.y>=m&&y.y<=p&&y!==i&&y!==s&&Fi(a,u,l,h,c,d,y.x,y.y)&&Pe(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function ig(o,t,e){let n=o;do{const i=n.prev,r=n.next.next;!Ls(i,r)&&th(i,n,n.next,r)&&Tr(i,r)&&Tr(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),br(n),br(n.next),n=o=r),n=n.next}while(n!==o);return gi(n)}function rg(o,t,e,n,i,r){let s=o;do{let a=s.next.next;for(;a!==s.prev;){if(s.i!==a.i&&fg(s,a)){let l=eh(s,a);s=gi(s,s.next),l=gi(l,l.next),Ar(s,t,e,n,i,r,0),Ar(l,t,e,n,i,r,0);return}a=a.next}s=s.next}while(s!==o)}function sg(o,t,e,n){const i=[];let r,s,a,l,c;for(r=0,s=t.length;r<s;r++)a=t[r]*n,l=r<s-1?t[r+1]*n:o.length,c=Qc(o,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(dg(c));for(i.sort(og),r=0;r<i.length;r++)e=ag(i[r],e);return e}function og(o,t){return o.x-t.x}function ag(o,t){const e=lg(o,t);if(!e)return t;const n=eh(e,o);return gi(n,n.next),gi(e,e.next)}function lg(o,t){let e=t,n=-1/0,i;const r=o.x,s=o.y;do{if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const d=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===r))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,l=i.x,c=i.y;let u=1/0,h;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&Fi(s<c?r:n,s,l,c,s<c?n:r,s,e.x,e.y)&&(h=Math.abs(s-e.y)/(r-e.x),Tr(e,o)&&(h<u||h===u&&(e.x>i.x||e.x===i.x&&cg(i,e)))&&(i=e,u=h)),e=e.next;while(e!==a);return i}function cg(o,t){return Pe(o.prev,o,t.prev)<0&&Pe(t.next,o,o.next)<0}function hg(o,t,e,n){let i=o;do i.z===0&&(i.z=ea(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==o);i.prevZ.nextZ=null,i.prevZ=null,ug(i)}function ug(o){let t,e,n,i,r,s,a,l,c=1;do{for(e=o,o=null,r=null,s=0;e;){for(s++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:o=i,i.prevZ=r,r=i;e=n}r.nextZ=null,c*=2}while(s>1);return o}function ea(o,t,e,n,i){return o=(o-e)*i|0,t=(t-n)*i|0,o=(o|o<<8)&16711935,o=(o|o<<4)&252645135,o=(o|o<<2)&858993459,o=(o|o<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,o|t<<1}function dg(o){let t=o,e=o;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==o);return e}function Fi(o,t,e,n,i,r,s,a){return(i-s)*(t-a)>=(o-s)*(r-a)&&(o-s)*(n-a)>=(e-s)*(t-a)&&(e-s)*(r-a)>=(i-s)*(n-a)}function fg(o,t){return o.next.i!==t.i&&o.prev.i!==t.i&&!pg(o,t)&&(Tr(o,t)&&Tr(t,o)&&mg(o,t)&&(Pe(o.prev,o,t.prev)||Pe(o,t.prev,t))||Ls(o,t)&&Pe(o.prev,o,o.next)>0&&Pe(t.prev,t,t.next)>0)}function Pe(o,t,e){return(t.y-o.y)*(e.x-t.x)-(t.x-o.x)*(e.y-t.y)}function Ls(o,t){return o.x===t.x&&o.y===t.y}function th(o,t,e,n){const i=as(Pe(o,t,e)),r=as(Pe(o,t,n)),s=as(Pe(e,n,o)),a=as(Pe(e,n,t));return!!(i!==r&&s!==a||i===0&&os(o,e,t)||r===0&&os(o,n,t)||s===0&&os(e,o,n)||a===0&&os(e,t,n))}function os(o,t,e){return t.x<=Math.max(o.x,e.x)&&t.x>=Math.min(o.x,e.x)&&t.y<=Math.max(o.y,e.y)&&t.y>=Math.min(o.y,e.y)}function as(o){return o>0?1:o<0?-1:0}function pg(o,t){let e=o;do{if(e.i!==o.i&&e.next.i!==o.i&&e.i!==t.i&&e.next.i!==t.i&&th(e,e.next,o,t))return!0;e=e.next}while(e!==o);return!1}function Tr(o,t){return Pe(o.prev,o,o.next)<0?Pe(o,t,o.next)>=0&&Pe(o,o.prev,t)>=0:Pe(o,t,o.prev)<0||Pe(o,o.next,t)<0}function mg(o,t){let e=o,n=!1;const i=(o.x+t.x)/2,r=(o.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==o);return n}function eh(o,t){const e=new na(o.i,o.x,o.y),n=new na(t.i,t.x,t.y),i=o.next,r=t.prev;return o.next=t,t.prev=o,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Yl(o,t,e,n){const i=new na(o,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function br(o){o.next.prev=o.prev,o.prev.next=o.next,o.prevZ&&(o.prevZ.nextZ=o.nextZ),o.nextZ&&(o.nextZ.prevZ=o.prevZ)}function na(o,t,e){this.i=o,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function vg(o,t,e,n){let i=0;for(let r=t,s=e-n;r<e;r+=n)i+=(o[s]-o[r])*(o[r+1]+o[s+1]),s=r;return i}class yr{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return yr.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];Kl(t),Zl(n,t);let s=t.length;e.forEach(Kl);for(let l=0;l<e.length;l++)i.push(s),s+=e[l].length,Zl(n,e[l]);const a=tg.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Kl(o){const t=o.length;t>2&&o[t-1].equals(o[0])&&o.pop()}function Zl(o,t){for(let e=0;e<t.length;e++)o.push(t[e].x),o.push(t[e].y)}class ba extends un{constructor(t=new $c([new Xt(0,.5),new Xt(-.5,-.5),new Xt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],s=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let u=0;u<t.length;u++)c(t[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Je(i,3)),this.setAttribute("normal",new Je(r,3)),this.setAttribute("uv",new Je(s,2));function c(u){const h=i.length/3,d=u.extractPoints(e);let f=d.shape;const m=d.holes;yr.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,v=m.length;p<v;p++){const x=m[p];yr.isClockWise(x)===!0&&(m[p]=x.reverse())}const g=yr.triangulateShape(f,m);for(let p=0,v=m.length;p<v;p++){const x=m[p];f=f.concat(x)}for(let p=0,v=f.length;p<v;p++){const x=f[p];i.push(x.x,x.y,0),r.push(0,0,1),s.push(x.x,x.y)}for(let p=0,v=g.length;p<v;p++){const x=g[p],_=x[0]+h,y=x[1]+h,R=x[2]+h;n.push(_,y,R),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return gg(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const s=e[t.shapes[i]];n.push(s)}return new ba(n,t.curveSegments)}}function gg(o,t){if(t.shapes=[],Array.isArray(o))for(let e=0,n=o.length;e<n;e++){const i=o[e];t.shapes.push(i.uuid)}else t.shapes.push(o.uuid);return t}class En extends Sn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bc,this.normalScale=new Xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class bn extends En{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Xt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return He(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}function ls(o,t,e){return!o||!e&&o.constructor===t?o:typeof t.BYTES_PER_ELEMENT=="number"?new t(o):Array.prototype.slice.call(o)}function xg(o){return ArrayBuffer.isView(o)&&!(o instanceof DataView)}function yg(o){function t(i,r){return o[i]-o[r]}const e=o.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function jl(o,t,e){const n=o.length,i=new o.constructor(n);for(let r=0,s=0;s!==n;++r){const a=e[r]*t;for(let l=0;l!==t;++l)i[s++]=o[a+l]}return i}function nh(o,t,e,n){let i=1,r=o[0];for(;r!==void 0&&r[n]===void 0;)r=o[i++];if(r===void 0)return;let s=r[n];if(s!==void 0)if(Array.isArray(s))do s=r[n],s!==void 0&&(t.push(r.time),e.push.apply(e,s)),r=o[i++];while(r!==void 0);else if(s.toArray!==void 0)do s=r[n],s!==void 0&&(t.push(r.time),s.toArray(e,e.length)),r=o[i++];while(r!==void 0);else do s=r[n],s!==void 0&&(t.push(r.time),e.push(s)),r=o[i++];while(r!==void 0)}class Pr{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let s;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break t}s=e.length;break e}if(!(t>=r)){const a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}s=n,n=0;break e}break n}for(;n<s;){const a=n+s>>>1;t<e[a]?s=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let s=0;s!==i;++s)e[s]=n[r+s];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class _g extends Pr{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ba,endingEnd:Ba}}intervalChanged_(t,e,n){const i=this.parameterPositions;let r=t-2,s=t+1,a=i[r],l=i[s];if(a===void 0)switch(this.getSettings_().endingStart){case Fa:r=t,a=2*e-n;break;case Oa:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Fa:s=t,l=2*n-e;break;case Oa:s=1,l=n+i[1]-i[0];break;default:s=t-1,l=e}const c=(n-e)*.5,u=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=s*u}interpolate_(t,e,n,i){const r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-e)/(i-e),g=m*m,p=g*m,v=-d*p+2*d*g-d*m,x=(1+d)*p+(-1.5-2*d)*g+(-.5+d)*m+1,_=(-1-f)*p+(1.5+f)*g+.5*m,y=f*p-f*g;for(let R=0;R!==a;++R)r[R]=v*s[u+R]+x*s[c+R]+_*s[l+R]+y*s[h+R];return r}}class Mg extends Pr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,u=(n-e)/(i-e),h=1-u;for(let d=0;d!==a;++d)r[d]=s[c+d]*h+s[l+d]*u;return r}}class Sg extends Pr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class Rn{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ls(e,this.TimeBufferType),this.values=ls(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ls(t.times,Array),values:ls(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Sg(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Mg(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new _g(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Sr:e=this.InterpolantFactoryMethodDiscrete;break;case Er:e=this.InterpolantFactoryMethodLinear;break;case Us:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Sr;case this.InterpolantFactoryMethodLinear:return Er;case this.InterpolantFactoryMethodSmooth:return Us}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length;let r=0,s=i-1;for(;r!==i&&n[r]<t;)++r;for(;s!==-1&&n[s]>e;)--s;if(++s,r!==0||s!==i){r>=s&&(s=Math.max(s,1),r=s-1);const a=this.getValueSize();this.times=n.slice(r,s),this.values=this.values.slice(r*a,s*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let s=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(s!==null&&s>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,s),t=!1;break}s=l}if(i!==void 0&&xg(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Us,r=t.length-1;let s=1;for(let a=1;a<r;++a){let l=!1;const c=t[a],u=t[a+1];if(c!==u&&(a!==1||c!==t[0]))if(i)l=!0;else{const h=a*n,d=h-n,f=h+n;for(let m=0;m!==n;++m){const g=e[h+m];if(g!==e[d+m]||g!==e[f+m]){l=!0;break}}}if(l){if(a!==s){t[s]=t[a];const h=a*n,d=s*n;for(let f=0;f!==n;++f)e[d+f]=e[h+f]}++s}}if(r>0){t[s]=t[r];for(let a=r*n,l=s*n,c=0;c!==n;++c)e[l+c]=e[a+c];++s}return s!==t.length?(this.times=t.slice(0,s),this.values=e.slice(0,s*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}Rn.prototype.TimeBufferType=Float32Array;Rn.prototype.ValueBufferType=Float32Array;Rn.prototype.DefaultInterpolation=Er;class er extends Rn{constructor(t,e,n){super(t,e,n)}}er.prototype.ValueTypeName="bool";er.prototype.ValueBufferType=Array;er.prototype.DefaultInterpolation=Sr;er.prototype.InterpolantFactoryMethodLinear=void 0;er.prototype.InterpolantFactoryMethodSmooth=void 0;class ih extends Rn{}ih.prototype.ValueTypeName="color";class ji extends Rn{}ji.prototype.ValueTypeName="number";class Eg extends Pr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e);let c=t*a;for(let u=c+a;c!==u;c+=4)hn.slerpFlat(r,0,s,c-a,s,c,l);return r}}class Ji extends Rn{InterpolantFactoryMethodLinear(t){return new Eg(this.times,this.values,this.getValueSize(),t)}}Ji.prototype.ValueTypeName="quaternion";Ji.prototype.InterpolantFactoryMethodSmooth=void 0;class nr extends Rn{constructor(t,e,n){super(t,e,n)}}nr.prototype.ValueTypeName="string";nr.prototype.ValueBufferType=Array;nr.prototype.DefaultInterpolation=Sr;nr.prototype.InterpolantFactoryMethodLinear=void 0;nr.prototype.InterpolantFactoryMethodSmooth=void 0;class $i extends Rn{}$i.prototype.ValueTypeName="vector";class wg{constructor(t="",e=-1,n=[],i=Xh){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=cn(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let s=0,a=n.length;s!==a;++s)e.push(Tg(n[s]).scale(i));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let r=0,s=n.length;r!==s;++r)e.push(Rn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const r=e.length,s=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const u=yg(l);l=jl(l,1,u),c=jl(c,1,u),!i&&l[0]===0&&(l.push(r),c.push(c[0])),s.push(new ji(".morphTargetInfluences["+e[a].name+"]",l,c).scale(1/n))}return new this(t,-1,s)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=t.length;a<l;a++){const c=t[a],u=c.name.match(r);if(u&&u.length>1){const h=u[1];let d=i[h];d||(i[h]=d=[]),d.push(c)}}const s=[];for(const a in i)s.push(this.CreateFromMorphTargetSequence(a,i[a],e,n));return s}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,m,g){if(f.length!==0){const p=[],v=[];nh(f,p,v,m),p.length!==0&&g.push(new h(d,p,v))}},i=[],r=t.name||"default",s=t.fps||30,a=t.blendMode;let l=t.length||-1;const c=t.hierarchy||[];for(let h=0;h<c.length;h++){const d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let g=0;g<d[m].morphTargets.length;g++)f[d[m].morphTargets[g]]=-1;for(const g in f){const p=[],v=[];for(let x=0;x!==d[m].morphTargets.length;++x){const _=d[m];p.push(_.time),v.push(_.morphTarget===g?1:0)}i.push(new ji(".morphTargetInfluence["+g+"]",p,v))}l=f.length*s}else{const f=".bones["+e[h].name+"]";n($i,f+".position",d,"pos",i),n(Ji,f+".quaternion",d,"rot",i),n($i,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Ag(o){switch(o.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ji;case"vector":case"vector2":case"vector3":case"vector4":return $i;case"color":return ih;case"quaternion":return Ji;case"bool":case"boolean":return er;case"string":return nr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+o)}function Tg(o){if(o.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=Ag(o.type);if(o.times===void 0){const e=[],n=[];nh(o.keys,e,n,"value"),o.times=e,o.values=n}return t.parse!==void 0?t.parse(o):new t(o.name,o.times,o.values,o.interpolation)}const ti={enabled:!1,files:{},add:function(o,t){this.enabled!==!1&&(this.files[o]=t)},get:function(o){if(this.enabled!==!1)return this.files[o]},remove:function(o){delete this.files[o]},clear:function(){this.files={}}};class bg{constructor(t,e,n){const i=this;let r=!1,s=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){a++,r===!1&&i.onStart!==void 0&&i.onStart(u,s,a),r=!0},this.itemEnd=function(u){s++,i.onProgress!==void 0&&i.onProgress(u,s,a),s===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],m=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null}}}const Rg=new bg;class ir{constructor(t){this.manager=t!==void 0?t:Rg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}ir.DEFAULT_MATERIAL_NAME="__DEFAULT";const Dn={};class Cg extends Error{constructor(t,e){super(t),this.response=e}}class rh extends ir{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=ti.get(t);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(Dn[t]!==void 0){Dn[t].push({onLoad:e,onProgress:n,onError:i});return}Dn[t]=[],Dn[t].push({onLoad:e,onProgress:n,onError:i});const s=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(s).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Dn[t],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let g=0;const p=new ReadableStream({start(v){x();function x(){h.read().then(({done:_,value:y})=>{if(_)v.close();else{g+=y.byteLength;const R=new ProgressEvent("progress",{lengthComputable:m,loaded:g,total:f});for(let C=0,L=u.length;C<L;C++){const N=u[C];N.onProgress&&N.onProgress(R)}v.enqueue(y),x()}},_=>{v.error(_)})}}});return new Response(p)}else throw new Cg(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{ti.add(t,c);const u=Dn[t];delete Dn[t];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=Dn[t];if(u===void 0)throw this.manager.itemError(t),c;delete Dn[t];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class Pg extends ir{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,s=ti.get(t);if(s!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(s),r.manager.itemEnd(t)},0),s;const a=wr("img");function l(){u(),ti.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(h){u(),i&&i(h),r.manager.itemError(t),r.manager.itemEnd(t)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class Lg extends ir{constructor(t){super(t)}load(t,e,n,i){const r=new Be,s=new Pg(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}}class Is extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Ig extends Is{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const po=new se,Jl=new k,$l=new k;class Ra{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xt(512,512),this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xa,this._frameExtents=new Xt(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Jl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Jl),$l.setFromMatrixPosition(t.target.matrixWorld),e.lookAt($l),e.updateMatrixWorld(),po.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(po),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(po)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Ng extends Ra{constructor(){super(new Ke(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Yi*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Dg extends Is{constructor(t,e,n=0,i=Math.PI/3,r=0,s=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.distance=n,this.angle=i,this.penumbra=r,this.decay=s,this.map=null,this.shadow=new Ng}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Ql=new se,ur=new k,mo=new k;class Ug extends Ra{constructor(){super(new Ke(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Xt(4,2),this._viewportCount=6,this._viewports=[new ge(2,1,1,1),new ge(0,1,1,1),new ge(3,1,1,1),new ge(1,1,1,1),new ge(3,0,1,1),new ge(1,0,1,1)],this._cubeDirections=[new k(1,0,0),new k(-1,0,0),new k(0,0,1),new k(0,0,-1),new k(0,1,0),new k(0,-1,0)],this._cubeUps=[new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,0,1),new k(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ur.setFromMatrixPosition(t.matrixWorld),n.position.copy(ur),mo.copy(n.position),mo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(mo),n.updateMatrixWorld(),i.makeTranslation(-ur.x,-ur.y,-ur.z),Ql.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ql)}}class bs extends Is{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Ug}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Bg extends Ra{constructor(){super(new ya(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Fg extends Is{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new Bg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class _r{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class Og extends ir{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,s=ti.get(t);if(s!==void 0){if(r.manager.itemStart(t),s.then){s.then(c=>{e&&e(c),r.manager.itemEnd(t)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){e&&e(s),r.manager.itemEnd(t)},0),s}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(t,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return ti.add(t,c),e&&e(c),r.manager.itemEnd(t),c}).catch(function(c){i&&i(c),ti.remove(t),r.manager.itemError(t),r.manager.itemEnd(t)});ti.add(t,l),r.manager.itemStart(t)}}const Ca="\\[\\]\\.:\\/",zg=new RegExp("["+Ca+"]","g"),Pa="[^"+Ca+"]",Vg="[^"+Ca.replace("\\.","")+"]",kg=/((?:WC+[\/:])*)/.source.replace("WC",Pa),Hg=/(WCOD+)?/.source.replace("WCOD",Vg),Gg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Pa),Wg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Pa),Xg=new RegExp("^"+kg+Hg+Gg+Wg+"$"),qg=["material","materials","bones","map"];class Yg{constructor(t,e,n){const i=n||ye.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class ye{constructor(t,e,n){this.path=e,this.parsedPath=n||ye.parseTrackName(e),this.node=ye.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new ye.Composite(t,e,n):new ye(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(zg,"")}static parseTrackName(t){const e=Xg.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);qg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(r){for(let s=0;s<r.length;s++){const a=r[s];if(a.name===e||a.uuid===e)return a;const l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let r=e.propertyIndex;if(t||(t=ye.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}const s=t[i];if(s===void 0){const c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=r}else s.fromArray!==void 0&&s.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(l=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ye.Composite=Yg;ye.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ye.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ye.prototype.GetterByBindingType=[ye.prototype._getValue_direct,ye.prototype._getValue_array,ye.prototype._getValue_arrayElement,ye.prototype._getValue_toArray];ye.prototype.SetterByBindingTypeAndVersioning=[[ye.prototype._setValue_direct,ye.prototype._setValue_direct_setNeedsUpdate,ye.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ye.prototype._setValue_array,ye.prototype._setValue_array_setNeedsUpdate,ye.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ye.prototype._setValue_arrayElement,ye.prototype._setValue_arrayElement_setNeedsUpdate,ye.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ye.prototype._setValue_fromArray,ye.prototype._setValue_fromArray_setNeedsUpdate,ye.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const tc=new se;class Kg{constructor(t,e,n=0,i=1/0){this.ray=new Cr(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new ga,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return tc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(tc),this}intersectObject(t,e=!0,n=[]){return ia(t,this,n,e),n.sort(ec),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)ia(t[i],this,n,e);return n.sort(ec),n}}function ec(o,t){return o.distance-t.distance}function ia(o,t,e,n){let i=!0;if(o.layers.test(t.layers)&&o.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=o.children;for(let s=0,a=r.length;s<a;s++)ia(r[s],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oa);function nc(o,t){if(t===qh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),o;if(t===Zo||t===Tc){let e=o.getIndex();if(e===null){const s=[],a=o.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)s.push(l);o.setIndex(s),e=o.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),o}const n=e.count-2,i=[];if(t===Zo)for(let s=1;s<=n;s++)i.push(e.getX(0)),i.push(e.getX(s)),i.push(e.getX(s+1));else for(let s=0;s<n;s++)s%2===0?(i.push(e.getX(s)),i.push(e.getX(s+1)),i.push(e.getX(s+2))):(i.push(e.getX(s+2)),i.push(e.getX(s+1)),i.push(e.getX(s)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=o.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),o}class Zg extends ir{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new t0(e)}),this.register(function(e){return new e0(e)}),this.register(function(e){return new h0(e)}),this.register(function(e){return new u0(e)}),this.register(function(e){return new d0(e)}),this.register(function(e){return new i0(e)}),this.register(function(e){return new r0(e)}),this.register(function(e){return new s0(e)}),this.register(function(e){return new o0(e)}),this.register(function(e){return new Qg(e)}),this.register(function(e){return new a0(e)}),this.register(function(e){return new n0(e)}),this.register(function(e){return new c0(e)}),this.register(function(e){return new l0(e)}),this.register(function(e){return new Jg(e)}),this.register(function(e){return new f0(e)}),this.register(function(e){return new p0(e)})}load(t,e,n,i){const r=this;let s;if(this.resourcePath!=="")s=this.resourcePath;else if(this.path!==""){const c=_r.extractUrlBase(t);s=_r.resolveURL(c,this.path)}else s=_r.extractUrlBase(t);this.manager.itemStart(t);const a=function(c){i?i(c):console.error(c),r.manager.itemError(t),r.manager.itemEnd(t)},l=new rh(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(t,function(c){try{r.parse(c,s,function(u){e(u),r.manager.itemEnd(t)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,i){let r;const s={},a={},l=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(l.decode(new Uint8Array(t,0,4))===sh){try{s[fe.KHR_BINARY_GLTF]=new m0(t)}catch(h){i&&i(h);return}r=JSON.parse(s[fe.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new R0(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,s[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case fe.KHR_MATERIALS_UNLIT:s[h]=new $g;break;case fe.KHR_DRACO_MESH_COMPRESSION:s[h]=new v0(r,this.dracoLoader);break;case fe.KHR_TEXTURE_TRANSFORM:s[h]=new g0;break;case fe.KHR_MESH_QUANTIZATION:s[h]=new x0;break;default:d.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(s),c.setPlugins(a),c.parse(n,i)}parseAsync(t,e){const n=this;return new Promise(function(i,r){n.parse(t,e,i,r)})}}function jg(){let o={};return{get:function(t){return o[t]},add:function(t,e){o[t]=e},remove:function(t){delete o[t]},removeAll:function(){o={}}}}const fe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Jg{constructor(t){this.parser=t,this.name=fe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let n=0,i=e.length;n<i;n++){const r=e[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){const e=this.parser,n="light:"+t;let i=e.cache.get(n);if(i)return i;const r=e.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t];let c;const u=new ee(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Ge);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Fg(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new bs(u),c.distance=h;break;case"spot":c=new Dg(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Bn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=e.createUniqueName(l.name||"light_"+t),i=Promise.resolve(c),e.cache.add(n,i),i}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,n=this.parser,r=n.json.nodes[t],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(e.cache,a,l)})}}class $g{constructor(){this.name=fe.KHR_MATERIALS_UNLIT}getMaterialType(){return ln}extendParams(t,e,n){const i=[];t.color=new ee(1,1,1),t.opacity=1;const r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const s=r.baseColorFactor;t.color.setRGB(s[0],s[1],s[2],Ge),t.opacity=s[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(t,"map",r.baseColorTexture,ke))}return Promise.all(i)}}class Qg{constructor(t){this.parser=t,this.name=fe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(e.emissiveIntensity=r),Promise.resolve()}}class t0{constructor(t){this.parser=t,this.name=fe.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],s=i.extensions[this.name];if(s.clearcoatFactor!==void 0&&(e.clearcoat=s.clearcoatFactor),s.clearcoatTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatMap",s.clearcoatTexture)),s.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=s.clearcoatRoughnessFactor),s.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatRoughnessMap",s.clearcoatRoughnessTexture)),s.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(e,"clearcoatNormalMap",s.clearcoatNormalTexture)),s.clearcoatNormalTexture.scale!==void 0)){const a=s.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new Xt(a,a)}return Promise.all(r)}}class e0{constructor(t){this.parser=t,this.name=fe.KHR_MATERIALS_DISPERSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return e.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class n0{constructor(t){this.parser=t,this.name=fe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],s=i.extensions[this.name];return s.iridescenceFactor!==void 0&&(e.iridescence=s.iridescenceFactor),s.iridescenceTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceMap",s.iridescenceTexture)),s.iridescenceIor!==void 0&&(e.iridescenceIOR=s.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),s.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=s.iridescenceThicknessMinimum),s.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=s.iridescenceThicknessMaximum),s.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceThicknessMap",s.iridescenceThicknessTexture)),Promise.all(r)}}class i0{constructor(t){this.parser=t,this.name=fe.KHR_MATERIALS_SHEEN}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];e.sheenColor=new ee(0,0,0),e.sheenRoughness=0,e.sheen=1;const s=i.extensions[this.name];if(s.sheenColorFactor!==void 0){const a=s.sheenColorFactor;e.sheenColor.setRGB(a[0],a[1],a[2],Ge)}return s.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=s.sheenRoughnessFactor),s.sheenColorTexture!==void 0&&r.push(n.assignTexture(e,"sheenColorMap",s.sheenColorTexture,ke)),s.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"sheenRoughnessMap",s.sheenRoughnessTexture)),Promise.all(r)}}class r0{constructor(t){this.parser=t,this.name=fe.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],s=i.extensions[this.name];return s.transmissionFactor!==void 0&&(e.transmission=s.transmissionFactor),s.transmissionTexture!==void 0&&r.push(n.assignTexture(e,"transmissionMap",s.transmissionTexture)),Promise.all(r)}}class s0{constructor(t){this.parser=t,this.name=fe.KHR_MATERIALS_VOLUME}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],s=i.extensions[this.name];e.thickness=s.thicknessFactor!==void 0?s.thicknessFactor:0,s.thicknessTexture!==void 0&&r.push(n.assignTexture(e,"thicknessMap",s.thicknessTexture)),e.attenuationDistance=s.attenuationDistance||1/0;const a=s.attenuationColor||[1,1,1];return e.attenuationColor=new ee().setRGB(a[0],a[1],a[2],Ge),Promise.all(r)}}class o0{constructor(t){this.parser=t,this.name=fe.KHR_MATERIALS_IOR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return e.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class a0{constructor(t){this.parser=t,this.name=fe.KHR_MATERIALS_SPECULAR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],s=i.extensions[this.name];e.specularIntensity=s.specularFactor!==void 0?s.specularFactor:1,s.specularTexture!==void 0&&r.push(n.assignTexture(e,"specularIntensityMap",s.specularTexture));const a=s.specularColorFactor||[1,1,1];return e.specularColor=new ee().setRGB(a[0],a[1],a[2],Ge),s.specularColorTexture!==void 0&&r.push(n.assignTexture(e,"specularColorMap",s.specularColorTexture,ke)),Promise.all(r)}}class l0{constructor(t){this.parser=t,this.name=fe.EXT_MATERIALS_BUMP}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],s=i.extensions[this.name];return e.bumpScale=s.bumpFactor!==void 0?s.bumpFactor:1,s.bumpTexture!==void 0&&r.push(n.assignTexture(e,"bumpMap",s.bumpTexture)),Promise.all(r)}}class c0{constructor(t){this.parser=t,this.name=fe.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:bn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],s=i.extensions[this.name];return s.anisotropyStrength!==void 0&&(e.anisotropy=s.anisotropyStrength),s.anisotropyRotation!==void 0&&(e.anisotropyRotation=s.anisotropyRotation),s.anisotropyTexture!==void 0&&r.push(n.assignTexture(e,"anisotropyMap",s.anisotropyTexture)),Promise.all(r)}}class h0{constructor(t){this.parser=t,this.name=fe.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,n=e.json,i=n.textures[t];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],s=e.options.ktx2Loader;if(!s){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,s)}}class u0{constructor(t){this.parser=t,this.name=fe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,i=n.json,r=i.textures[t];if(!r.extensions||!r.extensions[e])return null;const s=r.extensions[e],a=i.images[s.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(t,s.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class d0{constructor(t){this.parser=t,this.name=fe.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,i=n.json,r=i.textures[t];if(!r.extensions||!r.extensions[e])return null;const s=r.extensions[e],a=i.images[s.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(t,s.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class f0{constructor(t){this.name=fe.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){const e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),s=this.parser.options.meshoptDecoder;if(!s||!s.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,h=i.byteStride,d=new Uint8Array(a,l,c);return s.decodeGltfBufferAsync?s.decodeGltfBufferAsync(u,h,d,i.mode,i.filter).then(function(f){return f.buffer}):s.ready.then(function(){const f=new ArrayBuffer(u*h);return s.decodeGltfBuffer(new Uint8Array(f),u,h,d,i.mode,i.filter),f})})}else return null}}class p0{constructor(t){this.name=fe.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=e.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==sn.TRIANGLES&&c.mode!==sn.TRIANGLE_STRIP&&c.mode!==sn.TRIANGLE_FAN&&c.mode!==void 0)return null;const s=n.extensions[this.name].attributes,a=[],l={};for(const c in s)a.push(this.parser.getDependency("accessor",s[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(c=>{const u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,f=[];for(const m of h){const g=new se,p=new k,v=new hn,x=new k(1,1,1),_=new Bv(m.geometry,m.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&v.fromBufferAttribute(l.ROTATION,y),l.SCALE&&x.fromBufferAttribute(l.SCALE,y),_.setMatrixAt(y,g.compose(p,v,x));for(const y in l)if(y==="_COLOR_0"){const R=l[y];_.instanceColor=new $o(R.array,R.itemSize,R.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&m.geometry.setAttribute(y,l[y]);Ce.prototype.copy.call(_,m),this.parser.assignFinalMaterial(_),f.push(_)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const sh="glTF",dr=12,ic={JSON:1313821514,BIN:5130562};class m0{constructor(t){this.name=fe.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,dr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==sh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-dr,r=new DataView(t,dr);let s=0;for(;s<i;){const a=r.getUint32(s,!0);s+=4;const l=r.getUint32(s,!0);if(s+=4,l===ic.JSON){const c=new Uint8Array(t,dr+s,a);this.content=n.decode(c)}else if(l===ic.BIN){const c=dr+s;this.body=t.slice(c,c+a)}s+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class v0{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=fe.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const n=this.json,i=this.dracoLoader,r=t.extensions[this.name].bufferView,s=t.extensions[this.name].attributes,a={},l={},c={};for(const u in s){const h=ra[u]||u.toLowerCase();a[h]=s[u]}for(const u in t.attributes){const h=ra[u]||u.toLowerCase();if(s[u]!==void 0){const d=n.accessors[t.attributes[u]],f=ki[d.componentType];c[h]=f.name,l[h]=d.normalized===!0}}return e.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){i.decodeDracoFile(u,function(f){for(const m in f.attributes){const g=f.attributes[m],p=l[m];p!==void 0&&(g.normalized=p)}h(f)},a,c,Ge,d)})})}}class g0{constructor(){this.name=fe.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}}class x0{constructor(){this.name=fe.KHR_MESH_QUANTIZATION}}class oh extends Pr{constructor(t,e,n,i){super(t,e,n,i)}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i*3+i;for(let s=0;s!==i;s++)e[s]=n[r+s];return e}interpolate_(t,e,n,i){const r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-e,h=(n-e)/u,d=h*h,f=d*h,m=t*c,g=m-c,p=-2*f+3*d,v=f-d,x=1-p,_=v-d+h;for(let y=0;y!==a;y++){const R=s[g+y+a],C=s[g+y+l]*u,L=s[m+y+a],N=s[m+y]*u;r[y]=x*R+_*C+p*L+v*N}return r}}const y0=new hn;class _0 extends oh{interpolate_(t,e,n,i){const r=super.interpolate_(t,e,n,i);return y0.fromArray(r).normalize().toArray(r),r}}const sn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ki={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},rc={9728:Ze,9729:nn,9984:vc,9985:hs,9986:fr,9987:Fn},sc={33071:Qn,33648:xs,10497:Wi},vo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ra={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Kn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},M0={CUBICSPLINE:void 0,LINEAR:Er,STEP:Sr},go={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function S0(o){return o.DefaultMaterial===void 0&&(o.DefaultMaterial=new En({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:wn})),o.DefaultMaterial}function ui(o,t,e){for(const n in e.extensions)o[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function Bn(o,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(o.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function E0(o,t,e){let n=!1,i=!1,r=!1;for(let c=0,u=t.length;c<u;c++){const h=t[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(o);const s=[],a=[],l=[];for(let c=0,u=t.length;c<u;c++){const h=t[c];if(n){const d=h.POSITION!==void 0?e.getDependency("accessor",h.POSITION):o.attributes.position;s.push(d)}if(i){const d=h.NORMAL!==void 0?e.getDependency("accessor",h.NORMAL):o.attributes.normal;a.push(d)}if(r){const d=h.COLOR_0!==void 0?e.getDependency("accessor",h.COLOR_0):o.attributes.color;l.push(d)}}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],d=c[2];return n&&(o.morphAttributes.position=u),i&&(o.morphAttributes.normal=h),r&&(o.morphAttributes.color=d),o.morphTargetsRelative=!0,o})}function w0(o,t){if(o.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)o.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(o.morphTargetInfluences.length===e.length){o.morphTargetDictionary={};for(let n=0,i=e.length;n<i;n++)o.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function A0(o){let t;const e=o.extensions&&o.extensions[fe.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+xo(e.attributes):t=o.indices+":"+xo(o.attributes)+":"+o.mode,o.targets!==void 0)for(let n=0,i=o.targets.length;n<i;n++)t+=":"+xo(o.targets[n]);return t}function xo(o){let t="";const e=Object.keys(o).sort();for(let n=0,i=e.length;n<i;n++)t+=e[n]+":"+o[e[n]]+";";return t}function sa(o){switch(o){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function T0(o){return o.search(/\.jpe?g($|\?)/i)>0||o.search(/^data\:image\/jpeg/)===0?"image/jpeg":o.search(/\.webp($|\?)/i)>0||o.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const b0=new se;class R0{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new jg,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,s=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,s=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&s<98?this.textureLoader=new Lg(this.options.manager):this.textureLoader=new Og(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new rh(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(s){return s._markDefs&&s._markDefs()}),Promise.all(this._invokeAll(function(s){return s.beforeRoot&&s.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(s){const a={scene:s[0][i.scene||0],scenes:s[0],animations:s[1],cameras:s[2],asset:i.asset,parser:n,userData:{}};return ui(r,a,i),Bn(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=e.length;i<r;i++){const s=e[i].joints;for(let a=0,l=s.length;a<l;a++)t[s[a]].isBone=!0}for(let i=0,r=t.length;i<r;i++){const s=t[i];s.mesh!==void 0&&(this._addNodeRef(this.meshCache,s.mesh),s.skin!==void 0&&(n[s.mesh].isSkinnedMesh=!0)),s.camera!==void 0&&this._addNodeRef(this.cameraCache,s.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;const i=n.clone(),r=(s,a)=>{const l=this.associations.get(s);l!=null&&this.associations.set(a,l);for(const[c,u]of s.children.entries())r(u,a.children[c])};return r(n,i),i.name+="_instance_"+t.uses[e]++,i}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){const i=t(e[n]);if(i)return i}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const n=[];for(let i=0;i<e.length;i++){const r=t(e[i]);r&&n.push(r)}return n}getDependency(t,e){const n=t+":"+e;let i=this.cache.get(n);if(!i){switch(t){case"scene":i=this.loadScene(e);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":i=this.loadAccessor(e);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":i=this.loadBuffer(e);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":i=this.loadSkin(e);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":i=this.loadCamera(e);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!i)throw new Error("Unknown type: "+t);break}this.cache.add(n,i)}return i}getDependencies(t){let e=this.cache.get(t);if(!e){const n=this,i=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(i.map(function(r,s){return n.getDependency(t,s)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[fe.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,s){n.load(_r.resolveURL(e.uri,i.path),r,void 0,function(){s(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){const i=e.byteLength||0,r=e.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(t){const e=this,n=this.json,i=this.json.accessors[t];if(i.bufferView===void 0&&i.sparse===void 0){const s=vo[i.type],a=ki[i.componentType],l=i.normalized===!0,c=new a(i.count*s);return Promise.resolve(new je(c,s,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(s){const a=s[0],l=vo[i.type],c=ki[i.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0;let g,p;if(f&&f!==h){const v=Math.floor(d/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+v+":"+i.count;let _=e.cache.get(x);_||(g=new c(a,v*f,i.count*f/u),_=new Lv(g,f/u),e.cache.add(x,_)),p=new Sa(_,l,d%f/u,m)}else a===null?g=new c(i.count*l):g=new c(a,d,i.count*l),p=new je(g,l,m);if(i.sparse!==void 0){const v=vo.SCALAR,x=ki[i.sparse.indices.componentType],_=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,R=new x(s[1],_,i.sparse.count*v),C=new c(s[2],y,i.sparse.count*l);a!==null&&(p=new je(p.array.slice(),p.itemSize,p.normalized));for(let L=0,N=R.length;L<N;L++){const E=R[L];if(p.setX(E,C[L*l]),l>=2&&p.setY(E,C[L*l+1]),l>=3&&p.setZ(E,C[L*l+2]),l>=4&&p.setW(E,C[L*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return p})}loadTexture(t){const e=this.json,n=this.options,r=e.textures[t].source,s=e.images[r];let a=this.textureLoader;if(s.uri){const l=n.manager.getHandler(s.uri);l!==null&&(a=l)}return this.loadTextureImage(t,r,a)}loadTextureImage(t,e,n){const i=this,r=this.json,s=r.textures[t],a=r.images[e],l=(a.uri||a.bufferView)+":"+s.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(e,n).then(function(u){u.flipY=!1,u.name=s.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const d=(r.samplers||{})[s.sampler]||{};return u.magFilter=rc[d.magFilter]||nn,u.minFilter=rc[d.minFilter]||Fn,u.wrapS=sc[d.wrapS]||Wi,u.wrapT=sc[d.wrapT]||Wi,i.associations.set(u,{textures:t}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(t,e){const n=this,i=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(h=>h.clone());const s=i.images[t],a=self.URL||self.webkitURL;let l=s.uri||"",c=!1;if(s.bufferView!==void 0)l=n.getDependency("bufferView",s.bufferView).then(function(h){c=!0;const d=new Blob([h],{type:s.mimeType});return l=a.createObjectURL(d),l});else if(s.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(h){return new Promise(function(d,f){let m=d;e.isImageBitmapLoader===!0&&(m=function(g){const p=new Be(g);p.needsUpdate=!0,d(p)}),e.load(_r.resolveURL(h,r.path),m,void 0,f)})}).then(function(h){return c===!0&&a.revokeObjectURL(l),Bn(h,s),h.userData.mimeType=s.mimeType||T0(s.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[t]=u,u}assignTexture(t,e,n,i){const r=this;return this.getDependency("texture",n.index).then(function(s){if(!s)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(s=s.clone(),s.channel=n.texCoord),r.extensions[fe.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[fe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(s);s=r.extensions[fe.KHR_TEXTURE_TRANSFORM].extendTexture(s,a),r.associations.set(s,l)}}return i!==void 0&&(s.colorSpace=i),t[e]=s,s})}assignFinalMaterial(t){const e=t.geometry;let n=t.material;const i=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,s=e.attributes.normal===void 0;if(t.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Yc,Sn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(t.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new qc,Sn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||r||s){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),s&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),s&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}t.material=n}getMaterialType(){return En}loadMaterial(t){const e=this,n=this.json,i=this.extensions,r=n.materials[t];let s;const a={},l=r.extensions||{},c=[];if(l[fe.KHR_MATERIALS_UNLIT]){const h=i[fe.KHR_MATERIALS_UNLIT];s=h.getMaterialType(),c.push(h.extendParams(a,r,e))}else{const h=r.pbrMetallicRoughness||{};if(a.color=new ee(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Ge),a.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(e.assignTexture(a,"map",h.baseColorTexture,ke)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(e.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),c.push(e.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),s=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(t)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(t,a)})))}r.doubleSided===!0&&(a.side=on);const u=r.alphaMode||go.OPAQUE;if(u===go.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===go.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&s!==ln&&(c.push(e.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Xt(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&s!==ln&&(c.push(e.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&s!==ln){const h=r.emissiveFactor;a.emissive=new ee().setRGB(h[0],h[1],h[2],Ge)}return r.emissiveTexture!==void 0&&s!==ln&&c.push(e.assignTexture(a,"emissiveMap",r.emissiveTexture,ke)),Promise.all(c).then(function(){const h=new s(a);return r.name&&(h.name=r.name),Bn(h,r),e.associations.set(h,{materials:t}),r.extensions&&ui(i,h,r),h})}createUniqueName(t){const e=ye.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[fe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(l){return oc(l,a,e)})}const s=[];for(let a=0,l=t.length;a<l;a++){const c=t[a],u=A0(c),h=i[u];if(h)s.push(h.promise);else{let d;c.extensions&&c.extensions[fe.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=oc(new un,c,e),i[u]={primitive:c,promise:d},s.push(d)}}return Promise.all(s)}loadMesh(t){const e=this,n=this.json,i=this.extensions,r=n.meshes[t],s=r.primitives,a=[];for(let l=0,c=s.length;l<c;l++){const u=s[l].material===void 0?S0(this.cache):this.getDependency("material",s[l].material);a.push(u)}return a.push(e.loadGeometries(s)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let f=0,m=u.length;f<m;f++){const g=u[f],p=s[f];let v;const x=c[f];if(p.mode===sn.TRIANGLES||p.mode===sn.TRIANGLE_STRIP||p.mode===sn.TRIANGLE_FAN||p.mode===void 0)v=r.isSkinnedMesh===!0?new Nv(g,x):new Ne(g,x),v.isSkinnedMesh===!0&&v.normalizeSkinWeights(),p.mode===sn.TRIANGLE_STRIP?v.geometry=nc(v.geometry,Tc):p.mode===sn.TRIANGLE_FAN&&(v.geometry=nc(v.geometry,Zo));else if(p.mode===sn.LINES)v=new Fv(g,x);else if(p.mode===sn.LINE_STRIP)v=new wa(g,x);else if(p.mode===sn.LINE_LOOP)v=new Ov(g,x);else if(p.mode===sn.POINTS)v=new zv(g,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(v.geometry.morphAttributes).length>0&&w0(v,r),v.name=e.createUniqueName(r.name||"mesh_"+t),Bn(v,r),p.extensions&&ui(i,v,p),e.assignFinalMaterial(v),h.push(v)}for(let f=0,m=h.length;f<m;f++)e.associations.set(h[f],{meshes:t,primitives:f});if(h.length===1)return r.extensions&&ui(i,h[0],r),h[0];const d=new Mn;r.extensions&&ui(i,d,r),e.associations.set(d,{meshes:t});for(let f=0,m=h.length;f<m;f++)d.add(h[f]);return d})}loadCamera(t){let e;const n=this.json.cameras[t],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new Ke(Es.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(e=new ya(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),Bn(e,n),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],n=[];for(let i=0,r=e.joints.length;i<r;i++)n.push(this._loadNodeShallow(e.joints[i]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),s=i,a=[],l=[];for(let c=0,u=s.length;c<u;c++){const h=s[c];if(h){a.push(h);const d=new se;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[c])}return new Ea(a,l)})}loadAnimation(t){const e=this.json,n=this,i=e.animations[t],r=i.name?i.name:"animation_"+t,s=[],a=[],l=[],c=[],u=[];for(let h=0,d=i.channels.length;h<d;h++){const f=i.channels[h],m=i.samplers[f.sampler],g=f.target,p=g.node,v=i.parameters!==void 0?i.parameters[m.input]:m.input,x=i.parameters!==void 0?i.parameters[m.output]:m.output;g.node!==void 0&&(s.push(this.getDependency("node",p)),a.push(this.getDependency("accessor",v)),l.push(this.getDependency("accessor",x)),c.push(m),u.push(g))}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(h){const d=h[0],f=h[1],m=h[2],g=h[3],p=h[4],v=[];for(let x=0,_=d.length;x<_;x++){const y=d[x],R=f[x],C=m[x],L=g[x],N=p[x];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const E=n._createAnimationTracks(y,R,C,L,N);if(E)for(let M=0;M<E.length;M++)v.push(E[M])}return new wg(r,void 0,v)})}createNodeMesh(t){const e=this.json,n=this,i=e.nodes[t];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const s=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&s.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),s})}loadNode(t){const e=this.json,n=this,i=e.nodes[t],r=n._loadNodeShallow(t),s=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)s.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(s),l]).then(function(c){const u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,b0)});for(let f=0,m=h.length;f<m;f++)u.add(h[f]);return u})}_loadNodeShallow(t){const e=this.json,n=this.extensions,i=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const r=e.nodes[t],s=r.name?i.createUniqueName(r.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(t)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(t)}).forEach(function(c){a.push(c)}),this.nodeCache[t]=Promise.all(a).then(function(c){let u;if(r.isBone===!0?u=new Wc:c.length>1?u=new Mn:c.length===1?u=c[0]:u=new Ce,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(r.name&&(u.userData.name=r.name,u.name=s),Bn(u,r),r.extensions&&ui(n,u,r),r.matrix!==void 0){const h=new se;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=t,u}),this.nodeCache[t]}loadScene(t){const e=this.extensions,n=this.json.scenes[t],i=this,r=new Mn;n.name&&(r.name=i.createUniqueName(n.name)),Bn(r,n),n.extensions&&ui(e,r,n);const s=n.nodes||[],a=[];for(let l=0,c=s.length;l<c;l++)a.push(i.getDependency("node",s[l]));return Promise.all(a).then(function(l){for(let u=0,h=l.length;u<h;u++)r.add(l[u]);const c=u=>{const h=new Map;for(const[d,f]of i.associations)(d instanceof Sn||d instanceof Be)&&h.set(d,f);return u.traverse(d=>{const f=i.associations.get(d);f!=null&&h.set(d,f)}),h};return i.associations=c(r),r})}_createAnimationTracks(t,e,n,i,r){const s=[],a=t.name?t.name:t.uuid,l=[];Kn[r.path]===Kn.weights?t.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(Kn[r.path]){case Kn.weights:c=ji;break;case Kn.rotation:c=Ji;break;case Kn.position:case Kn.scale:c=$i;break;default:switch(n.itemSize){case 1:c=ji;break;case 2:case 3:default:c=$i;break}break}const u=i.interpolation!==void 0?M0[i.interpolation]:Er,h=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const m=new c(l[d]+"."+Kn[r.path],e.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),s.push(m)}return s}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const n=sa(e.constructor),i=new Float32Array(e.length);for(let r=0,s=e.length;r<s;r++)i[r]=e[r]*n;e=i}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){const i=this instanceof Ji?_0:oh;return new i(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function C0(o,t,e){const n=t.attributes,i=new kn;if(n.POSITION!==void 0){const a=e.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new k(l[0],l[1],l[2]),new k(c[0],c[1],c[2])),a.normalized){const u=sa(ki[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=t.targets;if(r!==void 0){const a=new k,l=new k;for(let c=0,u=r.length;c<u;c++){const h=r[c];if(h.POSITION!==void 0){const d=e.json.accessors[h.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){const g=sa(ki[d.componentType]);l.multiplyScalar(g)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}o.boundingBox=i;const s=new An;i.getCenter(s.center),s.radius=i.min.distanceTo(i.max)/2,o.boundingSphere=s}function oc(o,t,e){const n=t.attributes,i=[];function r(s,a){return e.getDependency("accessor",s).then(function(l){o.setAttribute(a,l)})}for(const s in n){const a=ra[s]||s.toLowerCase();a in o.attributes||i.push(r(n[s],a))}if(t.indices!==void 0&&!o.index){const s=e.getDependency("accessor",t.indices).then(function(a){o.setIndex(a)});i.push(s)}return ve.workingColorSpace!==Ge&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ve.workingColorSpace}" not supported.`),Bn(o,t),C0(o,t,e),Promise.all(i).then(function(){return t.targets!==void 0?E0(o,t.targets,e):o})}function P0(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}function cs(o){throw new Error('Could not dynamically require "'+o+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var ah={exports:{}};(function(o,t){(function(e){o.exports=e()})(function(){return function e(n,i,r){function s(c,u){if(!i[c]){if(!n[c]){var h=typeof cs=="function"&&cs;if(!u&&h)return h(c,!0);if(a)return a(c,!0);throw new Error("Cannot find module '"+c+"'")}var d=i[c]={exports:{}};n[c][0].call(d.exports,function(f){var m=n[c][1][f];return s(m||f)},d,d.exports,e,n,i,r)}return i[c].exports}for(var a=typeof cs=="function"&&cs,l=0;l<r.length;l++)s(r[l]);return s}({1:[function(e,n,i){n.exports={name:"cannon",version:"0.6.2",description:"A lightweight 3D physics engine written in JavaScript.",homepage:"https://github.com/schteppe/cannon.js",author:"Stefan Hedman <schteppe@gmail.com> (http://steffe.se)",keywords:["cannon.js","cannon","physics","engine","3d"],main:"./build/cannon.js",engines:{node:"*"},repository:{type:"git",url:"https://github.com/schteppe/cannon.js.git"},bugs:{url:"https://github.com/schteppe/cannon.js/issues"},licenses:[{type:"MIT"}],devDependencies:{jshint:"latest","uglify-js":"latest",nodeunit:"^0.9.0",grunt:"~0.4.0","grunt-contrib-jshint":"~0.1.1","grunt-contrib-nodeunit":"^0.4.1","grunt-contrib-concat":"~0.1.3","grunt-contrib-uglify":"^0.5.1","grunt-browserify":"^2.1.4","grunt-contrib-yuidoc":"^0.5.2",browserify:"*"},dependencies:{}}},{}],2:[function(e,n,i){n.exports={version:e("../package.json").version,AABB:e("./collision/AABB"),ArrayCollisionMatrix:e("./collision/ArrayCollisionMatrix"),Body:e("./objects/Body"),Box:e("./shapes/Box"),Broadphase:e("./collision/Broadphase"),Constraint:e("./constraints/Constraint"),ContactEquation:e("./equations/ContactEquation"),Narrowphase:e("./world/Narrowphase"),ConeTwistConstraint:e("./constraints/ConeTwistConstraint"),ContactMaterial:e("./material/ContactMaterial"),ConvexPolyhedron:e("./shapes/ConvexPolyhedron"),Cylinder:e("./shapes/Cylinder"),DistanceConstraint:e("./constraints/DistanceConstraint"),Equation:e("./equations/Equation"),EventTarget:e("./utils/EventTarget"),FrictionEquation:e("./equations/FrictionEquation"),GSSolver:e("./solver/GSSolver"),GridBroadphase:e("./collision/GridBroadphase"),Heightfield:e("./shapes/Heightfield"),HingeConstraint:e("./constraints/HingeConstraint"),LockConstraint:e("./constraints/LockConstraint"),Mat3:e("./math/Mat3"),Material:e("./material/Material"),NaiveBroadphase:e("./collision/NaiveBroadphase"),ObjectCollisionMatrix:e("./collision/ObjectCollisionMatrix"),Pool:e("./utils/Pool"),Particle:e("./shapes/Particle"),Plane:e("./shapes/Plane"),PointToPointConstraint:e("./constraints/PointToPointConstraint"),Quaternion:e("./math/Quaternion"),Ray:e("./collision/Ray"),RaycastVehicle:e("./objects/RaycastVehicle"),RaycastResult:e("./collision/RaycastResult"),RigidVehicle:e("./objects/RigidVehicle"),RotationalEquation:e("./equations/RotationalEquation"),RotationalMotorEquation:e("./equations/RotationalMotorEquation"),SAPBroadphase:e("./collision/SAPBroadphase"),SPHSystem:e("./objects/SPHSystem"),Shape:e("./shapes/Shape"),Solver:e("./solver/Solver"),Sphere:e("./shapes/Sphere"),SplitSolver:e("./solver/SplitSolver"),Spring:e("./objects/Spring"),Trimesh:e("./shapes/Trimesh"),Vec3:e("./math/Vec3"),Vec3Pool:e("./utils/Vec3Pool"),World:e("./world/World")}},{"../package.json":1,"./collision/AABB":3,"./collision/ArrayCollisionMatrix":4,"./collision/Broadphase":5,"./collision/GridBroadphase":6,"./collision/NaiveBroadphase":7,"./collision/ObjectCollisionMatrix":8,"./collision/Ray":9,"./collision/RaycastResult":10,"./collision/SAPBroadphase":11,"./constraints/ConeTwistConstraint":12,"./constraints/Constraint":13,"./constraints/DistanceConstraint":14,"./constraints/HingeConstraint":15,"./constraints/LockConstraint":16,"./constraints/PointToPointConstraint":17,"./equations/ContactEquation":19,"./equations/Equation":20,"./equations/FrictionEquation":21,"./equations/RotationalEquation":22,"./equations/RotationalMotorEquation":23,"./material/ContactMaterial":24,"./material/Material":25,"./math/Mat3":27,"./math/Quaternion":28,"./math/Vec3":30,"./objects/Body":31,"./objects/RaycastVehicle":32,"./objects/RigidVehicle":33,"./objects/SPHSystem":34,"./objects/Spring":35,"./shapes/Box":37,"./shapes/ConvexPolyhedron":38,"./shapes/Cylinder":39,"./shapes/Heightfield":40,"./shapes/Particle":41,"./shapes/Plane":42,"./shapes/Shape":43,"./shapes/Sphere":44,"./shapes/Trimesh":45,"./solver/GSSolver":46,"./solver/Solver":47,"./solver/SplitSolver":48,"./utils/EventTarget":49,"./utils/Pool":51,"./utils/Vec3Pool":54,"./world/Narrowphase":55,"./world/World":56}],3:[function(e,n,i){var r=e("../math/Vec3");e("../utils/Utils"),n.exports=s;function s(c){c=c||{},this.lowerBound=new r,c.lowerBound&&this.lowerBound.copy(c.lowerBound),this.upperBound=new r,c.upperBound&&this.upperBound.copy(c.upperBound)}var a=new r;s.prototype.setFromPoints=function(c,u,h,d){var f=this.lowerBound,m=this.upperBound,g=h;f.copy(c[0]),g&&g.vmult(f,f),m.copy(f);for(var p=1;p<c.length;p++){var v=c[p];g&&(g.vmult(v,a),v=a),v.x>m.x&&(m.x=v.x),v.x<f.x&&(f.x=v.x),v.y>m.y&&(m.y=v.y),v.y<f.y&&(f.y=v.y),v.z>m.z&&(m.z=v.z),v.z<f.z&&(f.z=v.z)}return u&&(u.vadd(f,f),u.vadd(m,m)),d&&(f.x-=d,f.y-=d,f.z-=d,m.x+=d,m.y+=d,m.z+=d),this},s.prototype.copy=function(c){return this.lowerBound.copy(c.lowerBound),this.upperBound.copy(c.upperBound),this},s.prototype.clone=function(){return new s().copy(this)},s.prototype.extend=function(c){var u=c.lowerBound.x;this.lowerBound.x>u&&(this.lowerBound.x=u);var h=c.upperBound.x;this.upperBound.x<h&&(this.upperBound.x=h);var u=c.lowerBound.y;this.lowerBound.y>u&&(this.lowerBound.y=u);var h=c.upperBound.y;this.upperBound.y<h&&(this.upperBound.y=h);var u=c.lowerBound.z;this.lowerBound.z>u&&(this.lowerBound.z=u);var h=c.upperBound.z;this.upperBound.z<h&&(this.upperBound.z=h)},s.prototype.overlaps=function(c){var u=this.lowerBound,h=this.upperBound,d=c.lowerBound,f=c.upperBound;return(d.x<=h.x&&h.x<=f.x||u.x<=f.x&&f.x<=h.x)&&(d.y<=h.y&&h.y<=f.y||u.y<=f.y&&f.y<=h.y)&&(d.z<=h.z&&h.z<=f.z||u.z<=f.z&&f.z<=h.z)},s.prototype.contains=function(c){var u=this.lowerBound,h=this.upperBound,d=c.lowerBound,f=c.upperBound;return u.x<=d.x&&h.x>=f.x&&u.y<=d.y&&h.y>=f.y&&u.z<=d.z&&h.z>=f.z},s.prototype.getCorners=function(c,u,h,d,f,m,g,p){var v=this.lowerBound,x=this.upperBound;c.copy(v),u.set(x.x,v.y,v.z),h.set(x.x,x.y,v.z),d.set(v.x,x.y,x.z),f.set(x.x,v.y,v.z),m.set(v.x,x.y,v.z),g.set(v.x,v.y,x.z),p.copy(x)};var l=[new r,new r,new r,new r,new r,new r,new r,new r];s.prototype.toLocalFrame=function(c,u){var h=l,d=h[0],f=h[1],m=h[2],g=h[3],p=h[4],v=h[5],x=h[6],_=h[7];this.getCorners(d,f,m,g,p,v,x,_);for(var y=0;y!==8;y++){var R=h[y];c.pointToLocal(R,R)}return u.setFromPoints(h)},s.prototype.toWorldFrame=function(c,u){var h=l,d=h[0],f=h[1],m=h[2],g=h[3],p=h[4],v=h[5],x=h[6],_=h[7];this.getCorners(d,f,m,g,p,v,x,_);for(var y=0;y!==8;y++){var R=h[y];c.pointToWorld(R,R)}return u.setFromPoints(h)}},{"../math/Vec3":30,"../utils/Utils":53}],4:[function(e,n,i){n.exports=r;function r(){this.matrix=[]}r.prototype.get=function(s,a){if(s=s.index,a=a.index,a>s){var l=a;a=s,s=l}return this.matrix[(s*(s+1)>>1)+a-1]},r.prototype.set=function(s,a,l){if(s=s.index,a=a.index,a>s){var c=a;a=s,s=c}this.matrix[(s*(s+1)>>1)+a-1]=l?1:0},r.prototype.reset=function(){for(var s=0,a=this.matrix.length;s!==a;s++)this.matrix[s]=0},r.prototype.setNumObjects=function(s){this.matrix.length=s*(s-1)>>1}},{}],5:[function(e,n,i){var r=e("../objects/Body"),s=e("../math/Vec3"),a=e("../math/Quaternion");e("../shapes/Shape"),e("../shapes/Plane"),n.exports=l;function l(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}l.prototype.collisionPairs=function(g,p,v){throw new Error("collisionPairs not implemented for this BroadPhase class!")};var c=r.STATIC|r.KINEMATIC;l.prototype.needBroadphaseCollision=function(g,p){return!(!(g.collisionFilterGroup&p.collisionFilterMask)||!(p.collisionFilterGroup&g.collisionFilterMask)||(g.type&c||g.sleepState===r.SLEEPING)&&(p.type&c||p.sleepState===r.SLEEPING))},l.prototype.intersectionTest=function(g,p,v,x){this.useBoundingBoxes?this.doBoundingBoxBroadphase(g,p,v,x):this.doBoundingSphereBroadphase(g,p,v,x)};var u=new s;new s,new a,new s,l.prototype.doBoundingSphereBroadphase=function(g,p,v,x){var _=u;p.position.vsub(g.position,_);var y=Math.pow(g.boundingRadius+p.boundingRadius,2),R=_.norm2();R<y&&(v.push(g),x.push(p))},l.prototype.doBoundingBoxBroadphase=function(g,p,v,x){g.aabbNeedsUpdate&&g.computeAABB(),p.aabbNeedsUpdate&&p.computeAABB(),g.aabb.overlaps(p.aabb)&&(v.push(g),x.push(p))};var h={keys:[]},d=[],f=[];l.prototype.makePairsUnique=function(g,p){for(var v=h,x=d,_=f,y=g.length,R=0;R!==y;R++)x[R]=g[R],_[R]=p[R];g.length=0,p.length=0;for(var R=0;R!==y;R++){var C=x[R].id,L=_[R].id,N=C<L?C+","+L:L+","+C;v[N]=R,v.keys.push(N)}for(var R=0;R!==v.keys.length;R++){var N=v.keys.pop(),E=v[N];g.push(x[E]),p.push(_[E]),delete v[N]}},l.prototype.setWorld=function(g){};var m=new s;l.boundingSphereCheck=function(g,p){var v=m;return g.position.vsub(p.position,v),Math.pow(g.shape.boundingSphereRadius+p.shape.boundingSphereRadius,2)>v.norm2()},l.prototype.aabbQuery=function(g,p,v){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}},{"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Plane":42,"../shapes/Shape":43}],6:[function(e,n,i){n.exports=l;var r=e("./Broadphase"),s=e("../math/Vec3"),a=e("../shapes/Shape");function l(u,h,d,f,m){r.apply(this),this.nx=d||10,this.ny=f||10,this.nz=m||10,this.aabbMin=u||new s(100,100,100),this.aabbMax=h||new s(-100,-100,-100);var g=this.nx*this.ny*this.nz;if(g<=0)throw"GridBroadphase: Each dimension's n must be >0";this.bins=[],this.binLengths=[],this.bins.length=g,this.binLengths.length=g;for(var p=0;p<g;p++)this.bins[p]=[],this.binLengths[p]=0}l.prototype=new r,l.prototype.constructor=l;var c=new s;new s,l.prototype.collisionPairs=function(u,h,d){var f=u.numObjects(),m=u.bodies,j=this.aabbMax,G=this.aabbMin,g=this.nx,p=this.ny,v=this.nz,x=p*v,_=v,y=1,R=j.x,C=j.y,L=j.z,N=G.x,E=G.y,M=G.z,A=g/(R-N),O=p/(C-E),U=v/(L-M),Z=(R-N)/g,X=(C-E)/p,$=(L-M)/v,z=Math.sqrt(Z*Z+X*X+$*$)*.5,I=a.types,et=I.SPHERE,Q=I.PLANE;I.BOX,I.COMPOUND,I.CONVEXPOLYHEDRON;for(var B=this.bins,J=this.binLengths,H=this.bins.length,T=0;T!==H;T++)J[T]=0;var b=Math.ceil,G=Math.min,j=Math.max;function nt(At,kt,re,Kt,zt,$t,te){var pe=(At-N)*A|0,Y=(kt-E)*O|0,St=(re-M)*U|0,ut=b((Kt-N)*A),pt=b((zt-E)*O),Et=b(($t-M)*U);pe<0?pe=0:pe>=g&&(pe=g-1),Y<0?Y=0:Y>=p&&(Y=p-1),St<0?St=0:St>=v&&(St=v-1),ut<0?ut=0:ut>=g&&(ut=g-1),pt<0?pt=0:pt>=p&&(pt=p-1),Et<0?Et=0:Et>=v&&(Et=v-1),pe*=x,Y*=_,St*=y,ut*=x,pt*=_,Et*=y;for(var Jt=pe;Jt<=ut;Jt+=x)for(var oe=Y;oe<=pt;oe+=_)for(var _e=St;_e<=Et;_e+=y){var Te=Jt+oe+_e;B[Te][J[Te]++]=te}}for(var T=0;T!==f;T++){var q=m[T],rt=q.shape;switch(rt.type){case et:var ft=q.position.x,D=q.position.y,Rt=q.position.z,yt=rt.radius;nt(ft-yt,D-yt,Rt-yt,ft+yt,D+yt,Rt+yt,q);break;case Q:rt.worldNormalNeedsUpdate&&rt.computeWorldNormal(q.quaternion);var at=rt.worldNormal,st=N+Z*.5-q.position.x,Zt=E+X*.5-q.position.y,Tt=M+$*.5-q.position.z,Ht=c;Ht.set(st,Zt,Tt);for(var P=0,w=0;P!==g;P++,w+=x,Ht.y=Zt,Ht.x+=Z)for(var tt=0,ct=0;tt!==p;tt++,ct+=_,Ht.z=Tt,Ht.y+=X)for(var mt=0,lt=0;mt!==v;mt++,lt+=y,Ht.z+=$)if(Ht.dot(at)<z){var Ot=w+ct+lt;B[Ot][J[Ot]++]=q}break;default:q.aabbNeedsUpdate&&q.computeAABB(),nt(q.aabb.lowerBound.x,q.aabb.lowerBound.y,q.aabb.lowerBound.z,q.aabb.upperBound.x,q.aabb.upperBound.y,q.aabb.upperBound.z,q);break}}for(var T=0;T!==H;T++){var gt=J[T];if(gt>1)for(var It=B[T],P=0;P!==gt;P++)for(var q=It[P],tt=0;tt!==P;tt++){var jt=It[tt];this.needBroadphaseCollision(q,jt)&&this.intersectionTest(q,jt,h,d)}}this.makePairsUnique(h,d)}},{"../math/Vec3":30,"../shapes/Shape":43,"./Broadphase":5}],7:[function(e,n,i){n.exports=a;var r=e("./Broadphase"),s=e("./AABB");function a(){r.apply(this)}a.prototype=new r,a.prototype.constructor=a,a.prototype.collisionPairs=function(l,c,u){var h=l.bodies,d=h.length,f,m,g,p;for(f=0;f!==d;f++)for(m=0;m!==f;m++)g=h[f],p=h[m],this.needBroadphaseCollision(g,p)&&this.intersectionTest(g,p,c,u)},new s,a.prototype.aabbQuery=function(l,c,u){u=u||[];for(var h=0;h<l.bodies.length;h++){var d=l.bodies[h];d.aabbNeedsUpdate&&d.computeAABB(),d.aabb.overlaps(c)&&u.push(d)}return u}},{"./AABB":3,"./Broadphase":5}],8:[function(e,n,i){n.exports=r;function r(){this.matrix={}}r.prototype.get=function(s,a){if(s=s.id,a=a.id,a>s){var l=a;a=s,s=l}return s+"-"+a in this.matrix},r.prototype.set=function(s,a,l){if(s=s.id,a=a.id,a>s){var c=a;a=s,s=c}l?this.matrix[s+"-"+a]=!0:delete this.matrix[s+"-"+a]},r.prototype.reset=function(){this.matrix={}},r.prototype.setNumObjects=function(s){}},{}],9:[function(e,n,i){n.exports=h;var r=e("../math/Vec3"),s=e("../math/Quaternion"),a=e("../math/Transform");e("../shapes/ConvexPolyhedron"),e("../shapes/Box");var l=e("../collision/RaycastResult"),c=e("../shapes/Shape"),u=e("../collision/AABB");function h(H,T){this.from=H?H.clone():new r,this.to=T?T.clone():new r,this._direction=new r,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=h.ANY,this.result=new l,this.hasHit=!1,this.callback=function(b){}}h.prototype.constructor=h,h.CLOSEST=1,h.ANY=2,h.ALL=4;var d=new u,f=[];h.prototype.intersectWorld=function(H,T){return this.mode=T.mode||h.ANY,this.result=T.result||new l,this.skipBackfaces=!!T.skipBackfaces,this.collisionFilterMask=typeof T.collisionFilterMask<"u"?T.collisionFilterMask:-1,this.collisionFilterGroup=typeof T.collisionFilterGroup<"u"?T.collisionFilterGroup:-1,T.from&&this.from.copy(T.from),T.to&&this.to.copy(T.to),this.callback=T.callback||function(){},this.hasHit=!1,this.result.reset(),this._updateDirection(),this.getAABB(d),f.length=0,H.broadphase.aabbQuery(H,d,f),this.intersectBodies(f),this.hasHit};var m=new r,g=new r;h.pointInTriangle=p;function p(H,T,b,G){G.vsub(T,Q),b.vsub(T,m),H.vsub(T,g);var j=Q.dot(Q),nt=Q.dot(m),q=Q.dot(g),rt=m.dot(m),ft=m.dot(g),D,Rt;return(D=rt*q-nt*ft)>=0&&(Rt=j*ft-nt*q)>=0&&D+Rt<j*rt-nt*nt}var v=new r,x=new s;h.prototype.intersectBody=function(H,T){T&&(this.result=T,this._updateDirection());var b=this.checkCollisionResponse;if(!(b&&!H.collisionResponse)&&!(!(this.collisionFilterGroup&H.collisionFilterMask)||!(H.collisionFilterGroup&this.collisionFilterMask)))for(var G=v,j=x,nt=0,q=H.shapes.length;nt<q;nt++){var rt=H.shapes[nt];if(!(b&&!rt.collisionResponse)&&(H.quaternion.mult(H.shapeOrientations[nt],j),H.quaternion.vmult(H.shapeOffsets[nt],G),G.vadd(H.position,G),this.intersectShape(rt,j,G,H),this.result._shouldStop))break}},h.prototype.intersectBodies=function(H,T){T&&(this.result=T,this._updateDirection());for(var b=0,G=H.length;!this.result._shouldStop&&b<G;b++)this.intersectBody(H[b])},h.prototype._updateDirection=function(){this.to.vsub(this.from,this._direction),this._direction.normalize()},h.prototype.intersectShape=function(H,T,b,G){var j=this.from,nt=J(j,this._direction,b);if(!(nt>H.boundingSphereRadius)){var q=this[H.type];q&&q.call(this,H,T,b,G)}},new r,new r;var _=new r,y=new r,R=new r,C=new r;new r,new l,h.prototype.intersectBox=function(H,T,b,G){return this.intersectConvex(H.convexPolyhedronRepresentation,T,b,G)},h.prototype[c.types.BOX]=h.prototype.intersectBox,h.prototype.intersectPlane=function(H,T,b,G){var j=this.from,nt=this.to,q=this._direction,rt=new r(0,0,1);T.vmult(rt,rt);var ft=new r;j.vsub(b,ft);var D=ft.dot(rt);nt.vsub(b,ft);var Rt=ft.dot(rt);if(!(D*Rt>0)&&!(j.distanceTo(nt)<D)){var yt=rt.dot(q);if(!(Math.abs(yt)<this.precision)){var at=new r,st=new r,Zt=new r;j.vsub(b,at);var Tt=-rt.dot(at)/yt;q.scale(Tt,st),j.vadd(st,Zt),this.reportIntersection(rt,Zt,H,G,-1)}}},h.prototype[c.types.PLANE]=h.prototype.intersectPlane,h.prototype.getAABB=function(H){var T=this.to,b=this.from;H.lowerBound.x=Math.min(T.x,b.x),H.lowerBound.y=Math.min(T.y,b.y),H.lowerBound.z=Math.min(T.z,b.z),H.upperBound.x=Math.max(T.x,b.x),H.upperBound.y=Math.max(T.y,b.y),H.upperBound.z=Math.max(T.z,b.z)};var L={faceList:[0]};h.prototype.intersectHeightfield=function(H,T,b,G){H.data,H.elementSize;var j=new r,nt=new h(this.from,this.to);a.pointToLocalFrame(b,T,nt.from,nt.from),a.pointToLocalFrame(b,T,nt.to,nt.to);var q=[],rt=null,ft=null,D=null,Rt=null,yt=H.getIndexOfPosition(nt.from.x,nt.from.y,q,!1);if(yt&&(rt=q[0],ft=q[1],D=q[0],Rt=q[1]),yt=H.getIndexOfPosition(nt.to.x,nt.to.y,q,!1),yt&&((rt===null||q[0]<rt)&&(rt=q[0]),(D===null||q[0]>D)&&(D=q[0]),(ft===null||q[1]<ft)&&(ft=q[1]),(Rt===null||q[1]>Rt)&&(Rt=q[1])),rt!==null){var at=[];H.getRectMinMax(rt,ft,D,Rt,at),at[0],at[1];for(var st=rt;st<=D;st++)for(var Zt=ft;Zt<=Rt;Zt++){if(this.result._shouldStop||(H.getConvexTrianglePillar(st,Zt,!1),a.pointToWorldFrame(b,T,H.pillarOffset,j),this.intersectConvex(H.pillarConvex,T,j,G,L),this.result._shouldStop))return;H.getConvexTrianglePillar(st,Zt,!0),a.pointToWorldFrame(b,T,H.pillarOffset,j),this.intersectConvex(H.pillarConvex,T,j,G,L)}}},h.prototype[c.types.HEIGHTFIELD]=h.prototype.intersectHeightfield;var N=new r,E=new r;h.prototype.intersectSphere=function(H,T,b,G){var j=this.from,nt=this.to,q=H.radius,rt=Math.pow(nt.x-j.x,2)+Math.pow(nt.y-j.y,2)+Math.pow(nt.z-j.z,2),ft=2*((nt.x-j.x)*(j.x-b.x)+(nt.y-j.y)*(j.y-b.y)+(nt.z-j.z)*(j.z-b.z)),D=Math.pow(j.x-b.x,2)+Math.pow(j.y-b.y,2)+Math.pow(j.z-b.z,2)-Math.pow(q,2),Rt=Math.pow(ft,2)-4*rt*D,yt=N,at=E;if(!(Rt<0))if(Rt===0)j.lerp(nt,Rt,yt),yt.vsub(b,at),at.normalize(),this.reportIntersection(at,yt,H,G,-1);else{var st=(-ft-Math.sqrt(Rt))/(2*rt),Zt=(-ft+Math.sqrt(Rt))/(2*rt);if(st>=0&&st<=1&&(j.lerp(nt,st,yt),yt.vsub(b,at),at.normalize(),this.reportIntersection(at,yt,H,G,-1)),this.result._shouldStop)return;Zt>=0&&Zt<=1&&(j.lerp(nt,Zt,yt),yt.vsub(b,at),at.normalize(),this.reportIntersection(at,yt,H,G,-1))}},h.prototype[c.types.SPHERE]=h.prototype.intersectSphere;var M=new r;new r,new r;var A=new r;h.prototype.intersectConvex=function(T,b,G,j,nt){for(var q=M,rt=A,ft=nt&&nt.faceList||null,D=T.faces,Rt=T.vertices,yt=T.faceNormals,at=this._direction,st=this.from,Zt=this.to,Tt=st.distanceTo(Zt),Ht=ft?ft.length:D.length,P=this.result,w=0;!P._shouldStop&&w<Ht;w++){var tt=ft?ft[w]:w,ct=D[tt],mt=yt[tt],lt=b,Ot=G;rt.copy(Rt[ct[0]]),lt.vmult(rt,rt),rt.vadd(Ot,rt),rt.vsub(st,rt),lt.vmult(mt,q);var gt=at.dot(q);if(!(Math.abs(gt)<this.precision)){var It=q.dot(rt)/gt;if(!(It<0)){at.mult(It,_),_.vadd(st,_),y.copy(Rt[ct[0]]),lt.vmult(y,y),Ot.vadd(y,y);for(var jt=1;!P._shouldStop&&jt<ct.length-1;jt++){R.copy(Rt[ct[jt]]),C.copy(Rt[ct[jt+1]]),lt.vmult(R,R),lt.vmult(C,C),Ot.vadd(R,R),Ot.vadd(C,C);var At=_.distanceTo(st);!(p(_,y,R,C)||p(_,R,y,C))||At>Tt||this.reportIntersection(q,_,T,j,tt)}}}}},h.prototype[c.types.CONVEXPOLYHEDRON]=h.prototype.intersectConvex;var O=new r,U=new r,Z=new r,X=new r,$=new r,z=new r;new u;var I=[],et=new a;h.prototype.intersectTrimesh=function(T,b,G,j,nt){var q=O,rt=I,ft=et,D=A,Rt=U,yt=Z,at=X,st=z,Zt=$;nt&&nt.faceList;var Tt=T.indices;T.vertices,T.faceNormals;var Ht=this.from,P=this.to,w=this._direction;ft.position.copy(G),ft.quaternion.copy(b),a.vectorToLocalFrame(G,b,w,Rt),a.pointToLocalFrame(G,b,Ht,yt),a.pointToLocalFrame(G,b,P,at);var tt=yt.distanceSquared(at);T.tree.rayQuery(this,ft,rt);for(var ct=0,mt=rt.length;!this.result._shouldStop&&ct!==mt;ct++){var lt=rt[ct];T.getNormal(lt,q),T.getVertex(Tt[lt*3],y),y.vsub(yt,D);var Ot=Rt.dot(q),gt=q.dot(D)/Ot;if(!(gt<0)){Rt.scale(gt,_),_.vadd(yt,_),T.getVertex(Tt[lt*3+1],R),T.getVertex(Tt[lt*3+2],C);var It=_.distanceSquared(yt);!(p(_,R,y,C)||p(_,y,R,C))||It>tt||(a.vectorToWorldFrame(b,q,Zt),a.pointToWorldFrame(G,b,_,st),this.reportIntersection(Zt,st,T,j,lt))}}rt.length=0},h.prototype[c.types.TRIMESH]=h.prototype.intersectTrimesh,h.prototype.reportIntersection=function(H,T,b,G,j){var nt=this.from,q=this.to,rt=nt.distanceTo(T),ft=this.result;if(!(this.skipBackfaces&&H.dot(this._direction)>0))switch(ft.hitFaceIndex=typeof j<"u"?j:-1,this.mode){case h.ALL:this.hasHit=!0,ft.set(nt,q,H,T,b,G,rt),ft.hasHit=!0,this.callback(ft);break;case h.CLOSEST:(rt<ft.distance||!ft.hasHit)&&(this.hasHit=!0,ft.hasHit=!0,ft.set(nt,q,H,T,b,G,rt));break;case h.ANY:this.hasHit=!0,ft.hasHit=!0,ft.set(nt,q,H,T,b,G,rt),ft._shouldStop=!0;break}};var Q=new r,B=new r;function J(H,T,b){b.vsub(H,Q);var G=Q.dot(T);T.mult(G,B),B.vadd(H,B);var j=b.distanceTo(B);return j}},{"../collision/AABB":3,"../collision/RaycastResult":10,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../shapes/Box":37,"../shapes/ConvexPolyhedron":38,"../shapes/Shape":43}],10:[function(e,n,i){var r=e("../math/Vec3");n.exports=s;function s(){this.rayFromWorld=new r,this.rayToWorld=new r,this.hitNormalWorld=new r,this.hitPointWorld=new r,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this._shouldStop=!1}s.prototype.reset=function(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this._shouldStop=!1},s.prototype.abort=function(){this._shouldStop=!0},s.prototype.set=function(a,l,c,u,h,d,f){this.rayFromWorld.copy(a),this.rayToWorld.copy(l),this.hitNormalWorld.copy(c),this.hitPointWorld.copy(u),this.shape=h,this.body=d,this.distance=f}},{"../math/Vec3":30}],11:[function(e,n,i){e("../shapes/Shape");var r=e("../collision/Broadphase");n.exports=s;function s(a){r.apply(this),this.axisList=[],this.world=null,this.axisIndex=0;var l=this.axisList;this._addBodyHandler=function(c){l.push(c.body)},this._removeBodyHandler=function(c){var u=l.indexOf(c.body);u!==-1&&l.splice(u,1)},a&&this.setWorld(a)}s.prototype=new r,s.prototype.setWorld=function(a){this.axisList.length=0;for(var l=0;l<a.bodies.length;l++)this.axisList.push(a.bodies[l]);a.removeEventListener("addBody",this._addBodyHandler),a.removeEventListener("removeBody",this._removeBodyHandler),a.addEventListener("addBody",this._addBodyHandler),a.addEventListener("removeBody",this._removeBodyHandler),this.world=a,this.dirty=!0},s.insertionSortX=function(a){for(var l=1,c=a.length;l<c;l++){for(var u=a[l],h=l-1;h>=0&&!(a[h].aabb.lowerBound.x<=u.aabb.lowerBound.x);h--)a[h+1]=a[h];a[h+1]=u}return a},s.insertionSortY=function(a){for(var l=1,c=a.length;l<c;l++){for(var u=a[l],h=l-1;h>=0&&!(a[h].aabb.lowerBound.y<=u.aabb.lowerBound.y);h--)a[h+1]=a[h];a[h+1]=u}return a},s.insertionSortZ=function(a){for(var l=1,c=a.length;l<c;l++){for(var u=a[l],h=l-1;h>=0&&!(a[h].aabb.lowerBound.z<=u.aabb.lowerBound.z);h--)a[h+1]=a[h];a[h+1]=u}return a},s.prototype.collisionPairs=function(a,l,c){var u=this.axisList,h=u.length,d=this.axisIndex,f,m;for(this.dirty&&(this.sortList(),this.dirty=!1),f=0;f!==h;f++){var g=u[f];for(m=f+1;m<h;m++){var p=u[m];if(this.needBroadphaseCollision(g,p)){if(!s.checkBounds(g,p,d))break;this.intersectionTest(g,p,l,c)}}}},s.prototype.sortList=function(){for(var a=this.axisList,l=this.axisIndex,c=a.length,u=0;u!==c;u++){var h=a[u];h.aabbNeedsUpdate&&h.computeAABB()}l===0?s.insertionSortX(a):l===1?s.insertionSortY(a):l===2&&s.insertionSortZ(a)},s.checkBounds=function(a,l,c){var u,h;c===0?(u=a.position.x,h=l.position.x):c===1?(u=a.position.y,h=l.position.y):c===2&&(u=a.position.z,h=l.position.z);var d=a.boundingRadius,f=l.boundingRadius,m=u+d,g=h-f;return g<m},s.prototype.autoDetectAxis=function(){for(var a=0,l=0,c=0,u=0,h=0,d=0,f=this.axisList,m=f.length,g=1/m,p=0;p!==m;p++){var v=f[p],x=v.position.x;a+=x,l+=x*x;var _=v.position.y;c+=_,u+=_*_;var y=v.position.z;h+=y,d+=y*y}var R=l-a*a*g,C=u-c*c*g,L=d-h*h*g;R>C?R>L?this.axisIndex=0:this.axisIndex=2:C>L?this.axisIndex=1:this.axisIndex=2},s.prototype.aabbQuery=function(a,l,c){c=c||[],this.dirty&&(this.sortList(),this.dirty=!1);var u=this.axisIndex,h="x";u===1&&(h="y"),u===2&&(h="z");var d=this.axisList;l.lowerBound[h],l.upperBound[h];for(var f=0;f<d.length;f++){var m=d[f];m.aabbNeedsUpdate&&m.computeAABB(),m.aabb.overlaps(l)&&c.push(m)}return c}},{"../collision/Broadphase":5,"../shapes/Shape":43}],12:[function(e,n,i){n.exports=c,e("./Constraint");var r=e("./PointToPointConstraint"),s=e("../equations/ConeEquation"),a=e("../equations/RotationalEquation");e("../equations/ContactEquation");var l=e("../math/Vec3");function c(u,h,d){d=d||{};var f=typeof d.maxForce<"u"?d.maxForce:1e6,m=d.pivotA?d.pivotA.clone():new l,g=d.pivotB?d.pivotB.clone():new l;this.axisA=d.axisA?d.axisA.clone():new l,this.axisB=d.axisB?d.axisB.clone():new l,r.call(this,u,m,h,g,f),this.collideConnected=!!d.collideConnected,this.angle=typeof d.angle<"u"?d.angle:0;var p=this.coneEquation=new s(u,h,d),v=this.twistEquation=new a(u,h,d);this.twistAngle=typeof d.twistAngle<"u"?d.twistAngle:0,p.maxForce=0,p.minForce=-f,v.maxForce=0,v.minForce=-f,this.equations.push(p,v)}c.prototype=new r,c.constructor=c,new l,new l,c.prototype.update=function(){var u=this.bodyA,h=this.bodyB,d=this.coneEquation,f=this.twistEquation;r.prototype.update.call(this),u.vectorToWorldFrame(this.axisA,d.axisA),h.vectorToWorldFrame(this.axisB,d.axisB),this.axisA.tangents(f.axisA,f.axisA),u.vectorToWorldFrame(f.axisA,f.axisA),this.axisB.tangents(f.axisB,f.axisB),h.vectorToWorldFrame(f.axisB,f.axisB),d.angle=this.angle,f.maxAngle=this.twistAngle}},{"../equations/ConeEquation":18,"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],13:[function(e,n,i){n.exports=s;var r=e("../utils/Utils");function s(a,l,c){c=r.defaults(c,{collideConnected:!0,wakeUpBodies:!0}),this.equations=[],this.bodyA=a,this.bodyB=l,this.id=s.idCounter++,this.collideConnected=c.collideConnected,c.wakeUpBodies&&(a&&a.wakeUp(),l&&l.wakeUp())}s.prototype.update=function(){throw new Error("method update() not implmemented in this Constraint subclass!")},s.prototype.enable=function(){for(var a=this.equations,l=0;l<a.length;l++)a[l].enabled=!0},s.prototype.disable=function(){for(var a=this.equations,l=0;l<a.length;l++)a[l].enabled=!1},s.idCounter=0},{"../utils/Utils":53}],14:[function(e,n,i){n.exports=a;var r=e("./Constraint"),s=e("../equations/ContactEquation");function a(l,c,u,h){r.call(this,l,c),typeof u>"u"&&(u=l.position.distanceTo(c.position)),typeof h>"u"&&(h=1e6),this.distance=u;var d=this.distanceEquation=new s(l,c);this.equations.push(d),d.minForce=-h,d.maxForce=h}a.prototype=new r,a.prototype.update=function(){var l=this.bodyA,c=this.bodyB,u=this.distanceEquation,h=this.distance*.5,d=u.ni;c.position.vsub(l.position,d),d.normalize(),d.mult(h,u.ri),d.mult(-h,u.rj)}},{"../equations/ContactEquation":19,"./Constraint":13}],15:[function(e,n,i){n.exports=c,e("./Constraint");var r=e("./PointToPointConstraint"),s=e("../equations/RotationalEquation"),a=e("../equations/RotationalMotorEquation");e("../equations/ContactEquation");var l=e("../math/Vec3");function c(d,f,m){m=m||{};var g=typeof m.maxForce<"u"?m.maxForce:1e6,p=m.pivotA?m.pivotA.clone():new l,v=m.pivotB?m.pivotB.clone():new l;r.call(this,d,p,f,v,g);var x=this.axisA=m.axisA?m.axisA.clone():new l(1,0,0);x.normalize();var _=this.axisB=m.axisB?m.axisB.clone():new l(1,0,0);_.normalize();var y=this.rotationalEquation1=new s(d,f,m),R=this.rotationalEquation2=new s(d,f,m),C=this.motorEquation=new a(d,f,g);C.enabled=!1,this.equations.push(y,R,C)}c.prototype=new r,c.constructor=c,c.prototype.enableMotor=function(){this.motorEquation.enabled=!0},c.prototype.disableMotor=function(){this.motorEquation.enabled=!1},c.prototype.setMotorSpeed=function(d){this.motorEquation.targetVelocity=d},c.prototype.setMotorMaxForce=function(d){this.motorEquation.maxForce=d,this.motorEquation.minForce=-d};var u=new l,h=new l;c.prototype.update=function(){var d=this.bodyA,f=this.bodyB,m=this.motorEquation,g=this.rotationalEquation1,p=this.rotationalEquation2,v=u,x=h,_=this.axisA,y=this.axisB;r.prototype.update.call(this),d.quaternion.vmult(_,v),f.quaternion.vmult(y,x),v.tangents(g.axisA,p.axisA),g.axisB.copy(x),p.axisB.copy(x),this.motorEquation.enabled&&(d.quaternion.vmult(this.axisA,m.axisA),f.quaternion.vmult(this.axisB,m.axisB))}},{"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../equations/RotationalMotorEquation":23,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],16:[function(e,n,i){n.exports=l,e("./Constraint");var r=e("./PointToPointConstraint"),s=e("../equations/RotationalEquation");e("../equations/RotationalMotorEquation"),e("../equations/ContactEquation");var a=e("../math/Vec3");function l(c,u,h){h=h||{};var d=typeof h.maxForce<"u"?h.maxForce:1e6,f=new a,m=new a,g=new a;c.position.vadd(u.position,g),g.scale(.5,g),u.pointToLocalFrame(g,m),c.pointToLocalFrame(g,f),r.call(this,c,f,u,m,d);var p=this.rotationalEquation1=new s(c,u,h),v=this.rotationalEquation2=new s(c,u,h),x=this.rotationalEquation3=new s(c,u,h);this.equations.push(p,v,x)}l.prototype=new r,l.constructor=l,new a,new a,l.prototype.update=function(){var c=this.bodyA,u=this.bodyB;this.motorEquation;var h=this.rotationalEquation1,d=this.rotationalEquation2,f=this.rotationalEquation3;r.prototype.update.call(this),c.vectorToWorldFrame(a.UNIT_X,h.axisA),u.vectorToWorldFrame(a.UNIT_Y,h.axisB),c.vectorToWorldFrame(a.UNIT_Y,d.axisA),u.vectorToWorldFrame(a.UNIT_Z,d.axisB),c.vectorToWorldFrame(a.UNIT_Z,f.axisA),u.vectorToWorldFrame(a.UNIT_X,f.axisB)}},{"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../equations/RotationalMotorEquation":23,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],17:[function(e,n,i){n.exports=l;var r=e("./Constraint"),s=e("../equations/ContactEquation"),a=e("../math/Vec3");function l(c,u,h,d,f){r.call(this,c,h),f=typeof f<"u"?f:1e6,this.pivotA=u?u.clone():new a,this.pivotB=d?d.clone():new a;var m=this.equationX=new s(c,h),g=this.equationY=new s(c,h),p=this.equationZ=new s(c,h);this.equations.push(m,g,p),m.minForce=g.minForce=p.minForce=-f,m.maxForce=g.maxForce=p.maxForce=f,m.ni.set(1,0,0),g.ni.set(0,1,0),p.ni.set(0,0,1)}l.prototype=new r,l.prototype.update=function(){var c=this.bodyA,u=this.bodyB,h=this.equationX,d=this.equationY,f=this.equationZ;c.quaternion.vmult(this.pivotA,h.ri),u.quaternion.vmult(this.pivotB,h.rj),d.ri.copy(h.ri),d.rj.copy(h.rj),f.ri.copy(h.ri),f.rj.copy(h.rj)}},{"../equations/ContactEquation":19,"../math/Vec3":30,"./Constraint":13}],18:[function(e,n,i){n.exports=a;var r=e("../math/Vec3");e("../math/Mat3");var s=e("./Equation");function a(u,h,d){d=d||{};var f=typeof d.maxForce<"u"?d.maxForce:1e6;s.call(this,u,h,-f,f),this.axisA=d.axisA?d.axisA.clone():new r(1,0,0),this.axisB=d.axisB?d.axisB.clone():new r(0,1,0),this.angle=typeof d.angle<"u"?d.angle:0}a.prototype=new s,a.prototype.constructor=a;var l=new r,c=new r;a.prototype.computeB=function(u){var h=this.a,d=this.b,f=this.axisA,m=this.axisB,g=l,p=c,v=this.jacobianElementA,x=this.jacobianElementB;f.cross(m,g),m.cross(f,p),v.rotational.copy(p),x.rotational.copy(g);var _=Math.cos(this.angle)-f.dot(m),y=this.computeGW(),R=this.computeGiMf(),C=-_*h-y*d-u*R;return C}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],19:[function(e,n,i){n.exports=a;var r=e("./Equation"),s=e("../math/Vec3");e("../math/Mat3");function a(p,v,x){x=typeof x<"u"?x:1e6,r.call(this,p,v,0,x),this.restitution=0,this.ri=new s,this.rj=new s,this.ni=new s}a.prototype=new r,a.prototype.constructor=a;var l=new s,c=new s,u=new s;a.prototype.computeB=function(p){var v=this.a,x=this.b,_=this.bi,y=this.bj,R=this.ri,C=this.rj,L=l,N=c,E=_.velocity,M=_.angularVelocity;_.force,_.torque;var A=y.velocity,O=y.angularVelocity;y.force,y.torque;var U=u,Z=this.jacobianElementA,X=this.jacobianElementB,$=this.ni;R.cross($,L),C.cross($,N),$.negate(Z.spatial),L.negate(Z.rotational),X.spatial.copy($),X.rotational.copy(N),U.copy(y.position),U.vadd(C,U),U.vsub(_.position,U),U.vsub(R,U);var z=$.dot(U),I=this.restitution+1,et=I*A.dot($)-I*E.dot($)+O.dot(N)-M.dot(L),Q=this.computeGiMf(),B=-z*v-et*x-p*Q;return B};var h=new s,d=new s,f=new s,m=new s,g=new s;a.prototype.getImpactVelocityAlongNormal=function(){var p=h,v=d,x=f,_=m,y=g;return this.bi.position.vadd(this.ri,x),this.bj.position.vadd(this.rj,_),this.bi.getVelocityAtWorldPoint(x,p),this.bj.getVelocityAtWorldPoint(_,v),p.vsub(v,y),this.ni.dot(y)}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],20:[function(e,n,i){n.exports=a;var r=e("../math/JacobianElement"),s=e("../math/Vec3");function a(g,p,v,x){this.id=a.id++,this.minForce=typeof v>"u"?-1e6:v,this.maxForce=typeof x>"u"?1e6:x,this.bi=g,this.bj=p,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new r,this.jacobianElementB=new r,this.enabled=!0,this.setSpookParams(1e7,4,1/60)}a.prototype.constructor=a,a.id=0,a.prototype.setSpookParams=function(g,p,v){var x=p,_=g,y=v;this.a=4/(y*(1+4*x)),this.b=4*x/(1+4*x),this.eps=4/(y*y*_*(1+4*x))},a.prototype.computeB=function(g,p,v){var x=this.computeGW(),_=this.computeGq(),y=this.computeGiMf();return-_*g-x*p-y*v},a.prototype.computeGq=function(){var g=this.jacobianElementA,p=this.jacobianElementB,v=this.bi,x=this.bj,_=v.position,y=x.position;return g.spatial.dot(_)+p.spatial.dot(y)};var l=new s;a.prototype.computeGW=function(){var g=this.jacobianElementA,p=this.jacobianElementB,v=this.bi,x=this.bj,_=v.velocity,y=x.velocity,R=v.angularVelocity||l,C=x.angularVelocity||l;return g.multiplyVectors(_,R)+p.multiplyVectors(y,C)},a.prototype.computeGWlambda=function(){var g=this.jacobianElementA,p=this.jacobianElementB,v=this.bi,x=this.bj,_=v.vlambda,y=x.vlambda,R=v.wlambda||l,C=x.wlambda||l;return g.multiplyVectors(_,R)+p.multiplyVectors(y,C)};var c=new s,u=new s,h=new s,d=new s;a.prototype.computeGiMf=function(){var g=this.jacobianElementA,p=this.jacobianElementB,v=this.bi,x=this.bj,_=v.force,y=v.torque,R=x.force,C=x.torque,L=v.invMassSolve,N=x.invMassSolve;return v.invInertiaWorldSolve?v.invInertiaWorldSolve.vmult(y,h):h.set(0,0,0),x.invInertiaWorldSolve?x.invInertiaWorldSolve.vmult(C,d):d.set(0,0,0),_.mult(L,c),R.mult(N,u),g.multiplyVectors(c,h)+p.multiplyVectors(u,d)};var f=new s;a.prototype.computeGiMGt=function(){var g=this.jacobianElementA,p=this.jacobianElementB,v=this.bi,x=this.bj,_=v.invMassSolve,y=x.invMassSolve,R=v.invInertiaWorldSolve,C=x.invInertiaWorldSolve,L=_+y;return R&&(R.vmult(g.rotational,f),L+=f.dot(g.rotational)),C&&(C.vmult(p.rotational,f),L+=f.dot(p.rotational)),L};var m=new s;new s,new s,new s,new s,new s,a.prototype.addToWlambda=function(g){var p=this.jacobianElementA,v=this.jacobianElementB,x=this.bi,_=this.bj,y=m;p.spatial.mult(x.invMassSolve*g,y),x.vlambda.vadd(y,x.vlambda),v.spatial.mult(_.invMassSolve*g,y),_.vlambda.vadd(y,_.vlambda),x.invInertiaWorldSolve&&(x.invInertiaWorldSolve.vmult(p.rotational,y),y.mult(g,y),x.wlambda.vadd(y,x.wlambda)),_.invInertiaWorldSolve&&(_.invInertiaWorldSolve.vmult(v.rotational,y),y.mult(g,y),_.wlambda.vadd(y,_.wlambda))},a.prototype.computeC=function(){return this.computeGiMGt()+this.eps}},{"../math/JacobianElement":26,"../math/Vec3":30}],21:[function(e,n,i){n.exports=a;var r=e("./Equation"),s=e("../math/Vec3");e("../math/Mat3");function a(u,h,d){r.call(this,u,h,-d,d),this.ri=new s,this.rj=new s,this.t=new s}a.prototype=new r,a.prototype.constructor=a;var l=new s,c=new s;a.prototype.computeB=function(u){this.a;var h=this.b;this.bi,this.bj;var d=this.ri,f=this.rj,m=l,g=c,p=this.t;d.cross(p,m),f.cross(p,g);var v=this.jacobianElementA,x=this.jacobianElementB;p.negate(v.spatial),m.negate(v.rotational),x.spatial.copy(p),x.rotational.copy(g);var _=this.computeGW(),y=this.computeGiMf(),R=-_*h-u*y;return R}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],22:[function(e,n,i){n.exports=a;var r=e("../math/Vec3");e("../math/Mat3");var s=e("./Equation");function a(u,h,d){d=d||{};var f=typeof d.maxForce<"u"?d.maxForce:1e6;s.call(this,u,h,-f,f),this.axisA=d.axisA?d.axisA.clone():new r(1,0,0),this.axisB=d.axisB?d.axisB.clone():new r(0,1,0),this.maxAngle=Math.PI/2}a.prototype=new s,a.prototype.constructor=a;var l=new r,c=new r;a.prototype.computeB=function(u){var h=this.a,d=this.b,f=this.axisA,m=this.axisB,g=l,p=c,v=this.jacobianElementA,x=this.jacobianElementB;f.cross(m,g),m.cross(f,p),v.rotational.copy(p),x.rotational.copy(g);var _=Math.cos(this.maxAngle)-f.dot(m),y=this.computeGW(),R=this.computeGiMf(),C=-_*h-y*d-u*R;return C}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],23:[function(e,n,i){n.exports=a;var r=e("../math/Vec3");e("../math/Mat3");var s=e("./Equation");function a(l,c,u){u=typeof u<"u"?u:1e6,s.call(this,l,c,-u,u),this.axisA=new r,this.axisB=new r,this.targetVelocity=0}a.prototype=new s,a.prototype.constructor=a,a.prototype.computeB=function(l){this.a;var c=this.b;this.bi,this.bj;var u=this.axisA,h=this.axisB,d=this.jacobianElementA,f=this.jacobianElementB;d.rotational.copy(u),h.negate(f.rotational);var m=this.computeGW()-this.targetVelocity,g=this.computeGiMf(),p=-m*c-l*g;return p}},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],24:[function(e,n,i){var r=e("../utils/Utils");n.exports=s;function s(a,l,c){c=r.defaults(c,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=s.idCounter++,this.materials=[a,l],this.friction=c.friction,this.restitution=c.restitution,this.contactEquationStiffness=c.contactEquationStiffness,this.contactEquationRelaxation=c.contactEquationRelaxation,this.frictionEquationStiffness=c.frictionEquationStiffness,this.frictionEquationRelaxation=c.frictionEquationRelaxation}s.idCounter=0},{"../utils/Utils":53}],25:[function(e,n,i){n.exports=r;function r(s){var a="";s=s||{},typeof s=="string"?(a=s,s={}):typeof s=="object"&&(a=""),this.name=a,this.id=r.idCounter++,this.friction=typeof s.friction<"u"?s.friction:-1,this.restitution=typeof s.restitution<"u"?s.restitution:-1}r.idCounter=0},{}],26:[function(e,n,i){n.exports=s;var r=e("./Vec3");function s(){this.spatial=new r,this.rotational=new r}s.prototype.multiplyElement=function(a){return a.spatial.dot(this.spatial)+a.rotational.dot(this.rotational)},s.prototype.multiplyVectors=function(a,l){return a.dot(this.spatial)+l.dot(this.rotational)}},{"./Vec3":30}],27:[function(e,n,i){n.exports=s;var r=e("./Vec3");function s(a){a?this.elements=a:this.elements=[0,0,0,0,0,0,0,0,0]}s.prototype.identity=function(){var a=this.elements;a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=1,a[5]=0,a[6]=0,a[7]=0,a[8]=1},s.prototype.setZero=function(){var a=this.elements;a[0]=0,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=0,a[6]=0,a[7]=0,a[8]=0},s.prototype.setTrace=function(a){var l=this.elements;l[0]=a.x,l[4]=a.y,l[8]=a.z},s.prototype.getTrace=function(l){var l=l||new r,c=this.elements;l.x=c[0],l.y=c[4],l.z=c[8]},s.prototype.vmult=function(a,l){l=l||new r;var c=this.elements,u=a.x,h=a.y,d=a.z;return l.x=c[0]*u+c[1]*h+c[2]*d,l.y=c[3]*u+c[4]*h+c[5]*d,l.z=c[6]*u+c[7]*h+c[8]*d,l},s.prototype.smult=function(a){for(var l=0;l<this.elements.length;l++)this.elements[l]*=a},s.prototype.mmult=function(a,l){for(var c=l||new s,u=0;u<3;u++)for(var h=0;h<3;h++){for(var d=0,f=0;f<3;f++)d+=a.elements[u+f*3]*this.elements[f+h*3];c.elements[u+h*3]=d}return c},s.prototype.scale=function(a,l){l=l||new s;for(var c=this.elements,u=l.elements,h=0;h!==3;h++)u[3*h+0]=a.x*c[3*h+0],u[3*h+1]=a.y*c[3*h+1],u[3*h+2]=a.z*c[3*h+2];return l},s.prototype.solve=function(a,l){l=l||new r;for(var c=3,u=4,h=[],d=0;d<c*u;d++)h.push(0);var d,f;for(d=0;d<3;d++)for(f=0;f<3;f++)h[d+u*f]=this.elements[d+3*f];h[3+4*0]=a.x,h[3+4*1]=a.y,h[3+4*2]=a.z;var m=3,g=m,p,v=4,x;do{if(d=g-m,h[d+u*d]===0){for(f=d+1;f<g;f++)if(h[d+u*f]!==0){p=v;do x=v-p,h[x+u*d]+=h[x+u*f];while(--p);break}}if(h[d+u*d]!==0)for(f=d+1;f<g;f++){var _=h[d+u*f]/h[d+u*d];p=v;do x=v-p,h[x+u*f]=x<=d?0:h[x+u*f]-h[x+u*d]*_;while(--p)}}while(--m);if(l.z=h[2*u+3]/h[2*u+2],l.y=(h[1*u+3]-h[1*u+2]*l.z)/h[1*u+1],l.x=(h[0*u+3]-h[0*u+2]*l.z-h[0*u+1]*l.y)/h[0*u+0],isNaN(l.x)||isNaN(l.y)||isNaN(l.z)||l.x===1/0||l.y===1/0||l.z===1/0)throw"Could not solve equation! Got x=["+l.toString()+"], b=["+a.toString()+"], A=["+this.toString()+"]";return l},s.prototype.e=function(a,l,c){if(c===void 0)return this.elements[l+3*a];this.elements[l+3*a]=c},s.prototype.copy=function(a){for(var l=0;l<a.elements.length;l++)this.elements[l]=a.elements[l];return this},s.prototype.toString=function(){for(var a="",l=",",c=0;c<9;c++)a+=this.elements[c]+l;return a},s.prototype.reverse=function(a){a=a||new s;for(var l=3,c=6,u=[],h=0;h<l*c;h++)u.push(0);var h,d;for(h=0;h<3;h++)for(d=0;d<3;d++)u[h+c*d]=this.elements[h+3*d];u[3+6*0]=1,u[3+6*1]=0,u[3+6*2]=0,u[4+6*0]=0,u[4+6*1]=1,u[4+6*2]=0,u[5+6*0]=0,u[5+6*1]=0,u[5+6*2]=1;var f=3,m=f,g,p=c,v;do{if(h=m-f,u[h+c*h]===0){for(d=h+1;d<m;d++)if(u[h+c*d]!==0){g=p;do v=p-g,u[v+c*h]+=u[v+c*d];while(--g);break}}if(u[h+c*h]!==0)for(d=h+1;d<m;d++){var x=u[h+c*d]/u[h+c*h];g=p;do v=p-g,u[v+c*d]=v<=h?0:u[v+c*d]-u[v+c*h]*x;while(--g)}}while(--f);h=2;do{d=h-1;do{var x=u[h+c*d]/u[h+c*h];g=c;do v=c-g,u[v+c*d]=u[v+c*d]-u[v+c*h]*x;while(--g)}while(d--)}while(--h);h=2;do{var x=1/u[h+c*h];g=c;do v=c-g,u[v+c*h]=u[v+c*h]*x;while(--g)}while(h--);h=2;do{d=2;do{if(v=u[l+d+c*h],isNaN(v)||v===1/0)throw"Could not reverse! A=["+this.toString()+"]";a.e(h,d,v)}while(d--)}while(h--);return a},s.prototype.setRotationFromQuaternion=function(a){var l=a.x,c=a.y,u=a.z,h=a.w,d=l+l,f=c+c,m=u+u,g=l*d,p=l*f,v=l*m,x=c*f,_=c*m,y=u*m,R=h*d,C=h*f,L=h*m,N=this.elements;return N[3*0+0]=1-(x+y),N[3*0+1]=p-L,N[3*0+2]=v+C,N[3*1+0]=p+L,N[3*1+1]=1-(g+y),N[3*1+2]=_-R,N[3*2+0]=v-C,N[3*2+1]=_+R,N[3*2+2]=1-(g+x),this},s.prototype.transpose=function(a){a=a||new s;for(var l=a.elements,c=this.elements,u=0;u!==3;u++)for(var h=0;h!==3;h++)l[3*u+h]=c[3*h+u];return a}},{"./Vec3":30}],28:[function(e,n,i){n.exports=s;var r=e("./Vec3");function s(d,f,m,g){this.x=d!==void 0?d:0,this.y=f!==void 0?f:0,this.z=m!==void 0?m:0,this.w=g!==void 0?g:1}s.prototype.set=function(d,f,m,g){this.x=d,this.y=f,this.z=m,this.w=g},s.prototype.toString=function(){return this.x+","+this.y+","+this.z+","+this.w},s.prototype.toArray=function(){return[this.x,this.y,this.z,this.w]},s.prototype.setFromAxisAngle=function(d,f){var m=Math.sin(f*.5);this.x=d.x*m,this.y=d.y*m,this.z=d.z*m,this.w=Math.cos(f*.5)},s.prototype.toAxisAngle=function(d){d=d||new r,this.normalize();var f=2*Math.acos(this.w),m=Math.sqrt(1-this.w*this.w);return m<.001?(d.x=this.x,d.y=this.y,d.z=this.z):(d.x=this.x/m,d.y=this.y/m,d.z=this.z/m),[d,f]};var a=new r,l=new r;s.prototype.setFromVectors=function(d,f){if(d.isAntiparallelTo(f)){var m=a,g=l;d.tangents(m,g),this.setFromAxisAngle(m,Math.PI)}else{var p=d.cross(f);this.x=p.x,this.y=p.y,this.z=p.z,this.w=Math.sqrt(Math.pow(d.norm(),2)*Math.pow(f.norm(),2))+d.dot(f),this.normalize()}};var c=new r,u=new r,h=new r;s.prototype.mult=function(d,f){f=f||new s;var m=this.w,g=c,p=u,v=h;return g.set(this.x,this.y,this.z),p.set(d.x,d.y,d.z),f.w=m*d.w-g.dot(p),g.cross(p,v),f.x=m*p.x+d.w*g.x+v.x,f.y=m*p.y+d.w*g.y+v.y,f.z=m*p.z+d.w*g.z+v.z,f},s.prototype.inverse=function(d){var f=this.x,m=this.y,g=this.z,p=this.w;d=d||new s,this.conjugate(d);var v=1/(f*f+m*m+g*g+p*p);return d.x*=v,d.y*=v,d.z*=v,d.w*=v,d},s.prototype.conjugate=function(d){return d=d||new s,d.x=-this.x,d.y=-this.y,d.z=-this.z,d.w=this.w,d},s.prototype.normalize=function(){var d=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);d===0?(this.x=0,this.y=0,this.z=0,this.w=0):(d=1/d,this.x*=d,this.y*=d,this.z*=d,this.w*=d)},s.prototype.normalizeFast=function(){var d=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;d===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=d,this.y*=d,this.z*=d,this.w*=d)},s.prototype.vmult=function(d,f){f=f||new r;var m=d.x,g=d.y,p=d.z,v=this.x,x=this.y,_=this.z,y=this.w,R=y*m+x*p-_*g,C=y*g+_*m-v*p,L=y*p+v*g-x*m,N=-v*m-x*g-_*p;return f.x=R*y+N*-v+C*-_-L*-x,f.y=C*y+N*-x+L*-v-R*-_,f.z=L*y+N*-_+R*-x-C*-v,f},s.prototype.copy=function(d){return this.x=d.x,this.y=d.y,this.z=d.z,this.w=d.w,this},s.prototype.toEuler=function(d,f){f=f||"YZX";var m,g,p,v=this.x,x=this.y,_=this.z,y=this.w;switch(f){case"YZX":var R=v*x+_*y;if(R>.499&&(m=2*Math.atan2(v,y),g=Math.PI/2,p=0),R<-.499&&(m=-2*Math.atan2(v,y),g=-Math.PI/2,p=0),isNaN(m)){var C=v*v,L=x*x,N=_*_;m=Math.atan2(2*x*y-2*v*_,1-2*L-2*N),g=Math.asin(2*R),p=Math.atan2(2*v*y-2*x*_,1-2*C-2*N)}break;default:throw new Error("Euler order "+f+" not supported yet.")}d.y=m,d.z=g,d.x=p},s.prototype.setFromEuler=function(d,f,m,g){g=g||"XYZ";var p=Math.cos(d/2),v=Math.cos(f/2),x=Math.cos(m/2),_=Math.sin(d/2),y=Math.sin(f/2),R=Math.sin(m/2);return g==="XYZ"?(this.x=_*v*x+p*y*R,this.y=p*y*x-_*v*R,this.z=p*v*R+_*y*x,this.w=p*v*x-_*y*R):g==="YXZ"?(this.x=_*v*x+p*y*R,this.y=p*y*x-_*v*R,this.z=p*v*R-_*y*x,this.w=p*v*x+_*y*R):g==="ZXY"?(this.x=_*v*x-p*y*R,this.y=p*y*x+_*v*R,this.z=p*v*R+_*y*x,this.w=p*v*x-_*y*R):g==="ZYX"?(this.x=_*v*x-p*y*R,this.y=p*y*x+_*v*R,this.z=p*v*R-_*y*x,this.w=p*v*x+_*y*R):g==="YZX"?(this.x=_*v*x+p*y*R,this.y=p*y*x+_*v*R,this.z=p*v*R-_*y*x,this.w=p*v*x-_*y*R):g==="XZY"&&(this.x=_*v*x-p*y*R,this.y=p*y*x-_*v*R,this.z=p*v*R+_*y*x,this.w=p*v*x+_*y*R),this},s.prototype.clone=function(){return new s(this.x,this.y,this.z,this.w)}},{"./Vec3":30}],29:[function(e,n,i){var r=e("./Vec3"),s=e("./Quaternion");n.exports=a;function a(c){c=c||{},this.position=new r,c.position&&this.position.copy(c.position),this.quaternion=new s,c.quaternion&&this.quaternion.copy(c.quaternion)}var l=new s;a.pointToLocalFrame=function(c,u,h,f){var f=f||new r;return h.vsub(c,f),u.conjugate(l),l.vmult(f,f),f},a.prototype.pointToLocal=function(c,u){return a.pointToLocalFrame(this.position,this.quaternion,c,u)},a.pointToWorldFrame=function(c,u,h,f){var f=f||new r;return u.vmult(h,f),f.vadd(c,f),f},a.prototype.pointToWorld=function(c,u){return a.pointToWorldFrame(this.position,this.quaternion,c,u)},a.prototype.vectorToWorldFrame=function(c,h){var h=h||new r;return this.quaternion.vmult(c,h),h},a.vectorToWorldFrame=function(c,u,h){return c.vmult(u,h),h},a.vectorToLocalFrame=function(c,u,h,f){var f=f||new r;return u.w*=-1,u.vmult(h,f),u.w*=-1,f}},{"./Quaternion":28,"./Vec3":30}],30:[function(e,n,i){n.exports=s;var r=e("./Mat3");function s(u,h,d){this.x=u||0,this.y=h||0,this.z=d||0}s.ZERO=new s(0,0,0),s.UNIT_X=new s(1,0,0),s.UNIT_Y=new s(0,1,0),s.UNIT_Z=new s(0,0,1),s.prototype.cross=function(u,h){var d=u.x,f=u.y,m=u.z,g=this.x,p=this.y,v=this.z;return h=h||new s,h.x=p*m-v*f,h.y=v*d-g*m,h.z=g*f-p*d,h},s.prototype.set=function(u,h,d){return this.x=u,this.y=h,this.z=d,this},s.prototype.setZero=function(){this.x=this.y=this.z=0},s.prototype.vadd=function(u,h){if(h)h.x=u.x+this.x,h.y=u.y+this.y,h.z=u.z+this.z;else return new s(this.x+u.x,this.y+u.y,this.z+u.z)},s.prototype.vsub=function(u,h){if(h)h.x=this.x-u.x,h.y=this.y-u.y,h.z=this.z-u.z;else return new s(this.x-u.x,this.y-u.y,this.z-u.z)},s.prototype.crossmat=function(){return new r([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])},s.prototype.normalize=function(){var u=this.x,h=this.y,d=this.z,f=Math.sqrt(u*u+h*h+d*d);if(f>0){var m=1/f;this.x*=m,this.y*=m,this.z*=m}else this.x=0,this.y=0,this.z=0;return f},s.prototype.unit=function(u){u=u||new s;var h=this.x,d=this.y,f=this.z,m=Math.sqrt(h*h+d*d+f*f);return m>0?(m=1/m,u.x=h*m,u.y=d*m,u.z=f*m):(u.x=1,u.y=0,u.z=0),u},s.prototype.norm=function(){var u=this.x,h=this.y,d=this.z;return Math.sqrt(u*u+h*h+d*d)},s.prototype.length=s.prototype.norm,s.prototype.norm2=function(){return this.dot(this)},s.prototype.lengthSquared=s.prototype.norm2,s.prototype.distanceTo=function(u){var h=this.x,d=this.y,f=this.z,m=u.x,g=u.y,p=u.z;return Math.sqrt((m-h)*(m-h)+(g-d)*(g-d)+(p-f)*(p-f))},s.prototype.distanceSquared=function(u){var h=this.x,d=this.y,f=this.z,m=u.x,g=u.y,p=u.z;return(m-h)*(m-h)+(g-d)*(g-d)+(p-f)*(p-f)},s.prototype.mult=function(u,h){h=h||new s;var d=this.x,f=this.y,m=this.z;return h.x=u*d,h.y=u*f,h.z=u*m,h},s.prototype.scale=s.prototype.mult,s.prototype.dot=function(u){return this.x*u.x+this.y*u.y+this.z*u.z},s.prototype.isZero=function(){return this.x===0&&this.y===0&&this.z===0},s.prototype.negate=function(u){return u=u||new s,u.x=-this.x,u.y=-this.y,u.z=-this.z,u};var a=new s,l=new s;s.prototype.tangents=function(u,h){var d=this.norm();if(d>0){var f=a,m=1/d;f.set(this.x*m,this.y*m,this.z*m);var g=l;Math.abs(f.x)<.9?(g.set(1,0,0),f.cross(g,u)):(g.set(0,1,0),f.cross(g,u)),f.cross(u,h)}else u.set(1,0,0),h.set(0,1,0)},s.prototype.toString=function(){return this.x+","+this.y+","+this.z},s.prototype.toArray=function(){return[this.x,this.y,this.z]},s.prototype.copy=function(u){return this.x=u.x,this.y=u.y,this.z=u.z,this},s.prototype.lerp=function(u,h,d){var f=this.x,m=this.y,g=this.z;d.x=f+(u.x-f)*h,d.y=m+(u.y-m)*h,d.z=g+(u.z-g)*h},s.prototype.almostEquals=function(u,h){return h===void 0&&(h=1e-6),!(Math.abs(this.x-u.x)>h||Math.abs(this.y-u.y)>h||Math.abs(this.z-u.z)>h)},s.prototype.almostZero=function(u){return u===void 0&&(u=1e-6),!(Math.abs(this.x)>u||Math.abs(this.y)>u||Math.abs(this.z)>u)};var c=new s;s.prototype.isAntiparallelTo=function(u,h){return this.negate(c),c.almostEquals(u,h)},s.prototype.clone=function(){return new s(this.x,this.y,this.z)}},{"./Mat3":27}],31:[function(e,n,i){n.exports=h;var r=e("../utils/EventTarget");e("../shapes/Shape");var s=e("../math/Vec3"),a=e("../math/Mat3"),l=e("../math/Quaternion");e("../material/Material");var c=e("../collision/AABB"),u=e("../shapes/Box");function h(A){A=A||{},r.apply(this),this.id=h.idCounter++,this.world=null,this.preStep=null,this.postStep=null,this.vlambda=new s,this.collisionFilterGroup=typeof A.collisionFilterGroup=="number"?A.collisionFilterGroup:1,this.collisionFilterMask=typeof A.collisionFilterMask=="number"?A.collisionFilterMask:1,this.collisionResponse=!0,this.position=new s,A.position&&this.position.copy(A.position),this.previousPosition=new s,this.initPosition=new s,this.velocity=new s,A.velocity&&this.velocity.copy(A.velocity),this.initVelocity=new s,this.force=new s;var O=typeof A.mass=="number"?A.mass:0;this.mass=O,this.invMass=O>0?1/O:0,this.material=A.material||null,this.linearDamping=typeof A.linearDamping=="number"?A.linearDamping:.01,this.type=O<=0?h.STATIC:h.DYNAMIC,typeof A.type==typeof h.STATIC&&(this.type=A.type),this.allowSleep=typeof A.allowSleep<"u"?A.allowSleep:!0,this.sleepState=0,this.sleepSpeedLimit=typeof A.sleepSpeedLimit<"u"?A.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof A.sleepTimeLimit<"u"?A.sleepTimeLimit:1,this.timeLastSleepy=0,this._wakeUpAfterNarrowphase=!1,this.torque=new s,this.quaternion=new l,A.quaternion&&this.quaternion.copy(A.quaternion),this.initQuaternion=new l,this.angularVelocity=new s,A.angularVelocity&&this.angularVelocity.copy(A.angularVelocity),this.initAngularVelocity=new s,this.interpolatedPosition=new s,this.interpolatedQuaternion=new l,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new s,this.invInertia=new s,this.invInertiaWorld=new a,this.invMassSolve=0,this.invInertiaSolve=new s,this.invInertiaWorldSolve=new a,this.fixedRotation=typeof A.fixedRotation<"u"?A.fixedRotation:!1,this.angularDamping=typeof A.angularDamping<"u"?A.angularDamping:.01,this.aabb=new c,this.aabbNeedsUpdate=!0,this.wlambda=new s,A.shape&&this.addShape(A.shape),this.updateMassProperties()}h.prototype=new r,h.prototype.constructor=h,h.DYNAMIC=1,h.STATIC=2,h.KINEMATIC=4,h.AWAKE=0,h.SLEEPY=1,h.SLEEPING=2,h.idCounter=0,h.prototype.wakeUp=function(){var A=this.sleepState;this.sleepState=0,A===h.SLEEPING&&this.dispatchEvent({type:"wakeup"})},h.prototype.sleep=function(){this.sleepState=h.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0)},h.sleepyEvent={type:"sleepy"},h.sleepEvent={type:"sleep"},h.prototype.sleepTick=function(A){if(this.allowSleep){var O=this.sleepState,U=this.velocity.norm2()+this.angularVelocity.norm2(),Z=Math.pow(this.sleepSpeedLimit,2);O===h.AWAKE&&U<Z?(this.sleepState=h.SLEEPY,this.timeLastSleepy=A,this.dispatchEvent(h.sleepyEvent)):O===h.SLEEPY&&U>Z?this.wakeUp():O===h.SLEEPY&&A-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(h.sleepEvent))}},h.prototype.updateSolveMassProperties=function(){this.sleepState===h.SLEEPING||this.type===h.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))},h.prototype.pointToLocalFrame=function(A,U){var U=U||new s;return A.vsub(this.position,U),this.quaternion.conjugate().vmult(U,U),U},h.prototype.vectorToLocalFrame=function(A,U){var U=U||new s;return this.quaternion.conjugate().vmult(A,U),U},h.prototype.pointToWorldFrame=function(A,U){var U=U||new s;return this.quaternion.vmult(A,U),U.vadd(this.position,U),U},h.prototype.vectorToWorldFrame=function(A,U){var U=U||new s;return this.quaternion.vmult(A,U),U};var d=new s,f=new l;h.prototype.addShape=function(A,O,U){var Z=new s,X=new l;return O&&Z.copy(O),U&&X.copy(U),this.shapes.push(A),this.shapeOffsets.push(Z),this.shapeOrientations.push(X),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,this},h.prototype.updateBoundingRadius=function(){for(var A=this.shapes,O=this.shapeOffsets,U=A.length,Z=0,X=0;X!==U;X++){var $=A[X];$.updateBoundingSphereRadius();var z=O[X].norm(),I=$.boundingSphereRadius;z+I>Z&&(Z=z+I)}this.boundingRadius=Z};var m=new c;h.prototype.computeAABB=function(){for(var A=this.shapes,O=this.shapeOffsets,U=this.shapeOrientations,Z=A.length,X=d,$=f,z=this.quaternion,I=this.aabb,et=m,Q=0;Q!==Z;Q++){var B=A[Q];U[Q].mult(z,$),$.vmult(O[Q],X),X.vadd(this.position,X),B.calculateWorldAABB(X,$,et.lowerBound,et.upperBound),Q===0?I.copy(et):I.extend(et)}this.aabbNeedsUpdate=!1};var g=new a,p=new a;new a,h.prototype.updateInertiaWorld=function(A){var O=this.invInertia;if(!(O.x===O.y&&O.y===O.z&&!A)){var U=g,Z=p;U.setRotationFromQuaternion(this.quaternion),U.transpose(Z),U.scale(O,U),U.mmult(Z,this.invInertiaWorld)}};var v=new s,x=new s;h.prototype.applyForce=function(A,O){if(this.type===h.DYNAMIC){var U=v;O.vsub(this.position,U);var Z=x;U.cross(A,Z),this.force.vadd(A,this.force),this.torque.vadd(Z,this.torque)}};var _=new s,y=new s;h.prototype.applyLocalForce=function(A,O){if(this.type===h.DYNAMIC){var U=_,Z=y;this.vectorToWorldFrame(A,U),this.pointToWorldFrame(O,Z),this.applyForce(U,Z)}};var R=new s,C=new s,L=new s;h.prototype.applyImpulse=function(A,O){if(this.type===h.DYNAMIC){var U=R;O.vsub(this.position,U);var Z=C;Z.copy(A),Z.mult(this.invMass,Z),this.velocity.vadd(Z,this.velocity);var X=L;U.cross(A,X),this.invInertiaWorld.vmult(X,X),this.angularVelocity.vadd(X,this.angularVelocity)}};var N=new s,E=new s;h.prototype.applyLocalImpulse=function(A,O){if(this.type===h.DYNAMIC){var U=N,Z=E;this.vectorToWorldFrame(A,U),this.pointToWorldFrame(O,Z),this.applyImpulse(U,Z)}};var M=new s;h.prototype.updateMassProperties=function(){var A=M;this.invMass=this.mass>0?1/this.mass:0;var O=this.inertia,U=this.fixedRotation;this.computeAABB(),A.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),u.calculateInertia(A,this.mass,O),this.invInertia.set(O.x>0&&!U?1/O.x:0,O.y>0&&!U?1/O.y:0,O.z>0&&!U?1/O.z:0),this.updateInertiaWorld(!0)},h.prototype.getVelocityAtWorldPoint=function(A,O){var U=new s;return A.vsub(this.position,U),this.angularVelocity.cross(U,O),this.velocity.vadd(O,O),O}},{"../collision/AABB":3,"../material/Material":25,"../math/Mat3":27,"../math/Quaternion":28,"../math/Vec3":30,"../shapes/Box":37,"../shapes/Shape":43,"../utils/EventTarget":49}],32:[function(e,n,i){e("./Body");var r=e("../math/Vec3"),s=e("../math/Quaternion");e("../collision/RaycastResult");var a=e("../collision/Ray"),l=e("../objects/WheelInfo");n.exports=c;function c(z){this.chassisBody=z.chassisBody,this.wheelInfos=[],this.sliding=!1,this.world=null,this.indexRightAxis=typeof z.indexRightAxis<"u"?z.indexRightAxis:1,this.indexForwardAxis=typeof z.indexForwardAxis<"u"?z.indexForwardAxis:0,this.indexUpAxis=typeof z.indexUpAxis<"u"?z.indexUpAxis:2}new r,new r,new r;var u=new r,h=new r,d=new r;new a,c.prototype.addWheel=function(z){z=z||{};var I=new l(z),et=this.wheelInfos.length;return this.wheelInfos.push(I),et},c.prototype.setSteeringValue=function(z,I){var et=this.wheelInfos[I];et.steering=z},new r,c.prototype.applyEngineForce=function(z,I){this.wheelInfos[I].engineForce=z},c.prototype.setBrake=function(z,I){this.wheelInfos[I].brake=z},c.prototype.addToWorld=function(z){this.constraints,z.add(this.chassisBody);var I=this;this.preStepCallback=function(){I.updateVehicle(z.dt)},z.addEventListener("preStep",this.preStepCallback),this.world=z},c.prototype.getVehicleAxisWorld=function(z,I){I.set(z===0?1:0,z===1?1:0,z===2?1:0),this.chassisBody.vectorToWorldFrame(I,I)},c.prototype.updateVehicle=function(z){for(var I=this.wheelInfos,et=I.length,Q=this.chassisBody,B=0;B<et;B++)this.updateWheelTransform(B);this.currentVehicleSpeedKmHour=3.6*Q.velocity.norm();var J=new r;this.getVehicleAxisWorld(this.indexForwardAxis,J),J.dot(Q.velocity)<0&&(this.currentVehicleSpeedKmHour*=-1);for(var B=0;B<et;B++)this.castRay(I[B]);this.updateSuspension(z);for(var H=new r,T=new r,B=0;B<et;B++){var b=I[B],G=b.suspensionForce;G>b.maxSuspensionForce&&(G=b.maxSuspensionForce),b.raycastResult.hitNormalWorld.scale(G*z,H),b.raycastResult.hitPointWorld.vsub(Q.position,T),Q.applyImpulse(H,b.raycastResult.hitPointWorld)}this.updateFriction(z);var j=new r,nt=new r,q=new r;for(B=0;B<et;B++){var b=I[B];Q.getVelocityAtWorldPoint(b.chassisConnectionPointWorld,q);var rt=1;switch(this.indexUpAxis){case 1:rt=-1;break}if(b.isInContact){this.getVehicleAxisWorld(this.indexForwardAxis,nt);var ft=nt.dot(b.raycastResult.hitNormalWorld);b.raycastResult.hitNormalWorld.scale(ft,j),nt.vsub(j,nt);var D=nt.dot(q);b.deltaRotation=rt*D*z/b.radius}(b.sliding||!b.isInContact)&&b.engineForce!==0&&b.useCustomSlidingRotationalSpeed&&(b.deltaRotation=(b.engineForce>0?1:-1)*b.customSlidingRotationalSpeed*z),Math.abs(b.brake)>Math.abs(b.engineForce)&&(b.deltaRotation=0),b.rotation+=b.deltaRotation,b.deltaRotation*=.99}},c.prototype.updateSuspension=function(z){for(var I=this.chassisBody,et=I.mass,Q=this.wheelInfos,B=Q.length,J=0;J<B;J++){var H=Q[J];if(H.isInContact){var T,b=H.suspensionRestLength,G=H.suspensionLength,j=b-G;T=H.suspensionStiffness*j*H.clippedInvContactDotSuspension;var nt=H.suspensionRelativeVelocity,q;nt<0?q=H.dampingCompression:q=H.dampingRelaxation,T-=q*nt,H.suspensionForce=T*et,H.suspensionForce<0&&(H.suspensionForce=0)}else H.suspensionForce=0}},c.prototype.removeFromWorld=function(z){this.constraints,z.remove(this.chassisBody),z.removeEventListener("preStep",this.preStepCallback),this.world=null};var f=new r,m=new r;c.prototype.castRay=function(z){var I=f,et=m;this.updateWheelTransformWorld(z);var Q=this.chassisBody,B=-1,J=z.suspensionRestLength+z.radius;z.directionWorld.scale(J,I);var H=z.chassisConnectionPointWorld;H.vadd(I,et);var T=z.raycastResult;T.reset();var b=Q.collisionResponse;Q.collisionResponse=!1,this.world.rayTest(H,et,T),Q.collisionResponse=b;var G=T.body;if(z.raycastResult.groundObject=0,G){B=T.distance,z.raycastResult.hitNormalWorld=T.hitNormalWorld,z.isInContact=!0;var j=T.distance;z.suspensionLength=j-z.radius;var nt=z.suspensionRestLength-z.maxSuspensionTravel,q=z.suspensionRestLength+z.maxSuspensionTravel;z.suspensionLength<nt&&(z.suspensionLength=nt),z.suspensionLength>q&&(z.suspensionLength=q,z.raycastResult.reset());var rt=z.raycastResult.hitNormalWorld.dot(z.directionWorld),ft=new r;Q.getVelocityAtWorldPoint(z.raycastResult.hitPointWorld,ft);var D=z.raycastResult.hitNormalWorld.dot(ft);if(rt>=-.1)z.suspensionRelativeVelocity=0,z.clippedInvContactDotSuspension=1/.1;else{var Rt=-1/rt;z.suspensionRelativeVelocity=D*Rt,z.clippedInvContactDotSuspension=Rt}}else z.suspensionLength=z.suspensionRestLength+0*z.maxSuspensionTravel,z.suspensionRelativeVelocity=0,z.directionWorld.scale(-1,z.raycastResult.hitNormalWorld),z.clippedInvContactDotSuspension=1;return B},c.prototype.updateWheelTransformWorld=function(z){z.isInContact=!1;var I=this.chassisBody;I.pointToWorldFrame(z.chassisConnectionPointLocal,z.chassisConnectionPointWorld),I.vectorToWorldFrame(z.directionLocal,z.directionWorld),I.vectorToWorldFrame(z.axleLocal,z.axleWorld)},c.prototype.updateWheelTransform=function(z){var I=u,et=h,Q=d,B=this.wheelInfos[z];this.updateWheelTransformWorld(B),B.directionLocal.scale(-1,I),et.copy(B.axleLocal),I.cross(et,Q),Q.normalize(),et.normalize();var J=B.steering,H=new s;H.setFromAxisAngle(I,J);var T=new s;T.setFromAxisAngle(et,B.rotation);var b=B.worldTransform.quaternion;this.chassisBody.quaternion.mult(H,b),b.mult(T,b),b.normalize();var G=B.worldTransform.position;G.copy(B.directionWorld),G.scale(B.suspensionLength,G),G.vadd(B.chassisConnectionPointWorld,G)};var g=[new r(1,0,0),new r(0,1,0),new r(0,0,1)];c.prototype.getWheelTransformWorld=function(z){return this.wheelInfos[z].worldTransform};var p=new r,v=[],x=[],_=1;c.prototype.updateFriction=function(z){for(var I=p,et=this.wheelInfos,Q=et.length,B=this.chassisBody,J=x,H=v,T=0;T<Q;T++){var b=et[T],G=b.raycastResult.body;b.sideImpulse=0,b.forwardImpulse=0,J[T]||(J[T]=new r),H[T]||(H[T]=new r)}for(var T=0;T<Q;T++){var b=et[T],G=b.raycastResult.body;if(G){var j=H[T],nt=this.getWheelTransformWorld(T);nt.vectorToWorldFrame(g[this.indexRightAxis],j);var q=b.raycastResult.hitNormalWorld,rt=j.dot(q);q.scale(rt,I),j.vsub(I,j),j.normalize(),q.cross(j,J[T]),J[T].normalize(),b.sideImpulse=$(B,b.raycastResult.hitPointWorld,G,b.raycastResult.hitPointWorld,j),b.sideImpulse*=_}}var ft=1,D=.5;this.sliding=!1;for(var T=0;T<Q;T++){var b=et[T],G=b.raycastResult.body,Rt=0;if(b.slipInfo=1,G){var yt=0,at=b.brake?b.brake:yt;Rt=L(B,G,b.raycastResult.hitPointWorld,J[T],at),Rt+=b.engineForce*z;var st=at/Rt;b.slipInfo*=st}if(b.forwardImpulse=0,b.skidInfo=1,G){b.skidInfo=1;var Zt=b.suspensionForce*z*b.frictionSlip,Tt=Zt,Ht=Zt*Tt;b.forwardImpulse=Rt;var P=b.forwardImpulse*D,w=b.sideImpulse*ft,tt=P*P+w*w;if(b.sliding=!1,tt>Ht){this.sliding=!0,b.sliding=!0;var st=Zt/Math.sqrt(tt);b.skidInfo*=st}}}if(this.sliding)for(var T=0;T<Q;T++){var b=et[T];b.sideImpulse!==0&&b.skidInfo<1&&(b.forwardImpulse*=b.skidInfo,b.sideImpulse*=b.skidInfo)}for(var T=0;T<Q;T++){var b=et[T],ct=new r;if(ct.copy(b.raycastResult.hitPointWorld),b.forwardImpulse!==0){var mt=new r;J[T].scale(b.forwardImpulse,mt),B.applyImpulse(mt,ct)}if(b.sideImpulse!==0){var G=b.raycastResult.body,lt=new r;lt.copy(b.raycastResult.hitPointWorld);var Ot=new r;H[T].scale(b.sideImpulse,Ot),B.pointToLocalFrame(ct,ct),ct["xyz"[this.indexUpAxis]]*=b.rollInfluence,B.pointToWorldFrame(ct,ct),B.applyImpulse(Ot,ct),Ot.scale(-1,Ot),G.applyImpulse(Ot,lt)}}};var y=new r,R=new r,C=new r;function L(z,I,et,Q,B){var J=0,H=et,T=y,b=R,G=C;z.getVelocityAtWorldPoint(H,T),I.getVelocityAtWorldPoint(H,b),T.vsub(b,G);var j=Q.dot(G),nt=O(z,et,Q),q=O(I,et,Q),rt=1,ft=rt/(nt+q);return J=-j*ft,B<J&&(J=B),J<-B&&(J=-B),J}var N=new r,E=new r,M=new r,A=new r;function O(z,I,et){var Q=N,B=E,J=M,H=A;return I.vsub(z.position,Q),Q.cross(et,B),z.invInertiaWorld.vmult(B,H),H.cross(Q,J),z.invMass+et.dot(J)}var U=new r,Z=new r,X=new r;function $(z,I,et,Q,B,rt){var H=B.norm2();if(H>1.1)return 0;var T=U,b=Z,G=X;z.getVelocityAtWorldPoint(I,T),et.getVelocityAtWorldPoint(Q,b),T.vsub(b,G);var j=B.dot(G),nt=.2,q=1/(z.invMass+et.invMass),rt=-nt*j*q;return rt}},{"../collision/Ray":9,"../collision/RaycastResult":10,"../math/Quaternion":28,"../math/Vec3":30,"../objects/WheelInfo":36,"./Body":31}],33:[function(e,n,i){var r=e("./Body"),s=e("../shapes/Sphere"),a=e("../shapes/Box"),l=e("../math/Vec3"),c=e("../constraints/HingeConstraint");n.exports=u;function u(f){if(this.wheelBodies=[],this.coordinateSystem=typeof f.coordinateSystem>"u"?new l(1,2,3):f.coordinateSystem.clone(),this.chassisBody=f.chassisBody,!this.chassisBody){var m=new a(new l(5,2,.5));this.chassisBody=new r(1,m)}this.constraints=[],this.wheelAxes=[],this.wheelForces=[]}u.prototype.addWheel=function(f){f=f||{};var m=f.body;m||(m=new r(1,new s(1.2))),this.wheelBodies.push(m),this.wheelForces.push(0),new l;var g=typeof f.position<"u"?f.position.clone():new l,p=new l;this.chassisBody.pointToWorldFrame(g,p),m.position.set(p.x,p.y,p.z);var v=typeof f.axis<"u"?f.axis.clone():new l(0,1,0);this.wheelAxes.push(v);var x=new c(this.chassisBody,m,{pivotA:g,axisA:v,pivotB:l.ZERO,axisB:v,collideConnected:!1});return this.constraints.push(x),this.wheelBodies.length-1},u.prototype.setSteeringValue=function(f,m){var g=this.wheelAxes[m],p=Math.cos(f),v=Math.sin(f),x=g.x,_=g.y;this.constraints[m].axisA.set(p*x-v*_,v*x+p*_,0)},u.prototype.setMotorSpeed=function(f,m){var g=this.constraints[m];g.enableMotor(),g.motorTargetVelocity=f},u.prototype.disableMotor=function(f){var m=this.constraints[f];m.disableMotor()};var h=new l;u.prototype.setWheelForce=function(f,m){this.wheelForces[m]=f},u.prototype.applyWheelForce=function(f,m){var g=this.wheelAxes[m],p=this.wheelBodies[m],v=p.torque;g.scale(f,h),p.vectorToWorldFrame(h,h),v.vadd(h,v)},u.prototype.addToWorld=function(f){for(var m=this.constraints,g=this.wheelBodies.concat([this.chassisBody]),p=0;p<g.length;p++)f.add(g[p]);for(var p=0;p<m.length;p++)f.addConstraint(m[p]);f.addEventListener("preStep",this._update.bind(this))},u.prototype._update=function(){for(var f=this.wheelForces,m=0;m<f.length;m++)this.applyWheelForce(f[m],m)},u.prototype.removeFromWorld=function(f){for(var m=this.constraints,g=this.wheelBodies.concat([this.chassisBody]),p=0;p<g.length;p++)f.remove(g[p]);for(var p=0;p<m.length;p++)f.removeConstraint(m[p])};var d=new l;u.prototype.getWheelSpeed=function(f){var m=this.wheelAxes[f],g=this.wheelBodies[f],p=g.angularVelocity;return this.chassisBody.vectorToWorldFrame(m,d),p.dot(d)}},{"../constraints/HingeConstraint":15,"../math/Vec3":30,"../shapes/Box":37,"../shapes/Sphere":44,"./Body":31}],34:[function(e,n,i){n.exports=s,e("../shapes/Shape");var r=e("../math/Vec3");e("../math/Quaternion"),e("../shapes/Particle"),e("../objects/Body"),e("../material/Material");function s(){this.particles=[],this.density=1,this.smoothingRadius=1,this.speedOfSound=1,this.viscosity=.01,this.eps=1e-6,this.pressures=[],this.densities=[],this.neighbors=[]}s.prototype.add=function(m){this.particles.push(m),this.neighbors.length<this.particles.length&&this.neighbors.push([])},s.prototype.remove=function(m){var g=this.particles.indexOf(m);g!==-1&&(this.particles.splice(g,1),this.neighbors.length>this.particles.length&&this.neighbors.pop())};var a=new r;s.prototype.getNeighbors=function(m,g){for(var p=this.particles.length,v=m.id,x=this.smoothingRadius*this.smoothingRadius,_=a,y=0;y!==p;y++){var R=this.particles[y];R.position.vsub(m.position,_),v!==R.id&&_.norm2()<x&&g.push(R)}};var l=new r,c=new r,u=new r,h=new r,d=new r,f=new r;s.prototype.update=function(){for(var m=this.particles.length,g=l,p=this.speedOfSound,v=this.eps,x=0;x!==m;x++){var _=this.particles[x],y=this.neighbors[x];y.length=0,this.getNeighbors(_,y),y.push(this.particles[x]);for(var R=y.length,C=0,L=0;L!==R;L++){_.position.vsub(y[L].position,g);var N=g.norm(),E=this.w(N);C+=y[L].mass*E}this.densities[x]=C,this.pressures[x]=p*p*(this.densities[x]-this.density)}for(var M=c,A=u,O=h,U=d,Z=f,x=0;x!==m;x++){var X=this.particles[x];M.set(0,0,0),A.set(0,0,0);for(var $,z,y=this.neighbors[x],R=y.length,L=0;L!==R;L++){var I=y[L];X.position.vsub(I.position,U);var et=U.norm();$=-I.mass*(this.pressures[x]/(this.densities[x]*this.densities[x]+v)+this.pressures[L]/(this.densities[L]*this.densities[L]+v)),this.gradw(U,O),O.mult($,O),M.vadd(O,M),I.velocity.vsub(X.velocity,Z),Z.mult(1/(1e-4+this.densities[x]*this.densities[L])*this.viscosity*I.mass,Z),z=this.nablaw(et),Z.mult(z,Z),A.vadd(Z,A)}A.mult(X.mass,A),M.mult(X.mass,M),X.force.vadd(A,X.force),X.force.vadd(M,X.force)}},s.prototype.w=function(m){var g=this.smoothingRadius;return 315/(64*Math.PI*Math.pow(g,9))*Math.pow(g*g-m*m,3)},s.prototype.gradw=function(m,g){var p=m.norm(),v=this.smoothingRadius;m.mult(945/(32*Math.PI*Math.pow(v,9))*Math.pow(v*v-p*p,2),g)},s.prototype.nablaw=function(m){var g=this.smoothingRadius,p=945/(32*Math.PI*Math.pow(g,9))*(g*g-m*m)*(7*m*m-3*g*g);return p}},{"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Particle":41,"../shapes/Shape":43}],35:[function(e,n,i){var r=e("../math/Vec3");n.exports=s;function s(x,_,y){y=y||{},this.restLength=typeof y.restLength=="number"?y.restLength:1,this.stiffness=y.stiffness||100,this.damping=y.damping||1,this.bodyA=x,this.bodyB=_,this.localAnchorA=new r,this.localAnchorB=new r,y.localAnchorA&&this.localAnchorA.copy(y.localAnchorA),y.localAnchorB&&this.localAnchorB.copy(y.localAnchorB),y.worldAnchorA&&this.setWorldAnchorA(y.worldAnchorA),y.worldAnchorB&&this.setWorldAnchorB(y.worldAnchorB)}s.prototype.setWorldAnchorA=function(x){this.bodyA.pointToLocalFrame(x,this.localAnchorA)},s.prototype.setWorldAnchorB=function(x){this.bodyB.pointToLocalFrame(x,this.localAnchorB)},s.prototype.getWorldAnchorA=function(x){this.bodyA.pointToWorldFrame(this.localAnchorA,x)},s.prototype.getWorldAnchorB=function(x){this.bodyB.pointToWorldFrame(this.localAnchorB,x)};var a=new r,l=new r,c=new r,u=new r,h=new r,d=new r,f=new r,m=new r,g=new r,p=new r,v=new r;s.prototype.applyForce=function(){var x=this.stiffness,_=this.damping,y=this.restLength,R=this.bodyA,C=this.bodyB,L=a,N=l,E=c,M=u,A=v,O=h,U=d,Z=f,X=m,$=g,z=p;this.getWorldAnchorA(O),this.getWorldAnchorB(U),O.vsub(R.position,Z),U.vsub(C.position,X),U.vsub(O,L);var I=L.norm();N.copy(L),N.normalize(),C.velocity.vsub(R.velocity,E),C.angularVelocity.cross(X,A),E.vadd(A,E),R.angularVelocity.cross(Z,A),E.vsub(A,E),N.mult(-x*(I-y)-_*E.dot(N),M),R.force.vsub(M,R.force),C.force.vadd(M,C.force),Z.cross(M,$),X.cross(M,z),R.torque.vsub($,R.torque),C.torque.vadd(z,C.torque)}},{"../math/Vec3":30}],36:[function(e,n,i){var r=e("../math/Vec3"),s=e("../math/Transform"),a=e("../collision/RaycastResult"),l=e("../utils/Utils");n.exports=c;function c(d){d=l.defaults(d,{chassisConnectionPointLocal:new r,chassisConnectionPointWorld:new r,directionLocal:new r,directionWorld:new r,axleLocal:new r,axleWorld:new r,suspensionRestLength:1,suspensionMaxLength:2,radius:1,suspensionStiffness:100,dampingCompression:10,dampingRelaxation:10,frictionSlip:1e4,steering:0,rotation:0,deltaRotation:0,rollInfluence:.01,maxSuspensionForce:Number.MAX_VALUE,isFrontWheel:!0,clippedInvContactDotSuspension:1,suspensionRelativeVelocity:0,suspensionForce:0,skidInfo:0,suspensionLength:0,maxSuspensionTravel:1,useCustomSlidingRotationalSpeed:!1,customSlidingRotationalSpeed:-.1}),this.maxSuspensionTravel=d.maxSuspensionTravel,this.customSlidingRotationalSpeed=d.customSlidingRotationalSpeed,this.useCustomSlidingRotationalSpeed=d.useCustomSlidingRotationalSpeed,this.sliding=!1,this.chassisConnectionPointLocal=d.chassisConnectionPointLocal.clone(),this.chassisConnectionPointWorld=d.chassisConnectionPointWorld.clone(),this.directionLocal=d.directionLocal.clone(),this.directionWorld=d.directionWorld.clone(),this.axleLocal=d.axleLocal.clone(),this.axleWorld=d.axleWorld.clone(),this.suspensionRestLength=d.suspensionRestLength,this.suspensionMaxLength=d.suspensionMaxLength,this.radius=d.radius,this.suspensionStiffness=d.suspensionStiffness,this.dampingCompression=d.dampingCompression,this.dampingRelaxation=d.dampingRelaxation,this.frictionSlip=d.frictionSlip,this.steering=0,this.rotation=0,this.deltaRotation=0,this.rollInfluence=d.rollInfluence,this.maxSuspensionForce=d.maxSuspensionForce,this.engineForce=0,this.brake=0,this.isFrontWheel=d.isFrontWheel,this.clippedInvContactDotSuspension=1,this.suspensionRelativeVelocity=0,this.suspensionForce=0,this.skidInfo=0,this.suspensionLength=0,this.sideImpulse=0,this.forwardImpulse=0,this.raycastResult=new a,this.worldTransform=new s,this.isInContact=!1}var h=new r,u=new r,h=new r;c.prototype.updateWheel=function(d){var f=this.raycastResult;if(this.isInContact){var m=f.hitNormalWorld.dot(f.directionWorld);f.hitPointWorld.vsub(d.position,u),d.getVelocityAtWorldPoint(u,h);var g=f.hitNormalWorld.dot(h);if(m>=-.1)this.suspensionRelativeVelocity=0,this.clippedInvContactDotSuspension=1/.1;else{var p=-1/m;this.suspensionRelativeVelocity=g*p,this.clippedInvContactDotSuspension=p}}else f.suspensionLength=this.suspensionRestLength,this.suspensionRelativeVelocity=0,f.directionWorld.scale(-1,f.hitNormalWorld),this.clippedInvContactDotSuspension=1}},{"../collision/RaycastResult":10,"../math/Transform":29,"../math/Vec3":30,"../utils/Utils":53}],37:[function(e,n,i){n.exports=l;var r=e("./Shape"),s=e("../math/Vec3"),a=e("./ConvexPolyhedron");function l(h){r.call(this),this.type=r.types.BOX,this.halfExtents=h,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}l.prototype=new r,l.prototype.constructor=l,l.prototype.updateConvexPolyhedronRepresentation=function(){var h=this.halfExtents.x,d=this.halfExtents.y,f=this.halfExtents.z,m=s,g=[new m(-h,-d,-f),new m(h,-d,-f),new m(h,d,-f),new m(-h,d,-f),new m(-h,-d,f),new m(h,-d,f),new m(h,d,f),new m(-h,d,f)],p=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]];new m(0,0,1),new m(0,1,0),new m(1,0,0);var v=new a(g,p);this.convexPolyhedronRepresentation=v,v.material=this.material},l.prototype.calculateLocalInertia=function(h,d){return d=d||new s,l.calculateInertia(this.halfExtents,h,d),d},l.calculateInertia=function(h,d,f){var m=h;f.x=1/12*d*(2*m.y*2*m.y+2*m.z*2*m.z),f.y=1/12*d*(2*m.x*2*m.x+2*m.z*2*m.z),f.z=1/12*d*(2*m.y*2*m.y+2*m.x*2*m.x)},l.prototype.getSideNormals=function(h,d){var f=h,m=this.halfExtents;if(f[0].set(m.x,0,0),f[1].set(0,m.y,0),f[2].set(0,0,m.z),f[3].set(-m.x,0,0),f[4].set(0,-m.y,0),f[5].set(0,0,-m.z),d!==void 0)for(var g=0;g!==f.length;g++)d.vmult(f[g],f[g]);return f},l.prototype.volume=function(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z},l.prototype.updateBoundingSphereRadius=function(){this.boundingSphereRadius=this.halfExtents.norm()};var c=new s;new s,l.prototype.forEachWorldCorner=function(h,d,f){for(var m=this.halfExtents,g=[[m.x,m.y,m.z],[-m.x,m.y,m.z],[-m.x,-m.y,m.z],[-m.x,-m.y,-m.z],[m.x,-m.y,-m.z],[m.x,m.y,-m.z],[-m.x,m.y,-m.z],[m.x,-m.y,m.z]],p=0;p<g.length;p++)c.set(g[p][0],g[p][1],g[p][2]),d.vmult(c,c),h.vadd(c,c),f(c.x,c.y,c.z)};var u=[new s,new s,new s,new s,new s,new s,new s,new s];l.prototype.calculateWorldAABB=function(h,d,f,m){var g=this.halfExtents;u[0].set(g.x,g.y,g.z),u[1].set(-g.x,g.y,g.z),u[2].set(-g.x,-g.y,g.z),u[3].set(-g.x,-g.y,-g.z),u[4].set(g.x,-g.y,-g.z),u[5].set(g.x,g.y,-g.z),u[6].set(-g.x,g.y,-g.z),u[7].set(g.x,-g.y,g.z);var p=u[0];d.vmult(p,p),h.vadd(p,p),m.copy(p),f.copy(p);for(var v=1;v<8;v++){var p=u[v];d.vmult(p,p),h.vadd(p,p);var x=p.x,_=p.y,y=p.z;x>m.x&&(m.x=x),_>m.y&&(m.y=_),y>m.z&&(m.z=y),x<f.x&&(f.x=x),_<f.y&&(f.y=_),y<f.z&&(f.z=y)}}},{"../math/Vec3":30,"./ConvexPolyhedron":38,"./Shape":43}],38:[function(e,n,i){n.exports=l;var r=e("./Shape"),s=e("../math/Vec3");e("../math/Quaternion");var a=e("../math/Transform");function l(B,J,H){r.call(this),this.type=r.types.CONVEXPOLYHEDRON,this.vertices=B||[],this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.faces=J||[],this.faceNormals=[],this.computeNormals(),this.worldFaceNormalsNeedsUpdate=!0,this.worldFaceNormals=[],this.uniqueEdges=[],this.uniqueAxes=H?H.slice():null,this.computeEdges(),this.updateBoundingSphereRadius()}l.prototype=new r,l.prototype.constructor=l;var c=new s;l.prototype.computeEdges=function(){var B=this.faces,J=this.vertices;J.length;var H=this.uniqueEdges;H.length=0;for(var T=c,b=0;b!==B.length;b++)for(var G=B[b],j=G.length,nt=0;nt!==j;nt++){var q=(nt+1)%j;J[G[nt]].vsub(J[G[q]],T),T.normalize();for(var rt=!1,ft=0;ft!==H.length;ft++)if(H[ft].almostEquals(T)||H[ft].almostEquals(T)){rt=!0;break}rt||H.push(T.clone())}},l.prototype.computeNormals=function(){this.faceNormals.length=this.faces.length;for(var B=0;B<this.faces.length;B++){for(var J=0;J<this.faces[B].length;J++)if(!this.vertices[this.faces[B][J]])throw new Error("Vertex "+this.faces[B][J]+" not found!");var H=this.faceNormals[B]||new s;this.getFaceNormal(B,H),H.negate(H),this.faceNormals[B]=H;var T=this.vertices[this.faces[B][0]];if(H.dot(T)<0){console.error(".faceNormals["+B+"] = Vec3("+H.toString()+") looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.");for(var J=0;J<this.faces[B].length;J++)console.warn(".vertices["+this.faces[B][J]+"] = Vec3("+this.vertices[this.faces[B][J]].toString()+")")}}};var u=new s,h=new s;l.computeNormal=function(B,J,H,T){J.vsub(B,h),H.vsub(J,u),u.cross(h,T),T.isZero()||T.normalize()},l.prototype.getFaceNormal=function(B,J){var H=this.faces[B],T=this.vertices[H[0]],b=this.vertices[H[1]],G=this.vertices[H[2]];return l.computeNormal(T,b,G,J)};var d=new s;l.prototype.clipAgainstHull=function(B,J,H,T,b,G,j,nt,q){for(var rt=d,ft=-1,D=-Number.MAX_VALUE,Rt=0;Rt<H.faces.length;Rt++){rt.copy(H.faceNormals[Rt]),b.vmult(rt,rt);var yt=rt.dot(G);yt>D&&(D=yt,ft=Rt)}for(var at=[],st=H.faces[ft],Zt=st.length,Tt=0;Tt<Zt;Tt++){var Ht=H.vertices[st[Tt]],P=new s;P.copy(Ht),b.vmult(P,P),T.vadd(P,P),at.push(P)}ft>=0&&this.clipFaceAgainstHull(G,B,J,at,j,nt,q)};var f=new s,m=new s,g=new s,p=new s,v=new s,x=new s;l.prototype.findSeparatingAxis=function(B,J,H,T,b,G,j,nt){var q=f,rt=m,ft=g,D=p,Rt=v,yt=x,at=Number.MAX_VALUE,st=this;if(st.uniqueAxes)for(var Tt=0;Tt!==st.uniqueAxes.length;Tt++){H.vmult(st.uniqueAxes[Tt],q);var P=st.testSepAxis(q,B,J,H,T,b);if(P===!1)return!1;P<at&&(at=P,G.copy(q))}else for(var Zt=j?j.length:st.faces.length,Tt=0;Tt<Zt;Tt++){var Ht=j?j[Tt]:Tt;q.copy(st.faceNormals[Ht]),H.vmult(q,q);var P=st.testSepAxis(q,B,J,H,T,b);if(P===!1)return!1;P<at&&(at=P,G.copy(q))}if(B.uniqueAxes)for(var Tt=0;Tt!==B.uniqueAxes.length;Tt++){b.vmult(B.uniqueAxes[Tt],rt);var P=st.testSepAxis(rt,B,J,H,T,b);if(P===!1)return!1;P<at&&(at=P,G.copy(rt))}else for(var w=nt?nt.length:B.faces.length,Tt=0;Tt<w;Tt++){var Ht=nt?nt[Tt]:Tt;rt.copy(B.faceNormals[Ht]),b.vmult(rt,rt);var P=st.testSepAxis(rt,B,J,H,T,b);if(P===!1)return!1;P<at&&(at=P,G.copy(rt))}for(var tt=0;tt!==st.uniqueEdges.length;tt++){H.vmult(st.uniqueEdges[tt],D);for(var ct=0;ct!==B.uniqueEdges.length;ct++)if(b.vmult(B.uniqueEdges[ct],Rt),D.cross(Rt,yt),!yt.almostZero()){yt.normalize();var mt=st.testSepAxis(yt,B,J,H,T,b);if(mt===!1)return!1;mt<at&&(at=mt,G.copy(yt))}}return T.vsub(J,ft),ft.dot(G)>0&&G.negate(G),!0};var _=[],y=[];l.prototype.testSepAxis=function(B,J,H,T,b,G){var j=this;l.project(j,B,H,T,_),l.project(J,B,b,G,y);var nt=_[0],q=_[1],rt=y[0],ft=y[1],D=nt-ft,Rt=rt-q,yt=D<Rt?D:Rt;return yt};var R=new s,C=new s;l.prototype.calculateLocalInertia=function(B,J){this.computeLocalAABB(R,C);var H=C.x-R.x,T=C.y-R.y,b=C.z-R.z;J.x=1/12*B*(2*T*2*T+2*b*2*b),J.y=1/12*B*(2*H*2*H+2*b*2*b),J.z=1/12*B*(2*T*2*T+2*H*2*H)},l.prototype.getPlaneConstantOfFace=function(B){var J=this.faces[B],H=this.faceNormals[B],T=this.vertices[J[0]],b=-H.dot(T);return b};var L=new s,N=new s,E=new s,M=new s,A=new s,O=new s,U=new s,Z=new s;l.prototype.clipFaceAgainstHull=function(B,J,H,T,b,G,j){for(var nt=L,q=N,rt=E,ft=M,D=A,Rt=O,yt=U,at=Z,st=this,Zt=[],Tt=T,Ht=Zt,P=-1,w=Number.MAX_VALUE,tt=0;tt<st.faces.length;tt++){nt.copy(st.faceNormals[tt]),H.vmult(nt,nt);var ct=nt.dot(B);ct<w&&(w=ct,P=tt)}if(!(P<0)){var mt=st.faces[P];mt.connectedFaces=[];for(var lt=0;lt<st.faces.length;lt++)for(var Ot=0;Ot<st.faces[lt].length;Ot++)mt.indexOf(st.faces[lt][Ot])!==-1&&lt!==P&&mt.connectedFaces.indexOf(lt)===-1&&mt.connectedFaces.push(lt);Tt.length;for(var gt=mt.length,It=0;It<gt;It++){var jt=st.vertices[mt[It]],At=st.vertices[mt[(It+1)%gt]];jt.vsub(At,q),rt.copy(q),H.vmult(rt,rt),J.vadd(rt,rt),ft.copy(this.faceNormals[P]),H.vmult(ft,ft),J.vadd(ft,ft),rt.cross(ft,D),D.negate(D),Rt.copy(jt),H.vmult(Rt,Rt),J.vadd(Rt,Rt),-Rt.dot(D);var Kt;{var kt=mt.connectedFaces[It];yt.copy(this.faceNormals[kt]);var re=this.getPlaneConstantOfFace(kt);at.copy(yt),H.vmult(at,at);var Kt=re-at.dot(J)}for(this.clipFaceAgainstPlane(Tt,Ht,at,Kt);Tt.length;)Tt.shift();for(;Ht.length;)Tt.push(Ht.shift())}yt.copy(this.faceNormals[P]);var re=this.getPlaneConstantOfFace(P);at.copy(yt),H.vmult(at,at);for(var Kt=re-at.dot(J),lt=0;lt<Tt.length;lt++){var zt=at.dot(Tt[lt])+Kt;if(zt<=b&&(console.log("clamped: depth="+zt+" to minDist="+(b+"")),zt=b),zt<=G){var $t=Tt[lt];if(zt<=0){var te={point:$t,normal:at,depth:zt};j.push(te)}}}}},l.prototype.clipFaceAgainstPlane=function(B,J,H,T){var b,G,j=B.length;if(j<2)return J;var nt=B[B.length-1],q=B[0];b=H.dot(nt)+T;for(var rt=0;rt<j;rt++){if(q=B[rt],G=H.dot(q)+T,b<0)if(G<0){var ft=new s;ft.copy(q),J.push(ft)}else{var ft=new s;nt.lerp(q,b/(b-G),ft),J.push(ft)}else if(G<0){var ft=new s;nt.lerp(q,b/(b-G),ft),J.push(ft),J.push(q)}nt=q,b=G}return J},l.prototype.computeWorldVertices=function(B,J){for(var H=this.vertices.length;this.worldVertices.length<H;)this.worldVertices.push(new s);for(var T=this.vertices,b=this.worldVertices,G=0;G!==H;G++)J.vmult(T[G],b[G]),B.vadd(b[G],b[G]);this.worldVerticesNeedsUpdate=!1},new s,l.prototype.computeLocalAABB=function(B,J){var H=this.vertices.length,T=this.vertices;B.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),J.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(var b=0;b<H;b++){var G=T[b];G.x<B.x?B.x=G.x:G.x>J.x&&(J.x=G.x),G.y<B.y?B.y=G.y:G.y>J.y&&(J.y=G.y),G.z<B.z?B.z=G.z:G.z>J.z&&(J.z=G.z)}},l.prototype.computeWorldFaceNormals=function(B){for(var J=this.faceNormals.length;this.worldFaceNormals.length<J;)this.worldFaceNormals.push(new s);for(var H=this.faceNormals,T=this.worldFaceNormals,b=0;b!==J;b++)B.vmult(H[b],T[b]);this.worldFaceNormalsNeedsUpdate=!1},l.prototype.updateBoundingSphereRadius=function(){for(var B=0,J=this.vertices,H=0,T=J.length;H!==T;H++){var b=J[H].norm2();b>B&&(B=b)}this.boundingSphereRadius=Math.sqrt(B)};var X=new s;l.prototype.calculateWorldAABB=function(B,J,H,T){for(var b=this.vertices.length,G=this.vertices,j,nt,q,rt,ft,D,Rt=0;Rt<b;Rt++){X.copy(G[Rt]),J.vmult(X,X),B.vadd(X,X);var yt=X;yt.x<j||j===void 0?j=yt.x:(yt.x>rt||rt===void 0)&&(rt=yt.x),yt.y<nt||nt===void 0?nt=yt.y:(yt.y>ft||ft===void 0)&&(ft=yt.y),yt.z<q||q===void 0?q=yt.z:(yt.z>D||D===void 0)&&(D=yt.z)}H.set(j,nt,q),T.set(rt,ft,D)},l.prototype.volume=function(){return 4*Math.PI*this.boundingSphereRadius/3},l.prototype.getAveragePointLocal=function(B){B=B||new s;for(var J=this.vertices.length,H=this.vertices,T=0;T<J;T++)B.vadd(H[T],B);return B.mult(1/J,B),B},l.prototype.transformAllPoints=function(B,J){var H=this.vertices.length,T=this.vertices;if(J){for(var b=0;b<H;b++){var G=T[b];J.vmult(G,G)}for(var b=0;b<this.faceNormals.length;b++){var G=this.faceNormals[b];J.vmult(G,G)}}if(B)for(var b=0;b<H;b++){var G=T[b];G.vadd(B,G)}};var $=new s,z=new s,I=new s;l.prototype.pointIsInside=function(B){var J=this.vertices.length,H=this.vertices,T=this.faces,b=this.faceNormals,G=null,j=this.faces.length,nt=$;this.getAveragePointLocal(nt);for(var q=0;q<j;q++){this.faces[q].length;var J=b[q],rt=H[T[q][0]],ft=z;B.vsub(rt,ft);var D=J.dot(ft),Rt=I;nt.vsub(rt,Rt);var yt=J.dot(Rt);if(D<0&&yt>0||D>0&&yt<0)return!1}return G?1:-1},new s;var et=new s,Q=new s;l.project=function(B,J,H,T,b){var G=B.vertices.length,j=et,nt=0,q=0,rt=Q,ft=B.vertices;rt.setZero(),a.vectorToLocalFrame(H,T,J,j),a.pointToLocalFrame(H,T,rt,rt);var D=rt.dot(j);q=nt=ft[0].dot(j);for(var Rt=1;Rt<G;Rt++){var yt=ft[Rt].dot(j);yt>nt&&(nt=yt),yt<q&&(q=yt)}if(q-=D,nt-=D,q>nt){var at=q;q=nt,nt=at}b[0]=nt,b[1]=q}},{"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"./Shape":43}],39:[function(e,n,i){n.exports=l;var r=e("./Shape"),s=e("../math/Vec3");e("../math/Quaternion");var a=e("./ConvexPolyhedron");function l(c,u,h,d){var f=d,m=[],g=[],p=[],v=[],x=[],_=Math.cos,y=Math.sin;m.push(new s(u*_(0),u*y(0),-h*.5)),v.push(0),m.push(new s(c*_(0),c*y(0),h*.5)),x.push(1);for(var R=0;R<f;R++){var C=2*Math.PI/f*(R+1),L=2*Math.PI/f*(R+.5);R<f-1?(m.push(new s(u*_(C),u*y(C),-h*.5)),v.push(2*R+2),m.push(new s(c*_(C),c*y(C),h*.5)),x.push(2*R+3),p.push([2*R+2,2*R+3,2*R+1,2*R])):p.push([0,1,2*R+1,2*R]),(f%2===1||R<f/2)&&g.push(new s(_(L),y(L),0))}p.push(x),g.push(new s(0,0,1));for(var N=[],R=0;R<v.length;R++)N.push(v[v.length-R-1]);p.push(N),this.type=r.types.CONVEXPOLYHEDRON,a.call(this,m,p,g)}l.prototype=new a},{"../math/Quaternion":28,"../math/Vec3":30,"./ConvexPolyhedron":38,"./Shape":43}],40:[function(e,n,i){var r=e("./Shape"),s=e("./ConvexPolyhedron"),a=e("../math/Vec3"),l=e("../utils/Utils");n.exports=c;function c(u,h){h=l.defaults(h,{maxValue:null,minValue:null,elementSize:1}),this.data=u,this.maxValue=h.maxValue,this.minValue=h.minValue,this.elementSize=h.elementSize,h.minValue===null&&this.updateMinValue(),h.maxValue===null&&this.updateMaxValue(),this.cacheEnabled=!0,r.call(this),this.pillarConvex=new s,this.pillarOffset=new a,this.type=r.types.HEIGHTFIELD,this.updateBoundingSphereRadius(),this._cachedPillars={}}c.prototype=new r,c.prototype.update=function(){this._cachedPillars={}},c.prototype.updateMinValue=function(){for(var u=this.data,h=u[0][0],d=0;d!==u.length;d++)for(var f=0;f!==u[d].length;f++){var m=u[d][f];m<h&&(h=m)}this.minValue=h},c.prototype.updateMaxValue=function(){for(var u=this.data,h=u[0][0],d=0;d!==u.length;d++)for(var f=0;f!==u[d].length;f++){var m=u[d][f];m>h&&(h=m)}this.maxValue=h},c.prototype.setHeightValueAtIndex=function(u,h,d){var f=this.data;f[u][h]=d,this.clearCachedConvexTrianglePillar(u,h,!1),u>0&&(this.clearCachedConvexTrianglePillar(u-1,h,!0),this.clearCachedConvexTrianglePillar(u-1,h,!1)),h>0&&(this.clearCachedConvexTrianglePillar(u,h-1,!0),this.clearCachedConvexTrianglePillar(u,h-1,!1)),h>0&&u>0&&this.clearCachedConvexTrianglePillar(u-1,h-1,!0)},c.prototype.getRectMinMax=function(u,h,d,f,m){m=m||[];for(var g=this.data,p=this.minValue,v=u;v<=d;v++)for(var x=h;x<=f;x++){var _=g[v][x];_>p&&(p=_)}m[0]=this.minValue,m[1]=p},c.prototype.getIndexOfPosition=function(u,h,d,f){var m=this.elementSize,g=this.data,p=Math.floor(u/m),v=Math.floor(h/m);return d[0]=p,d[1]=v,f&&(p<0&&(p=0),v<0&&(v=0),p>=g.length-1&&(p=g.length-1),v>=g[0].length-1&&(v=g[0].length-1)),!(p<0||v<0||p>=g.length-1||v>=g[0].length-1)},c.prototype.getHeightAt=function(u,h,d){var f=[];this.getIndexOfPosition(u,h,f,d);var m=[];return this.getRectMinMax(f[0],f[1]+1,f[0],f[1]+1,m),(m[0]+m[1])/2},c.prototype.getCacheConvexTrianglePillarKey=function(u,h,d){return u+"_"+h+"_"+(d?1:0)},c.prototype.getCachedConvexTrianglePillar=function(u,h,d){return this._cachedPillars[this.getCacheConvexTrianglePillarKey(u,h,d)]},c.prototype.setCachedConvexTrianglePillar=function(u,h,d,f,m){this._cachedPillars[this.getCacheConvexTrianglePillarKey(u,h,d)]={convex:f,offset:m}},c.prototype.clearCachedConvexTrianglePillar=function(u,h,d){delete this._cachedPillars[this.getCacheConvexTrianglePillarKey(u,h,d)]},c.prototype.getConvexTrianglePillar=function(u,h,d){var f=this.pillarConvex,m=this.pillarOffset;if(this.cacheEnabled){var g=this.getCachedConvexTrianglePillar(u,h,d);if(g){this.pillarConvex=g.convex,this.pillarOffset=g.offset;return}f=new s,m=new a,this.pillarConvex=f,this.pillarOffset=m}var g=this.data,p=this.elementSize,v=f.faces;f.vertices.length=6;for(var x=0;x<6;x++)f.vertices[x]||(f.vertices[x]=new a);v.length=5;for(var x=0;x<5;x++)v[x]||(v[x]=[]);var _=f.vertices,y=(Math.min(g[u][h],g[u+1][h],g[u][h+1],g[u+1][h+1])-this.minValue)/2+this.minValue;d?(m.set((u+.75)*p,(h+.75)*p,y),_[0].set(.25*p,.25*p,g[u+1][h+1]-y),_[1].set(-.75*p,.25*p,g[u][h+1]-y),_[2].set(.25*p,-.75*p,g[u+1][h]-y),_[3].set(.25*p,.25*p,-y-1),_[4].set(-.75*p,.25*p,-y-1),_[5].set(.25*p,-.75*p,-y-1),v[0][0]=0,v[0][1]=1,v[0][2]=2,v[1][0]=5,v[1][1]=4,v[1][2]=3,v[2][0]=2,v[2][1]=5,v[2][2]=3,v[2][3]=0,v[3][0]=3,v[3][1]=4,v[3][2]=1,v[3][3]=0,v[4][0]=1,v[4][1]=4,v[4][2]=5,v[4][3]=2):(m.set((u+.25)*p,(h+.25)*p,y),_[0].set(-.25*p,-.25*p,g[u][h]-y),_[1].set(.75*p,-.25*p,g[u+1][h]-y),_[2].set(-.25*p,.75*p,g[u][h+1]-y),_[3].set(-.25*p,-.25*p,-y-1),_[4].set(.75*p,-.25*p,-y-1),_[5].set(-.25*p,.75*p,-y-1),v[0][0]=0,v[0][1]=1,v[0][2]=2,v[1][0]=5,v[1][1]=4,v[1][2]=3,v[2][0]=0,v[2][1]=2,v[2][2]=5,v[2][3]=3,v[3][0]=1,v[3][1]=0,v[3][2]=3,v[3][3]=4,v[4][0]=4,v[4][1]=5,v[4][2]=2,v[4][3]=1),f.computeNormals(),f.computeEdges(),f.updateBoundingSphereRadius(),this.setCachedConvexTrianglePillar(u,h,d,f,m)},c.prototype.calculateLocalInertia=function(u,h){return h=h||new a,h.set(0,0,0),h},c.prototype.volume=function(){return Number.MAX_VALUE},c.prototype.calculateWorldAABB=function(u,h,d,f){d.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE),f.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE)},c.prototype.updateBoundingSphereRadius=function(){var u=this.data,h=this.elementSize;this.boundingSphereRadius=new a(u.length*h,u[0].length*h,Math.max(Math.abs(this.maxValue),Math.abs(this.minValue))).norm()}},{"../math/Vec3":30,"../utils/Utils":53,"./ConvexPolyhedron":38,"./Shape":43}],41:[function(e,n,i){n.exports=a;var r=e("./Shape"),s=e("../math/Vec3");function a(){r.call(this),this.type=r.types.PARTICLE}a.prototype=new r,a.prototype.constructor=a,a.prototype.calculateLocalInertia=function(l,c){return c=c||new s,c.set(0,0,0),c},a.prototype.volume=function(){return 0},a.prototype.updateBoundingSphereRadius=function(){this.boundingSphereRadius=0},a.prototype.calculateWorldAABB=function(l,c,u,h){u.copy(l),h.copy(l)}},{"../math/Vec3":30,"./Shape":43}],42:[function(e,n,i){n.exports=a;var r=e("./Shape"),s=e("../math/Vec3");function a(){r.call(this),this.type=r.types.PLANE,this.worldNormal=new s,this.worldNormalNeedsUpdate=!0,this.boundingSphereRadius=Number.MAX_VALUE}a.prototype=new r,a.prototype.constructor=a,a.prototype.computeWorldNormal=function(c){var u=this.worldNormal;u.set(0,0,1),c.vmult(u,u),this.worldNormalNeedsUpdate=!1},a.prototype.calculateLocalInertia=function(c,u){return u=u||new s,u},a.prototype.volume=function(){return Number.MAX_VALUE};var l=new s;a.prototype.calculateWorldAABB=function(c,u,h,d){l.set(0,0,1),u.vmult(l,l);var f=Number.MAX_VALUE;h.set(-f,-f,-f),d.set(f,f,f),l.x===1&&(d.x=c.x),l.y===1&&(d.y=c.y),l.z===1&&(d.z=c.z),l.x===-1&&(h.x=c.x),l.y===-1&&(h.y=c.y),l.z===-1&&(h.z=c.z)},a.prototype.updateBoundingSphereRadius=function(){this.boundingSphereRadius=Number.MAX_VALUE}},{"../math/Vec3":30,"./Shape":43}],43:[function(e,n,i){n.exports=r;var r=e("./Shape");e("../math/Vec3"),e("../math/Quaternion"),e("../material/Material");function r(){this.id=r.idCounter++,this.type=0,this.boundingSphereRadius=0,this.collisionResponse=!0,this.material=null}r.prototype.constructor=r,r.prototype.updateBoundingSphereRadius=function(){throw"computeBoundingSphereRadius() not implemented for shape type "+this.type},r.prototype.volume=function(){throw"volume() not implemented for shape type "+this.type},r.prototype.calculateLocalInertia=function(s,a){throw"calculateLocalInertia() not implemented for shape type "+this.type},r.idCounter=0,r.types={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256}},{"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"./Shape":43}],44:[function(e,n,i){n.exports=a;var r=e("./Shape"),s=e("../math/Vec3");function a(l){if(r.call(this),this.radius=l!==void 0?Number(l):1,this.type=r.types.SPHERE,this.radius<0)throw new Error("The sphere radius cannot be negative.");this.updateBoundingSphereRadius()}a.prototype=new r,a.prototype.constructor=a,a.prototype.calculateLocalInertia=function(l,c){c=c||new s;var u=2*l*this.radius*this.radius/5;return c.x=u,c.y=u,c.z=u,c},a.prototype.volume=function(){return 4*Math.PI*this.radius/3},a.prototype.updateBoundingSphereRadius=function(){this.boundingSphereRadius=this.radius},a.prototype.calculateWorldAABB=function(l,c,u,h){for(var d=this.radius,f=["x","y","z"],m=0;m<f.length;m++){var g=f[m];u[g]=l[g]-d,h[g]=l[g]+d}}},{"../math/Vec3":30,"./Shape":43}],45:[function(e,n,i){n.exports=u;var r=e("./Shape"),s=e("../math/Vec3");e("../math/Quaternion");var a=e("../math/Transform"),l=e("../collision/AABB"),c=e("../utils/Octree");function u(N,E){r.call(this),this.type=r.types.TRIMESH,this.vertices=new Float32Array(N),this.indices=new Int16Array(E),this.normals=new Float32Array(E.length),this.aabb=new l,this.edges=null,this.scale=new s(1,1,1),this.tree=new c,this.updateEdges(),this.updateNormals(),this.updateAABB(),this.updateBoundingSphereRadius(),this.updateTree()}u.prototype=new r,u.prototype.constructor=u;var h=new s;u.prototype.updateTree=function(){var N=this.tree;N.reset(),N.aabb.copy(this.aabb);var E=this.scale;N.aabb.lowerBound.x*=1/E.x,N.aabb.lowerBound.y*=1/E.y,N.aabb.lowerBound.z*=1/E.z,N.aabb.upperBound.x*=1/E.x,N.aabb.upperBound.y*=1/E.y,N.aabb.upperBound.z*=1/E.z;for(var M=new l,A=new s,O=new s,U=new s,Z=[A,O,U],X=0;X<this.indices.length/3;X++){var $=X*3;this._getUnscaledVertex(this.indices[$],A),this._getUnscaledVertex(this.indices[$+1],O),this._getUnscaledVertex(this.indices[$+2],U),M.setFromPoints(Z),N.insert(M,X)}N.removeEmptyNodes()};var d=new l;u.prototype.getTrianglesInAABB=function(N,E){d.copy(N);var M=this.scale,A=M.x,O=M.y,U=M.z,Z=d.lowerBound,X=d.upperBound;return Z.x/=A,Z.y/=O,Z.z/=U,X.x/=A,X.y/=O,X.z/=U,this.tree.aabbQuery(d,E)},u.prototype.setScale=function(N){var E=this.scale.x===this.scale.y===this.scale.z,M=N.x===N.y===N.z;E&&M||this.updateNormals(),this.scale.copy(N),this.updateAABB(),this.updateBoundingSphereRadius()},u.prototype.updateNormals=function(){for(var N=h,E=this.normals,M=0;M<this.indices.length/3;M++){var A=M*3,O=this.indices[A],U=this.indices[A+1],Z=this.indices[A+2];this.getVertex(O,v),this.getVertex(U,x),this.getVertex(Z,_),u.computeNormal(x,v,_,N),E[A]=N.x,E[A+1]=N.y,E[A+2]=N.z}},u.prototype.updateEdges=function(){for(var N={},E=function($,z){var I=O<U?O+"_"+U:U+"_"+O;N[I]=!0},M=0;M<this.indices.length/3;M++){var A=M*3,O=this.indices[A],U=this.indices[A+1];this.indices[A+2],E(),E(),E()}var Z=Object.keys(N);this.edges=new Int16Array(Z.length*2);for(var M=0;M<Z.length;M++){var X=Z[M].split("_");this.edges[2*M]=parseInt(X[0],10),this.edges[2*M+1]=parseInt(X[1],10)}},u.prototype.getEdgeVertex=function(N,E,M){var A=this.edges[N*2+(E?1:0)];this.getVertex(A,M)};var f=new s,m=new s;u.prototype.getEdgeVector=function(N,E){var M=f,A=m;this.getEdgeVertex(N,0,M),this.getEdgeVertex(N,1,A),A.vsub(M,E)};var g=new s,p=new s;u.computeNormal=function(N,E,M,A){E.vsub(N,p),M.vsub(E,g),g.cross(p,A),A.isZero()||A.normalize()};var v=new s,x=new s,_=new s;u.prototype.getVertex=function(N,E){var M=this.scale;return this._getUnscaledVertex(N,E),E.x*=M.x,E.y*=M.y,E.z*=M.z,E},u.prototype._getUnscaledVertex=function(N,E){var M=N*3,A=this.vertices;return E.set(A[M],A[M+1],A[M+2])},u.prototype.getWorldVertex=function(N,E,M,A){return this.getVertex(N,A),a.pointToWorldFrame(E,M,A,A),A},u.prototype.getTriangleVertices=function(N,E,M,A){var O=N*3;this.getVertex(this.indices[O],E),this.getVertex(this.indices[O+1],M),this.getVertex(this.indices[O+2],A)},u.prototype.getNormal=function(N,E){var M=N*3;return E.set(this.normals[M],this.normals[M+1],this.normals[M+2])};var y=new l;u.prototype.calculateLocalInertia=function(N,E){this.computeLocalAABB(y);var M=y.upperBound.x-y.lowerBound.x,A=y.upperBound.y-y.lowerBound.y,O=y.upperBound.z-y.lowerBound.z;return E.set(1/12*N*(2*A*2*A+2*O*2*O),1/12*N*(2*M*2*M+2*O*2*O),1/12*N*(2*A*2*A+2*M*2*M))};var R=new s;u.prototype.computeLocalAABB=function(N){var E=N.lowerBound,M=N.upperBound,A=this.vertices.length;this.vertices;var O=R;this.getVertex(0,O),E.copy(O),M.copy(O);for(var U=0;U!==A;U++)this.getVertex(U,O),O.x<E.x?E.x=O.x:O.x>M.x&&(M.x=O.x),O.y<E.y?E.y=O.y:O.y>M.y&&(M.y=O.y),O.z<E.z?E.z=O.z:O.z>M.z&&(M.z=O.z)},u.prototype.updateAABB=function(){this.computeLocalAABB(this.aabb)},u.prototype.updateBoundingSphereRadius=function(){for(var N=0,E=this.vertices,M=new s,A=0,O=E.length/3;A!==O;A++){this.getVertex(A,M);var U=M.norm2();U>N&&(N=U)}this.boundingSphereRadius=Math.sqrt(N)},new s;var C=new a,L=new l;u.prototype.calculateWorldAABB=function(N,E,M,A){var O=C,U=L;O.position=N,O.quaternion=E,this.aabb.toWorldFrame(O,U),M.copy(U.lowerBound),A.copy(U.upperBound)},u.prototype.volume=function(){return 4*Math.PI*this.boundingSphereRadius/3},u.createTorus=function(N,E,M,A,O){N=N||1,E=E||.5,M=M||8,A=A||6,O=O||Math.PI*2;for(var U=[],Z=[],X=0;X<=M;X++)for(var $=0;$<=A;$++){var z=$/A*O,I=X/M*Math.PI*2,et=(N+E*Math.cos(I))*Math.cos(z),Q=(N+E*Math.cos(I))*Math.sin(z),B=E*Math.sin(I);U.push(et,Q,B)}for(var X=1;X<=M;X++)for(var $=1;$<=A;$++){var J=(A+1)*X+$-1,H=(A+1)*(X-1)+$-1,T=(A+1)*(X-1)+$,b=(A+1)*X+$;Z.push(J,H,b),Z.push(H,T,b)}return new u(U,Z)}},{"../collision/AABB":3,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../utils/Octree":50,"./Shape":43}],46:[function(e,n,i){n.exports=s,e("../math/Vec3"),e("../math/Quaternion");var r=e("./Solver");function s(){r.call(this),this.iterations=10,this.tolerance=1e-7}s.prototype=new r;var a=[],l=[],c=[];s.prototype.solve=function(u,h){var d=0,f=this.iterations,m=this.tolerance*this.tolerance,g=this.equations,p=g.length,v=h.bodies,x=v.length,_=u,y,R,C,L,N,E;if(p!==0)for(var M=0;M!==x;M++)v[M].updateSolveMassProperties();var A=l,O=c,U=a;A.length=p,O.length=p,U.length=p;for(var M=0;M!==p;M++){var Z=g[M];U[M]=0,O[M]=Z.computeB(_),A[M]=1/Z.computeC()}if(p!==0){for(var M=0;M!==x;M++){var X=v[M],$=X.vlambda,z=X.wlambda;$.set(0,0,0),z&&z.set(0,0,0)}for(d=0;d!==f;d++){L=0;for(var I=0;I!==p;I++){var Z=g[I];y=O[I],R=A[I],E=U[I],N=Z.computeGWlambda(),C=R*(y-N-Z.eps*E),E+C<Z.minForce?C=Z.minForce-E:E+C>Z.maxForce&&(C=Z.maxForce-E),U[I]+=C,L+=C>0?C:-C,Z.addToWlambda(C)}if(L*L<m)break}for(var M=0;M!==x;M++){var X=v[M],et=X.velocity,Q=X.angularVelocity;et.vadd(X.vlambda,et),Q&&Q.vadd(X.wlambda,Q)}}return d}},{"../math/Quaternion":28,"../math/Vec3":30,"./Solver":47}],47:[function(e,n,i){n.exports=r;function r(){this.equations=[]}r.prototype.solve=function(s,a){return 0},r.prototype.addEquation=function(s){s.enabled&&this.equations.push(s)},r.prototype.removeEquation=function(s){var a=this.equations,l=a.indexOf(s);l!==-1&&a.splice(l,1)},r.prototype.removeAllEquations=function(){this.equations.length=0}},{}],48:[function(e,n,i){n.exports=a,e("../math/Vec3"),e("../math/Quaternion");var r=e("./Solver"),s=e("../objects/Body");function a(v){for(r.call(this),this.iterations=10,this.tolerance=1e-7,this.subsolver=v,this.nodes=[],this.nodePool=[];this.nodePool.length<128;)this.nodePool.push(this.createNode())}a.prototype=new r;var l=[],c=[],u={bodies:[]},h=s.STATIC;function d(v){for(var x=v.length,_=0;_!==x;_++){var y=v[_];if(!y.visited&&!(y.body.type&h))return y}return!1}var f=[];function m(v,x,_,y){for(f.push(v),v.visited=!0,x(v,_,y);f.length;)for(var R=f.pop(),C;C=d(R.children);)C.visited=!0,x(C,_,y),f.push(C)}function g(v,x,_){x.push(v.body);for(var y=v.eqs.length,R=0;R!==y;R++){var C=v.eqs[R];_.indexOf(C)===-1&&_.push(C)}}a.prototype.createNode=function(){return{body:null,children:[],eqs:[],visited:!1}},a.prototype.solve=function(v,x){for(var _=l,y=this.nodePool,R=x.bodies,C=this.equations,L=C.length,N=R.length,E=this.subsolver;y.length<N;)y.push(this.createNode());_.length=N;for(var M=0;M<N;M++)_[M]=y[M];for(var M=0;M!==N;M++){var A=_[M];A.body=R[M],A.children.length=0,A.eqs.length=0,A.visited=!1}for(var O=0;O!==L;O++){var U=C[O],M=R.indexOf(U.bi),Z=R.indexOf(U.bj),X=_[M],$=_[Z];X.children.push($),X.eqs.push(U),$.children.push(X),$.eqs.push(U)}var z,I=0,et=c;E.tolerance=this.tolerance,E.iterations=this.iterations;for(var Q=u;z=d(_);){et.length=0,Q.bodies.length=0,m(z,g,Q.bodies,et);var B=et.length;et=et.sort(p);for(var M=0;M!==B;M++)E.addEquation(et[M]);E.solve(v,Q),E.removeAllEquations(),I++}return I};function p(v,x){return x.id-v.id}},{"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"./Solver":47}],49:[function(e,n,i){var r=function(){};n.exports=r,r.prototype={constructor:r,addEventListener:function(s,a){this._listeners===void 0&&(this._listeners={});var l=this._listeners;return l[s]===void 0&&(l[s]=[]),l[s].indexOf(a)===-1&&l[s].push(a),this},hasEventListener:function(s,a){if(this._listeners===void 0)return!1;var l=this._listeners;return l[s]!==void 0&&l[s].indexOf(a)!==-1},removeEventListener:function(s,a){if(this._listeners===void 0)return this;var l=this._listeners;if(l[s]===void 0)return this;var c=l[s].indexOf(a);return c!==-1&&l[s].splice(c,1),this},dispatchEvent:function(s){if(this._listeners===void 0)return this;var a=this._listeners,l=a[s.type];if(l!==void 0){s.target=this;for(var c=0,u=l.length;c<u;c++)l[c].call(this,s)}return this}}},{}],50:[function(e,n,i){var r=e("../collision/AABB"),s=e("../math/Vec3");n.exports=l;function a(h){h=h||{},this.root=h.root||null,this.aabb=h.aabb?h.aabb.clone():new r,this.data=[],this.children=[]}function l(h,d){d=d||{},d.root=null,d.aabb=h,a.call(this,d),this.maxDepth=typeof d.maxDepth<"u"?d.maxDepth:8}l.prototype=new a,a.prototype.reset=function(h,d){this.children.length=this.data.length=0},a.prototype.insert=function(h,d,f){var m=this.data;if(f=f||0,!this.aabb.contains(h))return!1;var g=this.children;if(f<(this.maxDepth||this.root.maxDepth)){var p=!1;g.length||(this.subdivide(),p=!0);for(var v=0;v!==8;v++)if(g[v].insert(h,d,f+1))return!0;p&&(g.length=0)}return m.push(d),!0};var c=new s;a.prototype.subdivide=function(){var h=this.aabb,d=h.lowerBound,f=h.upperBound,m=this.children;m.push(new a({aabb:new r({lowerBound:new s(0,0,0)})}),new a({aabb:new r({lowerBound:new s(1,0,0)})}),new a({aabb:new r({lowerBound:new s(1,1,0)})}),new a({aabb:new r({lowerBound:new s(1,1,1)})}),new a({aabb:new r({lowerBound:new s(0,1,1)})}),new a({aabb:new r({lowerBound:new s(0,0,1)})}),new a({aabb:new r({lowerBound:new s(1,0,1)})}),new a({aabb:new r({lowerBound:new s(0,1,0)})})),f.vsub(d,c),c.scale(.5,c);for(var g=this.root||this,p=0;p!==8;p++){var v=m[p];v.root=g;var x=v.aabb.lowerBound;x.x*=c.x,x.y*=c.y,x.z*=c.z,x.vadd(d,x),x.vadd(c,v.aabb.upperBound)}},a.prototype.aabbQuery=function(h,d){this.data,this.children;for(var f=[this];f.length;){var m=f.pop();m.aabb.overlaps(h)&&Array.prototype.push.apply(d,m.data),Array.prototype.push.apply(f,m.children)}return d};var u=new r;a.prototype.rayQuery=function(h,d,f){return h.getAABB(u),u.toLocalFrame(d,u),this.aabbQuery(u,f),f},a.prototype.removeEmptyNodes=function(){for(var h=[this];h.length;){for(var d=h.pop(),f=d.children.length-1;f>=0;f--)d.children[f].data.length||d.children.splice(f,1);Array.prototype.push.apply(h,d.children)}}},{"../collision/AABB":3,"../math/Vec3":30}],51:[function(e,n,i){n.exports=r;function r(){this.objects=[],this.type=Object}r.prototype.release=function(){for(var s=arguments.length,a=0;a!==s;a++)this.objects.push(arguments[a])},r.prototype.get=function(){return this.objects.length===0?this.constructObject():this.objects.pop()},r.prototype.constructObject=function(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}},{}],52:[function(e,n,i){n.exports=r;function r(){this.data={keys:[]}}r.prototype.get=function(s,a){if(s>a){var l=a;a=s,s=l}return this.data[s+"-"+a]},r.prototype.set=function(s,a,l){if(s>a){var c=a;a=s,s=c}var u=s+"-"+a;this.get(s,a)||this.data.keys.push(u),this.data[u]=l},r.prototype.reset=function(){for(var s=this.data,a=s.keys;a.length>0;){var l=a.pop();delete s[l]}}},{}],53:[function(e,n,i){function r(){}n.exports=r,r.defaults=function(s,a){s=s||{};for(var l in a)l in s||(s[l]=a[l]);return s}},{}],54:[function(e,n,i){n.exports=a;var r=e("../math/Vec3"),s=e("./Pool");function a(){s.call(this),this.type=r}a.prototype=new s,a.prototype.constructObject=function(){return new r}},{"../math/Vec3":30,"./Pool":51}],55:[function(e,n,i){n.exports=m;var r=e("../collision/AABB"),s=e("../shapes/Shape"),a=e("../collision/Ray"),l=e("../math/Vec3"),c=e("../math/Transform");e("../shapes/ConvexPolyhedron");var u=e("../math/Quaternion");e("../solver/Solver");var h=e("../utils/Vec3Pool"),d=e("../equations/ContactEquation"),f=e("../equations/FrictionEquation");function m(ot){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new h,this.world=ot,this.currentContactMaterial=null,this.enableFrictionReduction=!1}m.prototype.createContactEquation=function(ot,dt,vt,xt,Qt,Ft){var Ct;this.contactPointPool.length?(Ct=this.contactPointPool.pop(),Ct.bi=ot,Ct.bj=dt):Ct=new d(ot,dt),Ct.enabled=ot.collisionResponse&&dt.collisionResponse&&vt.collisionResponse&&xt.collisionResponse;var Dt=this.currentContactMaterial;Ct.restitution=Dt.restitution,Ct.setSpookParams(Dt.contactEquationStiffness,Dt.contactEquationRelaxation,this.world.dt);var it=vt.material||ot.material,Lt=xt.material||dt.material;return it&&Lt&&it.restitution>=0&&Lt.restitution>=0&&(Ct.restitution=it.restitution*Lt.restitution),Ct.si=Qt||vt,Ct.sj=Ft||xt,Ct},m.prototype.createFrictionEquationsFromContact=function(ot,dt){var vt=ot.bi,xt=ot.bj,Qt=ot.si,Ft=ot.sj,Ct=this.world,Dt=this.currentContactMaterial,it=Dt.friction,Lt=Qt.material||vt.material,Ut=Ft.material||xt.material;if(Lt&&Ut&&Lt.friction>=0&&Ut.friction>=0&&(it=Lt.friction*Ut.friction),it>0){var Gt=it*Ct.gravity.length(),Nt=vt.invMass+xt.invMass;Nt>0&&(Nt=1/Nt);var Pt=this.frictionEquationPool,S=Pt.length?Pt.pop():new f(vt,xt,Gt*Nt),V=Pt.length?Pt.pop():new f(vt,xt,Gt*Nt);return S.bi=V.bi=vt,S.bj=V.bj=xt,S.minForce=V.minForce=-Gt*Nt,S.maxForce=V.maxForce=Gt*Nt,S.ri.copy(ot.ri),S.rj.copy(ot.rj),V.ri.copy(ot.ri),V.rj.copy(ot.rj),ot.ni.tangents(S.t,V.t),S.setSpookParams(Dt.frictionEquationStiffness,Dt.frictionEquationRelaxation,Ct.dt),V.setSpookParams(Dt.frictionEquationStiffness,Dt.frictionEquationRelaxation,Ct.dt),S.enabled=V.enabled=ot.enabled,dt.push(S,V),!0}return!1};var g=new l,p=new l,v=new l;m.prototype.createFrictionFromAverage=function(ot){var dt=this.result[this.result.length-1];if(!(!this.createFrictionEquationsFromContact(dt,this.frictionResult)||ot===1)){var vt=this.frictionResult[this.frictionResult.length-2],xt=this.frictionResult[this.frictionResult.length-1];g.setZero(),p.setZero(),v.setZero();var Qt=dt.bi;dt.bj;for(var Ft=0;Ft!==ot;Ft++)dt=this.result[this.result.length-1-Ft],dt.bodyA!==Qt?(g.vadd(dt.ni,g),p.vadd(dt.ri,p),v.vadd(dt.rj,v)):(g.vsub(dt.ni,g),p.vadd(dt.rj,p),v.vadd(dt.ri,v));var Ct=1/ot;p.scale(Ct,vt.ri),v.scale(Ct,vt.rj),xt.ri.copy(vt.ri),xt.rj.copy(vt.rj),g.normalize(),g.tangents(vt.t,xt.t)}};var x=new l,_=new l,y=new u,R=new u;m.prototype.getContacts=function(ot,dt,vt,xt,Qt,Ft,Ct){this.contactPointPool=Qt,this.frictionEquationPool=Ct,this.result=xt,this.frictionResult=Ft;for(var Dt=y,it=R,Lt=x,Ut=_,Gt=0,Nt=ot.length;Gt!==Nt;Gt++){var Pt=ot[Gt],S=dt[Gt],V=null;Pt.material&&S.material&&(V=vt.getContactMaterial(Pt.material,S.material)||null);for(var K=0;K<Pt.shapes.length;K++){Pt.quaternion.mult(Pt.shapeOrientations[K],Dt),Pt.quaternion.vmult(Pt.shapeOffsets[K],Lt),Lt.vadd(Pt.position,Lt);for(var F=Pt.shapes[K],W=0;W<S.shapes.length;W++){S.quaternion.mult(S.shapeOrientations[W],it),S.quaternion.vmult(S.shapeOffsets[W],Ut),Ut.vadd(S.position,Ut);var ht=S.shapes[W];if(!(Lt.distanceTo(Ut)>F.boundingSphereRadius+ht.boundingSphereRadius)){var bt=null;F.material&&ht.material&&(bt=vt.getContactMaterial(F.material,ht.material)||null),this.currentContactMaterial=bt||V||vt.defaultContactMaterial;var _t=this[F.type|ht.type];_t&&(F.type<ht.type?_t.call(this,F,ht,Lt,Ut,Dt,it,Pt,S,F,ht):_t.call(this,ht,F,Ut,Lt,it,Dt,S,Pt,F,ht))}}}}},m.prototype[s.types.BOX|s.types.BOX]=m.prototype.boxBox=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt){ot.convexPolyhedronRepresentation.material=ot.material,dt.convexPolyhedronRepresentation.material=dt.material,ot.convexPolyhedronRepresentation.collisionResponse=ot.collisionResponse,dt.convexPolyhedronRepresentation.collisionResponse=dt.collisionResponse,this.convexConvex(ot.convexPolyhedronRepresentation,dt.convexPolyhedronRepresentation,vt,xt,Qt,Ft,Ct,Dt,ot,dt)},m.prototype[s.types.BOX|s.types.CONVEXPOLYHEDRON]=m.prototype.boxConvex=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt){ot.convexPolyhedronRepresentation.material=ot.material,ot.convexPolyhedronRepresentation.collisionResponse=ot.collisionResponse,this.convexConvex(ot.convexPolyhedronRepresentation,dt,vt,xt,Qt,Ft,Ct,Dt,ot,dt)},m.prototype[s.types.BOX|s.types.PARTICLE]=m.prototype.boxParticle=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt){ot.convexPolyhedronRepresentation.material=ot.material,ot.convexPolyhedronRepresentation.collisionResponse=ot.collisionResponse,this.convexParticle(ot.convexPolyhedronRepresentation,dt,vt,xt,Qt,Ft,Ct,Dt,ot,dt)},m.prototype[s.types.SPHERE]=m.prototype.sphereSphere=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt){var it=this.createContactEquation(Ct,Dt,ot,dt);xt.vsub(vt,it.ni),it.ni.normalize(),it.ri.copy(it.ni),it.rj.copy(it.ni),it.ri.mult(ot.radius,it.ri),it.rj.mult(-dt.radius,it.rj),it.ri.vadd(vt,it.ri),it.ri.vsub(Ct.position,it.ri),it.rj.vadd(xt,it.rj),it.rj.vsub(Dt.position,it.rj),this.result.push(it),this.createFrictionEquationsFromContact(it,this.frictionResult)};var C=new l,L=new l,N=new l;m.prototype[s.types.PLANE|s.types.TRIMESH]=m.prototype.planeTrimesh=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt){var it=new l,Lt=C;Lt.set(0,0,1),Qt.vmult(Lt,Lt);for(var Ut=0;Ut<dt.vertices.length/3;Ut++){dt.getVertex(Ut,it);var Gt=new l;Gt.copy(it),c.pointToWorldFrame(xt,Ft,Gt,it);var Nt=L;it.vsub(vt,Nt);var Pt=Lt.dot(Nt);if(Pt<=0){var S=this.createContactEquation(Ct,Dt,ot,dt);S.ni.copy(Lt);var V=N;Lt.scale(Nt.dot(Lt),V),it.vsub(V,V),S.ri.copy(V),S.ri.vsub(Ct.position,S.ri),S.rj.copy(it),S.rj.vsub(Dt.position,S.rj),this.result.push(S),this.createFrictionEquationsFromContact(S,this.frictionResult)}}};var E=new l,M=new l;new l;var A=new l,O=new l,U=new l,Z=new l,X=new l,$=new l,z=new l,I=new l,et=new l,Q=new l,B=new l,J=new r,H=[];m.prototype[s.types.SPHERE|s.types.TRIMESH]=m.prototype.sphereTrimesh=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt){var it=U,Lt=Z,Ut=X,Gt=$,Nt=z,Pt=I,S=J,V=O,K=M,F=H;c.pointToLocalFrame(xt,Ft,vt,Nt);var W=ot.radius;S.lowerBound.set(Nt.x-W,Nt.y-W,Nt.z-W),S.upperBound.set(Nt.x+W,Nt.y+W,Nt.z+W),dt.getTrianglesInAABB(S,F);for(var ht=A,bt=ot.radius*ot.radius,_t=0;_t<F.length;_t++)for(var wt=0;wt<3;wt++)if(dt.getVertex(dt.indices[F[_t]*3+wt],ht),ht.vsub(Nt,K),K.norm2()<=bt){V.copy(ht),c.pointToWorldFrame(xt,Ft,V,ht),ht.vsub(vt,K);var Mt=this.createContactEquation(Ct,Dt,ot,dt);Mt.ni.copy(K),Mt.ni.normalize(),Mt.ri.copy(Mt.ni),Mt.ri.scale(ot.radius,Mt.ri),Mt.ri.vadd(vt,Mt.ri),Mt.ri.vsub(Ct.position,Mt.ri),Mt.rj.copy(ht),Mt.rj.vsub(Dt.position,Mt.rj),this.result.push(Mt),this.createFrictionEquationsFromContact(Mt,this.frictionResult)}for(var _t=0;_t<F.length;_t++)for(var wt=0;wt<3;wt++){dt.getVertex(dt.indices[F[_t]*3+wt],it),dt.getVertex(dt.indices[F[_t]*3+(wt+1)%3],Lt),Lt.vsub(it,Ut),Nt.vsub(Lt,Pt);var Yt=Pt.dot(Ut);Nt.vsub(it,Pt);var qt=Pt.dot(Ut);if(qt>0&&Yt<0){Nt.vsub(it,Pt),Gt.copy(Ut),Gt.normalize(),qt=Pt.dot(Gt),Gt.scale(qt,Pt),Pt.vadd(it,Pt);var ne=Pt.distanceTo(Nt);if(ne<ot.radius){var Mt=this.createContactEquation(Ct,Dt,ot,dt);Pt.vsub(Nt,Mt.ni),Mt.ni.normalize(),Mt.ni.scale(ot.radius,Mt.ri),c.pointToWorldFrame(xt,Ft,Pt,Pt),Pt.vsub(Dt.position,Mt.rj),c.vectorToWorldFrame(Ft,Mt.ni,Mt.ni),c.vectorToWorldFrame(Ft,Mt.ri,Mt.ri),this.result.push(Mt),this.createFrictionEquationsFromContact(Mt,this.frictionResult)}}}for(var me=et,de=Q,ae=B,le=E,_t=0,Bt=F.length;_t!==Bt;_t++){dt.getTriangleVertices(F[_t],me,de,ae),dt.getNormal(F[_t],le),Nt.vsub(me,Pt);var ne=Pt.dot(le);if(le.scale(ne,Pt),Nt.vsub(Pt,Pt),ne=Pt.distanceTo(Nt),a.pointInTriangle(Pt,me,de,ae)&&ne<ot.radius){var Mt=this.createContactEquation(Ct,Dt,ot,dt);Pt.vsub(Nt,Mt.ni),Mt.ni.normalize(),Mt.ni.scale(ot.radius,Mt.ri),c.pointToWorldFrame(xt,Ft,Pt,Pt),Pt.vsub(Dt.position,Mt.rj),c.vectorToWorldFrame(Ft,Mt.ni,Mt.ni),c.vectorToWorldFrame(Ft,Mt.ri,Mt.ri),this.result.push(Mt),this.createFrictionEquationsFromContact(Mt,this.frictionResult)}}F.length=0};var T=new l,b=new l;m.prototype[s.types.SPHERE|s.types.PLANE]=m.prototype.spherePlane=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt){var it=this.createContactEquation(Ct,Dt,ot,dt);if(it.ni.set(0,0,1),Ft.vmult(it.ni,it.ni),it.ni.negate(it.ni),it.ni.normalize(),it.ni.mult(ot.radius,it.ri),vt.vsub(xt,T),it.ni.mult(it.ni.dot(T),b),T.vsub(b,it.rj),-T.dot(it.ni)<=ot.radius){var Lt=it.ri,Ut=it.rj;Lt.vadd(vt,Lt),Lt.vsub(Ct.position,Lt),Ut.vadd(xt,Ut),Ut.vsub(Dt.position,Ut),this.result.push(it),this.createFrictionEquationsFromContact(it,this.frictionResult)}};var G=new l,j=new l,nt=new l;function q(ot,dt,vt){for(var xt=null,Qt=ot.length,Ft=0;Ft!==Qt;Ft++){var Ct=ot[Ft],Dt=G;ot[(Ft+1)%Qt].vsub(Ct,Dt);var it=j;Dt.cross(dt,it);var Lt=nt;vt.vsub(Ct,Lt);var Ut=it.dot(Lt);if(xt===null||Ut>0&&xt===!0||Ut<=0&&xt===!1){xt===null&&(xt=Ut>0);continue}else return!1}return!0}var rt=new l,ft=new l,D=new l,Rt=new l,yt=[new l,new l,new l,new l,new l,new l],at=new l,st=new l,Zt=new l,Tt=new l;m.prototype[s.types.SPHERE|s.types.BOX]=m.prototype.sphereBox=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt){var it=this.v3pool,Lt=yt;vt.vsub(xt,rt),dt.getSideNormals(Lt,Ft);for(var Ut=ot.radius,Gt=!1,Nt=st,Pt=Zt,S=Tt,V=null,K=0,F=0,W=0,ht=null,bt=0,_t=Lt.length;bt!==_t&&Gt===!1;bt++){var wt=ft;wt.copy(Lt[bt]);var Mt=wt.norm();wt.normalize();var Yt=rt.dot(wt);if(Yt<Mt+Ut&&Yt>0){var qt=D,ne=Rt;qt.copy(Lt[(bt+1)%3]),ne.copy(Lt[(bt+2)%3]);var me=qt.norm(),de=ne.norm();qt.normalize(),ne.normalize();var ae=rt.dot(qt),le=rt.dot(ne);if(ae<me&&ae>-me&&le<de&&le>-de){var Ie=Math.abs(Yt-Mt-Ut);(ht===null||Ie<ht)&&(ht=Ie,F=ae,W=le,V=Mt,Nt.copy(wt),Pt.copy(qt),S.copy(ne),K++)}}}if(K){Gt=!0;var Wt=this.createContactEquation(Ct,Dt,ot,dt);Nt.mult(-Ut,Wt.ri),Wt.ni.copy(Nt),Wt.ni.negate(Wt.ni),Nt.mult(V,Nt),Pt.mult(F,Pt),Nt.vadd(Pt,Nt),S.mult(W,S),Nt.vadd(S,Wt.rj),Wt.ri.vadd(vt,Wt.ri),Wt.ri.vsub(Ct.position,Wt.ri),Wt.rj.vadd(xt,Wt.rj),Wt.rj.vsub(Dt.position,Wt.rj),this.result.push(Wt),this.createFrictionEquationsFromContact(Wt,this.frictionResult)}for(var Bt=it.get(),Ee=at,ie=0;ie!==2&&!Gt;ie++)for(var Se=0;Se!==2&&!Gt;Se++)for(var be=0;be!==2&&!Gt;be++)if(Bt.set(0,0,0),ie?Bt.vadd(Lt[0],Bt):Bt.vsub(Lt[0],Bt),Se?Bt.vadd(Lt[1],Bt):Bt.vsub(Lt[1],Bt),be?Bt.vadd(Lt[2],Bt):Bt.vsub(Lt[2],Bt),xt.vadd(Bt,Ee),Ee.vsub(vt,Ee),Ee.norm2()<Ut*Ut){Gt=!0;var Wt=this.createContactEquation(Ct,Dt,ot,dt);Wt.ri.copy(Ee),Wt.ri.normalize(),Wt.ni.copy(Wt.ri),Wt.ri.mult(Ut,Wt.ri),Wt.rj.copy(Bt),Wt.ri.vadd(vt,Wt.ri),Wt.ri.vsub(Ct.position,Wt.ri),Wt.rj.vadd(xt,Wt.rj),Wt.rj.vsub(Dt.position,Wt.rj),this.result.push(Wt),this.createFrictionEquationsFromContact(Wt,this.frictionResult)}it.release(Bt),Bt=null;for(var we=it.get(),Qe=it.get(),Wt=it.get(),Le=it.get(),Ie=it.get(),De=Lt.length,ie=0;ie!==De&&!Gt;ie++)for(var Se=0;Se!==De&&!Gt;Se++)if(ie%3!==Se%3){Lt[Se].cross(Lt[ie],we),we.normalize(),Lt[ie].vadd(Lt[Se],Qe),Wt.copy(vt),Wt.vsub(Qe,Wt),Wt.vsub(xt,Wt);var dn=Wt.dot(we);we.mult(dn,Le);for(var be=0;be===ie%3||be===Se%3;)be++;Ie.copy(vt),Ie.vsub(Le,Ie),Ie.vsub(Qe,Ie),Ie.vsub(xt,Ie);var Ds=Math.abs(dn),Lr=Ie.norm();if(Ds<Lt[be].norm()&&Lr<Ut){Gt=!0;var Re=this.createContactEquation(Ct,Dt,ot,dt);Qe.vadd(Le,Re.rj),Re.rj.copy(Re.rj),Ie.negate(Re.ni),Re.ni.normalize(),Re.ri.copy(Re.rj),Re.ri.vadd(xt,Re.ri),Re.ri.vsub(vt,Re.ri),Re.ri.normalize(),Re.ri.mult(Ut,Re.ri),Re.ri.vadd(vt,Re.ri),Re.ri.vsub(Ct.position,Re.ri),Re.rj.vadd(xt,Re.rj),Re.rj.vsub(Dt.position,Re.rj),this.result.push(Re),this.createFrictionEquationsFromContact(Re,this.frictionResult)}}it.release(we,Qe,Wt,Le,Ie)};var Ht=new l,P=new l,w=new l,tt=new l,ct=new l,mt=new l,lt=new l,Ot=new l,gt=new l,It=new l;m.prototype[s.types.SPHERE|s.types.CONVEXPOLYHEDRON]=m.prototype.sphereConvex=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt){var it=this.v3pool;vt.vsub(xt,Ht);for(var Lt=dt.faceNormals,Ut=dt.faces,Gt=dt.vertices,Nt=ot.radius,Pt=0;Pt!==Gt.length;Pt++){var S=Gt[Pt],V=ct;Ft.vmult(S,V),xt.vadd(V,V);var K=tt;if(V.vsub(vt,K),K.norm2()<Nt*Nt){W=!0;var F=this.createContactEquation(Ct,Dt,ot,dt);F.ri.copy(K),F.ri.normalize(),F.ni.copy(F.ri),F.ri.mult(Nt,F.ri),V.vsub(xt,F.rj),F.ri.vadd(vt,F.ri),F.ri.vsub(Ct.position,F.ri),F.rj.vadd(xt,F.rj),F.rj.vsub(Dt.position,F.rj),this.result.push(F),this.createFrictionEquationsFromContact(F,this.frictionResult);return}}for(var W=!1,Pt=0,ht=Ut.length;Pt!==ht&&W===!1;Pt++){var bt=Lt[Pt],_t=Ut[Pt],wt=mt;Ft.vmult(bt,wt);var Mt=lt;Ft.vmult(Gt[_t[0]],Mt),Mt.vadd(xt,Mt);var Yt=Ot;wt.mult(-Nt,Yt),vt.vadd(Yt,Yt);var qt=gt;Yt.vsub(Mt,qt);var ne=qt.dot(wt),me=It;if(vt.vsub(Mt,me),ne<0&&me.dot(wt)>0){for(var de=[],ae=0,le=_t.length;ae!==le;ae++){var Bt=it.get();Ft.vmult(Gt[_t[ae]],Bt),xt.vadd(Bt,Bt),de.push(Bt)}if(q(de,wt,vt)){W=!0;var F=this.createContactEquation(Ct,Dt,ot,dt);wt.mult(-Nt,F.ri),wt.negate(F.ni);var Ee=it.get();wt.mult(-ne,Ee);var ie=it.get();wt.mult(-Nt,ie),vt.vsub(xt,F.rj),F.rj.vadd(ie,F.rj),F.rj.vadd(Ee,F.rj),F.rj.vadd(xt,F.rj),F.rj.vsub(Dt.position,F.rj),F.ri.vadd(vt,F.ri),F.ri.vsub(Ct.position,F.ri),it.release(Ee),it.release(ie),this.result.push(F),this.createFrictionEquationsFromContact(F,this.frictionResult);for(var ae=0,Se=de.length;ae!==Se;ae++)it.release(de[ae]);return}else for(var ae=0;ae!==_t.length;ae++){var be=it.get(),we=it.get();Ft.vmult(Gt[_t[(ae+1)%_t.length]],be),Ft.vmult(Gt[_t[(ae+2)%_t.length]],we),xt.vadd(be,be),xt.vadd(we,we);var Qe=P;we.vsub(be,Qe);var Wt=w;Qe.unit(Wt);var Le=it.get(),Ie=it.get();vt.vsub(be,Ie);var De=Ie.dot(Wt);Wt.mult(De,Le),Le.vadd(be,Le);var dn=it.get();if(Le.vsub(vt,dn),De>0&&De*De<Qe.norm2()&&dn.norm2()<Nt*Nt){var F=this.createContactEquation(Ct,Dt,ot,dt);Le.vsub(xt,F.rj),Le.vsub(vt,F.ni),F.ni.normalize(),F.ni.mult(Nt,F.ri),F.rj.vadd(xt,F.rj),F.rj.vsub(Dt.position,F.rj),F.ri.vadd(vt,F.ri),F.ri.vsub(Ct.position,F.ri),this.result.push(F),this.createFrictionEquationsFromContact(F,this.frictionResult);for(var ae=0,Se=de.length;ae!==Se;ae++)it.release(de[ae]);it.release(be),it.release(we),it.release(Le),it.release(dn),it.release(Ie);return}it.release(be),it.release(we),it.release(Le),it.release(dn),it.release(Ie)}for(var ae=0,Se=de.length;ae!==Se;ae++)it.release(de[ae])}}},new l,new l,m.prototype[s.types.PLANE|s.types.BOX]=m.prototype.planeBox=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt){dt.convexPolyhedronRepresentation.material=dt.material,dt.convexPolyhedronRepresentation.collisionResponse=dt.collisionResponse,this.planeConvex(ot,dt.convexPolyhedronRepresentation,vt,xt,Qt,Ft,Ct,Dt)};var jt=new l,At=new l,kt=new l,re=new l;m.prototype[s.types.PLANE|s.types.CONVEXPOLYHEDRON]=m.prototype.planeConvex=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt){var it=jt,Lt=At;Lt.set(0,0,1),Qt.vmult(Lt,Lt);for(var Ut=0,Gt=kt,Nt=0;Nt!==dt.vertices.length;Nt++){it.copy(dt.vertices[Nt]),Ft.vmult(it,it),xt.vadd(it,it),it.vsub(vt,Gt);var Pt=Lt.dot(Gt);if(Pt<=0){var S=this.createContactEquation(Ct,Dt,ot,dt),V=re;Lt.mult(Lt.dot(Gt),V),it.vsub(V,V),V.vsub(vt,S.ri),S.ni.copy(Lt),it.vsub(xt,S.rj),S.ri.vadd(vt,S.ri),S.ri.vsub(Ct.position,S.ri),S.rj.vadd(xt,S.rj),S.rj.vsub(Dt.position,S.rj),this.result.push(S),Ut++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(S,this.frictionResult)}}this.enableFrictionReduction&&Ut&&this.createFrictionFromAverage(Ut)};var Kt=new l,zt=new l;m.prototype[s.types.CONVEXPOLYHEDRON]=m.prototype.convexConvex=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt,it,Lt,Ut,Gt){var Nt=Kt;if(!(vt.distanceTo(xt)>ot.boundingSphereRadius+dt.boundingSphereRadius)&&ot.findSeparatingAxis(dt,vt,Qt,xt,Ft,Nt,Ut,Gt)){var Pt=[],S=zt;ot.clipAgainstHull(vt,Qt,dt,xt,Ft,Nt,-100,100,Pt);for(var V=0,K=0;K!==Pt.length;K++){var F=this.createContactEquation(Ct,Dt,ot,dt,it,Lt),W=F.ri,ht=F.rj;Nt.negate(F.ni),Pt[K].normal.negate(S),S.mult(Pt[K].depth,S),Pt[K].point.vadd(S,W),ht.copy(Pt[K].point),W.vsub(vt,W),ht.vsub(xt,ht),W.vadd(vt,W),W.vsub(Ct.position,W),ht.vadd(xt,ht),ht.vsub(Dt.position,ht),this.result.push(F),V++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(F,this.frictionResult)}this.enableFrictionReduction&&V&&this.createFrictionFromAverage(V)}};var $t=new l,te=new l,pe=new l;m.prototype[s.types.PLANE|s.types.PARTICLE]=m.prototype.planeParticle=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt){var it=$t;it.set(0,0,1),Ct.quaternion.vmult(it,it);var Lt=te;xt.vsub(Ct.position,Lt);var Ut=it.dot(Lt);if(Ut<=0){var Gt=this.createContactEquation(Dt,Ct,dt,ot);Gt.ni.copy(it),Gt.ni.negate(Gt.ni),Gt.ri.set(0,0,0);var Nt=pe;it.mult(it.dot(xt),Nt),xt.vsub(Nt,Nt),Gt.rj.copy(Nt),this.result.push(Gt),this.createFrictionEquationsFromContact(Gt,this.frictionResult)}};var Y=new l;m.prototype[s.types.PARTICLE|s.types.SPHERE]=m.prototype.sphereParticle=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt){var it=Y;it.set(0,0,1),xt.vsub(vt,it);var Lt=it.norm2();if(Lt<=ot.radius*ot.radius){var Ut=this.createContactEquation(Dt,Ct,dt,ot);it.normalize(),Ut.rj.copy(it),Ut.rj.mult(ot.radius,Ut.rj),Ut.ni.copy(it),Ut.ni.negate(Ut.ni),Ut.ri.set(0,0,0),this.result.push(Ut),this.createFrictionEquationsFromContact(Ut,this.frictionResult)}};var St=new u,ut=new l;new l;var pt=new l,Et=new l,Jt=new l;m.prototype[s.types.PARTICLE|s.types.CONVEXPOLYHEDRON]=m.prototype.convexParticle=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt){var it=-1,Lt=pt,Ut=Jt,Gt=null,Nt=ut;if(Nt.copy(xt),Nt.vsub(vt,Nt),Qt.conjugate(St),St.vmult(Nt,Nt),ot.pointIsInside(Nt)){ot.worldVerticesNeedsUpdate&&ot.computeWorldVertices(vt,Qt),ot.worldFaceNormalsNeedsUpdate&&ot.computeWorldFaceNormals(Qt);for(var Pt=0,S=ot.faces.length;Pt!==S;Pt++){var V=[ot.worldVertices[ot.faces[Pt][0]]],K=ot.worldFaceNormals[Pt];xt.vsub(V[0],Et);var F=-K.dot(Et);(Gt===null||Math.abs(F)<Math.abs(Gt))&&(Gt=F,it=Pt,Lt.copy(K))}if(it!==-1){var W=this.createContactEquation(Dt,Ct,dt,ot);Lt.mult(Gt,Ut),Ut.vadd(xt,Ut),Ut.vsub(vt,Ut),W.rj.copy(Ut),Lt.negate(W.ni),W.ri.set(0,0,0);var ht=W.ri,bt=W.rj;ht.vadd(xt,ht),ht.vsub(Dt.position,ht),bt.vadd(vt,bt),bt.vsub(Ct.position,bt),this.result.push(W),this.createFrictionEquationsFromContact(W,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}},m.prototype[s.types.BOX|s.types.HEIGHTFIELD]=m.prototype.boxHeightfield=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt){ot.convexPolyhedronRepresentation.material=ot.material,ot.convexPolyhedronRepresentation.collisionResponse=ot.collisionResponse,this.convexHeightfield(ot.convexPolyhedronRepresentation,dt,vt,xt,Qt,Ft,Ct,Dt)};var oe=new l,_e=new l,Te=[0];m.prototype[s.types.CONVEXPOLYHEDRON|s.types.HEIGHTFIELD]=m.prototype.convexHeightfield=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt){var it=dt.data,Lt=dt.elementSize,Ut=ot.boundingSphereRadius,Gt=_e,Nt=Te,Pt=oe;c.pointToLocalFrame(xt,Ft,vt,Pt);var S=Math.floor((Pt.x-Ut)/Lt)-1,V=Math.ceil((Pt.x+Ut)/Lt)+1,K=Math.floor((Pt.y-Ut)/Lt)-1,F=Math.ceil((Pt.y+Ut)/Lt)+1;if(!(V<0||F<0||S>it.length||K>it[0].length)){S<0&&(S=0),V<0&&(V=0),K<0&&(K=0),F<0&&(F=0),S>=it.length&&(S=it.length-1),V>=it.length&&(V=it.length-1),F>=it[0].length&&(F=it[0].length-1),K>=it[0].length&&(K=it[0].length-1);var W=[];dt.getRectMinMax(S,K,V,F,W);var ht=W[0],bt=W[1];if(!(Pt.z-Ut>bt||Pt.z+Ut<ht))for(var _t=S;_t<V;_t++)for(var wt=K;wt<F;wt++)dt.getConvexTrianglePillar(_t,wt,!1),c.pointToWorldFrame(xt,Ft,dt.pillarOffset,Gt),vt.distanceTo(Gt)<dt.pillarConvex.boundingSphereRadius+ot.boundingSphereRadius&&this.convexConvex(ot,dt.pillarConvex,vt,Gt,Qt,Ft,Ct,Dt,null,null,Nt,null),dt.getConvexTrianglePillar(_t,wt,!0),c.pointToWorldFrame(xt,Ft,dt.pillarOffset,Gt),vt.distanceTo(Gt)<dt.pillarConvex.boundingSphereRadius+ot.boundingSphereRadius&&this.convexConvex(ot,dt.pillarConvex,vt,Gt,Qt,Ft,Ct,Dt,null,null,Nt,null)}};var ue=new l,Me=new l;m.prototype[s.types.SPHERE|s.types.HEIGHTFIELD]=m.prototype.sphereHeightfield=function(ot,dt,vt,xt,Qt,Ft,Ct,Dt){var it=dt.data,Lt=ot.radius,Ut=dt.elementSize,Gt=Me,Nt=ue;c.pointToLocalFrame(xt,Ft,vt,Nt);var Pt=Math.floor((Nt.x-Lt)/Ut)-1,S=Math.ceil((Nt.x+Lt)/Ut)+1,V=Math.floor((Nt.y-Lt)/Ut)-1,K=Math.ceil((Nt.y+Lt)/Ut)+1;if(!(S<0||K<0||Pt>it.length||K>it[0].length)){Pt<0&&(Pt=0),S<0&&(S=0),V<0&&(V=0),K<0&&(K=0),Pt>=it.length&&(Pt=it.length-1),S>=it.length&&(S=it.length-1),K>=it[0].length&&(K=it[0].length-1),V>=it[0].length&&(V=it[0].length-1);var F=[];dt.getRectMinMax(Pt,V,S,K,F);var W=F[0],ht=F[1];if(!(Nt.z-Lt>ht||Nt.z+Lt<W))for(var bt=this.result,_t=Pt;_t<S;_t++)for(var wt=V;wt<K;wt++){var Mt=bt.length;dt.getConvexTrianglePillar(_t,wt,!1),c.pointToWorldFrame(xt,Ft,dt.pillarOffset,Gt),vt.distanceTo(Gt)<dt.pillarConvex.boundingSphereRadius+ot.boundingSphereRadius&&this.sphereConvex(ot,dt.pillarConvex,vt,Gt,Qt,Ft,Ct,Dt),dt.getConvexTrianglePillar(_t,wt,!0),c.pointToWorldFrame(xt,Ft,dt.pillarOffset,Gt),vt.distanceTo(Gt)<dt.pillarConvex.boundingSphereRadius+ot.boundingSphereRadius&&this.sphereConvex(ot,dt.pillarConvex,vt,Gt,Qt,Ft,Ct,Dt);var Yt=bt.length-Mt;if(Yt>2)return}}}},{"../collision/AABB":3,"../collision/Ray":9,"../equations/ContactEquation":19,"../equations/FrictionEquation":21,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../shapes/ConvexPolyhedron":38,"../shapes/Shape":43,"../solver/Solver":47,"../utils/Vec3Pool":54}],56:[function(e,n,i){n.exports=y;var r=e("../shapes/Shape"),s=e("../math/Vec3"),a=e("../math/Quaternion"),l=e("../solver/GSSolver");e("../utils/Vec3Pool"),e("../equations/ContactEquation"),e("../equations/FrictionEquation");var c=e("./Narrowphase"),u=e("../utils/EventTarget"),h=e("../collision/ArrayCollisionMatrix"),d=e("../material/Material"),f=e("../material/ContactMaterial"),m=e("../objects/Body"),g=e("../utils/TupleDictionary"),p=e("../collision/RaycastResult"),v=e("../collision/AABB"),x=e("../collision/Ray"),_=e("../collision/NaiveBroadphase");function y(){u.apply(this),this.dt=-1,this.allowSleep=!1,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=0,this.quatNormalizeFast=!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new s,this.broadphase=new _,this.bodies=[],this.solver=new l,this.constraints=[],this.narrowphase=new c(this),this.collisionMatrix=new h,this.collisionMatrixPrevious=new h,this.materials=[],this.contactmaterials=[],this.contactMaterialTable=new g,this.defaultMaterial=new d("default"),this.defaultContactMaterial=new f(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null}}y.prototype=new u,new v;var R=new x;if(y.prototype.getContactMaterial=function(I,et){return this.contactMaterialTable.get(I.id,et.id)},y.prototype.numObjects=function(){return this.bodies.length},y.prototype.collisionMatrixTick=function(){var I=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=I,this.collisionMatrix.reset()},y.prototype.add=y.prototype.addBody=function(I){this.bodies.indexOf(I)===-1&&(I.index=this.bodies.length,this.bodies.push(I),I.world=this,I.initPosition.copy(I.position),I.initVelocity.copy(I.velocity),I.timeLastSleepy=this.time,I instanceof m&&(I.initAngularVelocity.copy(I.angularVelocity),I.initQuaternion.copy(I.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=I,this.dispatchEvent(this.addBodyEvent))},y.prototype.addConstraint=function(I){this.constraints.push(I)},y.prototype.removeConstraint=function(I){var et=this.constraints.indexOf(I);et!==-1&&this.constraints.splice(et,1)},y.prototype.rayTest=function(I,et,Q){Q instanceof p?this.raycastClosest(I,et,{skipBackfaces:!0},Q):this.raycastAll(I,et,{skipBackfaces:!0},Q)},y.prototype.raycastAll=function(I,et,Q,B){return Q.mode=x.ALL,Q.from=I,Q.to=et,Q.callback=B,R.intersectWorld(this,Q)},y.prototype.raycastAny=function(I,et,Q,B){return Q.mode=x.ANY,Q.from=I,Q.to=et,Q.result=B,R.intersectWorld(this,Q)},y.prototype.raycastClosest=function(I,et,Q,B){return Q.mode=x.CLOSEST,Q.from=I,Q.to=et,Q.result=B,R.intersectWorld(this,Q)},y.prototype.remove=function(I){I.world=null;var et=this.bodies.length-1,Q=this.bodies,B=Q.indexOf(I);if(B!==-1){Q.splice(B,1);for(var J=0;J!==Q.length;J++)Q[J].index=J;this.collisionMatrix.setNumObjects(et),this.removeBodyEvent.body=I,this.dispatchEvent(this.removeBodyEvent)}},y.prototype.removeBody=y.prototype.remove,y.prototype.addMaterial=function(I){this.materials.push(I)},y.prototype.addContactMaterial=function(I){this.contactmaterials.push(I),this.contactMaterialTable.set(I.materials[0].id,I.materials[1].id,I)},typeof performance>"u"&&(performance={}),!performance.now){var C=Date.now();performance.timing&&performance.timing.navigationStart&&(C=performance.timing.navigationStart),performance.now=function(){return Date.now()-C}}var L=new s;y.prototype.step=function(I,et,Q){if(Q=Q||10,et=et||0,et===0)this.internalStep(I),this.time+=I;else{var B=Math.floor((this.time+et)/I)-Math.floor(this.time/I);B=Math.min(B,Q);for(var J=performance.now(),H=0;H!==B&&(this.internalStep(I),!(performance.now()-J>I*1e3));H++);this.time+=et;for(var T=this.time%I,b=T/I,G=L,j=this.bodies,nt=0;nt!==j.length;nt++){var q=j[nt];q.type!==m.STATIC&&q.sleepState!==m.SLEEPING?(q.position.vsub(q.previousPosition,G),G.scale(b,G),q.position.vadd(G,q.interpolatedPosition)):(q.interpolatedPosition.copy(q.position),q.interpolatedQuaternion.copy(q.quaternion))}}};var N={type:"postStep"},E={type:"preStep"},M={type:"collide",body:null,contact:null},A=[],O=[],U=[],Z=[];new s,new s,new s,new s,new s,new s,new s,new s,new s,new a;var X=new a,$=new a,z=new s;y.prototype.internalStep=function(I){this.dt=I;var et=this.contacts,Q=U,B=Z,J=this.numObjects(),H=this.bodies,T=this.solver,b=this.gravity,G=this.doProfiling,j=this.profile,nt=m.DYNAMIC,q,rt=this.constraints,ft=O;b.norm();var D=b.x,Rt=b.y,yt=b.z,at=0;for(G&&(q=performance.now()),at=0;at!==J;at++){var st=H[at];if(st.type&nt){var Zt=st.force,Tt=st.mass;Zt.x+=Tt*D,Zt.y+=Tt*Rt,Zt.z+=Tt*yt}}for(var at=0,Ht=this.subsystems.length;at!==Ht;at++)this.subsystems[at].update();G&&(q=performance.now()),Q.length=0,B.length=0,this.broadphase.collisionPairs(this,Q,B),G&&(j.broadphase=performance.now()-q);var Kt=rt.length;for(at=0;at!==Kt;at++){var P=rt[at];if(!P.collideConnected)for(var w=Q.length-1;w>=0;w-=1)(P.bodyA===Q[w]&&P.bodyB===B[w]||P.bodyB===Q[w]&&P.bodyA===B[w])&&(Q.splice(w,1),B.splice(w,1))}this.collisionMatrixTick(),G&&(q=performance.now());var tt=A,ct=et.length;for(at=0;at!==ct;at++)tt.push(et[at]);et.length=0;var mt=this.frictionEquations.length;for(at=0;at!==mt;at++)ft.push(this.frictionEquations[at]);this.frictionEquations.length=0,this.narrowphase.getContacts(Q,B,this,et,tt,this.frictionEquations,ft),G&&(j.narrowphase=performance.now()-q),G&&(q=performance.now());for(var at=0;at<this.frictionEquations.length;at++)T.addEquation(this.frictionEquations[at]);for(var lt=et.length,Ot=0;Ot!==lt;Ot++){var P=et[Ot],st=P.bi,gt=P.bj;P.si,P.sj;var It;if(st.material&&gt.material?It=this.getContactMaterial(st.material,gt.material)||this.defaultContactMaterial:It=this.defaultContactMaterial,It.friction,st.material&&gt.material&&(st.material.friction>=0&&gt.material.friction>=0&&st.material.friction*gt.material.friction,st.material.restitution>=0&&gt.material.restitution>=0&&(P.restitution=st.material.restitution*gt.material.restitution)),T.addEquation(P),st.allowSleep&&st.type===m.DYNAMIC&&st.sleepState===m.SLEEPING&&gt.sleepState===m.AWAKE&&gt.type!==m.STATIC){var jt=gt.velocity.norm2()+gt.angularVelocity.norm2(),At=Math.pow(gt.sleepSpeedLimit,2);jt>=At*2&&(st._wakeUpAfterNarrowphase=!0)}if(gt.allowSleep&&gt.type===m.DYNAMIC&&gt.sleepState===m.SLEEPING&&st.sleepState===m.AWAKE&&st.type!==m.STATIC){var kt=st.velocity.norm2()+st.angularVelocity.norm2(),re=Math.pow(st.sleepSpeedLimit,2);kt>=re*2&&(gt._wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(st,gt,!0),this.collisionMatrixPrevious.get(st,gt)||(M.body=gt,M.contact=P,st.dispatchEvent(M),M.body=st,gt.dispatchEvent(M))}for(G&&(j.makeContactConstraints=performance.now()-q,q=performance.now()),at=0;at!==J;at++){var st=H[at];st._wakeUpAfterNarrowphase&&(st.wakeUp(),st._wakeUpAfterNarrowphase=!1)}var Kt=rt.length;for(at=0;at!==Kt;at++){var P=rt[at];P.update();for(var w=0,zt=P.equations.length;w!==zt;w++){var $t=P.equations[w];T.addEquation($t)}}T.solve(I,this),G&&(j.solve=performance.now()-q),T.removeAllEquations();var te=Math.pow;for(at=0;at!==J;at++){var st=H[at];if(st.type&nt){var pe=te(1-st.linearDamping,I),Y=st.velocity;Y.mult(pe,Y);var St=st.angularVelocity;if(St){var ut=te(1-st.angularDamping,I);St.mult(ut,St)}}}for(this.dispatchEvent(E),at=0;at!==J;at++){var st=H[at];st.preStep&&st.preStep.call(st)}G&&(q=performance.now());var pt=X,Et=$,Jt=this.stepnumber,oe=m.DYNAMIC|m.KINEMATIC,_e=Jt%(this.quatNormalizeSkip+1)===0,Te=this.quatNormalizeFast,ue=I*.5;for(r.types.PLANE,r.types.CONVEXPOLYHEDRON,at=0;at!==J;at++){var Me=H[at],ot=Me.force,dt=Me.torque;if(Me.type&oe&&Me.sleepState!==m.SLEEPING){var vt=Me.velocity,xt=Me.angularVelocity,Qt=Me.position,Ft=Me.quaternion,Ct=Me.invMass,Dt=Me.invInertiaWorld;vt.x+=ot.x*Ct*I,vt.y+=ot.y*Ct*I,vt.z+=ot.z*Ct*I,Me.angularVelocity&&(Dt.vmult(dt,z),z.mult(I,z),z.vadd(xt,xt)),Qt.x+=vt.x*I,Qt.y+=vt.y*I,Qt.z+=vt.z*I,Me.angularVelocity&&(pt.set(xt.x,xt.y,xt.z,0),pt.mult(Ft,Et),Ft.x+=ue*Et.x,Ft.y+=ue*Et.y,Ft.z+=ue*Et.z,Ft.w+=ue*Et.w,_e&&(Te?Ft.normalizeFast():Ft.normalize())),Me.aabb&&(Me.aabbNeedsUpdate=!0),Me.updateInertiaWorld&&Me.updateInertiaWorld()}}for(this.clearForces(),this.broadphase.dirty=!0,G&&(j.integrate=performance.now()-q),this.time+=I,this.stepnumber+=1,this.dispatchEvent(N),at=0;at!==J;at++){var st=H[at],it=st.postStep;it&&it.call(st)}if(this.allowSleep)for(at=0;at!==J;at++)H[at].sleepTick(this.time)},y.prototype.clearForces=function(){for(var I=this.bodies,et=I.length,Q=0;Q!==et;Q++){var B=I[Q];B.force,B.torque,B.force.set(0,0,0),B.torque.set(0,0,0)}}},{"../collision/AABB":3,"../collision/ArrayCollisionMatrix":4,"../collision/NaiveBroadphase":7,"../collision/Ray":9,"../collision/RaycastResult":10,"../equations/ContactEquation":19,"../equations/FrictionEquation":21,"../material/ContactMaterial":24,"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Shape":43,"../solver/GSSolver":46,"../utils/EventTarget":49,"../utils/TupleDictionary":52,"../utils/Vec3Pool":54,"./Narrowphase":55}]},{},[2])(2)})})(ah);var L0=ah.exports;const Ve=P0(L0),I0=new se().makeRotationY(Math.PI);function Ns(o,t){return o.updateMatrixWorld(!0),t.updateMatrixWorld(!0),t.matrixWorld.clone().multiply(I0).multiply(o.matrixWorld.clone().invert())}function N0(o,t,e){return o.clone().applyMatrix4(Ns(t,e))}function ac(o,t,e){return o.clone().transformDirection(Ns(t,e)).multiplyScalar(o.length())}function lc(o,t,e){return new hn().setFromRotationMatrix(Ns(t,e)).multiply(o.clone())}function D0(o,t,e,n,i,r=0){e.updateMatrixWorld(!0);const s=e.worldToLocal(o.clone()),a=e.worldToLocal(t.clone());if(s.z<=0||a.z>0||s.z===a.z)return null;const l=s.z/(s.z-a.z),c=s.lerp(a,l);return Math.abs(c.x)>n/2-r||Math.abs(c.y)>i/2-r?null:l}const Jn=1.65,$n=2.65,cc=[2337279,16751413];function U0(o){const t=new $c;t.absellipse(0,0,Jn/2+.075,$n/2+.075,0,Math.PI*2);const e=new ta;return e.absellipse(0,0,Jn/2-.02,$n/2-.02,0,Math.PI*2,!0),t.holes.push(e),new Ne(new ba(t,48),new ln({color:o,side:on,depthWrite:!1,toneMapped:!1}))}class B0{constructor(t,e,n,i){this.scene=t,this.renderer=e,this.camera=n,this.world=i,this.portals=[null,null],this.viewCamera=n.clone(),this.viewCamera.layers.disable(1),this.targets=[0,1].map(()=>[this.makeTarget(),this.makeTarget()]),this.readIndex=0,this.cooldowns=new WeakMap,this.clock=0}makeTarget(){const t=new ii(640,480,{depthBuffer:!0,stencilBuffer:!1});return t.texture.colorSpace=ke,t}resize(t,e){const n=Math.min(1,1100/Math.max(t,e));for(const i of this.targets)for(const r of i)r.setSize(Math.max(1,Math.floor(t*n)),Math.max(1,Math.floor(e*n)))}place(t,e,n,i=!0){const r=this.portals[1-t],s=e.mesh.worldToLocal(n.clone()),a=.16,l=.02;s.x=Es.clamp(s.x,-e.width/2+Jn/2+a,e.width/2-Jn/2-a),s.y=Es.clamp(s.y,-e.height/2+$n/2+l,e.height/2-$n/2-l),s.z=0;const c=r&&e.mesh.worldToLocal(r.group.position.clone());if(r&&(r.panel===e||r.panel===e.opposite)&&Math.abs(s.x-c.x)<Jn+.15&&Math.abs(s.y-c.y)<$n+.15)return!1;const u=this.portals[t];u&&(this.scene.remove(u.group),u.group.traverse(v=>{v.geometry&&v.geometry.dispose(),v.material&&v.material.dispose()}),this.portals[t]=null,this.world.rebuildPanel(u.panel),u.panel.opposite&&this.world.rebuildPanel(u.panel.opposite));const h=new Mn;h.position.copy(e.mesh.localToWorld(s.clone())).addScaledVector(e.normal,.035),h.quaternion.copy(e.mesh.quaternion);const d=new Ne(new Ts(1,48),new ln({map:this.targets[t][this.readIndex].texture,side:wn,toneMapped:!1}));d.geometry.dispose();const f=new Ts(1,64),m=f.attributes.position;for(let v=0;v<m.count;v++)m.setXY(v,m.getX(v)*Jn/2,m.getY(v)*$n/2);f.computeVertexNormals(),d.geometry=f,d.position.z=.004,h.add(d);const g=U0(cc[t]);g.position.z=.015,h.add(g);const p=new bs(cc[t],3,3.4);return p.position.z=.3,h.add(p),this.scene.add(h),this.portals[t]={group:h,surface:d,panel:e,local:s,index:t},this.world.rebuildPanel(e),e.opposite&&this.world.rebuildPanel(e.opposite),i&&this.world.onPortalPlaced(t),!0}render(){const[t,e]=this.portals;if(t&&e){this.scene.updateMatrixWorld(!0),this.camera.updateMatrixWorld(!0);const n=1-this.readIndex;for(const i of[t,e]){const r=this.portals[1-i.index];Ns(i.group,r.group).multiply(this.camera.matrixWorld).decompose(this.viewCamera.position,this.viewCamera.quaternion,this.viewCamera.scale),this.viewCamera.projectionMatrix.copy(this.camera.projectionMatrix),this.viewCamera.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.viewCamera.updateMatrixWorld(!0),this.clipCamera(r),i.surface.visible=!1,this.renderer.setRenderTarget(this.targets[i.index][n]),this.renderer.clear(),this.renderer.render(this.scene,this.viewCamera),i.surface.visible=!0}this.renderer.setRenderTarget(null),this.readIndex=n;for(const i of[t,e])i.surface.material.map=this.targets[i.index][n].texture}this.renderer.setRenderTarget(null),this.renderer.clear(),this.renderer.render(this.scene,this.camera)}clipCamera(t){const e=new k(0,0,1).applyQuaternion(t.group.quaternion),n=t.group.position.clone().addScaledVector(e,.025),i=new Zn().setFromNormalAndCoplanarPoint(e,n).applyMatrix4(this.viewCamera.matrixWorldInverse),r=new ge(i.normal.x,i.normal.y,i.normal.z,i.constant),s=this.viewCamera.projectionMatrix.elements,a=u=>u>=0?1:-1,l=new ge((a(r.x)+s[8])/s[0],(a(r.y)+s[9])/s[5],-1,(1+s[10])/s[14]),c=r.dot(l);Math.abs(c)>1e-5&&(r.multiplyScalar(2/c),s[2]=r.x,s[6]=r.y,s[10]=r.z+1,s[14]=r.w,this.viewCamera.projectionMatrixInverse.copy(this.viewCamera.projectionMatrix).invert())}teleport(t,e,n,i=.38,r=!1){const s=this.portals[1-n.index],a=N0(new k(t.position.x,t.position.y,t.position.z),n.group,s.group),l=new k(0,0,1).applyQuaternion(s.group.quaternion),c=a.clone().sub(s.group.position).dot(l);a.addScaledVector(l,Math.max(0,i+.06-c)),t.position.set(a.x,a.y,a.z);const u=ac(new k(t.velocity.x,t.velocity.y,t.velocity.z),n.group,s.group);if(t.velocity.set(u.x,u.y,u.z),r)this.camera.quaternion.copy(lc(this.camera.quaternion,n.group,s.group)),this.camera.rotation.reorder("YXZ"),this.world.controls.releaseMomentum=.35;else{const h=lc(new hn(t.quaternion.x,t.quaternion.y,t.quaternion.z,t.quaternion.w),n.group,s.group);t.quaternion.set(h.x,h.y,h.z,h.w);const d=ac(new k(t.angularVelocity.x,t.angularVelocity.y,t.angularVelocity.z),n.group,s.group);t.angularVelocity.set(d.x,d.y,d.z),e.position.copy(a)}t.aabbNeedsUpdate=!0,t.wakeUp(),this.cooldowns.set(t,{until:this.clock+.22,portal:s}),this.world.onTeleport(r)}check(t,e,n,i,r=!1){var a;if(!this.portals[0]||!this.portals[1]||((a=this.cooldowns.get(t))==null?void 0:a.until)>this.clock)return;const s=new k(t.position.x,t.position.y,t.position.z);for(const l of this.portals){const c=r?.17:.2,u=new k(0,0,1).applyQuaternion(l.group.quaternion),h=r&&u.y>.7&&t.velocity.y<-1.8?new k(0,-.93,0):new k;if(D0(n.clone().add(h),s.clone().add(h),l.group,Jn,$n,c)!==null){this.teleport(t,e,l,i,r);break}}}}const hc=new En({color:13357772,roughness:.88}),F0=new En({color:15001568,roughness:.72}),di=new En({color:3161408,roughness:.85,metalness:.45}),uc=new En({color:16755783,emissive:8072972,emissiveIntensity:.7});class O0{constructor(t,e,n){this.scene=t,this.camera=e,this.renderer=n,this.physics=new Ve.World,this.physics.gravity.set(0,-19,0),this.physics.broadphase=new Ve.NaiveBroadphase,this.physics.solver.iterations=12,this.physics.defaultContactMaterial.friction=0,this.cubeMaterial=new Ve.Material("cube"),this.physics.addContactMaterial(new Ve.ContactMaterial(this.cubeMaterial,this.physics.defaultMaterial,{friction:.55,restitution:.04})),this.physics.defaultContactMaterial.restitution=.05,this.panels=[],this.shootables=[],this.raycaster=new Kg,this.portals=new B0(t,n,e,this),this.held=!1,this.complete=!1,this.doorOpen=!1,this.buildChamber(),this.createCube(),this.createPlayer(),this.portals.resize(window.innerWidth,window.innerHeight),this.portals.place(0,this.dividerFront,new k(0,1.35,.13),!1),this.portals.place(1,this.rearPanel,new k(-3.5,1.35,-12.99),!1)}addBlock(t,e,n,i,r,s,a=di){const l=new Ne(new zn(t,e,n),a);return l.position.set(i,r,s),l.receiveShadow=!0,l.castShadow=!0,this.scene.add(l),l}addPanel(t,e,n,i,r,s=F0){const a=new Mn;a.position.copy(i),a.quaternion.copy(r),this.scene.add(a);const l={name:t,width:e,height:n,mesh:a,material:s,slabs:[],bodies:[],normal:new k(0,0,1).applyQuaternion(r)};return this.panels.push(l),this.rebuildPanel(l),l}rebuildPanel(t){for(const u of t.slabs){t.mesh.remove(u);const h=this.shootables.indexOf(u);h!==-1&&this.shootables.splice(h,1),u.geometry.dispose()}for(const u of t.bodies)this.physics.removeBody(u);t.slabs=[],t.bodies=[];const e=t.width,n=t.height,i=this.portals.portals.filter(u=>u&&(u.panel===t||u.panel===t.opposite)).map(u=>t.mesh.worldToLocal(u.group.position.clone())),r=Jn+.12,s=$n+.2,a=[-e/2,e/2],l=[-n/2,n/2];for(const u of i)a.push(Math.max(-e/2,u.x-r/2),Math.min(e/2,u.x+r/2)),l.push(Math.max(-n/2,u.y-s/2),Math.min(n/2,u.y+s/2));a.sort((u,h)=>u-h),l.sort((u,h)=>u-h);const c=[];for(let u=0;u<a.length-1;u++)for(let h=0;h<l.length-1;h++){const d=(a[u]+a[u+1])/2,f=(l[h]+l[h+1])/2;i.some(m=>Math.abs(d-m.x)<r/2&&Math.abs(f-m.y)<s/2)||c.push([a[u],a[u+1],l[h],l[h+1]])}for(const[u,h,d,f]of c){if(h-u<.005||f-d<.005)continue;const m=(u+h)/2,g=(d+f)/2,p=h-u,v=f-d,x=new Ne(new zn(p,v,.26),t.material);x.position.set(m,g,-.13),x.receiveShadow=!0,x.userData.panel=t,t.mesh.add(x),t.slabs.push(x),this.shootables.push(x);const _=new k(m,g,-.13).applyQuaternion(t.mesh.quaternion).add(t.mesh.position),y=new Ve.Body({mass:0,shape:new Ve.Box(new Ve.Vec3(p/2,v/2,.13))});y.position.set(_.x,_.y,_.z),y.quaternion.set(t.mesh.quaternion.x,t.mesh.quaternion.y,t.mesh.quaternion.z,t.mesh.quaternion.w),this.physics.addBody(y),t.bodies.push(y)}}buildChamber(){this.scene.background=new ee(1056033),this.scene.fog=new Ma(1056033,30,55),this.scene.add(new Ig(14282751,4016196,2.2));for(const[n,i]of[[-5,7],[5,7],[-5,-7],[5,-7]]){const r=new bs(14939125,38,12);r.position.set(n,5.5,i),this.scene.add(r),this.addBlock(2.8,.08,.7,n,5.92,i,new ln({color:15137279}))}const t=(n,i)=>new hn().setFromAxisAngle(new k(...n),i),e=new hn;this.addPanel("floor",18,26,new k(0,0,0),t([1,0,0],-Math.PI/2),hc),this.addPanel("ceiling",18,26,new k(0,6,0),t([1,0,0],Math.PI/2)),this.addPanel("west",26,6,new k(-9,3,0),t([0,1,0],Math.PI/2)),this.addPanel("east",26,6,new k(9,3,0),t([0,1,0],-Math.PI/2)),this.addPanel("entrance",18,6,new k(0,3,13),t([0,1,0],Math.PI)),this.dividerFront=this.addPanel("divider front",18,6,new k(0,3,.13),e),this.dividerBack=this.addPanel("divider back",18,6,new k(0,3,-.13),t([0,1,0],Math.PI)),this.dividerFront.opposite=this.dividerBack,this.dividerBack.opposite=this.dividerFront,this.rearPanel=this.addPanel("exit wall",11.8,6,new k(-3.1,3,-13),e),this.addPanel("exit right",3.4,6,new k(7.3,3,-13),e),this.addPanel("exit header",2.8,3,new k(4.2,4.5,-13),e),this.door=this.addBlock(2.78,3,.22,4.2,1.5,-13,di),this.doorBody=new Ve.Body({mass:0,shape:new Ve.Box(new Ve.Vec3(1.39,1.5,.11))}),this.doorBody.position.set(4.2,1.5,-13),this.physics.addBody(this.doorBody),this.addBlock(3,.12,.4,4.2,3.1,-12.9,uc),this.addBlock(1.4,.15,1.4,4.1,.08,-7,di),this.plate=this.addBlock(1.05,.055,1.05,4.1,.19,-7,uc),this.plateLight=new bs(16751413,2,3),this.plateLight.position.set(4.1,.4,-7),this.scene.add(this.plateLight);for(let n=-8;n<=8;n+=2)for(let i=-12;i<=12;i+=2){const r=new Ne(new Zi(1.94,1.94),new En({color:(n+i)%4?11910841:11122096,roughness:.95}));r.rotation.x=-Math.PI/2,r.position.set(n,.004,i),r.receiveShadow=!0,this.scene.add(r)}for(const n of[-12.7,-1,12.7])this.addBlock(17.7,.1,.07,0,4.6,n,di),this.addBlock(17.7,.035,.08,0,4.48,n,new ln({color:7453121}));this.label("01 / RELAXATION VAULT",0,4.9,.32,4.2),this.label("WEIGHTED STORAGE CUBE",-4,3,12.82,2.7,!0),this.label("EXIT",4.2,3.55,-12.7,1.8),this.addBlock(3,.2,3,4.2,-.1,-14.3,hc),this.addBlock(.2,3,3,2.7,1.5,-14.3,di),this.addBlock(.2,3,3,5.7,1.5,-14.3,di)}label(t,e,n,i,r,s=!1){const a=document.createElement("canvas");a.width=1024,a.height=128;const l=a.getContext("2d");l.fillStyle="#2d3b3d",l.fillRect(0,0,1024,128),l.fillStyle="#c8e0e1",l.font="bold 47px monospace",l.textAlign="center",l.textBaseline="middle",l.fillText(t,512,67);const c=new Vv(a);c.colorSpace=ke;const u=new Ne(new Zi(r,r/8),new ln({map:c,side:on}));u.position.set(e,n,i),s&&(u.rotation.y=Math.PI),this.scene.add(u)}createCube(){this.cube=new Mn;const t=new Ne(new zn(.69,.69,.69),di);t.castShadow=!0,this.cube.add(t);for(const[e,n]of[["x",-1],["x",1],["y",-1],["y",1],["z",-1],["z",1]]){const i=new Ne(new zn(.47,.47,.02),new En({color:15001820,emissive:4530701,emissiveIntensity:.25,roughness:.65}));e==="x"&&(i.rotation.y=Math.PI/2,i.position.x=n*.36),e==="y"&&(i.rotation.x=Math.PI/2,i.position.y=n*.36),e==="z"&&(i.position.z=n*.36),this.cube.add(i)}this.scene.add(this.cube),this.cubeBody=new Ve.Body({mass:2,material:this.cubeMaterial,shape:new Ve.Box(new Ve.Vec3(.35,.35,.35)),linearDamping:.015,angularDamping:.18}),this.cubeBody.position.set(-3,1.3,7),this.physics.addBody(this.cubeBody)}createPlayer(){this.player=new Ve.Body({mass:5,fixedRotation:!0,linearDamping:.015}),this.player.addShape(new Ve.Sphere(.38),new Ve.Vec3(0,-.55,0)),this.player.position.set(0,1.1,9),this.physics.addBody(this.player),this.camera.position.set(0,1.72,9),this.controls=null}shoot(t){this.camera.getWorldDirection(this.raycaster.ray.direction),this.raycaster.ray.origin.copy(this.camera.position),this.raycaster.far=45;const e=this.raycaster.intersectObjects(this.shootables,!1),n=this.raycaster.intersectObject(this.door,!1)[0],i=this.raycaster.intersectObject(this.cube,!0)[0];if(!e.length||!this.doorOpen&&n&&n.distance<e[0].distance||i&&i.distance<e[0].distance)return!1;const r=e[0],s=r.object.userData.panel;return this.raycaster.ray.direction.dot(s.normal)>-.05?!1:this.portals.place(t,s,r.point)}toggleCube(){if(!this.complete)if(this.held){this.held=!1,this.cubeBody.type=Ve.Body.DYNAMIC,this.cubeBody.collisionResponse=!0,this.cubeBody.updateMassProperties();const t=new k;this.camera.getWorldDirection(t),this.cubeBody.velocity.set(this.player.velocity.x+t.x*3,this.player.velocity.y+t.y*3+1,this.player.velocity.z+t.z*3),this.onCube(!1)}else this.camera.position.distanceTo(this.cube.position)<2.5&&(this.held=!0,this.cubeBody.type=Ve.Body.KINEMATIC,this.cubeBody.collisionResponse=!1,this.cubeBody.velocity.setZero(),this.cubeBody.angularVelocity.setZero(),this.onCube(!0))}throwCube(){if(!this.held)return;this.toggleCube();const t=new k;this.camera.getWorldDirection(t),this.cubeBody.velocity.set(this.player.velocity.x+t.x*10,this.player.velocity.y+t.y*10+2,this.player.velocity.z+t.z*10)}update(t){var i;t=Math.min(t,.05),this.portals.clock+=t;const e=new k(this.player.position.x,this.player.position.y,this.player.position.z),n=new k(this.cubeBody.position.x,this.cubeBody.position.y,this.cubeBody.position.z);if(this.held){const r=new k(0,-.16,-1.5).applyQuaternion(this.camera.quaternion).add(this.camera.position);this.cubeBody.position.set(r.x,r.y,r.z),this.cubeBody.velocity.setZero()}this.physics.step(1/60,t,4),this.portals.check(this.player,null,e,.38,!0),this.held||this.portals.check(this.cubeBody,this.cube,n,.48),this.camera.position.set(this.player.position.x,this.player.position.y+.62,this.player.position.z),this.cube.position.set(this.cubeBody.position.x,this.cubeBody.position.y,this.cubeBody.position.z),this.cube.quaternion.set(this.cubeBody.quaternion.x,this.cubeBody.quaternion.y,this.cubeBody.quaternion.z,this.cubeBody.quaternion.w),!this.doorOpen&&!this.held&&Math.abs(this.cube.position.x-4.1)<.72&&Math.abs(this.cube.position.z+7)<.72&&this.cube.position.y<.8&&(this.doorOpen=!0,this.physics.removeBody(this.doorBody),this.door.visible=!1,this.plate.material=new En({color:6678194,emissive:1541725,emissiveIntensity:1}),this.plateLight.color.set(6678194),document.querySelector("#objective").textContent="EXIT OPEN  /  Proceed through the door",this.sound(660)),this.doorOpen&&this.player.position.z<-13.6&&this.player.position.x>2.8&&!this.complete&&(this.complete=!0,document.querySelector("#complete").hidden=!1,(i=document.exitPointerLock)==null||i.call(document),this.sound(880)),this.player.position.y<-15&&(this.player.position.set(0,1.1,9),this.player.velocity.setZero())}sound(t=440){try{this.audio??(this.audio=new(window.AudioContext||window.webkitAudioContext));const e=this.audio.createOscillator(),n=this.audio.createGain();e.type="sine",e.frequency.setValueAtTime(t,this.audio.currentTime),e.frequency.exponentialRampToValueAtTime(t*.55,this.audio.currentTime+.16),n.gain.setValueAtTime(.06,this.audio.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.audio.currentTime+.18),e.connect(n).connect(this.audio.destination),e.start(),e.stop(this.audio.currentTime+.18)}catch{}}onPortalPlaced(t){document.querySelector(t?"#orange-indicator":"#blue-indicator").classList.add("fired"),this.sound(t?360:520)}onTeleport(t){t&&this.sound(310)}onCube(t){document.querySelector("#carry").textContent=t?"CUBE HELD  ·  E DROP  ·  F THROW":"E  PICK UP CUBE",this.sound(t?500:300)}}class z0{constructor(t,e){this.world=t,this.camera=t.camera,this.canvas=e,this.keys=new Set,this.releaseMomentum=0,this.locked=!1,this.euler=new xn(0,0,0,"YXZ"),e.addEventListener("click",()=>{t.complete||e.requestPointerLock()}),document.querySelector("#start").addEventListener("click",()=>e.requestPointerLock()),document.addEventListener("pointerlockchange",()=>{this.locked=document.pointerLockElement===e,document.querySelector("#start").hidden=this.locked||t.complete}),document.addEventListener("mousemove",n=>{this.locked&&(this.euler.setFromQuaternion(this.camera.quaternion,"YXZ"),this.euler.y-=n.movementX*.0023,this.euler.x=Es.clamp(this.euler.x-n.movementY*.0023,-Math.PI/2+.02,Math.PI/2-.02),this.euler.z=0,this.camera.quaternion.setFromEuler(this.euler))}),document.addEventListener("mousedown",n=>{this.locked&&(n.button===0||n.button===2)&&this.world.shoot(n.button===0?0:1)}),document.addEventListener("contextmenu",n=>n.preventDefault()),document.addEventListener("keydown",n=>{["Space","KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(n.code)&&n.preventDefault(),this.keys.add(n.code),!(n.repeat||!this.locked)&&(n.code==="KeyE"&&this.world.toggleCube(),n.code==="KeyF"&&this.world.throwCube(),n.code==="Space"&&this.onGround()&&(this.world.player.velocity.y=7))}),document.addEventListener("keyup",n=>this.keys.delete(n.code)),window.addEventListener("blur",()=>this.keys.clear())}onGround(){const t=this.world.player;for(const e of this.world.physics.contacts){if(e.bi!==t&&e.bj!==t)continue;const n=e.bi===t?-1:1;if(e.ni.y*n>.55)return!0}return!1}update(t){if(!this.locked)return;const e=this.world.player;if(this.releaseMomentum>0){this.releaseMomentum-=t;return}const n=new k;this.camera.getWorldDirection(n),n.y=0,n.lengthSq()<.01&&n.set(0,0,-1),n.normalize();const i=new k().crossVectors(n,new k(0,1,0)).normalize(),r=Number(this.keys.has("KeyW")||this.keys.has("ArrowUp"))-Number(this.keys.has("KeyS")||this.keys.has("ArrowDown")),s=Number(this.keys.has("KeyD")||this.keys.has("ArrowRight"))-Number(this.keys.has("KeyA")||this.keys.has("ArrowLeft")),a=n.multiplyScalar(r).addScaledVector(i,s);a.lengthSq()>1&&a.normalize();const l=this.onGround(),c=1-Math.exp(-t*(l?12:2.2)),u=5.3;e.velocity.x+=(a.x*u-e.velocity.x)*c,e.velocity.z+=(a.z*u-e.velocity.z)*c}}class V0{constructor(t){this.canvas=t,this.scene=new Pv,this.camera=new Ke(75,window.innerWidth/window.innerHeight,.04,90),this.camera.rotation.order="YXZ",this.camera.layers.enable(1),this.scene.add(this.camera),this.loadPortalGun(),this.renderer=new Cv({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.outputColorSpace=ke,this.renderer.toneMapping=pc,this.renderer.toneMappingExposure=1.25,this.world=new O0(this.scene,this.camera,this.renderer),this.controls=new z0(this.world,t),this.world.controls=this.controls,window.addEventListener("resize",()=>this.resize()),this.last=performance.now(),this.loop=this.loop.bind(this),requestAnimationFrame(this.loop)}loadPortalGun(){new Zg().load("./portal_gun.glb",t=>{const e=t.scene;e.scale.setScalar(.006),e.position.set(.38,-.38,-.76),e.rotation.set(0,Math.PI,0),e.traverse(n=>n.layers.set(1)),this.camera.add(e)})}resize(){const t=window.innerWidth,e=window.innerHeight;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e),this.world.portals.resize(t,e)}loop(t){const e=Math.min((t-this.last)/1e3,.05);this.last=t,this.controls.update(e),this.world.update(e),this.world.portals.render(),requestAnimationFrame(this.loop)}}new V0(document.querySelector("canvas.webgl"));
