//declare default values
let colout = [];
let maximumColumnAmount = 10;
let columnAmount = 5;
let h, s, l, b;

//Setup - sets amount of columns
function colchange () {
    columnAmount=parseInt(document.getElementById("colamnt").value);
    document.getElementById("sliderlabel").textContent = `Colours (current - ${columnAmount})`;
    for (let i = 0; i < (maximumColumnAmount); i++) {
        colnr = "color"+i;
        if (i>=columnAmount) {
            document.getElementById(colnr).style.display='none';
        } else {
            document.getElementById(colnr).style.display='';
        };
    };
    genpal();
};
window.onload=colchange;

//color conversion, LukeForrest@StackOverflow
function hsb_to_hsl(h, s, b) {
    const x = (200 - s) * b / 100;
    return {
        h,
        s: x === 0 || x === 200 ? 0 : Math.round(s * b / (x <= 100 ? x : 200 - x)),
        l: Math.round(x / 2)
    };
}

function hsl_to_hsb(h, s, l) {
    const x = s * (l < 50 ? l : 100 - l);
    const b = l + (x / 100);
    return {
        h,
        s: l === 0 ? s : 2 * x / b,
        b
    };
}

//shades of same colour; ideally should be steps in HSB space
function monochromatic (h,s,l,n) {
    for (let i = 0; i < n; i++) {
        let shadingStep=(i)*Math.trunc(90/n);
        newColour = hsl_to_hsb(h, s, l);
        let sm=newColour.s-shadingStep;
        let bm=newColour.b-shadingStep;
        sm<0? sm+=100 : sm=sm;
        bm<0? bm+=100 : bm=bm;
        sm %= 101;
        bm %= 101;
        outColour = hsb_to_hsl(h,sm,bm);
        colourchange(outColour.h, outColour.s, outColour.l, i);
    };
};

//Rotate H, keep S and L same - makes similar colours
function analogous (h,s,l,n) {
    for (let i = 0; i < n; i++) {
        let shadingStep=(i-Math.trunc(n/2))*Math.trunc(100/n);
        let hm=h+shadingStep;
        (hm<0)?hm+=100:hm=hm;
        hm%=101;
        colourchange(hm,s,l,i);
    };
};

function complementary (h,s,l,n){
    for (let i = 0; i < n; i++) {
        let shadingStep=Math.trunc(i/2)*Math.trunc(100/n);
        let sm, bm;
        newColour = hsl_to_hsb(h, s, l);
        h=newColour.h+180;
        sm=newColour.s-shadingStep;
        bm=newColour.b-shadingStep;
        h %= 360;
        sm %= 101;
        bm %= 101;
        (sm<0)?sm+=100:sm=sm;
        (bm<0)?bm+=100:bm=bm;
        outColour = hsb_to_hsl(h,sm,bm);
        console.log(outColour.h, outColour.s, outColour.l, i);
        colourchange(outColour.h, outColour.s, outColour.l, i);
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
        case "complementary":
            complementary(h,s,l,n);
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
};

//Button to generate a palette from the given colour
function genpal () {
    let method = document.getElementById("gentype").value;
    const h=parseInt(document.getElementById("H_val").value);
    const s=parseInt(document.getElementById("S_val").value);
    const l=parseInt(document.getElementById("L_val").value);
    document.getElementById("prev").style.backgroundColor="hsl("+h+", "+s+"%, "+l+"%)";
    select (method,h,s,l,columnAmount);
};

//Button to generate a palette at random
function genrand () {
    let method = document.getElementById("gentype").value;
    const h=Math.round((Math.random()*359));
    const s=Math.round((Math.random()*50)+50);
    const l=Math.round((Math.random()*20)+40);
    document.getElementById("H_val").value = h;
    document.getElementById("S_val").value = s;
    document.getElementById("L_val").value = l;
    select (method,h,s,l,columnAmount);
    document.getElementById("prev").style.backgroundColor="hsl("+h+", "+s+"%, "+l+"%)";
};