# Galaxy Spiral

## Spiral Placement

Galaxies are made up of spirals. This program creates multiple spirals that are the same angle distance away from each other.

## Spiral Points

Spirals have multiple points. Each point is a specific distance away from the center and has a specific starting angle. The starting angle for each point increases as it moves away from the center. This gives the spiral its curve shape.

## Position

By changing the point angle, we change the point position.

PointX=distance\*cos(angle)+canvas\_width/2

PointY=distance\*sin(angle)+canvas\_height/2

## Lines

Each point in a spiral draws a line that goes towards the previous point. The first point in each spiral does not have a line.

## Animation

Every frame, the program completes the following three steps.

1.  The program clears the screen.
2.  The program moves all components.
3.  The program draws all components. It draws each point and the lines between the points.

## Movement

Every frame, each point's angle increases. The point then changes its x and y position to match the angle. This allows for the point to spin by just changing the angle.

## Drawing

Thr program draws a gradient circle for each point so that the colors smoothly transition.
