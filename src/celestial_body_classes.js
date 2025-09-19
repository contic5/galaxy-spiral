import {c,ctx} from "/src/canvas_setup.js";

export class CelestialBody
{
    constructor(x,y,radius)
    {
        this.x=x;
        this.y=y;
        this.radius=radius;
        
        //Distance from the center
        this.center_distance=Math.sqrt(Math.pow(x-c.width/2,2)+Math.pow(y-c.height/2,2));

        this.angle=Math.atan2(this.y-c.height/2,this.x-c.width/2);
    }
    move()
    {
        //Change the angle to move the point.
        this.angle+=0.02;
        if(this.angle>=2*Math.PI)
        {
            this.angle-=2*Math.PI;
        }

        this.x=c.width/2+this.center_distance*Math.cos(this.angle);
        this.y=c.height/2+this.center_distance*Math.sin(this.angle);
    }
}
export class Asteroid extends CelestialBody
{
    constructor(x,y,radius)
    {
        super(x,y,radius);
    }
    draw()
    {
        /*
        https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
        */

        // Create a radial gradient
        // The inner circle is radius/4
        //The outer circle is radius
        const gradient = ctx.createRadialGradient(this.x, this.y, this.radius/4, this.x, this.y, this.radius);

        // Add three color stops
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.25, "#63A6BE");
        gradient.addColorStop(1, "#4B2922");

        // Set the fill style and draw a circle
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.fillStyle=gradient;
        ctx.fill();
        ctx.closePath();
    }
}
export class Star extends CelestialBody
{
    constructor(x,y,radius,primary_color="white",secondary_color="yellow",tertiary_color="orange")
    {
        super(x,y,radius);
        this.primary_color=primary_color;
        this.secondary_color=secondary_color;
        this.tertiary_color=tertiary_color;
    }
    draw()
    {
        /*
        https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
        */

        // Create a radial gradient
        // The inner circle is radius/4
        //The outer circle is radius
        const gradient = ctx.createRadialGradient(this.x, this.y, this.radius/4, this.x, this.y, this.radius);

        // Add three color stops
        gradient.addColorStop(0, this.primary_color);
        gradient.addColorStop(0.25, this.secondary_color);
        gradient.addColorStop(1, this.tertiary_color);

        // Set the fill style and draw a circle
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.fillStyle=gradient;
        ctx.fill();
        ctx.closePath();
    }
}
export class Point extends CelestialBody
{
    constructor(x,y,radius,primary_color,secondary_color,tertiary_color,target_point=null)
    {
        super(x,y,radius);
        this.target_point=target_point;
        this.primary_color=primary_color;
        this.secondary_color=secondary_color;
        this.tertiary_color=tertiary_color;
    }
    draw()
    {
        /*
        https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
        */

        //Draw a line to the target point, which is the previous point in the spiral.
        if(this.target_point!=null)
        {
            const linearGradient = ctx.createLinearGradient(this.x, this.y, this.target_point.x, this.target_point.y);
            linearGradient.addColorStop(0, this.primary_color);
            linearGradient.addColorStop(0.5, this.secondary_color);
            linearGradient.addColorStop(1, this.primary_color);

            ctx.beginPath();
            ctx.moveTo(this.x,this.y);
            ctx.lineTo(this.target_point.x,this.target_point.y);
            ctx.strokeStyle=linearGradient;
            ctx.lineWidth=5;
            ctx.stroke();
            ctx.closePath();
        }

        /// Create a radial gradient
        // The inner circle is radius/4
        //The outer circle is radius
        const gradient = ctx.createRadialGradient(this.x, this.y, this.radius/4, this.x, this.y, this.radius);

        // Add three color stops
        gradient.addColorStop(0, this.primary_color);
        gradient.addColorStop(0.25, this.secondary_color);
        gradient.addColorStop(1, this.tertiary_color);

        // Set the fill style and draw a circle
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.fillStyle=gradient;
        ctx.fill();
        ctx.closePath();

        
    }
}