const CHR_MISS = '-';
const CHR_STRIKE = 'X';

const STRIKE_BASE_VALUE = 10;

export class BowlingGame {
    private frames: Frame[];

    constructor(private gameAsStr: string) {
        this.frames = this.gameAsStr.split(' ').map(f => new Frame(f));    
        for(let i=0; i<10; ++i){
            this.frames[i].nextFrame = this.frames[i+1];
        }
    }

    getScore(): number {
        return this.frames.reduce((acc, f) => acc + f.getScore(), 0);
    }
}

class Frame {
    nextFrame?: Frame;
    constructor(private frameAsStr: string) {}

    isStrike(): boolean {
        return this.frameAsStr === CHR_STRIKE;
    }

    getScore(): number {
        if (this.isStrike()) {
            return STRIKE_BASE_VALUE + (this.nextFrame?.getScore() ?? 0);
        }
        return this.getThrowScore(this.frameAsStr[0])
         + this.getThrowScore(this.frameAsStr[1]);
    }

    getThrowScore(th: string): number {
        if(th === CHR_MISS){
            return 0
        }
        return parseInt(th);
    }
}