import * as core from '@actions/core'
import * as github from '@actions/github'

const run = async (): Promise<void> => {
    //Action code 🔥
    try {
        const creature = core.getInput('amazing-creature')
        if (creature == 'mosquito') {
            core.setFailed('Sorry, mosquitos are not amazing 🚫🦟')
            return
        }
        const pusherName = github.context.payload.pusher.name
        const message = `👋 Hello ${pusherName}! You are an amazing ${creature}!! 🙌`
        core.debug(message)
        core.setOutput('amazing-message', message)

        console.log({ payload: github.context.payload })
    } catch (error) {
        core.setFailed(`Debug-action failure: ${error}`)
    }
}

run()

export default run