//declare as array for changing clumn colours
let colout = [];

//temporary - sets amount of columns
let amnt = 5;

//HSL/HSB Conversion by Klim Kielczwski
const hsvToHsl = (h, s, v, l = v * (1 - (s / 2))) => [h, l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l), l];
const hslToHsv = (h, s, l, v = l + s * Math.min(l, 1 - l)) => [h, v === 0 ? 0 : 2 * (1 - (l / v)), v];

//shades of same colour; ideally should be steps in HSB space
function monochromatic (h,s,l,n) {
    for (let i = 0; i < n; i++) {
        let dec=(i-2)*Math.trunc(100/n);
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
        hsvToHsl (h,sm,vm,l)
        colout[i] = "hsl("+h+", "+sm+"%, "+l+"%)";
        const colnr = "color"+i;
        document.getElementById(colnr).style.backgroundColor=colout[i];
    };
};

//Rotate H, keep S and L same - makes similar colours
function analogous (h,s,l,n) {
    for (let i = 0; i < n; i++) {
        let dec=(i-Math.trunc(n/2))*20;
        let hm=h+dec;
        if (hm<0) {
            hm=hm+359;
        } else {if (hm>359){
            hm=hm-359;
        }};
        colout[i] = "hsl("+hm+", "+s+"%, "+l+"%)";
        const colnr = "color"+i;
        document.getElementById(colnr).style.backgroundColor=colout[i];
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
    const h=(Math.random()*359);
    const s=(Math.random()*50)+50;
    const l=(Math.random()*20)+40;
    select (method,h,s,l,amnt);
    document.getElementById("prev").style.backgroundColor="hsl("+h+", "+s+"%, "+l+"%)";
};