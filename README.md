# This project shows how zones can improve performance in angular 2. 
Tech Stack:
1. Angular 2
2. System JS 
3. Typescript
4. Canvas (To show a FPS counter)
5. SVG

Running code(That handles lots of computation/paint/redraw) in a zone outside of angular 2, can make it performant.

Expirement:
Render 10000 svg boxes and bind them with mouse events. Move them around and check performance.
Scenario 1: Run mouse events and changes in angular 2's zone																																																																															
Scenario 2: Run mouse events and changes outside angular 2's zone

Results:
Scenario 1:  ~14-15 FPS (Frames per second)																																																																																																	
Scenario 2:  ~42-45 FPS (Frames per second)

So, as you can see, little optimization can lead to great improvements.
 Note: This is a derived project and just made for fun and learning purposes.

 
