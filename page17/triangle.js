class Triangle{
  constructor(x, y, di, col){
    this.x = x;
    this.y = y;
    this.di = di;
    this.col = col;
     this.fade = 0;
  }
  update(isCurrent){
    let target = isCurrent ? 1 : 0;
    this.fade = lerp(this.fade, target, 0.1);
  }
  show(){
    let c = lerpColor(color(255), this.col, this.fade);
    fill(c);
    switch(this.di){
      case 0: // top
        triangle(this.x, this.y, this.x + sqW/2, this.y + sqW/2, this.x + sqW, this.y);
        break;
      case 1: // bottom
        triangle(this.x, this.y + sqW, this.x + sqW/2, this.y + sqW/2, this.x + sqW, this.y + sqW);
        break;
      case 2: // left
        triangle(this.x, this.y, this.x + sqW/2, this.y + + sqW/2, this.x, this.y + sqW);
        break;
      case 3: // right
        triangle(this.x + sqW, this.y, this.x + sqW/2, this.y + sqW/2, this.x + sqW, this.y + sqW);
        break;
      default:
        break;
    }
  }
  showColor(){
    fill(this.col);
  }
  hideColor(){
    fill('white');
  }
}