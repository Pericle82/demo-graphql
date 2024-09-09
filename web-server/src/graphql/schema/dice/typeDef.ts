
export const randomDieDef = `
    type RandomDie {
        numSides: Int!
        rollOnce: Int!
        roll(numDice: Int!): [Int]
    } 
    extend type Query {
        rollThreeDice: [Int]
        getDie(numSides: Int): RandomDie
    }

`
export default randomDieDef;