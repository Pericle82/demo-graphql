

export const testResolvers = {
    Query: {
        ip: (args: any, request: any) => {
            return request.ip
        },
        quoteOfTheDay() {
            return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within"
        },
        random() {
            return Math.random()
        },
        test: () => {
            return 'test'
        },
        hello: () => 'Hello world!',
    }
}

export default testResolvers;