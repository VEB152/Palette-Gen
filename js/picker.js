//declare default values
let colout = [];
let amntmax = 10;
let amnt = 5;
let h, s, l, b;

//Setup - sets amount of columns
function colchange () {
    amnt=parseInt(document.getElementById("colamnt").value);
    slidLabel = document.getElementById("sliderlabel");
    switch (amnt) {
        case 2:
            slidLabel.innerHTML = "Colours (current - 2):";
            break;
        case 3:
            slidLabel.innerHTML = "Colours (current - 3):";
            break;
        case 4:
            slidLabel.innerHTML = "Colours (current - 4):";
            break;
        case 5:
            slidLabel.innerHTML = "Colours (current - 5):";
            break;       
        case 6:
            slidLabel.innerHTML = "Colours (current - 6):";
            break;
        case 7:
            slidLabel.innerHTML = "Colours (current - 7):";
            break;
        case 8:
            slidLabel.innerHTML = "Colours (current - 8):";
            break;       
        case 9:
            slidLabel.innerHTML = "Colours (current - 9):";
            break;
        case 10:
            slidLabel.innerHTML = "Colours (current - 10):";
            break;     
    };
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

function hsbToHsl(sl, bl) {
    const x = (200 - sl) * bl / 100;
    sl = x === 0 || x === 200 ? 0 : Math.round(sl * bl / (x <= 100 ? x : 200 - x)),
    l = Math.round(x / 2);
}

function hslToHsb(sb, lb) {
    const x = sb * (lb < 50 ? l : 100 - lb);
    b = lb + (x / 100);
    s = lb === 0 ? s : 2 * x / b;
}

//shades of same colour; ideally should be steps in HSB space
function monochromatic (h,s,l,n) {
    for (let i = 0; i < n; i++) {
        let dec=(i-Math.round(n/2))*Math.trunc(100/n);
        hslToHsb(s, l);
        let sm=s+dec;
        if (sm<0) {
            sm=sm+100;
        } else {if (sm>100){
            sm=sm-100;
        }};
        let bm=b+dec;
        if (bm<0) {
            bm=bm+100;
        } else {if (bm>100){
            bm=bm-100;
        }};
        hsbToHsl (sm,bm);
        colourchange(h,sm,l,i);
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

function complementary (h,s,l,n){
    if (n>6) {
        document.getElementById("colamnt").value = 6;
        colchange();
    };
    for (let i=0; i<n; i++){
        hslToHsb (s,l);
        let dec = 20;
        switch ((i+1)%2){
            case 0:
                hm=h+180;
                if (i>2) {
                    sm=s-dec*(((i+1)/2)+1);
                    bm=b-dec*(((i+1)/2)+1);
                    console.log("column nr."+i+" h"+h+" s"+s+" l"+l+" b"+b);
                } else {
                    sm=s;
                    bm=b;
                }

                break;
            case 1:
                hm=h
                if (i>2) {
                    sm=s-dec*((i/2)+1);
                    bm=b-dec*((i/2)+1);
                } else {
                    sm=s;
                    bm=b;
                }
                break;
        };
        if (sm<0) {
            sm=sm+100;
        } else {if (sm>100){
            sm=sm-100;
        }};
        if (bm<0) {
            bm=bm+100;
        } else {if (bm>100){
            bm=bm-100;
        }};
        hsbToHsl(sm,bm);
        colourchange(hm,sm,l,i);
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
}

//Button to generate a palette from the given colour
function genpal () {
    let method = document.getElementById("gentype").value;
    const h=parseInt(document.getElementById("H_val").value);
    const s=parseInt(document.getElementById("S_val").value);
    const l=parseInt(document.getElementById("L_val").value);
    document.getElementById("prev").style.backgroundColor="hsl("+h+", "+s+"%, "+l+"%)";
    select (method,h,s,l,amnt);
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
    select (method,h,s,l,amnt);
    document.getElementById("prev").style.backgroundColor="hsl("+h+", "+s+"%, "+l+"%)";
};