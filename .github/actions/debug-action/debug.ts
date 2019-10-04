import * as core from '@actions/core'

const run = async (): Promise<void> => {
    //Action code 🔥
    const creature = core.getInput('amazing-creature')
    const message = `👋 Hello! You are an amazing ${creature}!! 🙌`
    core.debug(message)
    core.setOutput('amazing-message', message)
}

run()

export default run