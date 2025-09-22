import {CelestialBody,Asteroid,Star,Point} from "/src/celestial_body_classes.js";
import {color_palettes} from "/src/color_palettes.js";
import {c,ctx} from "/src/canvas_setup.js";

function clear()
{
    ctx.fillStyle="#050417";
    ctx.fillRect(0,0,c.width,c.height); 
}
function draw()
{
    clear();
    //move objects
    for(let celestial_body of celestial_bodies)
    {
        celestial_body.move();
    }
    
    //draw objects
    for(let celestial_body of celestial_bodies)
    {
        celestial_body.draw();
    }
}
function setup_celestial_bodies()
{
    celestial_bodies=[];
    //Star is at the center of the galaxy
    celestial_bodies.push(new Star(c.width/2,c.height/2,35,primary_color,secondary_color,tertiary_color));

    //Center cluster
    /*
    for(let i=0;i<7;i++)
    {
        for(let j=0;j<7;j++)
        {
            if(i>=2&&i<=4&&j>=2&&j<=4)
            {
                continue;
            }

            let offset_x=25*(j-3)+c.width/2;
            let offset_y=25*(i-3)+c.height/2;
            celestial_bodies.push(new Asteroid(offset_x,offset_y,10));
        }
    }*/

    //Spirals
    for(let i=0;i<spirals;i++)
    {
        //Each spiral should be equidistant
        let angle=(i*2*Math.PI)/spirals;
        for(let distance=start_distance;distance<end_distance;distance+=distance_between)
        {
            //Change the angle so that the spiral curves
            angle+=angle_change;
            const x=c.width/2+distance*Math.cos(angle);
            const y=c.height/2+distance*Math.sin(angle);

            //The first point in a spiral does not connect to a previous point. The rest do.
            if(distance==start_distance)
            {
                celestial_bodies.push(new Point(x,y,size/2,primary_color,secondary_color,tertiary_color));
            }
            else
            {
                celestial_bodies.push(new Point(x,y,size/2,primary_color,secondary_color,tertiary_color,celestial_bodies[celestial_bodies.length-1]));
            }
        }
    }
    console.log(celestial_bodies.length);
}
function load_color_palettes()
{
    document.getElementById("color_palettes").innerHTML="";
    let index=0;
    for(const color_palette of color_palettes)
    {
        const name=color_palette[1];

        let option=document.createElement("option");
        document.getElementById("color_palettes").appendChild(option);
        option.innerHTML=name;
        option.value=index;

        index+=1;
    }
}
function setup()
{
    load_color_palettes();
    setup_celestial_bodies();
}

//Update input values
export function update_values()
{
    primary_color=document.getElementById("primary_color").value;
    secondary_color=document.getElementById("secondary_color").value;
    tertiary_color=document.getElementById("tertiary_color").value;

    spirals=parseInt(document.getElementById("spirals").value);
    document.getElementById("spirals_value").innerHTML=spirals;

    distance_between=parseInt(document.getElementById("distance_between").value);
    document.getElementById("distance_between_value").innerHTML=distance_between;

    size=parseInt(document.getElementById("size").value);
    document.getElementById("size_value").innerHTML=size;

    angle_change=parseInt(document.getElementById("angle_change").value)*((2*Math.PI)/180);
    document.getElementById("angle_change_value").innerHTML=document.getElementById("angle_change").value;

    console.log([[primary_color,secondary_color,tertiary_color],"WRITE_NAME_HERE"]);
    console.log("Update values activated");

    setup_celestial_bodies();
}
export function update_color_palette()
{
    const index=parseInt(document.getElementById("color_palettes").value);

    primary_color=color_palettes[index][0][0];
    secondary_color=color_palettes[index][0][1];
    tertiary_color=color_palettes[index][0][2];

    document.getElementById("primary_color").value=primary_color;
    document.getElementById("secondary_color").value=secondary_color;
    document.getElementById("tertiary_color").value=tertiary_color;

    console.log("Update color palette activated");
    setup_celestial_bodies();
    //update_values();
}
export function reset_values()
{
    update_values();
}

let celestial_bodies=[];

let spirals=12;
//How much the angle changes between each point in the spiral
let angle_change=0.3;

//Where the first point is drawn
const start_distance=50;

//Where the last point is
const end_distance=c.width/2;

//Distance between each point in a spiral
let distance_between=20;

//Size of each point
let size=20;

let primary_color=document.getElementById("primary_color").value;
let secondary_color=document.getElementById("secondary_color").value;
let tertiary_color=document.getElementById("tertiary_color").value;

console.log([primary_color,secondary_color,tertiary_color]);

setup();
setInterval(draw,33);