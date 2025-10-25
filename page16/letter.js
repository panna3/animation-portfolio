let panna;
let palette;
let faceCol;
class Letter{
  constructor(x,y){
    this.x = x;
    this.y = y;

  }
  changeColor(i){
    palette = [
      color('aqua'),
      color('pink'),
      color('#9E9E9E'),
      color('lightgreen'),
      color('beige')
    ];
    return palette[i];
  }

  show(){
    
    let letters = "Panna";
    textSize(39);
    letters.split("");
    
    let startX = (width - textWidth(letters)) / 2;
    let startY = (height - textWidth(letters)/2) / 2;

    
    for(let i =0;i<letters.length;i++){
      let letterWidth = this.x + i * textWidth(letters[i]);
      if (this.isMouseOver(startX,startY,textWidth(letters[i]))){
        if(mouseIsPressed){
          noStroke();
          fill(this.changeColor(i));
          panna = new Panna(startX+textWidth(letters[i])/2,startY);
          panna.show();
          noStroke();
        }
        else{
        fill('pink');
        text(letters[i],startX,startY-15,letterWidth,letterWidth);
        }
      }
      else{
        fill('darkgray');
        text(letters[i],startX,startY,letterWidth,letterWidth);
      }  
      startX += textWidth(letters[i]);
    }
  }
  isMouseOver(startX, startY, letter){
    let left = startX;
    let right = startX + letter;
    let top = startY;
    let bottom = startY + textAscent();
    
    if(mouseX > left && mouseX < right && mouseY > top && mouseY < bottom){
      return true;
    }
    else{
      return false;
    }
  }
}