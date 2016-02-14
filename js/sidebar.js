var sidecanvas = document.getElementById('side'),
context = sidecanvas.getContext('2d');
	
side.width = 96;
side.height = 320;
	
function drawMap(){
	
	//context.clearRect(0, 0, context.canvas.width, context.canvas.height);	
	var arrayLen = collisionArray.length;

	for(var a=0; a<arrayLen; a+=2){
		var x = collisionArray[a]*2;
		var y = collisionArray[a+1]*2;
		context.fillStyle = 'black';
		context.fillRect(x+8,y+12, 2, 2);
		
}
	context.strokeStyle = 'black';
	context.strokeRect(8,12, 80, 60);
	
}

function mapUpdate(px, py,color){
	
	context.fillStyle = color;		
	context.fillRect((px*2)+8,(py*2)+12, 2, 2);
	
}

sidecanvas.addEventListener('mousedown', function(e) {
    mouse.down = true;
});
sidecanvas.addEventListener('mouseup', function(e) {
    mouse.down = false;
});
sidecanvas.addEventListener('mousemove', function(e) {
     	var rect = sidecanvas.getBoundingClientRect();
        mouse.y= e.clientY - rect.top;
        mouse.x= e.clientX - rect.left;
});

