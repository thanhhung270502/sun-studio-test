class GameManager {
    private currentState: number[][]
    private magicTubes: number[]

    constructor(initState: number[][], magicTubes: number[]) {
        this.currentState = initState
        this.magicTubes = magicTubes;

        //TODO: init your game logic here

        console.log('INIT GAME:')
        console.log(`Magic tubes indexes: ${magicTubes.join(', ')}`)
        this.printState()
    }

    public move(from: number, to: number): void {
        //TODO: implement your move logic here
        const fromTube: number[] = this.currentState[from];
        const toTube: number[] = this.currentState[to];

        console.log(fromTube);
        console.log(toTube);

        // Kiểm tra xem fromTube có rỗng ko?
        let count: number = 0;
        for (let i = 0; i < fromTube.length; i++) {
            if (fromTube[i] === 0) count++;
        }
        if (count === 4) {
            console.log(`Tube ${from} is empty!!!`);
            return;
        }
        // Kiểm tra xem toTube có đầy chưa?
        if (!toTube.includes(0)) {
            console.log(`Tube ${to} is full!!!`);
            return;
        }

        // Kiểm tra xem fromTube có tube nào là magicTube ko?
        const isMagicFromTube = this.magicTubes.includes(from);

        // Bắt đầu di chuyển bóng
        // Lấy bóng ra từ fromTube
        let ball: number | undefined;
        if (isMagicFromTube) {
            ball = fromTube.shift();
            fromTube.push(0);
        }
        else {
            for (let j = fromTube.length - 1; j >= 0; j--) {
                if (fromTube[j] != 0) {
                    ball = fromTube[j];
                    fromTube[j] = 0;
                    break;
                }
            }
        }
        // Thêm bóng vào toTube
        if (ball !== undefined) {
            for (let j = 0; j < toTube.length; j++) {
                if (toTube[j] === 0) {
                    toTube[j] = ball;
                    break;
                }
            }
        }

        console.log(`MOVE FROM ${from} TO ${to}:`)
        this.printState()

        if (this.isWin()) {
            console.log("YOU WIN")
        }
    }

    public isWin(): boolean {
        return this.currentState.every(tube => {
            const firstColor = tube[0]
            for (let i = 1; i < tube.length; i++) {
                const color = tube[i]

                if (firstColor != color) return false
            }

            return true
        })
    }

    private printState(): void {
        const transposing = this.currentState[0].map((_, colIndex) => this.currentState.map(row => row[row.length - 1 - colIndex]));

        console.log(transposing.map(row => row.join('\t')).join('\n'))
    }
}

export default GameManager