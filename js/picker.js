//declare default values
let colout = [];
let amntmax = 10;
let amnt = 5;

//Setup - sets amount of columns
function colchange () {
    amnt=parseInt(document.getElementById("colamnt").value);
    for (let i = 0; i < (amntmax); i++) {
        colnr = "color"+i;
        if (i>=amnt) {
            document.getElementById(colnr).style.display='none';
        } else {
            document.getElementById(colnr).style.display='';
        };
    };
    genpal();
};
window.onload=colchange;

//HSL/HSB Conversion by Klim Kielczwski
const hsvToHsl = (h, s, v, l = v * (1 - (s / 2))) => [h, l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l), l];
const hslToHsv = (h, s, l, v = l + s * Math.min(l, 1 - l)) => [h, v === 0 ? 0 : 2 * (1 - (l / v)), v];

//shades of same colour; ideally should be steps in HSB space
function monochromatic (h,s,l,n) {
    for (let i = 0; i < n; i++) {
        let dec=(i-Math.round(n/2))*Math.trunc(100/n);
        let v = 0;
        hslToHsv (h,s,l,v);
        let sm=s+dec;
        if (sm<0) {
            sm=sm+100;
        } else {if (sm>100){
            sm=sm-100;
        }};
        let vm=v+dec;
        if (vm<0) {
            vm=vm+100;
        } else {if (vm>100){
            vm=vm-100;
        }};
        hsvToHsl (h,sm,l,vm);
        colourchange(h,sm,l,i);
        /*colout[i] = "hsl("+h+", "+sm+"%, "+l+"%)";
        const colnr = "color"+i;
        const tag = document.getElementById(colnr);
        tag.style.backgroundColor=colout[i];
        tag.innerHTML="<p>"+tag.style.backgroundColor+"</p>";*/
    };
};

//Rotate H, keep S and L same - makes similar colours
function analogous (h,s,l,n) {
    for (let i = 0; i < n; i++) {
        let dec=(i-Math.trunc(n/2))*Math.trunc(100/n);
        let hm=h+dec;
        if (hm<0) {
            hm=hm+359;
        } else {if (hm>359){
            hm=hm-359;
        }};
        colourchange(hm,s,l,i);
    };
};

//Selects which mode to use; update to use dropdown later
function select (mode,h,s,l,n) {
    switch (mode) {
        case "monochromatic":
            monochromatic(h,s,l,n);
        break;
        case "analogous":
            analogous(h,s,l,n);
        break;
    };
};

//update small preview square, 
function prevupdate () {
    const h=parseInt(document.getElementById("H_val").value);
    const s=parseInt(document.getElementById("S_val").value);
    const l=parseInt(document.getElementById("L_val").value);
    document.getElementById("prev").style.backgroundColor="hsl("+h+", "+s+"%, "+l+"%)";
};

//update column color+text
function colourchange (h,s,l,i) {
    colout[i] = "hsl("+h+", "+s+"%, "+l+"%)";
    const colnr = "color"+i;
    const tag = document.getElementById(colnr);
    tag.style.backgroundColor=colout[i];
    if (l>50) {
        tag.style.color = "black";
    } else {
        tag.style.color = "white";
    };
    tag.innerHTML="<p>"+tag.style.backgroundColor+"</p><p>"+colout[i]+"</p>";
}

//Button to generate a palette from the given colour
function genpal () {
    const method = document.querySelector('input[name="gentype"]:checked').value;
    const h=parseInt(document.getElementById("H_val").value);
    const s=parseInt(document.getElementById("S_val").value);
    const l=parseInt(document.getElementById("L_val").value);
    document.getElementById("prev").style.backgroundColor="hsl("+h+", "+s+"%, "+l+"%)";
    select (method,h,s,l,amnt);
};

//Button to generate a palette at random
function genrand () {
    const method = document.querySelector('input[name="gentype"]:checked').value;
    const h=Math.round((Math.random()*359));
    const s=Math.round((Math.random()*50)+50);
    const l=Math.round((Math.random()*20)+40);
    select (method,h,s,l,amnt);
    document.getElementById("prev").style.backgroundColor="hsl("+h+", "+s+"%, "+l+"%)";
};