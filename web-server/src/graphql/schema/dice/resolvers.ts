import RandomDie from "../../RandomDie"


export const dieResolvers = {
    Query: {
        rollThreeDice: () => {
            return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6))
        },
        getDie: ({ numSides }: { numSides: number }) => {
            return new RandomDie(numSides || 6)
        }
    }
}

export default dieResolvers;