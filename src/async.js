import * as d3 from "d3";
import { Subject, interval, animationFrameScheduler, BehaviorSubject, ReplaySubject } from "rxjs";
import {take } from "rxjs/operators";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";
import {add} from './helpers'













const nums = new ReplaySubject(2);

interval(1000).subscribe(
    x => nums.next(x)
);

nums.
pipe(take(5)).
subscribe(add.li);

setTimeout(
    () => nums.pipe(take(10)).subscribe(x=>add.li(`second: ${x}`)), 7000
)


// const nums = new BehaviorSubject(2288);

// interval().subscribe(
//     x => nums.next(x)
// );

// nums.
// pipe(take(5)).
// subscribe(add.li);





// // ----------------------------
// const waveData = new Subject();


// const audioCtx = new AudioContext();
// const audioElement = document.getElementById('audioElement');

// //Canvas setup
// const canvas = document.querySelector('canvas');
// const canvasCtx = canvas.getContext('2d');
// const width = canvas.width;
// const height = canvas.height;



// //Web Audio API setup
// const audioSource = audioCtx.createMediaElementSource(audioElement);
// const analyser = audioCtx.createAnalyser();

// analyser.fftSize = 1024*2;
// const bufferLength = analyser.frequencyBinCount;

// audioCtx.resume().then(() =>{
//     console.log('Playback resumed successfully!!!');
// });

// audioSource.connect(analyser);
// audioSource.connect(audioCtx.destination);

// const dataArray = new Uint8Array(bufferLength);
// analyser.getByteTimeDomainData(dataArray);


// //D3 Setup
// const x = d3.scaleLinear().
// domain([0, analyser.frequencyBinCount]).
// range([0, width]);

// const y = d3.scaleLinear().
// domain([-175, 175]).
// range([height, 175]);

// const line = d3.line().
// x(function(d, i) {return x(i);}).
// y(function(d) {return y(d);}).
// context(canvasCtx);


// function renderFullLine(d){
//     canvasCtx.strokeStyle = "rgb(255, 0,  100)";
//     canvasCtx.beginPath();
//     line(d);
//     canvasCtx.stroke();
// } 

// function renderLoop(){
//     analyser.getByteTimeDomainData(dataArray);
//     canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
//     waveData.next(dataArray);
// }

// waveData.subscribe(
//     d => {
//         return renderFullLine(d);
//     }
// )


// const loop = interval(0, animationFrameScheduler).pipe(
//     // take(2000)
// ).subscribe(renderLoop);

















//#region 
// import {add} from './helpers';
// import { from, pipe, of, interval, throwError, Observable, Subject } from 'rxjs';
// import { fromFetch } from 'rxjs/fetch';
// import { switchMap, concatMap, delay, take, retry, catchError } from 'rxjs/operators';
// import { ajax } from 'rxjs/ajax';
// import { axisBottom } from 'd3';


// //--------------------Hot || Multicast

// const obs = new Subject();

// obs.subscribe((x) => add.li(`S: ${x}`));

// setTimeout(() => obs.subscribe((x) => add.li(`S: ${x}`), 4005));

// setTimeout(() => {obs.subscribe((x) => add.li(`S1: ${x}`))}, 4000);


// obs.subscribe((x) => add.li(`S: ${x}`));

// obs.next(new Date());



// setTimeout(() => obs.next(new Date()), 4060);



// //--------------------Cold || Unicast

// const obs = new Observable(
//     (sub) => sub.next(new Date())
// )


// obs.subscribe( add.li);

// setTimeout(() => obs.subscribe( add.li), 2000);


// obs.subscribe( add.li);





//#endregion













//#region HTTP

//------------------Handle Error

// function checkStatus(){
//     return switchMap(
//         response => {
//             return (response.status === 400) ? throwError() : of('Looks Good')
//         }
//     )
// }


// const users = fromFetch("https://httpbin.org/status/400");

// users.
// pipe(
//     checkStatus(),
//     catchError(x => throwError('400 Error'))
// )
// .subscribe(
//   (x) => add.li(x),
//   (err) => console.log(err),
// )



//------------------------Ajax

// ajax.getJSON("https://jsonplaceholder.typicode.com/users").pipe(retry(3)).subscribe(
//     x => x.forEach(user => {
//         add.li(user.name)
//     })
// )



//----------------------------------------------------------

// //----------Custom Operators
// function getJSON(){
//     return switchMap(x => x.json())
// }

// function emitEach(d){
//     return pipe(
//         switchMap( response => from(response)),
//         concatMap(
//             response => of(response).pipe(delay(d))
//         )
//     );
// }

//----------------------------------------------------------



//const users = fromFetch("https://jsonplaceholder.typicode.com/users");

// users.
// pipe(
//     getJSON(), emitEach(2000)
// )
// .subscribe(
//     user => add.li(user.name)
// )




//----------------------------------------------------------

// const users = fromFetch("https://jsonplaceholder.typicode.com/users");

// users.
// pipe(
//     switchMap(x => x.json())
// )
// .subscribe(
//     (users) => {
//         users.forEach(user => {
//             add.li(user.name)
//         });
//     }
// )

//#endregion

//#region Maps

// import { add, animate } from './helpers';
// import { fromEvent, interval } from 'rxjs';
// import {  } from 'rxjs/Operator'
// import { switchMap, map, takeUntil, tap, exhaustMap, take, mergeMap, concatMap } from 'rxjs/operators';


// interval(2000).
// pipe(
//     take(3),
//     map(x => `${x * 100}`),
//     concatMap(
//         x => {
//             return interval(1000).pipe(
//                 take(3),
//                 map(
//                     value => `inner(${value}), outer(${x})`
//                 )
//             )
//         }
//     )
// )
// .subscribe(
//     value => add.li(`Emitted Value: ${value}`)
// );



// interval(2000).
// pipe(
//     take(3),
//     map(x => `${x * 100}`),
//     mergeMap(
//         x => {
//             return interval(1000).pipe(
//                 take(3),
//                 map(
//                     value => `inner(${value}), outer(${x})`
//                 )
//             )
//         }
//     )
// )
// .subscribe(
//     value => add.li(`Emitted Value: ${value}`)
// );

// const startButton = document.getElementById('submit');
// const startClicked = fromEvent(startButton, 'click');
// const circle = document.getElementById('circle');

// startClicked.
// pipe(
//     //switchMap 
//     exhaustMap(
//         () =>{ return animate(5000)}
//     )
// ).
// subscribe(
//     (t) => {
//         circle.style.marginLeft = `${t*650}px`
//     }
// )





// const canvas = document.querySelector('canvas');
// const context = canvas.getContext('2d');

// const moves = fromEvent(canvas, 'mousemove');
// const down = fromEvent(canvas, 'mousedown');
// const up = fromEvent(canvas, 'mouseup');

// function brush (coords){
//     context.lineWidth = 5;
//     context.lineTo(coords.x, coords.y);
//     context.stroke();
// }

// brush({x:50, y:50});
// brush({x:100, y:100});

// down.pipe(
//     tap(
//         (evt) => {
//             context.strokeStyle = "blue";
//             context.beginPath();
//             context.moveTo(evt.offsetX, evt.offsetY);
//         }
//     ), 
//     switchMap(
//         (evt) => moves.pipe(
//             map(
//                 evt => {
//                     return {x: evt.offsetX, y: evt.offsetY}
//                 }
//             ), 
//             takeUntil(up)
//         )
//     )
// ).
// subscribe(
//     (coords) =>{
//         brush(coords);
//     }
// )


//#endregion

//#region AsyncObservablesOperators
// import { add } from './helpers';
// import {Observable, range, interval, merge, concat, combineLatest} from 'rxjs';
// // import { map } from 'rxjs/Operator'
// import {from, of, fromEvent} from 'rxjs';
// import {fromFetch} from 'rxjs/fetch';
// import { throttle, debounce, debounceTime, scan, reduce, concatMap, concatAll, mergeAll } from 'rxjs/operators';
// import { switchMap, skip, map, take, filter, startWith, skipUntil, skipLast, skipWhile, tap, takeLast, takeWhile, takeUntil, } from 'rxjs/operators';



//#region Operators part 2


// const submitBtn = document.getElementById('submit');
// const source = fromEvent(submitBtn, 'click').pipe(
//     tap(() => add.li('click')),
//   map( (e) => interval(1000).pipe(take(3)))
// );

// source.
// pipe(
//     mergeAll() //mergeAll(1) = concatAll()
// )
// .subscribe(add.li);




// const submitBtn = document.getElementById('submit');
// const source = fromEvent(submitBtn, 'click').pipe(
//     tap(() => add.li('click')),
//   map( (e) => interval(1000).pipe(take(3)))
// );

// source.
// pipe(
//     concatAll()
// )
// .subscribe(add.li);



// const pairNumbers = interval(99).pipe( take(20), filter(x => x%2 != 0));
// const impairNumbers = interval(100).pipe( take(21), filter(x => x%2 == 0));
// const fiveNumbers = interval(100).pipe( take(5));
// const submitBtn = document.getElementById('submit');
// const submitEvent = fromEvent(submitBtn, 'click').pipe(
//   map( (e) => 'clicked')
// );

// combineLatest(pairNumbers, impairNumbers, fiveNumbers, submitEvent).subscribe(add.li);



// const pairNumbers = interval(99).pipe( take(20), filter(x => x%2 != 0));
// const impairNumbers = interval(100).pipe( take(21), filter(x => x%2 == 0));

// concat(pairNumbers, impairNumbers).subscribe(add.li);

// const pairNumbers = interval(99).pipe( take(20), filter(x => x%2 != 0));
// const impairNumbers = interval(100).pipe( take(21), filter(x => x%2 == 0));

// merge(pairNumbers, impairNumbers).subscribe(add.li);



// const FS = interval(100).
// pipe(
//     take(10),
//     reduce(
//         (acc, value) => {
//             const n = value + 1;
//             const last = acc[n];
//             const beforeLast = acc[n-1];

//             return [...acc, last + beforeLast];
//         }, [0,1]
//     )
// ).
// subscribe(add.li);

// FS.
// pipe(
//     concatMap()
// ).
// subscribe(add.li)



// const FS = interval(100).
// pipe(
//     take(10),
//     reduce(
//         (acc, value) => {
//             const n = value + 1;
//             const last = acc[n];
//             const beforeLast = acc[n-1];

//             return [...acc, last + beforeLast];
//         }, [0,1]
//     )
// ).
// subscribe(add.li);



// const FS = interval(100).
// pipe(
//     take(20),
//     scan(
//         (acc, value) => {
//             const n = value + 1;
//             const last = acc[n];
//             const beforeLast = acc[n-1];

//             return [...acc, last + beforeLast];
//         }, [0,1]
//     )
// ).
// subscribe(add.li);




// const inputBox = document.getElementById('input');
// const renderBox = document.getElementById('display-context');
// const submitBtn = document.getElementById('submit');

// const content = fromEvent(inputBox, 'keyup').
// pipe(
//     debounce(
//         () => interval(1000)
//     )
// ).
// subscribe(
//     () => {
//         renderBox.innerHTML = inputBox.value;
//     }
// )



// interval(100).
// pipe(
//     throttle(
//         () => interval(900)
//     ),
//     skip(1)
//     ,
//     take(11)
// ).
// subscribe(add.li)


//#endregion

//#region Operators part 1

// const submit = document.getElementById('submit');
// const start = fromEvent(submit, 'click');

// interval(1000).

// pipe(

//     skipUntil(start)
// ).

// subscribe(add.li)


// interval(100).pipe(
//     take(100), filter(
//         x => x % 2 === 0
//     )
// ).
// subscribe((value) => add.li(value) )


// range(1,5).
// pipe(
//     //startWith(4),
//     map(x => {return `0${x}`})
// ).
// subscribe(
//     (value) => add.li(value)
// )



// range(1,5).
// pipe(
//     tap(add.li),
//     map(x => {return `0${x}`}),
// ).
// subscribe(
//     (value) => add.li(value)
// )

//#endregion

//#region Operators

// range(1,51).
// subscribe(
//     (msg) => add.li(msg)
// )

// from([1,2,3,4]).pipe(skip(2)).subscribe(
//     (m) => {
//         add.li(m)
//     }
// )

// from(["Hola","mundo","ewa","awa"]).subscribe(
//     (m) => {
//         add.li(m)
//     }
// )

// const submit = document.getElementById("submit");

// fromEvent(submit, "click").subscribe(
//     () => {
//         add.li("Clicked");
//     }
// )

// fromFetch("https://jsonplaceholder.typicode.com/users")
// .pipe(
//     switchMap(
//         response => {
//             return response.json()
//         }
//     )
// )
// .subscribe(
//     (result) => {
//         console.log(result)
//         result.forEach(user => {
//             add.li(user.name + "--->" + user.id);
//         });
//     }
// )


//#endregion

//#region Observables
// const o = new Observable(
//     (observer) => {
//         setInterval(
//             () => {
//                 observer.next('Observable next');
//             }, 1000
//             )
//     }
// )

// const p = new Promise(
//     (resolve, reject) => {
//         setTimeout(
//             () => {
//                 resolve('Promise Complete!');
//             }, 1000
//         )
//     }
// )


// p.then(
//     (message) => add.li(message)
// )

// let suscribtion = o.subscribe(
//    (msg) => {
//         add.li(msg)
//     },
//     (error) =>{
//         add.li('Error')
//     },
//     () => add.li('Completed')
// )

// setTimeout(
//     () => suscribtion.unsubscribe(),
//     3000
// )

//#endregion

//#region Async
// add.li('Line 3');




// add.li('Line 8');

// function callback(message){
//     // setTimeout( x => add.li(message), 2000)
//     add.li(message)
// }

// function greeting(message, cb){
//     let start = Date.now();
//     for(let i = 0; i < 10000000000; i++){ 
//         //do nothing
//     }

//     add.li(`took: ${Date.now() - start} ms`)

//     cb(message);
// }


// greeting('Hello from line 27', callback);

// add.li('Line 19');

//#endregion



//#endregion