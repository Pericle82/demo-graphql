class RandomDie {

    numSides: number;
    
    constructor(numSides: number) {
        this.numSides = numSides;
    }

    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides)
    }

    roll({ numDice }: { numDice: number }) {
        const output = []
        for (var i = 0; i < numDice; i++) {
            output.push(this.rollOnce())
        }
        return output
    }
}

export default RandomDie;